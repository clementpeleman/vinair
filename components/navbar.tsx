/* eslint-disable no-console */
"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import * as React from "react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { Logo } from "./Icons";

import useSessionTimeout from "@/hooks/useSessionTimeout";
import { supabase } from "@/lib/supabase";
import { siteConfig } from "@/config/site";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null); // Voor de avatar-URL

  useEffect(() => {
    const fetchSession = async () => {
      const { data: session, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Error fetching session:", error.message);

        return;
      }

      const isUserLoggedIn = !!session?.session?.user;

      setIsLoggedIn(isUserLoggedIn);
      setUserEmail(session?.session?.user?.email || null);

      if (isUserLoggedIn && session?.session?.user?.id) {
        fetchAvatar(session.session.user.id);
      }
    };

    const fetchAvatar = async (userId: string) => {
      try {
        // Verkrijg de publieke URL van de avatar uit de bucket
        const { data } = supabase.storage
          .from("avatar") // Vervang "avatar" door de naam van je bucket
          .getPublicUrl(`public/${userId}.svg`);

        if (data?.publicUrl) {
          setAvatarUrl(data.publicUrl); // Stel de avatar-URL in
        } else {
          console.warn("Avatar not found in storage bucket");
          setAvatarUrl("/default-avatar.png"); // Fallback naar een standaard avatar
        }
      } catch (error) {
        console.error("Error fetching avatar from storage bucket:", error);
        setAvatarUrl("/default-avatar.png"); // Fallback naar een standaard avatar
      }
    };

    fetchSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      const isUserLoggedIn = !!session?.user;

      setIsLoggedIn(isUserLoggedIn);
      setUserEmail(session?.user?.email || null);

      if (isUserLoggedIn && session?.user?.id) {
        fetchAvatar(session.user.id);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        alert("An error occurred while logging out. Please try again.");
      } else {
        setIsLoggedIn(false);
        setUserEmail(null);
        setAvatarUrl(null);
      }
    } catch (err) {
      console.error("Unexpected error during logout:", err);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  useSessionTimeout();

  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar
      className="py-2"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={(open) => setIsMenuOpen(open)}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link className="" href="/">
            <Logo height={undefined} width={undefined} />
            <p className="font-mundo text-black text-3xl">
              <span className="text-black">Vi</span>nair
            </p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {siteConfig.navItems.map((item, index) => (
          <NavbarItem key={index}>
            <Link
              color={pathname === item.href ? "primary" : "foreground"}
              href={item.href}
            >
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        {isLoggedIn ? (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="default"
                name="User Avatar"
                size="md"
                src={avatarUrl || ""} // Gebruik avatar uit de database of fallback-URL
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile-lin">
                <Link className="w-full" color="foreground" href="/profile">
                  Profile
                </Link>
              </DropdownItem>
              <DropdownItem key="logout" color="danger">
                <Link className="w-full" color="danger" onClick={handleLogout}>
                  Log Out
                </Link>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <>
            <Button
              as={Link}
              className=""
              href="/login"
              radius="sm"
              variant="light"
            >
              Login
            </Button>
            <Button
              as={Link}
              className="text-white"
              color="primary"
              href="/register"
              radius="sm"
            >
              Register
            </Button>
          </>
        )}
      </NavbarContent>

      <NavbarMenu>
        {siteConfig.navItems.map((item, index) => (
          <NavbarMenuItem key={index}>
            <Link
              className="w-full"
              color={pathname === item.href ? "primary" : "foreground"}
              href={item.href}
              onClick={() => {
                setIsMenuOpen(false); // Sluit het menu
              }}
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
