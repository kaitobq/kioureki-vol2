"use client";

import { useEffect, useState } from "react";
import { fetchData, removeData } from "@/lib/supabaseFunctions";
import { CreateOrganization, useOrganization } from "@clerk/nextjs";
import {
  Box,
  Button,
  Text,
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
import UpdateDataDialog from "../_components/updateDataDialog";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

type injuryData = {
  id: string;
  name: string;
  part: string;
  diagnosis: string;
  category: string;
  memo: string;
  date: Date;
};

const HomePage = () => {
  const { organization } = useOrganization();
  const [data, setData] = useState<injuryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRow, setSelectedRow] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [editingData, setEditingData] = useState<injuryData | null>(null);

  const loadData = async () => {
    if (organization?.id) {
      const fetchedData = await fetchData("Injuries", organization.id);
      setData(fetchedData ?? []);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [organization]);

  const handleUpdate = (row: injuryData) => {
    setEditingData(row);
    setIsUpdateDialogOpen(true);
  };

  const handleRemove = async (id: string) => {
    try {
      await removeData("Injuries", id);
      loadData();
    } catch (error) {
      console.error("データ削除エラー:", error);
    }
  };

  const handleSelectRow = (id: any) => {
    setSelectedRow(id);
  };

  if (!organization) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center">
        <Text fontSize={20} textAlign="center">
          初めての方は団体に参加する必要があります。
          <br />
          既存ユーザからの招待を受けるか、新しい団体を作成してください。
        </Text>
        <CreateOrganization />
      </Box>
    );
  }

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

      <UpdateDataDialog
        isOpen={isUpdateDialogOpen}
        onClose={() => setIsUpdateDialogOpen(false)}
        prevData={editingData}
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
              <Th textAlign="center">修正</Th>
              <Th textAlign="center">削除</Th>
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
                      backgroundColor: "transparent",
                      padding: "5px 10px",
                    }}
                    onClick={() => {
                      handleUpdate(row);
                    }}
                  >
                    <FaEdit color="#6064df" size={20} />
                  </Button>
                </Td>
                <Td>
                  <Button
                    style={{
                      backgroundColor: "transparent",
                      padding: "5px 10px",
                    }}
                    onClick={() => {
                      handleRemove(row.id);
                    }}
                  >
                    <MdDeleteForever color="#6064df" size={25} />
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
              <Th textAlign="center">修正</Th>
              <Th textAlign="center">削除</Th>
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
