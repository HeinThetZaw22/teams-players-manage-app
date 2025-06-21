"use client";

import { useAppDispatch } from "@/app/redux";
import { logout } from "@/state/authSlice";
import { clearAuthCookie } from "@/utils/auth";
import { useRouter } from "next/navigation";

interface LogoutButtonProps {
  children?: React.ReactNode;
}

export const LogoutButton = ({ children }: LogoutButtonProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onClick = () => {
    dispatch(logout());
    clearAuthCookie();
    router.push("/login");
  };

  return (
    <span onClick={onClick} className=" cursor-pointer">
      {children}
    </span>
  );
};
