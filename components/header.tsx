"use client";

import { UserButton, useClerk } from "@clerk/nextjs";
import { Box, Button, Text } from "@yamada-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Header = () => {
  return (
    <Box
      height="10vh"
      bgColor="#6064df"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Link href="/" style={{ fontSize: 25, marginLeft: 15, color: "white" }}>
        既往歴
      </Link>
    </Box>
  );
};

export default Header;
