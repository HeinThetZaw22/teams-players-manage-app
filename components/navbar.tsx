"use client";
import React from "react";
import { UserButton } from "./user-button";
import Container from "./container";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Navbar = () => {
  const router = useRouter();
  return (
    <Container>
      <div className=" flex py-5 justify-between">
        <h1 className=" text-3xl font-bold">Soccer</h1>
        <div className=" flex items-center gap-3">
          <Link href={"/teams"}>
            <Button variant={"outline"}>Teams</Button>
          </Link>
          <UserButton />
        </div>
      </div>
    </Container>
  );
};

export default Navbar;
