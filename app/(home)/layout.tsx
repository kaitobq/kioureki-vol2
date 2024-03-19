import Header from "@/app/(home)/_components/header";

const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default PlatformLayout;
