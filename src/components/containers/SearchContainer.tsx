"use client";

import React from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { useRouter } from "next/navigation";

import {
  Gauge,
  Clock,
  ChartNoAxesCombined,
  FileQuestion,
  TriangleAlert,
  OctagonAlert,
  CircleAlert,
  ShieldAlert,
  SquareLibrary,
  Settings,
  Folder
} from "lucide-react";

import { useGetProjectsQuery } from "@/store/api";
import { useSession } from "next-auth/react";

const SearchContainer = () => {

  const items = [
    { label: "Dashboard", path: "/", icon: Gauge },
    { label: "Timeline", path: "/timeline", icon: Clock },
    { label: "Status", path: "/status", icon: ChartNoAxesCombined },
    { label: "Settings", path: "/settings", icon: Settings },
    { label: "Help", path: "/help/introduction", icon: FileQuestion },
    { label: "Urgent", path: "/priority/urgent", icon: TriangleAlert },
    { label: "Low", path: "/priority/low", icon: OctagonAlert },
    { label: "Medium", path: "/priority/medium", icon: CircleAlert },
    { label: "High", path: "/priority/high", icon: ShieldAlert },
    { label: "Backlog", path: "/priority/backlog", icon: SquareLibrary },
  ];

  const router = useRouter();

  const [searchQuery, setSearchQuery] = React.useState("");

  const { data: session} = useSession()

  const { data: projects = []} = useGetProjectsQuery(session?.user?.id ?? '',{
    skip: !session?.user?.id
  });

  return (
    <Command className="rounded-lg shadow-none md:min-w-[450px] bg-myDark">
      <CommandInput placeholder="Search..." 
      value={searchQuery}
      onValueChange={(value) => setSearchQuery(value)}/>
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        {!searchQuery && (
          <CommandGroup heading="Suggestions">
          {items.slice(0, 3).map((item) => (
            <CommandItem key={item.label} onSelect={() => router.push(item.path)}>
              <item.icon className="mr-2 h-4 w-4" />
              <span>{item.label}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        )}

        {searchQuery && (
          <CommandGroup heading="All Commands">
          {items.map((item) => (
            <CommandItem key={item.label} onSelect={() => router.push(item.path)}>
              <item.icon className="mr-2 h-4 w-4" />
              <span>{item.label}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        )}
        {searchQuery && (
          <CommandGroup heading="Your Projects">
          {projects.map((item) => (
            <CommandItem key={item.id} onSelect={() => router.push(`/project/${item.id}`)}>
              <Folder className="mr-2 h-4 w-4" />
              <span>{item.name}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        )}
      </CommandList>
    </Command>
  );
};

export default SearchContainer;
