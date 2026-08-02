"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  LayoutDashboardIcon,
  CalendarCheckIcon,
  BookOpenIcon,
  Settings2Icon,
} from "lucide-react";

const navMainItems = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: <LayoutDashboardIcon />,
    items: [
      {
        title: "Overview & Stats",
        url: "/admin",
      },
    ],
  },
  {
    title: "Session Bookings",
    url: "/admin/bookings",
    icon: <CalendarCheckIcon />,
    items: [
      {
        title: "All Booking Enquiries",
        url: "/admin/bookings",
      },
      {
        title: "Pending Requests",
        url: "/admin/bookings?status=pending",
      },
      {
        title: "Confirmed Sessions",
        url: "/admin/bookings?status=confirmed",
      },
    ],
  },
  {
    title: "Digital Products",
    url: "/admin/ebooks",
    icon: <BookOpenIcon />,
    items: [
      {
        title: "eBook Catalog",
        url: "/admin/ebooks",
      },
      {
        title: "Sales & Receipts",
        url: "/admin/orders",
      },
      {
        title: "Download Activity",
        url: "/admin/downloads",
      },
    ],
  },
  {
    title: "Settings",
    url: "/admin/settings",
    icon: <Settings2Icon />,
    items: [
      {
        title: "Admin Profiles",
        url: "/admin/settings",
      },
      {
        title: "Integrations & Status",
        url: "/admin/settings/integrations",
      },
    ],
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [currentUser, setCurrentUser] = useState<{
    name: string;
    email: string;
    avatar: string;
  }>({
    name: "Jennis Williamson",
    email: "info@findingyourspotlight.com", // Updated to official info@ email
    avatar: "/images/site_icon.png",
  });

  useEffect(() => {
    const supabase = createClient();

    async function loadUserSession() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const isSuperAdmin = user.email === "developer@findingyourspotlight.com";
        const name =
          user.user_metadata?.full_name ||
          (isSuperAdmin ? "Super Admin" : "Jennis Williamson");
        const email = user.email || "info@findingyourspotlight.com";
        const avatar = user.user_metadata?.avatar_url || "/images/site_icon.png";

        setCurrentUser({ name, email, avatar });
      }
    }

    loadUserSession();
  }, []);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="py-4 px-3 border-b border-sidebar-border flex items-center justify-center">
        <a href="/admin" className="flex items-center justify-center w-full">
          <img
            src="/images/Finding Your Spotlight New Logo - wht@4x.png"
            alt="Finding Your Spotlight"
            className="h-10 w-auto object-contain mx-auto"
          />
        </a>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMainItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={currentUser} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
