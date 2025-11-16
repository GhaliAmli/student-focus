'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { LayoutDashboard, CheckSquare, Calendar, BookOpen, Settings, BarChart3, Heart, Columns3 } from 'lucide-react';

const menuItems = [
  { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard, tutorialId: 'dashboard' },
  { title: 'Tasks', url: '/tasks', icon: CheckSquare, tutorialId: 'tasks' },
  { title: 'Kanban', url: '/kanban', icon: Columns3 },
  { title: 'Calendar', url: '/calendar', icon: Calendar, tutorialId: 'calendar' },
  { title: 'Study Plan', url: '/studyplan', icon: BookOpen },
  { title: 'Analytics', url: '/analytics', icon: BarChart3, tutorialId: 'analytics' },
  { title: 'Settings', url: '/settings', icon: Settings },
  { title: 'Credits', url: '/credits', icon: Heart },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg font-bold px-4 py-4">
            StudentFocus
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={pathname === item.url}
                    data-tutorial={item.tutorialId}
                  >
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
