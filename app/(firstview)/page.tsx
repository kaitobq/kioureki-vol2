"use client";

import { Box, Button, Text } from "@yamada-ui/react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Box
        height="90vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text>Hello</Text>
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
      </Box>
    </>
  );
}
