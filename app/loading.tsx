import { Box, Loading } from "@yamada-ui/react";

const LoadingPage = () => {
  return (
    <Box
      width="100%"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Loading variant="circles" size="8xl" color="blue.500" />
    </Box>
  );
};

export default LoadingPage;
