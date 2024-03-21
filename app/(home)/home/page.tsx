"use client";

import { CreateOrganization, useOrganization } from "@clerk/nextjs";
import { Box, Container } from "@yamada-ui/react";
import { Column, Table } from "@yamada-ui/table";
import { useMemo } from "react";

const page = () => {
  const { organization } = useOrganization();

  // if (organization === undefined) {
  //   return (
  //     <Box>
  //       <Text>loading</Text>
  //     </Box>
  //   );
  // }

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

  const data = useMemo<any[]>(
    () => [
      {
        name: "player1",
        part: "test",
        diagnosis: "testtest",
        category: "test",
        memo: "test",
        date: "test",
      },
      {
        name: "player5",
        part: "test",
        diagnosis: "testtest",
        category: "test",
        memo: "test",
        date: "test",
      },
      {
        name: "player3",
        part: "test",
        diagnosis: "testtest",
        category: "test",
        memo: "test",
        date: "test",
      },
      {
        name: "player4",
        part: "test",
        diagnosis: "testtest",
        category: "test",
        memo: "test",
        date: "test",
      },
      {
        name: "player2",
        part: "test",
        diagnosis: "testtest",
        category: "test",
        memo: "test",
        date: "test",
      },
    ],
    []
  );

  if (organization === undefined || organization === null) {
    return <CreateOrganization />;
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
