"use client";

import { Box, Button, Text } from "@yamada-ui/react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Box
        height="90vh"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Text fontWeight="bold" fontSize={20}>
          既往歴を管理できるWebアプリです
        </Text>
        <>
          <Text>初めての方はこちら</Text>
          <Button
            variant="outline"
            bgColor="#6064df"
            color="white"
            sx={{ "&:hover": { color: "black" }, transition: "0.3s" }}
          >
            <Link href="/sign-up">Sign Up</Link>
          </Button>
        </>
        <>
          <Text>既に登録されている方はこちら</Text>
          <Button
            variant="outline"
            bgColor="#6064df"
            color="white"
            sx={{ "&:hover": { color: "black" }, transition: "0.3s" }}
          >
            <Link href="/sign-in">Sign In</Link>
          </Button>
        </>
      </Box>
    </>
  );
}
