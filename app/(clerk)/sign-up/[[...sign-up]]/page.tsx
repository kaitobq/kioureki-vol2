import { SignUp } from "@clerk/nextjs";
import { Box } from "@yamada-ui/react";

export default function Page() {
  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <SignUp />
    </Box>
  );
}
