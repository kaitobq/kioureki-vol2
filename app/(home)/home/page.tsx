"use client";

import { fetchDatabase } from "@/lib/supabaseFunctions";
import { CreateOrganization, useOrganization } from "@clerk/nextjs";
import { Box, Button, Container } from "@yamada-ui/react";
import { Column, Table } from "@yamada-ui/table";
import { useEffect, useMemo, useState } from "react";
import { FaRegSquarePlus } from "react-icons/fa6";

const page = () => {
  const { organization } = useOrganization();
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchDatabase("Injuries");
      console.log(data);
      setData(data ?? []);
    };
    loadData();
  }, []);

  console.log(organization?.id);

  const columns = useMemo<Column<any>[]>(
    () => [
      {
        header: "名前",
        accessorKey: "name",
      },
      {
        header: "受傷部位",
        accessorKey: "part",
      },
      {
        header: "診断",
        accessorKey: "diagnosis",
      },
      {
        header: "カテゴリ",
        accessorKey: "category",
      },
      {
        header: "備考",
        accessorKey: "memo",
      },
      {
        header: "日付",
        accessorKey: "date",
      },
    ],
    []
  );

  if (organization === undefined || organization === null) {
    // return <CreateOrganization afterCreateOrganizationUrl="/loading" />;
    return (
      <Box
        height="90vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {/* <CreateOrganizationDialog /> */}
        <CreateOrganization />
      </Box>
    );
  }

  return (
    <Box
      height="90vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Container pb={0}>
        <Button p={0} width={10} height={10} bgColor="white">
          <FaRegSquarePlus color="#5b5b5b" size={20} />
        </Button>
      </Container>
      <Container pt={0}>
        <Table columns={columns} data={data} />
      </Container>
    </Box>
  );
};

export default page;
