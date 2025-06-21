"use client";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa";
import { LogoutButton } from "@/components/auth/logout-button";
import { LogOutIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { getAuthUsername } from "@/utils/auth";

export const UserButton = () => {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const name = getAuthUsername();
    setUsername(name);
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex border rounded-full sm:pr-3 focus:outline-none">
        <Avatar>
          <AvatarImage src={""} />
          <AvatarFallback className=" bg-gray-200">
            {username?.[0]?.toUpperCase() || <FaUser />}
          </AvatarFallback>
        </Avatar>
        <div className="px-3 py-2 max-sm:hidden text-sm text-gray-700">
          {username}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" w-40" align="end">
        <LogoutButton>
          <DropdownMenuItem>
            <LogOutIcon className=" h-4 w-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
