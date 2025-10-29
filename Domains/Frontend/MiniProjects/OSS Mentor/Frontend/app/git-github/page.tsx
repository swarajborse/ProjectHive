"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TutorialSidebar } from "@/components/tutorial-sidebar"
import { GitBranch, GitCommit, GitMerge, Terminal, Code2, ArrowRight, Copy, Check } from "lucide-react"
import Link from "next/link"

const tutorialSections = [
  { id: "intro", title: "Introduction to Git" },
  { id: "basics", title: "Git Basics" },
  { id: "branches", title: "Branching & Merging" },
  { id: "github", title: "GitHub Overview" },
  { id: "workflow", title: "Contribution Workflow" },
  { id: "best-practices", title: "Best Practices" },
]

export default function GitGitHubPage() {
  const [activeSection, setActiveSection] = useState("intro")
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null)

  const copyCommand = (command: string) => {
    navigator.clipboard.writeText(command)
    setCopiedCommand(command)
    setTimeout(() => setCopiedCommand(null), 2000)
  }

  const CommandBlock = ({ command, description }: { command: string; description?: string }) => (
    <div className="group relative">
      <div className="flex items-center justify-between p-4 rounded-lg bg-muted border border-border font-mono text-sm">
        <code className="text-primary">{command}</code>
        <button
          onClick={() => copyCommand(command)}
          className="opacity-0 group-hover:opacity-100 transition-smooth p-1 hover:bg-background rounded"
        >
          {copiedCommand === command ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>
      {description && <p className="text-xs text-muted-foreground mt-2 px-1">{description}</p>}
    </div>
  )

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative gradient-bg grid-pattern py-20 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
              <Terminal className="h-4 w-4" />
              <span>Interactive Learning</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-balance">
              Master{" "}
              <span className="text-glow bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Git & GitHub
              </span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
              Learn version control and collaboration with interactive tutorials, visual diagrams, and hands-on
              examples. From basics to advanced workflows.
            </p>
          </div>
        </div>
      </section>

      {/* Main Tutorial Content */}
      <section className="py-12 container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <TutorialSidebar
              sections={tutorialSections}
              activeSection={activeSection}
              onSectionClick={setActiveSection}
            />
          </div>

          {/* Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Introduction */}
            {activeSection === "intro" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-3xl">What is Git?</CardTitle>
                    <CardDescription>Understanding version control</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      Git is a distributed version control system that tracks changes in your code over time. It allows
                      multiple developers to work on the same project simultaneously without conflicts.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                      {[
                        {
                          icon: GitCommit,
                          title: "Track Changes",
                          description: "Every modification is recorded with a commit message",
                        },
                        {
                          icon: GitBranch,
                          title: "Parallel Development",
                          description: "Work on features independently using branches",
                        },
                        {
                          icon: GitMerge,
                          title: "Merge Code",
                          description: "Combine changes from different branches seamlessly",
                        },
                        {
                          icon: Code2,
                          title: "Collaborate",
                          description: "Multiple developers can work together efficiently",
                        },
                      ].map((item, index) => (
                        <div key={index} className="flex items-start gap-3 p-4 rounded-lg border border-border">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <item.icon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1">{item.title}</h4>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">What is GitHub?</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      GitHub is a web-based platform that hosts Git repositories and provides collaboration features
                      like pull requests, issues, and project management tools. It's the world's largest code hosting
                      platform.
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Git Basics */}
            {activeSection === "basics" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-3xl">Git Basics</CardTitle>
                    <CardDescription>Essential commands to get started</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-lg mb-3">Setting Up Git</h3>
                      <div className="space-y-3">
                        <CommandBlock
                          command="git config --global user.name 'Your Name'"
                          description="Set your name for commits"
                        />
                        <CommandBlock
                          command="git config --global user.email 'your@email.com'"
                          description="Set your email for commits"
                        />
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg mb-3">Creating a Repository</h3>
                      <div className="space-y-3">
                        <CommandBlock command="git init" description="Initialize a new Git repository" />
                        <CommandBlock command="git clone <repository-url>" description="Clone an existing repository" />
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg mb-3">Basic Workflow</h3>
                      <div className="space-y-3">
                        <CommandBlock command="git status" description="Check the status of your files" />
                        <CommandBlock command="git add <file>" description="Stage changes for commit" />
                        <CommandBlock command="git add ." description="Stage all changes" />
                        <CommandBlock command="git commit -m 'message'" description="Commit staged changes" />
                        <CommandBlock command="git push" description="Push commits to remote repository" />
                        <CommandBlock command="git pull" description="Fetch and merge changes from remote" />
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                      <h4 className="font-semibold text-primary mb-2">Pro Tip</h4>
                      <p className="text-sm text-muted-foreground">
                        Always run <code className="text-primary font-mono">git status</code> before committing to see
                        what changes you're about to commit.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Branching & Merging */}
            {activeSection === "branches" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-3xl">Branching & Merging</CardTitle>
                    <CardDescription>Work on features independently</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-muted-foreground leading-relaxed">
                      Branches allow you to develop features, fix bugs, or experiment with new ideas in isolation from
                      the main codebase.
                    </p>

                    <div>
                      <h3 className="font-semibold text-lg mb-3">Branch Commands</h3>
                      <div className="space-y-3">
                        <CommandBlock command="git branch" description="List all branches" />
                        <CommandBlock command="git branch <branch-name>" description="Create a new branch" />
                        <CommandBlock command="git checkout <branch-name>" description="Switch to a branch" />
                        <CommandBlock
                          command="git checkout -b <branch-name>"
                          description="Create and switch to new branch"
                        />
                        <CommandBlock command="git merge <branch-name>" description="Merge a branch into current" />
                        <CommandBlock command="git branch -d <branch-name>" description="Delete a branch" />
                      </div>
                    </div>

                    <div className="p-6 rounded-xl bg-muted border border-border">
                      <h4 className="font-semibold mb-4">Visual: Branch Workflow</h4>
                      <div className="space-y-3 font-mono text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-primary" />
                          <span className="text-muted-foreground">main branch</span>
                        </div>
                        <div className="flex items-center gap-2 ml-6">
                          <GitBranch className="h-4 w-4 text-accent" />
                          <span className="text-accent">feature/new-feature</span>
                        </div>
                        <div className="flex items-center gap-2 ml-12">
                          <GitCommit className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">commit changes</span>
                        </div>
                        <div className="flex items-center gap-2 ml-6">
                          <GitMerge className="h-4 w-4 text-primary" />
                          <span className="text-primary">merge back to main</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* GitHub Overview */}
            {activeSection === "github" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-3xl">GitHub Overview</CardTitle>
                    <CardDescription>Collaborate with the world</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        {
                          title: "Repositories",
                          description: "Store and manage your code projects with version history",
                        },
                        {
                          title: "Pull Requests",
                          description: "Propose changes and collaborate on code reviews",
                        },
                        {
                          title: "Issues",
                          description: "Track bugs, feature requests, and project tasks",
                        },
                        {
                          title: "Actions",
                          description: "Automate workflows with CI/CD pipelines",
                        },
                        {
                          title: "Discussions",
                          description: "Community conversations and Q&A",
                        },
                        {
                          title: "Projects",
                          description: "Organize and track work with project boards",
                        },
                      ].map((item, index) => (
                        <div key={index} className="p-4 rounded-lg border border-border">
                          <h4 className="font-semibold mb-2">{item.title}</h4>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                      ))}
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg mb-3">Working with Remote Repositories</h3>
                      <div className="space-y-3">
                        <CommandBlock
                          command="git remote add origin <url>"
                          description="Connect local repo to GitHub"
                        />
                        <CommandBlock command="git remote -v" description="View remote repositories" />
                        <CommandBlock command="git push -u origin main" description="Push to remote for first time" />
                        <CommandBlock command="git fetch" description="Download changes without merging" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Contribution Workflow */}
            {activeSection === "workflow" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-3xl">Contribution Workflow</CardTitle>
                    <CardDescription>Step-by-step guide to contributing</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-6">
                      {[
                        {
                          step: 1,
                          title: "Fork the Repository",
                          description: "Create your own copy of the project on GitHub by clicking the 'Fork' button.",
                          command: null,
                        },
                        {
                          step: 2,
                          title: "Clone Your Fork",
                          description: "Download your forked repository to your local machine.",
                          command: "git clone https://github.com/YOUR-USERNAME/REPO-NAME.git",
                        },
                        {
                          step: 3,
                          title: "Create a Branch",
                          description: "Create a new branch for your feature or bug fix.",
                          command: "git checkout -b feature/your-feature-name",
                        },
                        {
                          step: 4,
                          title: "Make Changes",
                          description: "Edit files, add features, or fix bugs in your branch.",
                          command: null,
                        },
                        {
                          step: 5,
                          title: "Commit Changes",
                          description: "Stage and commit your changes with a descriptive message.",
                          command: "git add .\ngit commit -m 'Add: descriptive commit message'",
                        },
                        {
                          step: 6,
                          title: "Push to GitHub",
                          description: "Upload your branch to your forked repository.",
                          command: "git push origin feature/your-feature-name",
                        },
                        {
                          step: 7,
                          title: "Open a Pull Request",
                          description:
                            "Go to the original repository on GitHub and click 'New Pull Request' to propose your changes.",
                          command: null,
                        },
                        {
                          step: 8,
                          title: "Collaborate & Iterate",
                          description:
                            "Respond to feedback, make requested changes, and work with maintainers to refine your contribution.",
                          command: null,
                        },
                      ].map((item) => (
                        <div key={item.step} className="flex gap-4">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                            {item.step}
                          </div>
                          <div className="flex-1 space-y-2">
                            <h4 className="font-semibold text-lg">{item.title}</h4>
                            <p className="text-muted-foreground text-sm">{item.description}</p>
                            {item.command && <CommandBlock command={item.command} />}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Best Practices */}
            {activeSection === "best-practices" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-3xl">Best Practices</CardTitle>
                    <CardDescription>Write better commits and collaborate effectively</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-lg mb-3">Commit Message Guidelines</h3>
                      <div className="space-y-3">
                        <div className="p-4 rounded-lg border border-border">
                          <div className="flex items-start gap-2 mb-2">
                            <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="font-medium text-primary">Good Commit</p>
                              <code className="text-sm text-muted-foreground">
                                Add user authentication with JWT tokens
                              </code>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 rounded-lg border border-destructive/50 bg-destructive/5">
                          <div className="flex items-start gap-2">
                            <span className="text-destructive flex-shrink-0 mt-0.5">✕</span>
                            <div>
                              <p className="font-medium text-destructive">Bad Commit</p>
                              <code className="text-sm text-muted-foreground">fixed stuff</code>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg mb-3">Key Principles</h3>
                      <div className="space-y-3">
                        {[
                          {
                            title: "Commit Often",
                            description: "Make small, focused commits that do one thing well",
                          },
                          {
                            title: "Write Clear Messages",
                            description: "Use descriptive commit messages that explain what and why",
                          },
                          {
                            title: "Pull Before Push",
                            description: "Always pull latest changes before pushing to avoid conflicts",
                          },
                          {
                            title: "Review Your Changes",
                            description: "Use git diff to review changes before committing",
                          },
                          {
                            title: "Keep Branches Focused",
                            description: "One feature or fix per branch for easier review",
                          },
                          {
                            title: "Test Before Committing",
                            description: "Ensure your code works before committing",
                          },
                        ].map((item, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted">
                            <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                            <div>
                              <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
                              <p className="text-sm text-muted-foreground">{item.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={() => {
                  const currentIndex = tutorialSections.findIndex((s) => s.id === activeSection)
                  if (currentIndex > 0) {
                    setActiveSection(tutorialSections[currentIndex - 1].id)
                  }
                }}
                disabled={activeSection === tutorialSections[0].id}
              >
                Previous
              </Button>

              {activeSection === tutorialSections[tutorialSections.length - 1].id ? (
                <Button className="neon-glow" asChild>
                  <Link href="/platforms">
                    Explore Platforms
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    const currentIndex = tutorialSections.findIndex((s) => s.id === activeSection)
                    if (currentIndex < tutorialSections.length - 1) {
                      setActiveSection(tutorialSections[currentIndex + 1].id)
                    }
                  }}
                >
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
