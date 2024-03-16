"use client";

import { UserButton, useClerk } from "@clerk/nextjs";
import { Box, Button, Text } from "@yamada-ui/react";
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
      <Text color="white" fontSize={30} mx={20}>
        既往歴
      </Text>
      <Box
        width={110}
        display="flex"
        flexDirection="row"
        alignItems="center"
        mx={20}
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
