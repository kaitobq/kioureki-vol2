import { Box, Loading } from "@yamada-ui/react";

const LoadingPage = () => {
  return (
    <Box
      width="100%"
      height="90vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Loading variant="rings" size="8xl" color="blue.400" />
    </Box>
  );
};

export default LoadingPage;
