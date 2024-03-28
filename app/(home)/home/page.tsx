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
import { FaRegSquarePlus } from "react-icons/fa6";
import AddDataDialog from "../_components/addDataDialog";
import LoadingPage from "@/app/loading";
import { injuryData } from "@/types/injuryData";

const Page = () => {
  const { organization } = useOrganization();
  const [data, setData] = useState<injuryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRow, setSelectedRow] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // データを取得する関数
  const loadData = async () => {
    if (organization?.id) {
      const fetchedData = await fetchDatabase("Injuries", organization.id);
      setData(fetchedData ?? []);
      setLoading(false);
    }
  };

  // 初期ロード時にデータを取得
  useEffect(() => {
    loadData();
  }, [organization]);

  // データ削除関数
  const handleRemove = async (id: string) => {
    try {
      await removeSupabaseData("Injuries", id);
      loadData(); // データの削除後にデータを再取得
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
      <Button onClick={onOpen} p={0} bgColor="white">
        <FaRegSquarePlus color="#5b5b5b" size={20} />
      </Button>

      <AddDataDialog
        isOpen={isOpen}
        onClose={onClose}
        organizationId={organization?.id}
        reloadData={loadData} // データ追加後に再取得するための関数を渡す
      />

      <TableContainer px={10}>
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
                      ? "#A3A7EF" // 選択された行の色
                      : index % 2 === 0
                      ? "lightgray" // 未選択の偶数行の色
                      : "transparent",
                  cursor: "pointer",
                }}
              >
                <Td style={{ ...tdStyle }}>{row.name}</Td>
                <Td style={{ ...tdStyle }}>{row.part}</Td>
                <Td style={{ ...tdStyle }}>{row.diagnosis}</Td>
                <Td style={{ ...tdStyle }}>{row.category}</Td>
                <Td style={{ ...memoStyle }}>{row.memo}</Td>
                <Td style={{ ...tdStyle }}>{row.date}</Td>
                <Td>
                  <Button
                    style={{
                      backgroundColor: "#6064df", // ボタンの背景色
                      color: "white", // ボタンの文字色
                      padding: "5px 10px", // ボタン内のパディング
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

export default Page;

const tdStyle = {
  padding: "10px",
  border: "1px solid #ddd",
  fontSize: 15,
  verticalAlign: "middle",
};

const memoStyle = {
  ...tdStyle, // tdStyleのスタイルを継承
  maxWidth: 500, // 最大幅を設定
  whiteSpace: "normal", // テキストを折り返す
  wordWrap: "break-word", // 単語が長すぎる場合は単語内で折り返す
  overflow: "hidden", // コンテンツがオーバーフローした場合に非表示にする
  textOverflow: "ellipsis", // オーバーフローしたテキストを省略記号で表す
};
