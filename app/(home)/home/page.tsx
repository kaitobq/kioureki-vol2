"use client";

import { useEffect, useState } from "react";
import { fetchDatabase, removeSupabaseData } from "@/lib/supabaseFunctions";
import { useOrganization } from "@clerk/nextjs";
import {
  Box,
  Button,
  TableContainer,
  NativeTable,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  useDisclosure,
} from "@yamada-ui/react";
import { FaPlusCircle } from "react-icons/fa";
import AddDataDialog from "../_components/addDataDialog";
import LoadingPage from "@/app/loading";
import { injuryData } from "@/types/injuryData";

const HomePage = () => {
  const { organization } = useOrganization();
  const [data, setData] = useState<injuryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRow, setSelectedRow] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const loadData = async () => {
    if (organization?.id) {
      const fetchedData = await fetchDatabase("Injuries", organization.id);
      setData(fetchedData ?? []);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [organization]);

  const handleRemove = async (id: string) => {
    try {
      await removeSupabaseData("Injuries", id);
      loadData();
    } catch (error) {
      console.error("データ削除エラー:", error);
    }
  };

  const handleSelectRow = (id: any) => {
    setSelectedRow(id);
  };

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Box width="100%" px={10} display="flex" justifyContent="flex-end">
        <Button
          onClick={onOpen}
          mt={5}
          p={3}
          variant="outline"
          bgColor="#6064df"
          color="white"
          borderRadius="8px"
          _hover={{ bgColor: "white", textColor: "black" }}
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap={2}
        >
          <FaPlusCircle size="20px" />
          新しいデータを追加
        </Button>
      </Box>

      <AddDataDialog
        isOpen={isOpen}
        onClose={onClose}
        organizationId={organization?.id}
        reloadData={loadData}
      />

      <TableContainer mb={20} px={10}>
        <NativeTable>
          <Thead>
            <Tr>
              <Th textAlign="center">名前</Th>
              <Th textAlign="center">受傷部位</Th>
              <Th textAlign="center">診断</Th>
              <Th textAlign="center">カテゴリ</Th>
              <Th textAlign="center">備考</Th>
              <Th textAlign="center">日付</Th>
              <Th textAlign="center">操作</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((row: injuryData, index: number) => (
              <Tr
                key={row.id}
                onClick={() => handleSelectRow(row.id)}
                style={{
                  background:
                    selectedRow === row.id
                      ? "#A3A7EF"
                      : index % 2 === 0
                      ? "lightgray"
                      : "transparent",
                  cursor: "pointer",
                }}
              >
                <Td style={{ ...tdStyle }}>{row.name}</Td>
                <Td style={{ ...tdStyle }}>{row.part}</Td>
                <Td style={{ ...tdStyle }}>{row.diagnosis}</Td>
                <Td style={{ ...tdStyle }}>{row.category}</Td>
                <Td style={{ ...memoStyle }}>{row.memo}</Td>
                <Td style={{ ...tdStyle }}>
                  {new Date(row.date).toLocaleDateString()}
                </Td>
                <Td>
                  <Button
                    style={{
                      backgroundColor: "#6064df",
                      color: "white",
                      padding: "5px 10px",
                    }}
                    onClick={() => {
                      handleRemove(row.id);
                    }}
                  >
                    削除
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th textAlign="center">名前</Th>
              <Th textAlign="center">受傷部位</Th>
              <Th textAlign="center">診断</Th>
              <Th textAlign="center">カテゴリ</Th>
              <Th textAlign="center">備考</Th>
              <Th textAlign="center">日付</Th>
              <Th textAlign="center">操作</Th>
            </Tr>
          </Tfoot>
        </NativeTable>
      </TableContainer>
    </Box>
  );
};

export default HomePage;

const tdStyle: React.CSSProperties = {
  padding: "10px",
  border: "1px solid #ddd",
  fontSize: 15,
  verticalAlign: "middle",
};

const memoStyle: React.CSSProperties = {
  ...tdStyle,
  maxWidth: 500,
  whiteSpace: "normal",
  wordWrap: "break-word",
  overflow: "hidden",
  textOverflow: "ellipsis",
};
