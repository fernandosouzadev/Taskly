'use client';

import * as React from 'react';
import {
  Search,
  Home,
  BarChart2,
  Users,
  Settings,
  ChevronDown,
  Menu,
  Briefcase,
  Calendar,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { useRouter } from 'next/navigation';

const IconWrapper = ({
  children,
  color,
}: {
  children: React.ReactNode;
  color: string;
}) => <div className={`rounded-full p-2 ${color}`}>{children}</div>;

export default function TasklySidebar() {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const router = useRouter();

  return (
    <SidebarProvider className="w-1/5">
      <Sidebar className="w-1/5 border-r bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <SidebarHeader className="h-20 flex items-center justify-between px-6">
          <div
            className={cn('flex items-center gap-3', isCollapsed && 'hidden')}
          >
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-2">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
              Taskly
            </span>
          </div>
        </SidebarHeader>
        <SidebarContent className="flex flex-col gap-6 py-6">
          <div className={cn('px-6', isCollapsed && 'hidden')}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search tasks..."
                className="w-full pl-10 bg-gray-100 dark:bg-gray-700 border-none rounded-full"
              />
            </div>
          </div>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                onClick={() => router.push('/dashboard')}
              >
                <a
                  href="#"
                  className="flex items-center gap-3 px-6 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <IconWrapper color="bg-blue-100 dark:bg-blue-900">
                    <Home className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </IconWrapper>
                  <span className="font-medium text-gray-700 dark:text-gray-200">
                    Dashboard
                  </span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                onClick={() => router.push('/task-management')}
              >
                <a
                  href="#"
                  className="flex items-center gap-3 px-6 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <IconWrapper color="bg-purple-100 dark:bg-purple-900">
                    <BarChart2 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </IconWrapper>
                  <span className="font-medium text-gray-700 dark:text-gray-200">
                    Task manage
                  </span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                onClick={() => router.push('/family-management')}
              >
                <a
                  href="#"
                  className="flex items-center gap-3 px-6 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <IconWrapper color="bg-green-100 dark:bg-green-900">
                    <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </IconWrapper>
                  <span className="font-medium text-gray-700 dark:text-gray-200">
                    Family
                  </span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a
                  href="#"
                  className="flex items-center gap-3 px-6 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <IconWrapper color="bg-red-100 dark:bg-red-900">
                    <Settings className="h-5 w-5 text-red-600 dark:text-red-400" />
                  </IconWrapper>
                  <span className="font-medium text-gray-700 dark:text-gray-200">
                    Settings
                  </span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="h-20 p-6">
          <Button
            variant="ghost"
            className={cn(
              'w-full justify-start gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors',
              isCollapsed && 'justify-center'
            )}
          >
            <Avatar className="h-10 w-10 border-2 border-purple-500">
              <AvatarImage src="https://github.com/shadcn.png" alt="User" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <>
                <div className="flex flex-col items-start text-left">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    Sarah Connor
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Premium Plan
                  </span>
                </div>
                <ChevronDown className="ml-auto h-4 w-4 text-gray-500" />
              </>
            )}
          </Button>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
}
