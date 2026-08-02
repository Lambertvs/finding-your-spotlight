"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { ChevronRightIcon } from "lucide-react";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: React.ReactNode;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const pathname = usePathname();
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  // Auto-expand the parent collapsible section corresponding to the active route
  useEffect(() => {
    const newOpenState: Record<string, boolean> = {};

    items.forEach((item) => {
      const isSubActive = item.items?.some((sub) => {
        const subPath = sub.url.split("?")[0];
        return pathname === subPath;
      });

      const isParentActive =
        item.url === "/admin"
          ? pathname === "/admin"
          : pathname.startsWith(item.url) || Boolean(isSubActive);

      if (isParentActive) {
        newOpenState[item.title] = true;
      }
    });

    setOpenItems((prev) => ({ ...prev, ...newOpenState }));
  }, [pathname, items]);

  const toggleItem = (title: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-zinc-400 font-sans text-[11px] uppercase tracking-wider font-semibold">
        Management
      </SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const isSubActive = item.items?.some((sub) => {
            const subPath = sub.url.split("?")[0];
            return pathname === subPath;
          });

          const isParentActive =
            item.url === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.url) || Boolean(isSubActive);

          const isOpen = openItems[item.title] ?? isParentActive ?? item.isActive;

          return (
            <Collapsible
              key={item.title}
              asChild
              open={isOpen}
              onOpenChange={() => toggleItem(item.title)}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={item.title}
                    className={
                      isParentActive
                        ? "text-amber-400 font-bold bg-zinc-800/50"
                        : "text-zinc-300 hover:text-white"
                    }
                  >
                    {item.icon}
                    <span className="font-sans">{item.title}</span>
                    <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => {
                      const subPath = subItem.url.split("?")[0];
                      const isItemActive = pathname === subPath;

                      return (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild isActive={isItemActive}>
                            <a
                              href={subItem.url}
                              className={
                                isItemActive
                                  ? "text-amber-400 font-semibold bg-amber-500/10 rounded-md"
                                  : "text-zinc-400 hover:text-white transition-colors"
                              }
                            >
                              <span className="font-sans">{subItem.title}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      );
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
