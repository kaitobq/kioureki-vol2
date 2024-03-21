"use client";

import { fetchDatabase } from "@/lib/supabaseFunctions";
import { useOrganization } from "@clerk/nextjs";
import { Box, Container } from "@yamada-ui/react";
import { Column, Table } from "@yamada-ui/table";
import { useEffect, useMemo, useState } from "react";
import CreateOrganizationDialog from "../_components/createOrganizationDialog";

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

  console.log(organization);

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
        <CreateOrganizationDialog />
      </Box>
    );
  }

  return (
    <Box
      height="90vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Container>
        <Table columns={columns} data={data} />
      </Container>
    </Box>
  );
};

export default page;
