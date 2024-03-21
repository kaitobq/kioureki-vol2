"use client";

import { OrganizationSwitcher, UserButton, useClerk } from "@clerk/nextjs";
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
        display="flex"
        flexDirection="row"
        alignItems="center"
        mx={5}
        justifyContent="space-between"
      >
        {/* organizationがないときは非表示にしたい */}
        <OrganizationSwitcher
          hidePersonal
          // afterCreateOrganizationUrl="/organization/:id"
          // afterLeaveOrganizationUrl="/select-org"
          // afterSelectOrganizationUrl="/organization/:id"
          appearance={{
            elements: {
              rootBox: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
            },
          }}
        />
        <Button
          onClick={() => signOut(() => router.push("/"))}
          variant="outline"
          color="white"
          sx={{ mx: 5, "&:hover": { color: "black" }, transition: "0.3s" }}
        >
          sign out
        </Button>
        <UserButton afterSignOutUrl="/" />
      </Box>
    </Box>
  );
};

export default Header;
