"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";

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

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-muted-foreground">
        Platform
      </SidebarGroupLabel>

      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              {/* MAIN ITEM */}
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  tooltip={item.title}
                  className={`
                    flex items-center gap-2
                    ${
                      item.isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }
                  `}
                >
                  {item.icon && <item.icon className="h-4 w-4 shrink-0" />}

                  <span className="truncate">{item.title}</span>

                  {item.items && (
                    <ChevronRight
                      className="
                        ml-auto h-4 w-4
                        text-muted-foreground
                        transition-transform
                        group-data-[state=open]/collapsible:rotate-90
                      "
                    />
                  )}
                </SidebarMenuButton>
              </CollapsibleTrigger>

              {/* SUB ITEMS */}
              {item.items && (
                <CollapsibleContent>
                  <SidebarMenuSub className="ml-1 border-l border-border pl-3">
                    {item.items.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <a
                            href={subItem.url}
                            className="
                              text-muted-foreground
                              hover:text-foreground
                              transition
                            "
                          >
                            <span className="truncate">{subItem.title}</span>
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              )}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
