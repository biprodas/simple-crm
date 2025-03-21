"use client";

import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";
import { ComponentProps } from "react";

import { NavMain } from "~/components/nav-main";
import { NavProjects } from "~/components/nav-projects";
import { NavUser } from "~/components/nav-user";
import { TeamSwitcher } from "~/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "~/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "Biprodas Roy",
    email: "biprodas.cse@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Dyno Crafts",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Maxmel Tech",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Start Integrate",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Leads",
      url: "/leads",
      icon: SquareTerminal,
    },
    {
      title: "Customers",
      url: "/customers",
      icon: SquareTerminal,
    },
    {
      title: "Contacts",
      url: "/contacts",
      icon: SquareTerminal,
    },
    {
      title: "Deals",
      url: "/deals",
      icon: SquareTerminal,
    },
    {
      title: "Credentials",
      url: "/credentials",
      icon: SquareTerminal,
    },
    {
      title: "Invoices",
      url: "/invoicse",
      icon: SquareTerminal,
    },
    // {
    //   title: "Payment",
    //   url: "#",
    //   icon: Settings2,
    //   items: [
    //     {
    //       title: "Payment Request",
    //       url: "#",
    //     },
    //     {
    //       title: "List Payments",
    //       url: "#",
    //     },
    //     {
    //       title: "Invoices",
    //       url: "#",
    //     },
    //   ],
    // },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "leads",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "/customers",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar side="left" variant="sidebar" collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
