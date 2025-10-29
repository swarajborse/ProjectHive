import { Octokit } from '@octokit/rest';

// GitHub API client
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN, // Optional: for higher rate limits
});

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  language: string | null;
  updated_at: string;
  license: {
    name: string;
    spdx_id: string;
  } | null;
  topics: string[];
  default_branch: string;
  has_issues: boolean;
  has_wiki: boolean;
  has_discussions: boolean;
  archived: boolean;
  visibility: 'public' | 'private';
}

export interface GitHubIssue {
  number: number;
  title: string;
  body: string | null;
  html_url: string;
  state: 'open' | 'closed';
  labels: Array<{
    name: string;
    color: string;
    description: string | null;
  }>;
  comments: number;
  created_at: string;
  updated_at: string;
  user: {
    login: string;
    avatar_url: string;
  };
  assignee: any;
  assignees: any[];
  difficulty?: 'easy' | 'medium' | 'hard';
  estimated_time?: string;
  priority?: 'low' | 'medium' | 'high';
}

export interface RepositoryContent {
  name: string;
  path: string;
  type: 'file' | 'dir';
  size?: number;
  download_url?: string | null;
}

export interface RepositoryAnalysis {
  repo: GitHubRepo;
  issues: GitHubIssue[];
  goodFirstIssues: GitHubIssue[];
  fileStructure: RepositoryContent[];
  readme: string | null;
  contributing: string | null;
  codeOfConduct: string | null;
  contributionGuide: string[];
  technicalDetails: {
    packageManager: string | null;
    framework: string | null;
    setupInstructions: string[];
  };
  availableLabels?: Array<{name: string; color: string; description: string | null}>;
  searchQuery?: string;
  filters?: {
    labels: string[];
    excludeLabels: string[];
  };
}

export class GitHubService {
  /**
   * Parse GitHub URL to extract owner and repo name
   */
  static parseRepoUrl(url: string): { owner: string; repo: string } | null {
    try {
      const regex = /github\.com\/([^\/]+)\/([^\/]+)/;
      const match = url.match(regex);
      
      if (!match) return null;
      
      const [, owner, repo] = match;
      return { 
        owner: owner.trim(), 
        repo: repo.replace(/\.git$/, '').trim() 
      };
    } catch (error) {
      console.error('Error parsing repo URL:', error);
      return null;
    }
  }

  /**
   * Fetch repository information
   */
  static async fetchRepository(owner: string, repo: string): Promise<GitHubRepo> {
    try {
      const { data } = await octokit.rest.repos.get({
        owner,
        repo,
      });
      
      return data as GitHubRepo;
    } catch (error: any) {
      throw new Error(`Failed to fetch repository: ${error.message}`);
    }
  }

  /**
   * Fetch repository issues
   */
  static async fetchIssues(owner: string, repo: string, state: 'open' | 'closed' | 'all' = 'open'): Promise<GitHubIssue[]> {
    try {
      const { data } = await octokit.rest.issues.listForRepo({
        owner,
        repo,
        state,
        sort: 'updated',
        direction: 'desc',
        per_page: 100,
      });
      
      // Filter out pull requests (GitHub API includes PRs in issues)
      return data.filter((issue: any) => !issue.pull_request) as GitHubIssue[];
    } catch (error: any) {
      throw new Error(`Failed to fetch issues: ${error.message}`);
    }
  }

  /**
   * Find issues by label filters
   */
  static async findIssuesByLabels(
    owner: string, 
    repo: string, 
    labels: string[] = [], 
    excludeLabels: string[] = [],
    state: 'open' | 'closed' | 'all' = 'open'
  ): Promise<GitHubIssue[]> {
    try {
      const issues = await this.fetchIssues(owner, repo, state);
      
      return issues.filter(issue => {
        const issueLabels = issue.labels.map(label => label.name.toLowerCase());
        
        // Check if issue has all required labels
        const hasRequiredLabels = labels.length === 0 || 
          labels.every(label => issueLabels.includes(label.toLowerCase()));
        
        // Check if issue doesn't have excluded labels
        const hasExcludedLabels = excludeLabels.some(label => 
          issueLabels.includes(label.toLowerCase())
        );
        
        return hasRequiredLabels && !hasExcludedLabels;
      });
    } catch (error: any) {
      throw new Error(`Failed to find issues by labels: ${error.message}`);
    }
  }

  /**
   * Find good first issues with enhanced categorization
   */
  static async findGoodFirstIssues(owner: string, repo: string): Promise<GitHubIssue[]> {
    try {
      const issues = await this.fetchIssues(owner, repo, 'open');
      
      const goodFirstIssues = issues.filter(issue => 
        issue.labels.some(label => 
          ['good first issue', 'beginner', 'help wanted', 'first-timers-only', 'easy']
            .includes(label.name.toLowerCase())
        ) && 
        issue.assignees.length === 0 // Not assigned to anyone
      );

      // Enhance issues with difficulty and priority estimation
      return goodFirstIssues.map(issue => ({
        ...issue,
        difficulty: this.estimateDifficulty(issue),
        estimated_time: this.estimateTime(issue),
        priority: this.estimatePriority(issue)
      }));
    } catch (error: any) {
      throw new Error(`Failed to find good first issues: ${error.message}`);
    }
  }

  /**
   * Search issues by text query
   */
  static async searchIssues(
    owner: string, 
    repo: string, 
    query: string,
    labels: string[] = [],
    state: 'open' | 'closed' | 'all' = 'open'
  ): Promise<GitHubIssue[]> {
    try {
      // Build search query
      let searchQuery = `repo:${owner}/${repo} ${query}`;
      
      if (state !== 'all') {
        searchQuery += ` state:${state}`;
      }
      
      if (labels.length > 0) {
        searchQuery += ` ${labels.map(label => `label:"${label}"`).join(' ')}`;
      }

      const { data } = await octokit.rest.search.issuesAndPullRequests({
        q: searchQuery,
        sort: 'updated',
        order: 'desc',
        per_page: 50,
      });

      // Filter out pull requests and enhance issues
      const issues = data.items.filter(item => !item.pull_request) as GitHubIssue[];
      
      return issues.map(issue => ({
        ...issue,
        difficulty: this.estimateDifficulty(issue),
        estimated_time: this.estimateTime(issue),
        priority: this.estimatePriority(issue)
      }));
    } catch (error: any) {
      throw new Error(`Failed to search issues: ${error.message}`);
    }
  }

  /**
   * Get repository labels
   */
  static async getRepositoryLabels(owner: string, repo: string): Promise<Array<{name: string; color: string; description: string | null}>> {
    try {
      const { data } = await octokit.rest.issues.listLabelsForRepo({
        owner,
        repo,
        per_page: 100,
      });
      
      return data.map(label => ({
        name: label.name,
        color: label.color,
        description: label.description
      }));
    } catch (error: any) {
      throw new Error(`Failed to fetch repository labels: ${error.message}`);
    }
  }

  /**
   * Estimate issue difficulty based on labels and content
   */
  private static estimateDifficulty(issue: GitHubIssue): 'easy' | 'medium' | 'hard' {
    const labels = issue.labels.map(l => l.name.toLowerCase());
    
    // Easy indicators
    if (labels.some(l => ['good first issue', 'beginner', 'easy', 'documentation', 'typo'].includes(l))) {
      return 'easy';
    }
    
    // Hard indicators
    if (labels.some(l => ['complex', 'hard', 'refactor', 'architecture', 'breaking'].includes(l))) {
      return 'hard';
    }
    
    // Medium by default
    return 'medium';
  }

  /**
   * Estimate time to complete based on difficulty and issue type
   */
  private static estimateTime(issue: GitHubIssue): string {
    const difficulty = this.estimateDifficulty(issue);
    const labels = issue.labels.map(l => l.name.toLowerCase());
    
    if (labels.some(l => ['documentation', 'typo'].includes(l))) {
      return '< 1 hour';
    }
    
    switch (difficulty) {
      case 'easy':
        return '1-3 hours';
      case 'medium':
        return '3-8 hours';
      case 'hard':
        return '1-3 days';
      default:
        return '2-4 hours';
    }
  }

  /**
   * Estimate priority based on labels and age
   */
  private static estimatePriority(issue: GitHubIssue): 'low' | 'medium' | 'high' {
    const labels = issue.labels.map(l => l.name.toLowerCase());
    const daysSinceCreation = Math.floor(
      (Date.now() - new Date(issue.created_at).getTime()) / (1000 * 60 * 60 * 24)
    );
    
    // High priority indicators
    if (labels.some(l => ['bug', 'critical', 'security', 'urgent'].includes(l))) {
      return 'high';
    }
    
    // Low priority indicators
    if (labels.some(l => ['enhancement', 'feature', 'nice-to-have'].includes(l)) && daysSinceCreation < 30) {
      return 'low';
    }
    
    return 'medium';
  }

  /**
   * Fetch repository file structure
   */
  static async fetchFileStructure(owner: string, repo: string, path: string = ''): Promise<RepositoryContent[]> {
    try {
      const { data } = await octokit.rest.repos.getContent({
        owner,
        repo,
        path,
      });
      
      if (Array.isArray(data)) {
        return data.map(item => ({
          name: item.name,
          path: item.path,
          type: item.type as 'file' | 'dir',
          size: item.size,
          download_url: item.download_url,
        }));
      }
      
      return [];
    } catch (error: any) {
      throw new Error(`Failed to fetch file structure: ${error.message}`);
    }
  }

  /**
   * Fetch file content
   */
  static async fetchFileContent(owner: string, repo: string, path: string): Promise<string | null> {
    try {
      const { data } = await octokit.rest.repos.getContent({
        owner,
        repo,
        path,
      });
      
      if (!Array.isArray(data) && data.type === 'file' && data.content) {
        return Buffer.from(data.content, 'base64').toString('utf-8');
      }
      
      return null;
    } catch (error) {
      // File doesn't exist or error occurred
      return null;
    }
  }

  /**
   * Generate contribution guide based on repository analysis
   */
  static generateContributionGuide(repo: GitHubRepo, hasContributing: boolean, technicalDetails: any): string[] {
    const steps = [
      `Fork the repository from ${repo.html_url}`,
      `Clone your fork: git clone https://github.com/YOUR-USERNAME/${repo.name}.git`,
      `Navigate to the project: cd ${repo.name}`,
    ];

    // Add setup steps based on detected technology
    if (technicalDetails.packageManager) {
      if (technicalDetails.packageManager === 'npm') {
        steps.push('Install dependencies: npm install');
      } else if (technicalDetails.packageManager === 'yarn') {
        steps.push('Install dependencies: yarn install');
      } else if (technicalDetails.packageManager === 'pnpm') {
        steps.push('Install dependencies: pnpm install');
      }
    }

    // Add framework-specific setup
    if (technicalDetails.framework) {
      if (technicalDetails.framework === 'Next.js') {
        steps.push('Start development server: npm run dev');
      } else if (technicalDetails.framework === 'React') {
        steps.push('Start development server: npm start');
      } else if (technicalDetails.framework === 'Vue') {
        steps.push('Start development server: npm run serve');
      }
    }

    steps.push(
      'Create a new branch: git checkout -b feature/your-feature-name',
      'Make your changes and test them thoroughly',
      'Commit your changes: git commit -m "feat: add your feature description"',
      'Push to your fork: git push origin feature/your-feature-name',
      `Open a Pull Request on ${repo.html_url}`
    );

    if (hasContributing) {
      steps.push('Make sure to read CONTRIBUTING.md for project-specific guidelines');
    }

    return steps;
  }

  /**
   * Detect technical details from repository
   */
  static async detectTechnicalDetails(owner: string, repo: string, fileStructure: RepositoryContent[]): Promise<any> {
    const details = {
      packageManager: null as string | null,
      framework: null as string | null,
      setupInstructions: [] as string[],
    };

    try {
      // Check for package managers
      const hasPackageJson = fileStructure.some(file => file.name === 'package.json');
      const hasYarnLock = fileStructure.some(file => file.name === 'yarn.lock');
      const hasPnpmLock = fileStructure.some(file => file.name === 'pnpm-lock.yaml');
      
      if (hasPackageJson) {
        if (hasPnpmLock) {
          details.packageManager = 'pnpm';
        } else if (hasYarnLock) {
          details.packageManager = 'yarn';
        } else {
          details.packageManager = 'npm';
        }

        // Analyze package.json for framework detection
        const packageJsonContent = await this.fetchFileContent(owner, repo, 'package.json');
        if (packageJsonContent) {
          const packageJson = JSON.parse(packageJsonContent);
          
          if (packageJson.dependencies?.next || packageJson.devDependencies?.next) {
            details.framework = 'Next.js';
          } else if (packageJson.dependencies?.react || packageJson.devDependencies?.react) {
            details.framework = 'React';
          } else if (packageJson.dependencies?.vue || packageJson.devDependencies?.vue) {
            details.framework = 'Vue';
          } else if (packageJson.dependencies?.angular || packageJson.devDependencies?.angular) {
            details.framework = 'Angular';
          }
        }
      }

      // Check for other indicators
      const hasDockerfile = fileStructure.some(file => file.name === 'Dockerfile');
      const hasRequirementsTxt = fileStructure.some(file => file.name === 'requirements.txt');
      const hasGemfile = fileStructure.some(file => file.name === 'Gemfile');
      const hasCargoToml = fileStructure.some(file => file.name === 'Cargo.toml');

      if (hasDockerfile) {
        details.setupInstructions.push('This project uses Docker for containerization');
      }
      if (hasRequirementsTxt) {
        details.setupInstructions.push('Install Python dependencies: pip install -r requirements.txt');
      }
      if (hasGemfile) {
        details.setupInstructions.push('Install Ruby gems: bundle install');
      }
      if (hasCargoToml) {
        details.setupInstructions.push('Build Rust project: cargo build');
      }

    } catch (error) {
      console.error('Error detecting technical details:', error);
    }

    return details;
  }

  /**
   * Analyze repository comprehensively
   */
  static async analyzeRepository(url: string): Promise<RepositoryAnalysis> {
    const parsed = this.parseRepoUrl(url);
    if (!parsed) {
      throw new Error('Invalid GitHub repository URL');
    }

    const { owner, repo } = parsed;

    try {
      // Fetch all data in parallel for better performance
      const [
        repoData,
        issues,
        goodFirstIssues,
        fileStructure,
      ] = await Promise.all([
        this.fetchRepository(owner, repo),
        this.fetchIssues(owner, repo, 'open'),
        this.findGoodFirstIssues(owner, repo),
        this.fetchFileStructure(owner, repo),
      ]);

      // Fetch important files
      const [readme, contributing, codeOfConduct] = await Promise.all([
        this.fetchFileContent(owner, repo, 'README.md'),
        this.fetchFileContent(owner, repo, 'CONTRIBUTING.md'),
        this.fetchFileContent(owner, repo, 'CODE_OF_CONDUCT.md'),
      ]);

      // Detect technical details
      const technicalDetails = await this.detectTechnicalDetails(owner, repo, fileStructure);

      // Generate contribution guide
      const contributionGuide = this.generateContributionGuide(
        repoData, 
        !!contributing, 
        technicalDetails
      );

      return {
        repo: repoData,
        issues,
        goodFirstIssues,
        fileStructure,
        readme,
        contributing,
        codeOfConduct,
        contributionGuide,
        technicalDetails,
      };
    } catch (error: any) {
      throw new Error(`Repository analysis failed: ${error.message}`);
    }
  }
}