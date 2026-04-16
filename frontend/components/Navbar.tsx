'use client';

import { ChevronDown, Search } from "lucide-react";
import { Input } from "./ui/input";
// Changed from "./ui/dialog" to "./ui/dropdown-menu"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "./ui/dropdown-menu"; 

export function Navbar() {
  return (
    <nav className="border-b border-border bg-background p-4 flex items-center justify-between">
      <div className="flex items-center gap-6">
        {/* User Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 text-foreground font-medium text-sm border border-border rounded-lg px-3 py-1.5 bg-input">
              <div className="h-6 w-6 rounded-full bg-accent-green/20 flex items-center justify-center text-xs text-accent-green">
                AK
              </div>
              Alicia Koch
              <ChevronDown size={16} className="text-text-muted" />
            </button>
          </DropdownMenuTrigger>
          {/* Now we can actually use the dropdown content! */}
          <DropdownMenuContent align="start" className="bg-card border-border text-foreground">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-border" />
            <DropdownMenuItem className="hover:bg-accent cursor-pointer">Profile</DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-accent cursor-pointer">Billing</DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-accent cursor-pointer">Settings</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Links */}
        <div className="flex items-center gap-4 text-sm font-medium  md:flex">
          <a href="#" className="text-foreground">Home</a>
          <a href="#" className="text-text-muted hover:text-foreground">Customers</a>
          <a href="#" className="text-text-muted hover:text-foreground">Settings</a>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative w-full max-w-sm hidden md:block">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
        <Input 
          type="search" 
          placeholder="Search..." 
          className="pl-10 bg-input border-border w-full text-foreground"
        />
      </div>
    </nav>
  );
}