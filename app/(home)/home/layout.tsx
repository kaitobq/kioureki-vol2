import Header from "@/app/(home)/_components/header";
import { ClerkProvider } from "@clerk/nextjs";

const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <Header />
      {children}
    </ClerkProvider>
  );
};

export default PlatformLayout;
