"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, X, Send, Mic, Sparkles, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

const quickSuggestions = [
  "How do I fix a merge conflict?",
  "What's a pull request?",
  "Git config help",
  "How to fork a repo?",
  "Explain git rebase",
  "Best commit practices",
]

export function ChatBotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi! I'm your Open Source Assistant. I can help you with Git commands, GitHub workflows, contribution guidelines, and more. How can I help you today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: content.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const responses: Record<string, string> = {
        "merge conflict":
          "To fix a merge conflict:\n1. Run `git status` to see conflicted files\n2. Open the files and look for conflict markers (<<<<<<, ======, >>>>>>)\n3. Edit the file to resolve conflicts\n4. Run `git add <file>` to mark as resolved\n5. Complete with `git commit`",
        "pull request":
          "A Pull Request (PR) is a way to propose changes to a repository. It allows maintainers to review your code before merging. To create one:\n1. Push your branch to GitHub\n2. Click 'New Pull Request'\n3. Add a description\n4. Submit for review",
        "git config":
          "Common git config commands:\n• `git config --global user.name 'Your Name'`\n• `git config --global user.email 'your@email.com'`\n• `git config --list` to view all settings\n• `git config --global core.editor 'code'` to set VS Code as editor",
        fork: "Forking creates your own copy of a repository:\n1. Click 'Fork' button on GitHub\n2. Clone your fork: `git clone <your-fork-url>`\n3. Add upstream: `git remote add upstream <original-repo-url>`\n4. Keep updated: `git fetch upstream`",
        rebase:
          "Git rebase rewrites commit history by moving commits to a new base:\n• `git rebase main` - rebase current branch onto main\n• Use for clean, linear history\n• Never rebase public branches\n• If conflicts occur, resolve and run `git rebase --continue`",
        commit:
          "Best commit practices:\n• Write clear, descriptive messages\n• Use present tense ('Add feature' not 'Added feature')\n• Keep commits focused and atomic\n• Start with a verb (Add, Fix, Update, Remove)\n• Reference issues when relevant (#123)",
      }

      const lowerContent = content.toLowerCase()
      let responseContent =
        "I can help you with Git, GitHub, and open source contributions. Try asking about specific commands, workflows, or best practices!"

      for (const [key, value] of Object.entries(responses)) {
        if (lowerContent.includes(key)) {
          responseContent = value
          break
        }
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responseContent,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion)
  }

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="fixed bottom-6 right-6 z-50 rounded-full w-14 h-14 shadow-lg neon-glow hover:scale-110 transition-smooth"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Chat Widget */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 z-50 w-[400px] h-[600px] shadow-2xl border-primary/20 neon-glow flex flex-col">
          {/* Header */}
          <CardHeader className="border-b border-border flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">AI Assistant</CardTitle>
                  <CardDescription className="text-xs">Always here to help</CardDescription>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          {/* Messages */}
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}>
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg p-3 text-sm",
                    message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                  )}
                >
                  <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg p-3 flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  <span className="text-sm text-muted-foreground">Thinking...</span>
                </div>
              </div>
            )}

            {/* Quick Suggestions */}
            {messages.length === 1 && (
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground text-center">Quick suggestions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickSuggestions.map((suggestion, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="cursor-pointer hover:bg-primary/10 hover:border-primary transition-smooth text-xs"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </CardContent>

          {/* Input */}
          <div className="border-t border-border p-4 flex-shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                sendMessage(input)
              }}
              className="flex gap-2"
            >
              <Input
                type="text"
                placeholder="Ask me anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1"
                disabled={isTyping}
              />
              <Button type="button" variant="outline" size="icon" disabled={isTyping}>
                <Mic className="h-4 w-4" />
              </Button>
              <Button type="submit" size="icon" disabled={isTyping || !input.trim()} className="neon-glow">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </Card>
      )}
    </>
  )
}
