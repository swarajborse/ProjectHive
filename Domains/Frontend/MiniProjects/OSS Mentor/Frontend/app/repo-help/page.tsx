"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Star,
  GitFork,
  AlertCircle,
  FileText,
  CheckCircle2,
  ExternalLink,
  Download,
  Loader2,
  FolderTree,
  Users,
  Calendar,
  Code,
  Filter,
  X,
  Clock,
  TrendingUp,
  Tag,
  Plus,
  Minus,
  Zap,
  Target,
  BookOpen,
  Bug,
  Lightbulb,
} from "lucide-react"

export default function RepoHelpPage() {
  const [repoUrl, setRepoUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [repoData, setRepoData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  
  // Advanced search and filtering states
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLabels, setSelectedLabels] = useState<string[]>([])
  const [excludedLabels, setExcludedLabels] = useState<string[]>([])
  const [issueState, setIssueState] = useState<'open' | 'closed' | 'all'>('open')
  const [analysisType, setAnalysisType] = useState<'full' | 'search' | 'labels'>('full')
  const [showFilters, setShowFilters] = useState(false)
  const [availableLabels, setAvailableLabels] = useState<Array<{name: string; color: string; description: string | null}>>([])
  const [filteredIssues, setFilteredIssues] = useState<any[]>([])
  const [visibleCount, setVisibleCount] = useState<number>(10)
  const [onlyUnassigned, setOnlyUnassigned] = useState<boolean>(false)
  const [selectedIssue, setSelectedIssue] = useState<any | null>(null)
  const [sortBy, setSortBy] = useState<'updated' | 'created' | 'comments' | 'difficulty'>('updated')
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | 'easy' | 'medium' | 'hard'>('all')
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all')

  // Helper functions
  const addLabel = (label: string, isExcluded = false) => {
    if (isExcluded) {
      if (!excludedLabels.includes(label)) {
        setExcludedLabels([...excludedLabels, label])
      }
    } else {
      if (!selectedLabels.includes(label)) {
        setSelectedLabels([...selectedLabels, label])
      }
    }
  }

  const removeLabel = (label: string, isExcluded = false) => {
    if (isExcluded) {
      setExcludedLabels(excludedLabels.filter(l => l !== label))
    } else {
      setSelectedLabels(selectedLabels.filter(l => l !== label))
    }
  }

  const clearAllFilters = () => {
    setSelectedLabels([])
    setExcludedLabels([])
    setSearchQuery("")
    setDifficultyFilter('all')
    setPriorityFilter('all')
    setIssueState('open')
  }

  // Compute contrast color (black or white) for a hex color
  const getContrastColor = (hex?: string) => {
    try {
      if (!hex) return '#000'
      const h = hex.replace('#', '').trim()
      const normalized = h.length === 3 ? h.split('').map(c => c + c).join('') : h
      const bigint = parseInt(normalized, 16)
      const r = (bigint >> 16) & 255
      const g = (bigint >> 8) & 255
      const b = bigint & 255
      const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
      return luminance > 0.6 ? '#000' : '#fff'
    } catch (e) {
      return '#000'
    }
  }

  const sortIssues = (issues: any[]) => {
    return [...issues].sort((a, b) => {
      switch (sortBy) {
        case 'created':
          const aCreated = a.created_at ? new Date(a.created_at).getTime() : 0
          const bCreated = b.created_at ? new Date(b.created_at).getTime() : 0
          return bCreated - aCreated
        case 'updated':
          const aUpdated = a.updated_at ? new Date(a.updated_at).getTime() : 0
          const bUpdated = b.updated_at ? new Date(b.updated_at).getTime() : 0
          return bUpdated - aUpdated
        case 'comments':
          return (b.comments || 0) - (a.comments || 0)
        case 'difficulty':
          const difficultyOrder: {[key: string]: number} = { easy: 1, medium: 2, hard: 3 }
          return (difficultyOrder[a.difficulty] || 2) - (difficultyOrder[b.difficulty] || 2)
        default:
          return 0
      }
    })
  }

  const filterIssues = (issues: any[]) => {
    return issues.filter(issue => {
      // only show unassigned issues if toggled
      if (onlyUnassigned && issue.assignees && issue.assignees.length > 0) return false
      // Difficulty filter
      if (difficultyFilter !== 'all' && issue.difficulty !== difficultyFilter) {
        return false
      }
      
      // Priority filter
      if (priorityFilter !== 'all' && issue.priority !== priorityFilter) {
        return false
      }
      
      return true
    })
  }

  useEffect(() => {
    if (repoData?.goodFirstIssues) {
      const filtered = filterIssues(repoData.goodFirstIssues)
      const sorted = sortIssues(filtered)
      setFilteredIssues(sorted)
    }
  }, [repoData, sortBy, difficultyFilter, priorityFilter])

  useEffect(() => {
    if (repoData?.goodFirstIssues) {
      const filtered = filterIssues(repoData.goodFirstIssues)
      const sorted = sortIssues(filtered)
      setFilteredIssues(sorted)
    }
  }, [onlyUnassigned])

  const performAdvancedSearch = async () => {
    if (!repoUrl) return

    setLoading(true)
    setError(null)

    try {
      const requestBody = {
        url: repoUrl,
        searchQuery: searchQuery.trim() || undefined,
        labels: selectedLabels,
        excludeLabels: excludedLabels,
        issueState,
        analysisType: searchQuery.trim() ? 'search' : selectedLabels.length > 0 ? 'labels' : 'full'
      }

      const response = await fetch('/api/analyze-repo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to analyze repository')
      }

      const analysis = result.data
      setAvailableLabels(analysis.availableLabels || [])

      // Transform data based on analysis type
      if (result.analysisType === 'search' || result.analysisType === 'labels') {
        setRepoData({
          ...analysis,
          goodFirstIssues: analysis.issues || [],
          hasAdvancedSearch: true
        })
      } else {
        setRepoData({
          ...analysis,
          hasAdvancedSearch: false
        })
      }

    } catch (error: any) {
      console.error('Failed to analyze repository:', error)
      setError(error.message || 'Failed to analyze repository')
    } finally {
      setLoading(false)
    }
  }

  const analyzeRepo = async () => {
    if (!repoUrl) return

    setLoading(true)
    setError(null)
    setRepoData(null)

    try {
      const response = await fetch('/api/analyze-repo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: repoUrl }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to analyze repository')
      }

      const analysis = result.data

      // Transform the data to match the UI format
      setRepoData({
        name: analysis.repo.name,
        fullName: analysis.repo.full_name,
        description: analysis.repo.description || "No description provided",
        stars: analysis.repo.stargazers_count,
        forks: analysis.repo.forks_count,
        openIssues: analysis.repo.open_issues_count,
        language: analysis.repo.language || "Not specified",
        lastUpdated: new Date(analysis.repo.updated_at).toLocaleDateString(),
        license: analysis.repo.license?.name || "No license",
        topics: analysis.repo.topics || [],
        goodFirstIssues: analysis.goodFirstIssues.map((issue: any) => ({
          title: issue.title || 'Untitled Issue',
          number: issue.number || 0,
          labels: (issue.labels || []).map((label: any) => typeof label === 'string' ? label : label?.name || 'Unknown'),
          comments: issue.comments || 0,
          url: issue.html_url || issue.url,
          user: issue.user || null,
          assignees: issue.assignees || [],
          body: issue.body || '',
          updated_at: issue.updated_at || null,
          created_at: issue.created_at || null,
          difficulty: issue.difficulty || 'medium',
          priority: issue.priority || 'medium',
        })),
        fileStructure: analysis.fileStructure.map((item: any) => ({
          name: item.name,
          type: item.type === 'dir' ? 'folder' : 'file',
          path: item.path,
        })),
        contributionSteps: analysis.contributionGuide,
        technicalDetails: analysis.technicalDetails,
        hasReadme: !!analysis.readme,
        hasContributing: !!analysis.contributing,
        hasCodeOfConduct: !!analysis.codeOfConduct,
        repoUrl: analysis.repo.html_url,
      })
    } catch (error: any) {
      console.error('Failed to analyze repository:', error)
      setError(error.message || 'Failed to analyze repository')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative gradient-bg grid-pattern py-20 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
              <Search className="h-4 w-4" />
              <span>Repository Analysis</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-balance">
              <span className="text-glow bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                RepoHelp
              </span>{" "}
              Tool
            </h1>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
              Analyze any GitHub repository and get personalized contribution guidance. Find good first issues,
              understand the project structure, and get step-by-step instructions.
            </p>
          </div>
        </div>
      </section>

      {/* Enhanced Search Section */}
      <section className="py-12 container mx-auto px-4">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Main Search Card */}
          <Card className="border-primary/20 neon-glow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Analyze a Repository</CardTitle>
                  <CardDescription>Enter a GitHub repository URL and customize your search</CardDescription>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2"
                >
                  <Filter className="h-4 w-4" />
                  {showFilters ? 'Hide Filters' : 'Show Filters'}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Repository URL Input */}
              <div className="flex gap-3">
                <Input
                  type="url"
                  placeholder="https://github.com/username/repository"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (showFilters ? performAdvancedSearch() : analyzeRepo())}
                  className="flex-1"
                />
                <Button 
                  onClick={showFilters ? performAdvancedSearch : analyzeRepo} 
                  disabled={loading || !repoUrl} 
                  className="neon-glow"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4 mr-2" />
                      {showFilters ? 'Search' : 'Analyze'}
                    </>
                  )}
                </Button>
              </div>

              {/* Advanced Filters */}
              {showFilters && (
                <div className="space-y-4 p-4 rounded-lg border border-border bg-muted/30">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Advanced Search Options
                  </h4>
                  
                  {/* Search Query */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Search Query</label>
                    <Input
                      placeholder="Search issues by title, description, or keywords..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-background"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Issue State */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Issue State</label>
                      <div className="flex gap-2">
                        {(['open', 'closed', 'all'] as const).map((state) => (
                          <Button
                            key={state}
                            variant={issueState === state ? "default" : "outline"}
                            size="sm"
                            onClick={() => setIssueState(state)}
                            className="capitalize"
                          >
                            {state}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Sort By */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Sort By</label>
                      <div className="flex gap-2 flex-wrap">
                        {[
                          { key: 'updated', label: 'Updated', icon: Calendar },
                          { key: 'created', label: 'Created', icon: Clock },
                          { key: 'comments', label: 'Comments', icon: Users },
                          { key: 'difficulty', label: 'Difficulty', icon: Target }
                        ].map(({ key, label, icon: Icon }) => (
                          <Button
                            key={key}
                            variant={sortBy === key ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSortBy(key as any)}
                            className="flex items-center gap-1"
                          >
                            <Icon className="h-3 w-3" />
                            {label}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Difficulty Filter */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Difficulty</label>
                      <div className="flex gap-2">
                        {(['all', 'easy', 'medium', 'hard'] as const).map((difficulty) => (
                          <Button
                            key={difficulty}
                            variant={difficultyFilter === difficulty ? "default" : "outline"}
                            size="sm"
                            onClick={() => setDifficultyFilter(difficulty)}
                            className="capitalize flex items-center gap-1"
                          >
                            {difficulty === 'easy' && <Zap className="h-3 w-3" />}
                            {difficulty === 'medium' && <Target className="h-3 w-3" />}
                            {difficulty === 'hard' && <TrendingUp className="h-3 w-3" />}
                            {difficulty}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Priority Filter */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Priority</label>
                      <div className="flex gap-2">
                        {(['all', 'low', 'medium', 'high'] as const).map((priority) => (
                          <Button
                            key={priority}
                            variant={priorityFilter === priority ? "default" : "outline"}
                            size="sm"
                            onClick={() => setPriorityFilter(priority)}
                            className="capitalize"
                          >
                            {priority}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Labels Section */}
                  {availableLabels.length > 0 && (
                    <div className="space-y-3">
                      <label className="text-sm font-medium">Labels</label>
                      
                      {/* Active Filters */}
                      {(selectedLabels.length > 0 || excludedLabels.length > 0) && (
                        <div className="flex flex-wrap gap-2 p-3 rounded-lg bg-background border">
                          <span className="text-xs text-muted-foreground">Active filters:</span>
                          {selectedLabels.map((label) => (
                            <Badge key={`include-${label}`} variant="default" className="flex items-center gap-1">
                              <Plus className="h-3 w-3" />
                              {label}
                              <X 
                                className="h-3 w-3 cursor-pointer hover:text-destructive" 
                                onClick={() => removeLabel(label)}
                              />
                            </Badge>
                          ))}
                          {excludedLabels.map((label) => (
                            <Badge key={`exclude-${label}`} variant="destructive" className="flex items-center gap-1">
                              <Minus className="h-3 w-3" />
                              {label}
                              <X 
                                className="h-3 w-3 cursor-pointer hover:text-background" 
                                onClick={() => removeLabel(label, true)}
                              />
                            </Badge>
                          ))}
                          <Button variant="ghost" size="sm" onClick={clearAllFilters} className="h-6 px-2 text-xs">
                            Clear All
                          </Button>
                        </div>
                      )}

                      {/* Available Labels */}
                      <div className="max-h-32 overflow-y-auto border rounded-lg p-3 bg-background">
                        <div className="flex flex-wrap gap-2">
                          {availableLabels
                            .filter(label => !selectedLabels.includes(label.name) && !excludedLabels.includes(label.name))
                            .slice(0, 20)
                            .map((label) => (
                            <div key={label.name} className="flex items-center gap-1">
                              <Badge
                                variant="outline"
                                className="cursor-pointer transition-colors"
                                style={{
                                  backgroundColor: label.color ? `#${label.color}` : undefined,
                                  color: getContrastColor(label.color ? `#${label.color}` : undefined),
                                  borderColor: label.color ? `#${label.color}` : undefined,
                                }}
                                onClick={() => addLabel(label.name)}
                              >
                                <Plus className="h-3 w-3 mr-1" />
                                {label.name}
                              </Badge>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                                onClick={() => addLabel(label.name, true)}
                                title={`Exclude ${label.name}`}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between pt-2 border-t">
                    <Button variant="ghost" onClick={clearAllFilters}>
                      Clear All Filters
                    </Button>
                    <Button onClick={performAdvancedSearch} disabled={!repoUrl} className="neon-glow">
                      Apply Filters & Search
                    </Button>
                  </div>
                </div>
              )}

              {/* Example Repositories */}
              <div className="flex flex-wrap gap-2">
                <p className="text-sm text-muted-foreground w-full">Try these popular repositories:</p>
                {[
                  { url: "https://github.com/facebook/react", name: "React" },
                  { url: "https://github.com/microsoft/vscode", name: "VS Code" },
                  { url: "https://github.com/vercel/next.js", name: "Next.js" },
                  { url: "https://github.com/tensorflow/tensorflow", name: "TensorFlow" },
                ].map((repo) => (
                  <Button
                    key={repo.url}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setRepoUrl(repo.url)
                      setRepoData(null)
                      setError(null)
                    }}
                    className="text-xs"
                  >
                    {repo.name}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Loading Section */}
      {loading && (
        <section className="py-12 container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="border-primary/20">
              <CardContent className="pt-6">
                <div className="flex items-center justify-center gap-3 py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <div className="text-center">
                    <h3 className="font-semibold">Analyzing Repository</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Fetching repository data, issues, and structure...
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Issue Details Modal */}
      {selectedIssue && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSelectedIssue(null)} />
          <div className="relative max-w-2xl w-full mx-4 bg-card rounded-xl border p-6 z-10">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">#{selectedIssue.number} {selectedIssue.title}</h3>
                <div className="text-sm text-muted-foreground">by {selectedIssue.user?.login || 'Unknown'}</div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" onClick={() => setSelectedIssue(null)}>Close</Button>
                <Button asChild>
                  <a href={selectedIssue.html_url || selectedIssue.url} target="_blank" rel="noreferrer">Open on GitHub</a>
                </Button>
              </div>
            </div>

            <div className="text-sm text-muted-foreground mb-4 line-clamp-6">
              {selectedIssue.body || 'No description available.'}
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {(selectedIssue.labels || []).map((label: any, i: number) => (
                <Badge
                  key={i}
                  variant="outline"
                  style={{
                    backgroundColor: label?.color ? `#${label.color}` : undefined,
                    color: getContrastColor(label?.color ? `#${label.color}` : undefined),
                    borderColor: label?.color ? `#${label.color}` : undefined,
                  }}
                >
                  {typeof label === 'string' ? label : label?.name}
                </Badge>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <Button onClick={async () => {
                const template = `### Issue: ${selectedIssue.title}\n\n${selectedIssue.body || ''}\n\n---\n*I would like to work on this issue*`;
                try { await navigator.clipboard.writeText(template); } catch (e) { console.error(e) }
              }}>Copy Template</Button>
              <Button variant="outline" onClick={() => {
                // add the label filter for quick exploration
                const labels = (selectedIssue.labels || []).map((l: any) => typeof l === 'string' ? l : l.name)
                setSelectedLabels(labels)
                setShowFilters(true)
                setSelectedIssue(null)
              }}>Filter by Labels</Button>
            </div>
          </div>
        </div>
      )}

      {/* Error Section */}
      {error && (
        <section className="py-12 container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="border-red-200 bg-red-50">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 text-red-700">
                  <AlertCircle className="h-5 w-5" />
                  <div>
                    <h3 className="font-semibold">Analysis Failed</h3>
                    <p className="text-sm mt-1">{error}</p>
                    <p className="text-xs mt-2 text-red-600">
                      Make sure the repository URL is correct and the repository is public.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Results Section */}
      {repoData && (
        <section className="py-12 container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Repository Overview */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl">{repoData.name}</CardTitle>
                    <CardDescription className="mt-2">{repoData.description}</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <a href={repoUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View on GitHub
                    </a>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-primary" />
                    <div>
                      <div className="font-semibold">{repoData.stars}</div>
                      <div className="text-xs text-muted-foreground">Stars</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <GitFork className="h-4 w-4 text-primary" />
                    <div>
                      <div className="font-semibold">{repoData.forks}</div>
                      <div className="text-xs text-muted-foreground">Forks</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-primary" />
                    <div>
                      <div className="font-semibold">{repoData.openIssues}</div>
                      <div className="text-xs text-muted-foreground">Open Issues</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Code className="h-4 w-4 text-primary" />
                    <div>
                      <div className="font-semibold">{repoData.language}</div>
                      <div className="text-xs text-muted-foreground">Language</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {repoData.topics.map((topic: string, index: number) => (
                    <Badge key={index} variant="secondary">
                      {topic}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Updated {repoData.lastUpdated}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FileText className="h-4 w-4" />
                    <span>{repoData.license} License</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabbed Content */}
            <Tabs defaultValue="issues" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="issues">Good First Issues</TabsTrigger>
                <TabsTrigger value="structure">File Structure</TabsTrigger>
                <TabsTrigger value="workflow">Contribution Guide</TabsTrigger>
              </TabsList>

              {/* Enhanced Issues Display */}
              <TabsContent value="issues" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {repoData.hasAdvancedSearch ? (
                            <>
                              <Search className="h-5 w-5" />
                              Search Results
                            </>
                          ) : (
                            <>
                              <Lightbulb className="h-5 w-5" />
                              Good First Issues
                            </>
                          )}
                        </CardTitle>
                        <CardDescription>
                          {repoData.hasAdvancedSearch 
                            ? `Found ${filteredIssues.length} issues matching your criteria`
                            : "Issues labeled as beginner-friendly and perfect for your first contribution"
                          }
                        </CardDescription>
                      </div>
                      
                      {/* Quick Stats */}
                      <div className="flex gap-4 text-sm text-muted-foreground">
                        <div className="text-center">
                          <div className="font-semibold text-primary">
                            {filteredIssues.filter(i => i.difficulty === 'easy').length}
                          </div>
                          <div>Easy</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-accent">
                            {filteredIssues.filter(i => i.difficulty === 'medium').length}
                          </div>
                          <div>Medium</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-destructive">
                            {filteredIssues.filter(i => i.difficulty === 'hard').length}
                          </div>
                          <div>Hard</div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {filteredIssues.slice(0, visibleCount).map((issue: any, index: number) => (
                      <div
                        key={index}
                        className="p-4 rounded-lg border border-border hover:border-primary/50 transition-smooth bg-card"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold hover:text-primary transition-colors">
                                #{issue.number} {issue.title}
                              </h4>
                              {/* Difficulty Badge */}
                              <Badge 
                                variant={
                                  issue.difficulty === 'easy' ? 'default' : 
                                  issue.difficulty === 'medium' ? 'secondary' : 
                                  'destructive'
                                }
                                className="text-xs"
                              >
                                {issue.difficulty === 'easy' && <Zap className="h-3 w-3 mr-1" />}
                                {issue.difficulty === 'medium' && <Target className="h-3 w-3 mr-1" />}
                                {issue.difficulty === 'hard' && <TrendingUp className="h-3 w-3 mr-1" />}
                                {issue.difficulty}
                              </Badge>
                              {/* Priority Badge */}
                              {issue.priority && issue.priority !== 'medium' && (
                                <Badge 
                                  variant={issue.priority === 'high' ? 'destructive' : 'outline'}
                                  className="text-xs"
                                >
                                  {issue.priority} priority
                                </Badge>
                              )}
                            </div>
                            
                            {/* Issue metadata */}
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                <span>Updated {issue.updated_at ? new Date(issue.updated_at).toLocaleDateString() : 'Unknown'}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                <span>{issue.comments || 0} comments</span>
                              </div>
                              {issue.estimated_time && (
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  <span>{issue.estimated_time}</span>
                                </div>
                              )}
                              <div className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                <span>by {issue.user?.login || 'Unknown'}</span>
                              </div>
                            </div>

                            {/* Issue description snippet */}
                            {issue.body && (
                              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                                {issue.body.substring(0, 200)}...
                              </p>
                            )}

                            {/* Labels (click to add as filter) */}
                            <div className="flex gap-2 flex-wrap mb-3">
                              {(issue.labels || []).slice(0, 5).map((label: any, i: number) => {
                                const name = typeof label === 'string' ? label : label?.name || 'Unknown'
                                return (
                                  <Badge
                                    key={i}
                                    variant="outline"
                                    className="text-xs cursor-pointer hover:scale-105 transition-transform"
                                    style={{
                                      backgroundColor: label?.color ? `#${label.color}` : undefined,
                                      color: getContrastColor(label?.color ? `#${label.color}` : undefined),
                                      borderColor: label?.color ? `#${label.color}` : undefined,
                                    }}
                                    onClick={() => addLabel(name)}
                                    title={`Filter by ${name}`}
                                  >
                                    <Tag className="h-3 w-3 mr-1" />
                                    {name}
                                  </Badge>
                                )
                              })}
                              {(issue.labels || []).length > 5 && (
                                <Badge variant="outline" className="text-xs">
                                  +{(issue.labels || []).length - 5} more
                                </Badge>
                              )}
                            </div>

                            {/* Action buttons */}
                            <div className="flex items-center gap-2">
                              <Button size="sm" asChild className="neon-glow">
                                <a
                                  href={issue.html_url || issue.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-1"
                                >
                                  <ExternalLink className="h-3 w-3" />
                                  View Issue
                                </a>
                              </Button>

                              <Button size="sm" variant="outline" onClick={() => setSelectedIssue(issue)}>
                                Details
                              </Button>

                              <Button size="sm" variant="ghost" onClick={async () => {
                                const template = `### Issue: ${issue.title}\n\n${issue.body || ''}\n\n---\n*I would like to work on this issue*`;
                                try {
                                  await navigator.clipboard.writeText(template)
                                } catch (e) {
                                  console.error('Clipboard write failed', e)
                                }
                              }} title="Copy issue template">
                                Copy Template
                              </Button>

                              {(!issue.assignees || issue.assignees.length === 0) && (
                                <Badge variant="default" className="text-xs bg-green-100 text-green-800">
                                  <CheckCircle2 className="h-3 w-3 mr-1" />
                                  Available
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Load more */}
                    {filteredIssues.length > visibleCount && (
                      <div className="flex justify-center pt-4">
                        <Button onClick={() => setVisibleCount(c => c + 10)} className="neon-glow">
                          Load more
                        </Button>
                      </div>
                    )}

                    {filteredIssues.length === 0 && (
                      <div className="text-center py-12 text-muted-foreground">
                        <div className="flex flex-col items-center space-y-4">
                          {repoData.hasAdvancedSearch ? (
                            <>
                              <Search className="h-12 w-12 opacity-50" />
                              <div>
                                <p className="font-medium">No issues found matching your criteria</p>
                                <p className="text-sm">Try adjusting your filters or search terms</p>
                              </div>
                              <Button variant="outline" onClick={clearAllFilters}>
                                Clear Filters
                              </Button>
                            </>
                          ) : (
                            <>
                              <AlertCircle className="h-12 w-12 opacity-50" />
                              <div>
                                <p className="font-medium">No good first issues found</p>
                                <p className="text-sm">Check back later or use advanced search to find other issues</p>
                              </div>
                              <Button variant="outline" onClick={() => setShowFilters(true)}>
                                Try Advanced Search
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Load more or pagination could go here in the future */}
                    {filteredIssues.length > 0 && (
                      <div className="flex justify-center pt-4 border-t">
                        <p className="text-sm text-muted-foreground">
                          Showing {filteredIssues.length} issues
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* File Structure */}
              <TabsContent value="structure" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Repository Structure</CardTitle>
                    <CardDescription>Understanding the project organization</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 font-mono text-sm">
                      {repoData.fileStructure.slice(0, 20).map((item: any, index: number) => (
                        <div key={index} className="flex items-center gap-2 p-2 rounded hover:bg-muted transition-smooth">
                          {item.type === "folder" ? (
                            <FolderTree className="h-4 w-4 text-primary" />
                          ) : (
                            <FileText className="h-4 w-4 text-muted-foreground" />
                          )}
                          <span className={item.type === "folder" ? "text-primary font-semibold" : ""}>
                            {item.name}
                          </span>
                          {item.path && item.path !== item.name && (
                            <span className="text-xs text-muted-foreground">
                              ({item.path})
                            </span>
                          )}
                        </div>
                      ))}
                      {repoData.fileStructure.length > 20 && (
                        <div className="text-center py-2 text-muted-foreground text-sm">
                          ... and {repoData.fileStructure.length - 20} more files
                        </div>
                      )}
                    </div>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                        <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
                          <AlertCircle className="h-4 w-4" />
                          Key Files Found
                        </h4>
                        <ul className="text-sm text-muted-foreground space-y-1 ml-6">
                          <li className={repoData.hasReadme ? "text-green-600" : "text-orange-600"}>
                            • README.md {repoData.hasReadme ? "✓" : "✗"}
                          </li>
                          <li className={repoData.hasContributing ? "text-green-600" : "text-orange-600"}>
                            • CONTRIBUTING.md {repoData.hasContributing ? "✓" : "✗"}
                          </li>
                          <li className={repoData.hasCodeOfConduct ? "text-green-600" : "text-orange-600"}>
                            • CODE_OF_CONDUCT.md {repoData.hasCodeOfConduct ? "✓" : "✗"}
                          </li>
                        </ul>
                      </div>

                      {repoData.technicalDetails && (
                        <div className="p-4 rounded-lg bg-accent/5 border border-accent/20">
                          <h4 className="font-semibold text-accent mb-2 flex items-center gap-2">
                            <Code className="h-4 w-4" />
                            Technical Details
                          </h4>
                          <ul className="text-sm text-muted-foreground space-y-1 ml-6">
                            {repoData.technicalDetails.packageManager && (
                              <li>• Package Manager: {repoData.technicalDetails.packageManager}</li>
                            )}
                            {repoData.technicalDetails.framework && (
                              <li>• Framework: {repoData.technicalDetails.framework}</li>
                            )}
                            {repoData.technicalDetails.setupInstructions?.length > 0 && (
                              <li>• Special setup required</li>
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Contribution Workflow */}
              <TabsContent value="workflow" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Step-by-Step Contribution Guide</CardTitle>
                    <CardDescription>Tailored workflow for this repository</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {repoData.contributionSteps.map((step: string, index: number) => (
                        <div key={index} className="flex gap-4">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                            {index + 1}
                          </div>
                          <div className="flex-1 pt-1">
                            <p className="text-sm leading-relaxed">{step}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 flex gap-3">
                      <Button className="flex-1 neon-glow">
                        <Download className="h-4 w-4 mr-2" />
                        Export as PDF
                      </Button>
                      <Button variant="outline" className="flex-1 bg-transparent">
                        <Users className="h-4 w-4 mr-2" />
                        Get AI Help
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Contribution Checklist</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        "Read the README and CONTRIBUTING guidelines",
                        "Check if the issue is still open and unassigned",
                        "Comment on the issue to express interest",
                        "Set up the development environment",
                        "Write tests for your changes",
                        "Follow the project's code style",
                        "Update documentation if needed",
                        "Test your changes thoroughly",
                      ].map((item, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted">
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      )}

      {/* How it Works */}
      {!repoData && (
        <section className="py-20 container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">How RepoHelp Works</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  step: 1,
                  title: "Analyze Repository",
                  description: "We fetch repository data, issues, and structure from GitHub",
                },
                {
                  step: 2,
                  title: "Identify Opportunities",
                  description: "Find good first issues and areas where you can contribute",
                },
                {
                  step: 3,
                  title: "Get Guidance",
                  description: "Receive step-by-step instructions tailored to the project",
                },
              ].map((item) => (
                <div key={item.step} className="text-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto font-bold text-2xl text-primary">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
