"use client";

import * as React from "react";
import { NavUser } from "@/components/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Moon, Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import CreateNewChat from "@/components/chat/CreateNewChat";
import NewGroupChatModal from "@/components/chat/NewGroupChatModal";
import GroupChatList from "@/components/chat/GroupChatList";
import AddFriendModal from "@/components/chat/AddFriendModal";
import DirectMessageList from "@/components/chat/DirectMessageList";
import { useThemeStore } from "@/stores/useThemeStore";
import { useAuthStore } from "@/stores/useAuthStore";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { darkMode, toggleTheme } = useThemeStore();

  const { user } = useAuthStore();

  return (
    <>
      <Sidebar variant="inset" {...props}>
        {/* Header */}
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                size="lg"
                asChild
                className="bg-gradient-primary"
              >
                <a href="#">
                  <div className="flex w-full items-center px-2 justify-between">
                    <h1 className="text-xl font-bold text-white">ViteChat</h1>
                    <div className="flex items-center gap-2">
                      <Sun className="size-4 text-white/80" />
                      <Switch
                        checked={darkMode}
                        onCheckedChange={toggleTheme}
                        className="data-[state=checked]:bg-background/80"
                      />
                      <Moon className="size-4 text-white/80" />
                    </div>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        {/* Content */}
        <SidebarContent>
          {/* new chat */}
          <SidebarGroup>
            <SidebarGroupContent>
              <CreateNewChat />
            </SidebarGroupContent>
          </SidebarGroup>

          {/* group chat */}
          <SidebarGroup>
            <SidebarGroupLabel className="uppercase">
              Nhóm chat
            </SidebarGroupLabel>
            <SidebarGroupAction title="Tạo nhóm" className="cursor-pointer">
              <NewGroupChatModal />
            </SidebarGroupAction>

            <SidebarGroupContent>
              <GroupChatList />
            </SidebarGroupContent>
          </SidebarGroup>

          {/* direct message */}
          <SidebarGroup>
            <SidebarGroupLabel className="uppercase">Bạn bè</SidebarGroupLabel>
            <SidebarGroupAction title="Thêm bạn" className="cursor-pointer">
              <AddFriendModal />
            </SidebarGroupAction>

            <SidebarGroupContent>
              <DirectMessageList />
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        {/* Footer */}
        <SidebarFooter>{user && <NavUser user={user} />}</SidebarFooter>
      </Sidebar>
    </>
  );
}
