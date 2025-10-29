"use client"

import { cn } from "@/lib/utils"
import { CheckCircle2, Circle } from "lucide-react"

interface Section {
  id: string
  title: string
  completed?: boolean
}

interface TutorialSidebarProps {
  sections: Section[]
  activeSection: string
  onSectionClick?: (id: string) => void
}

export function TutorialSidebar({ sections, activeSection, onSectionClick }: TutorialSidebarProps) {
  return (
    <div className="sticky top-20 space-y-2">
      <h3 className="font-semibold text-sm text-muted-foreground mb-4 px-3">Tutorial Progress</h3>
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => onSectionClick?.(section.id)}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-smooth text-left",
            activeSection === section.id
              ? "bg-primary/10 text-primary font-medium"
              : "text-muted-foreground hover:bg-muted hover:text-foreground",
          )}
        >
          {section.completed ? (
            <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
          ) : (
            <Circle className="h-4 w-4 flex-shrink-0" />
          )}
          <span className="text-balance">{section.title}</span>
        </button>
      ))}
    </div>
  )
}
