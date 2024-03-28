import Header from "@/components/header";

const FirstViewLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default FirstViewLayout;
