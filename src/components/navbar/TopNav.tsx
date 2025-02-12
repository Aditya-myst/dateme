import {
    Button,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
  } from "@nextui-org/react";
  import Link from "next/link";
  import React from "react";
  import { GiSelfLove } from "react-icons/gi";
  import NavLink from "./NavLink"; // Ensure this component exists
  
  export default function TopNav() {
    return (
      <Navbar
        maxWidth="full"
        className="bg-gradient-to-r from-pink-400 via-red-400 to-pink-600"
      >
        {/* Left: Logo & Branding */}
        <NavbarContent justify="start">
          <NavbarBrand as={Link} href="/" className="flex items-center gap-2">
            <GiSelfLove size={40} className="text-gray-200" />
            <span className="font-bold text-3xl text-gray-200">MatchMe</span>
          </NavbarBrand>
        </NavbarContent>
  
        {/* Center: Navigation Links */}
        <NavbarContent justify="center" className="hidden md:flex gap-4">
          <NavLink href="/members" label="Matches" />
          <NavLink href="/messages" label="Messages" />
          <NavLink href="/lists" label="Lists" />
        </NavbarContent>
  
        {/* Right: Login/Register Buttons */}
        <NavbarContent justify="end">
          <NavbarItem>
            <Button as={Link} href="/auth/login" variant="bordered" className="text-white border-white">
              Login
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} href="/auth/register" variant="bordered" className="text-white border-white">
              Register
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    );
  }
  