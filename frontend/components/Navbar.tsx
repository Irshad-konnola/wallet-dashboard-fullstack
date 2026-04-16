'use client';

import { useState } from "react";
import { ChevronDown, Search, Menu, X } from "lucide-react"; 
import { Input } from "./ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "./ui/dropdown-menu"; 

export function Navbar() {
  // Add state to track if the mobile menu is open or closed
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="border-b border-border bg-background relative">
      <div className="p-4 flex items-center justify-between">
        
        <div className="flex items-center gap-4 md:gap-6">
          
          {/* Mobile Hamburger Icon (Added p-2 for a larger touch target) */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-text-muted hover:text-foreground p-2 -ml-2 rounded-md active:bg-input transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* User Dropdown (Works the same) */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 text-foreground font-medium text-sm border border-border rounded-lg px-3 py-1.5 bg-input hover:bg-input/80 transition-colors">
                <div className="h-6 w-6 rounded-full bg-accent-green/20 flex items-center justify-center text-xs text-accent-green">
                  AK
                </div>
                <span className="hidden sm:inline-block">Alicia Koch</span>
                <span className="sm:hidden">AK</span> 
                <ChevronDown size={16} className="text-text-muted" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="bg-card border-border text-foreground">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-border" />
              <DropdownMenuItem className="hover:bg-accent cursor-pointer p-3">Profile</DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-accent cursor-pointer p-3">Billing</DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-accent cursor-pointer p-3">Settings</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Desktop Links (Hidden on mobile) */}
          <div className="hidden md:flex items-center gap-4 text-sm font-medium">
            <a href="#" className="text-foreground">Home</a>
            <a href="#" className="text-text-muted hover:text-foreground transition-colors">Customers</a>
            <a href="#" className="text-text-muted hover:text-foreground transition-colors">Settings</a>
          </div>
        </div>

        {/* Desktop Search Bar */}
        <div className="relative w-full max-w-sm hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
          <Input 
            type="search" 
            placeholder="Search..." 
            className="pl-10 bg-input border-border w-full text-foreground"
          />
        </div>
        
        {/* Mobile Search Icon (Added p-2 for a larger touch target) */}
        <button className="md:hidden text-text-muted hover:text-foreground p-2 -mr-2 rounded-md active:bg-input transition-colors">
          <Search size={22} />
        </button>
      </div>

      {/* MOBILE DROP-DOWN MENU (Opens when hamburger is clicked) */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-card px-4 py-4 space-y-4 absolute w-full z-50 shadow-lg">
          <a href="#" className="block text-foreground text-sm font-medium p-2 hover:bg-input rounded-md">Home</a>
          <a href="#" className="block text-text-muted text-sm font-medium p-2 hover:bg-input rounded-md">Customers</a>
          <a href="#" className="block text-text-muted text-sm font-medium p-2 hover:bg-input rounded-md">Settings</a>
          
          {/* Mobile Search Input directly in the menu */}
          <div className="relative w-full pt-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 mt-1 h-4 w-4 text-text-muted" />
            <Input 
              type="search" 
              placeholder="Search..." 
              className="pl-10 bg-input border-border w-full text-foreground"
            />
          </div>
        </div>
      )}
    </nav>
  );
}