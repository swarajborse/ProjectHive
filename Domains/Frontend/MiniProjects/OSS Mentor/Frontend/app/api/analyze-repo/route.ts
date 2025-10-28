import { NextRequest, NextResponse } from 'next/server';
import { GitHubService } from '@/lib/github-api';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      url, 
      searchQuery, 
      labels = [], 
      excludeLabels = [], 
      issueState = 'open',
      analysisType = 'full' // 'full', 'search', 'labels'
    } = body;

    if (!url) {
      return NextResponse.json(
        { error: 'Repository URL is required' },
        { status: 400 }
      );
    }

    // Validate GitHub URL
    const parsed = GitHubService.parseRepoUrl(url);
    if (!parsed) {
      return NextResponse.json(
        { error: 'Invalid GitHub repository URL' },
        { status: 400 }
      );
    }

    const { owner, repo } = parsed;

    let result;

    switch (analysisType) {
      case 'search':
        if (!searchQuery) {
          return NextResponse.json(
            { error: 'Search query is required for search analysis' },
            { status: 400 }
          );
        }
        const searchResults = await GitHubService.searchIssues(owner, repo, searchQuery, labels, issueState);
        const repoInfo = await GitHubService.fetchRepository(owner, repo);
        result = {
          repo: repoInfo,
          issues: searchResults,
          searchQuery,
          labels: await GitHubService.getRepositoryLabels(owner, repo)
        };
        break;

      case 'labels':
        const labelResults = await GitHubService.findIssuesByLabels(owner, repo, labels, excludeLabels, issueState);
        const repoInfoLabels = await GitHubService.fetchRepository(owner, repo);
        result = {
          repo: repoInfoLabels,
          issues: labelResults,
          filters: { labels, excludeLabels },
          availableLabels: await GitHubService.getRepositoryLabels(owner, repo)
        };
        break;

      default:
        // Full analysis
        result = await GitHubService.analyzeRepository(url);
        result.availableLabels = await GitHubService.getRepositoryLabels(owner, repo);
        break;
    }

    return NextResponse.json({
      success: true,
      data: result,
      analysisType
    });

  } catch (error: any) {
    console.error('Repository analysis error:', error);
    
    // Handle different types of errors
    if (error.message.includes('Not Found')) {
      return NextResponse.json(
        { error: 'Repository not found or is private' },
        { status: 404 }
      );
    }

    if (error.message.includes('rate limit')) {
      return NextResponse.json(
        { error: 'GitHub API rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: error.message || 'Failed to analyze repository' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Repository Help API - POST a GitHub URL to analyze',
    example: {
      url: 'https://github.com/owner/repository'
    }
  });
}