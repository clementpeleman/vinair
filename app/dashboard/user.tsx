import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { auth, logout } from "@/lib/authService";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export async function User() {
  const {
    data: { session },
    error,
  } = await auth.getSession(); // Use getSession method

  if (error) {
    console.error("Error fetching session:", error.message);

    return null; // Handle error appropriately
  }

  let user = session?.user;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="overflow-hidden rounded-full"
          size="icon"
          variant="outline"
        >
          {/* <Image
            alt="Avatar"
            className="overflow-hidden rounded-full"
            height={36}
            src={user?.image ?? "/placeholder-user.jpg"}
            width={36}
          /> */}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuSeparator />
        {user ? (
          <DropdownMenuItem>
            <form
              action={async () => {
                "use server";
                await logout();
              }}
            >
              <button type="submit">Sign Out</button>
            </form>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem>
            <Link href="/login">Sign In</Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
