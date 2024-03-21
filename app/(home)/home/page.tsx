"use client";

import { fetchDatabase } from "@/lib/supabaseFunctions";
import { CreateOrganization, useOrganization } from "@clerk/nextjs";
import { Box, Container } from "@yamada-ui/react";
import { Column, Table } from "@yamada-ui/table";
import { useEffect, useMemo, useState } from "react";

const page = () => {
  const { organization } = useOrganization();
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    // 非同期関数を実行し、データを取得して状態にセット
    const loadData = async () => {
      const data = await fetchDatabase("Injuries");
      console.log(data);
      setData(data); // 取得したデータを状態にセット
    };
    loadData();
  }, []);

  // if (organization === undefined) {
  //   return (
  //     <Box>
  //       <Text>loading</Text>
  //     </Box>
  //   );
  // }

  console.log(organization);

  // const idata = fetchDatabase("Injuries");
  // console.log(idata);

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

  // const data = useMemo<any[]>(
  //   () => [
  //     {
  //       name: "player1",
  //       part: "test",
  //       diagnosis: "testtest",
  //       category: "test",
  //       memo: "test",
  //       date: "test",
  //     },
  //     {
  //       name: "player5",
  //       part: "test",
  //       diagnosis: "testtest",
  //       category: "test",
  //       memo: "test",
  //       date: "test",
  //     },
  //     {
  //       name: "player3",
  //       part: "test",
  //       diagnosis: "testtest",
  //       category: "test",
  //       memo: "test",
  //       date: "test",
  //     },
  //     {
  //       name: "player4",
  //       part: "test",
  //       diagnosis: "testtest",
  //       category: "test",
  //       memo: "test",
  //       date: "test",
  //     },
  //     {
  //       name: "player2",
  //       part: "test",
  //       diagnosis: "testtest",
  //       category: "test",
  //       memo: "test",
  //       date: "test",
  //     },
  //   ],
  //   []
  // );

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
