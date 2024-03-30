"use client";

import {
  OrganizationSwitcher,
  UserButton,
  useClerk,
  useOrganization,
} from "@clerk/nextjs";
import { Box, Button, useBreakpoint } from "@yamada-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Header = () => {
  const { signOut } = useClerk();
  const { organization } = useOrganization();
  const router = useRouter();
  const breakpoint = useBreakpoint();
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    setIsSmallScreen(breakpoint === "sm");
  }, [breakpoint]);

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
        {organization && (
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
        )}
        {/* organizationがないときは非表示にしたい */}

        {!isSmallScreen && (
          <Button
            onClick={() => signOut(() => router.push("/"))}
            variant="outline"
            color="white"
            sx={{
              mx: 5,
              "&:hover": { color: "black" },
              transition: "0.3s",
            }}
          >
            sign out
          </Button>
        )}

        <UserButton afterSignOutUrl="/" />
      </Box>
    </Box>
  );
};

export default Header;
