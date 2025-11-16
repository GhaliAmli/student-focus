'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, Github, Globe, Linkedin, Twitter, Mail, Code, Sparkles, Calendar } from 'lucide-react';
import { KonamiDemo } from '@/components/konami-demo';

export default function CreditsPage() {
  const appVersion = '1.0.0';
  const lastUpdate = 'November 15, 2025';

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/GhaliAmli',
      icon: Github,
      color: 'hover:text-gray-900 dark:hover:text-gray-100',
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/ghali-amli-315557398/',
      icon: Linkedin,
      color: 'hover:text-blue-600',
    },
    {
      name: 'Twitter',
      url: 'https://x.com/GhaliAmli',
      icon: Twitter,
      color: 'hover:text-sky-500',
    },
    {
      name: 'Email',
      url: 'mailto:g@obelus.cloud',
      icon: Mail,
      color: 'hover:text-red-500',
    },
  ];

  const technologies = [
    'Next.js 15',
    'TypeScript',
    'TailwindCSS',
    'Zustand',
    'shadcn/ui',
    'Recharts',
    'date-fns',
    '@dnd-kit',
    'canvas-confetti',
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          StudentFocus
        </h1>
        <p className="text-muted-foreground">Study Management Made Simple</p>
      </div>

      {/* Thank You Card */}
      <Card className="rounded-2xl shadow-sm border-2 border-primary/20 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Heart className="h-6 w-6 text-red-500 fill-red-500" />
            Special Thanks
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="text-lg font-semibold">Thank you to the Student HackPad organizers!</p>
            <p className="text-muted-foreground">
              This project was built with passion and dedication for the Student HackPad hackathon. 
              A huge thank you to the organizers for creating this amazing opportunity for students 
              to learn, build, and showcase their skills!
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4 text-yellow-500" />
            <span>Built with love during the 48-hour hackathon</span>
          </div>
        </CardContent>
      </Card>

      {/* Developer Info */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            Developer
          </CardTitle>
          <CardDescription>Connect with the creator</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Social Links */}
          <div className="space-y-3">
            <p className="text-sm font-medium">Find me online:</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <Button
                      variant="outline"
                      className={`w-full rounded-xl transition-colors ${link.color}`}
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {link.name}
                    </Button>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Bio */}
          <div className="p-4 rounded-xl bg-muted/50">
            <p className="text-sm text-muted-foreground">
              Passionate student developer focused on creating useful tools that help others 
              learn and grow. Always excited to connect with fellow developers and learners!
            </p>
          </div>
        </CardContent>
      </Card>

      {/* App Info */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>App Information</CardTitle>
          <CardDescription>Version and technical details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Version Info */}
          <div className="flex items-center justify-between p-4 rounded-xl border">
            <div className="space-y-1">
              <p className="font-medium">Version</p>
              <p className="text-sm text-muted-foreground">Current release</p>
            </div>
            <Badge variant="outline" className="text-lg px-4 py-1">
              v{appVersion}
            </Badge>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl border">
            <div className="space-y-1">
              <p className="font-medium">Last Updated</p>
              <p className="text-sm text-muted-foreground">Most recent changes</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              {lastUpdate}
            </div>
          </div>

          {/* Technologies */}
          <div className="space-y-3">
            <p className="font-medium">Built With</p>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <Badge key={tech} variant="secondary" className="rounded-lg">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Features Highlight */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>Key Features</CardTitle>
          <CardDescription>What makes StudentFocus special</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="p-3 rounded-xl bg-muted/50">
              <p className="font-medium text-sm mb-1">📚 Task Management</p>
              <p className="text-xs text-muted-foreground">Full CRUD with smart sorting</p>
            </div>
            <div className="p-3 rounded-xl bg-muted/50">
              <p className="font-medium text-sm mb-1">📊 Analytics</p>
              <p className="text-xs text-muted-foreground">Track progress with charts</p>
            </div>
            <div className="p-3 rounded-xl bg-muted/50">
              <p className="font-medium text-sm mb-1">🎮 Gamification</p>
              <p className="text-xs text-muted-foreground">Points, badges, and streaks</p>
            </div>
            <div className="p-3 rounded-xl bg-muted/50">
              <p className="font-medium text-sm mb-1">🤖 AI Assistant</p>
              <p className="text-xs text-muted-foreground">Smart study suggestions</p>
            </div>
            <div className="p-3 rounded-xl bg-muted/50">
              <p className="font-medium text-sm mb-1">🎨 Customization</p>
              <p className="text-xs text-muted-foreground">Themes and accent colors</p>
            </div>
            <div className="p-3 rounded-xl bg-muted/50">
              <p className="font-medium text-sm mb-1">💾 Offline-First</p>
              <p className="text-xs text-muted-foreground">Works without internet</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Konami Code Demo */}
      <KonamiDemo />

      {/* License */}
      <Card className="rounded-2xl shadow-sm">
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              © 2025 StudentFocus. Built for Student HackPad.
            </p>
            <p className="text-xs text-muted-foreground">
              Open source project. Feel free to learn from and build upon this code!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
