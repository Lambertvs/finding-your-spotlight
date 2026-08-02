"use client";

import React, { useState, useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
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

function NavMainContent({
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
  const searchParams = useSearchParams();
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const fullPath =
    pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");

  // Auto-expand the parent collapsible section corresponding to the active route
  useEffect(() => {
    const newOpenState: Record<string, boolean> = {};

    items.forEach((item) => {
      const isSubActive = item.items?.some((sub) => {
        if (sub.url.includes("?")) {
          return fullPath === sub.url;
        }
        return pathname === sub.url;
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
  }, [pathname, fullPath, items]);

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
            if (sub.url.includes("?")) {
              return fullPath === sub.url;
            }
            return pathname === sub.url;
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
                        ? "text-amber-400 font-bold bg-zinc-800/40"
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
                      const isItemActive = subItem.url.includes("?")
                        ? fullPath === subItem.url
                        : pathname === subItem.url && (!searchParams?.toString() || !subItem.url.includes("?"));

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

export function NavMain(props: {
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
  return (
    <Suspense fallback={null}>
      <NavMainContent {...props} />
    </Suspense>
  );
}
