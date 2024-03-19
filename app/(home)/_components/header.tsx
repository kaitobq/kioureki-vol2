"use client";

import { UserButton, useClerk } from "@clerk/nextjs";
import { Box, Button } from "@yamada-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Header = () => {
  const { signOut } = useClerk();
  const router = useRouter();

  return (
    <Box
      height="10vh"
      bgColor="#6064df"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Link
        href="/home"
        style={{ fontSize: 25, marginLeft: 15, color: "white" }}
      >
        既往歴
      </Link>
      <Box
        width={140}
        display="flex"
        flexDirection="row"
        alignItems="center"
        mx={5}
        justifyContent="space-between"
      >
        <Button
          onClick={() => signOut(() => router.push("/"))}
          variant="outline"
          color="white"
          sx={{ "&:hover": { color: "black" }, transition: "0.3s" }}
        >
          sign out
        </Button>
        <UserButton afterSignOutUrl="/" />
      </Box>
    </Box>
  );
};

export default Header;
