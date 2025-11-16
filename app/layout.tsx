import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { StorageInitializer } from '@/components/storage-initializer';
import { FloatingActionButton } from '@/components/floating-action-button';
import { AIAssistant } from '@/components/ai-assistant';
import { FeedbackButton } from '@/components/feedback-button';
import { KonamiEasterEgg } from '@/components/konami-easter-egg';
import { TutorialOverlay } from '@/components/tutorial-overlay';
import { KeyboardShortcutsProvider } from '@/components/keyboard-shortcuts-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'StudentFocus - Study Management',
  description: 'Manage your studies effectively',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StorageInitializer>
          <KeyboardShortcutsProvider>
            <SidebarProvider>
              <AppSidebar />
              <main className="w-full">
                <div className="p-4 md:p-6 lg:p-8">
                  <SidebarTrigger className="mb-4" />
                  {children}
                </div>
              </main>
              <FloatingActionButton />
              <AIAssistant />
              <FeedbackButton />
              <KonamiEasterEgg />
              <TutorialOverlay />
            </SidebarProvider>
          </KeyboardShortcutsProvider>
        </StorageInitializer>
      </body>
    </html>
  );
}
