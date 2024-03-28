"use client";

import { Box } from "@yamada-ui/react";
import Link from "next/link";

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
