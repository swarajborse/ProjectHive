"use client";

import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Zap, Clock, Shield, Sparkles } from "lucide-react";

export default function ChatBotPage() {
  // Load ElevenLabs script once on page load
  useEffect(() => {
    const existingScript = document.querySelector(
      'script[src="https://unpkg.com/@elevenlabs/convai-widget-embed"]'
    );
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://unpkg.com/@elevenlabs/convai-widget-embed";
      script.async = true;
      script.type = "text/javascript";
      document.body.appendChild(script);
    }
  }, []);

  // Function to show chatbot widget
  const openChatBot = () => {
    if (!document.querySelector("elevenlabs-convai")) {
      const chatEl = document.createElement("elevenlabs-convai");
      chatEl.setAttribute("agent-id", "agent_3501k6sy8hkhetrbnk330ggs1xws");
      document.body.appendChild(chatEl);
    }
  };

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative gradient-bg grid-pattern py-20 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              <span>AI-Powered Assistance</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-balance">
              <span className="text-glow bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                ChatBot
              </span>{" "}
              Help
            </h1>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
              Get instant, AI-powered assistance with Git commands, GitHub workflows, pull requests, and open source
              contribution best practices. Available 24/7 from any page.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How the ChatBot Can Help</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: MessageCircle,
                title: "Real-Time Answers",
                description: "Get instant responses to your Git and GitHub questions without leaving your workflow",
              },
              {
                icon: Zap,
                title: "Quick Solutions",
                description: "Resolve common issues like merge conflicts, rebase problems, and PR errors quickly",
              },
              {
                icon: Clock,
                title: "24/7 Availability",
                description: "Access help anytime, anywhere. No waiting for office hours or forum responses",
              },
              {
                icon: Shield,
                title: "Best Practices",
                description: "Learn industry-standard practices for commits, branching, and collaboration",
              },
            ].map((feature, index) => (
              <Card key={index} className="hover:border-primary/50 transition-smooth">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How to Use */}
      <section className="py-20 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl font-bold">How to Use the ChatBot</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: 1,
                title: "Click the Icon",
                description: "Look for the floating chat icon in the bottom-right corner of any page",
              },
              {
                step: 2,
                title: "Ask Your Question",
                description: "Type your question or select from quick suggestions",
              },
              {
                step: 3,
                title: "Get Instant Help",
                description: "Receive detailed answers and follow-up with more questions",
              },
            ].map((item) => (
              <div key={item.step} className="space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto font-bold text-2xl text-primary">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="pt-8">
            <p className="text-muted-foreground mb-4">The ChatBot is available on every page. Try it now!</p>
            <button
              onClick={openChatBot}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm hover:bg-primary/20 transition"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Open ChatBot</span>
            </button>
          </div>
        </div>
      </section>

      {/* Floating Chat Icon */}
      <button
        onClick={openChatBot}
        className="fixed bottom-6 right-6 bg-primary text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    </div>
  );
}