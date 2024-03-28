"use client";

import { addDataToDatabase, fetchDatabase } from "@/lib/supabaseFunctions";
import { DatePicker } from "@yamada-ui/calendar";
import { Dialog, FormControl, Input, Textarea, VStack } from "@yamada-ui/react";
import { useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  organizationId: string | undefined;
  reloadData: any;
};

const AddDataDialog = (props: Props) => {
  const [name, setName] = useState("");
  const [part, setPart] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [category, setCategory] = useState("");
  const [memo, setMemo] = useState("");
  const [date, setDate] = useState<Date>(new Date());

  const handleSubmit = async (e: any) => {
    // e.preventDefault(); // フォームのデフォルト送信を防ぐ
    // addToDatabase 関数を呼び出してデータを追加
    if (name === "" || part === "" || diagnosis === "" || category === "") {
      alert("全ての必須フィールドを入力してください。");
      return;
    }
    try {
      await addDataToDatabase("Injuries", props.organizationId, {
        name,
        part,
        diagnosis,
        category,
        memo,
        date,
      });
      setName("");
      setPart("");
      setDiagnosis("");
      setCategory("");
      setMemo("");
      setDate(new Date());
      props.onClose(); // データ追加に成功したらダイアログを閉じる
      props.reloadData();
    } catch (error) {
      console.error("データ追加エラー:", error);
      // エラーハンドリング（ユーザーに通知するなど）
    }
  };

  return (
    <Dialog
      isOpen={props.isOpen}
      onClose={props.onClose}
      header="データ追加"
      cancel="閉じる"
      onCancel={props.onClose}
      success="追加"
      onSuccess={handleSubmit}
    >
      <VStack as="form">
        <FormControl label="Name" isRequired>
          <Input
            defaultValue={name}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl label="Part" isRequired>
          <Input
            defaultValue={part}
            placeholder="Part"
            onChange={(e) => setPart(e.target.value)}
          />
        </FormControl>
        <FormControl label="Diagnosis" isRequired>
          <Input
            defaultValue={diagnosis}
            placeholder="Diagnosis"
            onChange={(e) => setDiagnosis(e.target.value)}
          />
        </FormControl>
        <FormControl label="Category" isRequired>
          <Input
            defaultValue={category}
            placeholder="Category"
            onChange={(e) => setCategory(e.target.value)}
          />
        </FormControl>
        <FormControl label="Memo">
          <Textarea
            defaultValue={memo}
            placeholder="Memo"
            onChange={(e) => setMemo(e.target.value)}
          />
        </FormControl>
        <FormControl label="Date" isRequired>
          <DatePicker
            defaultValue={date}
            parseDate={(value) => {
              setDate(new Date(value));
            }}
          />
        </FormControl>
      </VStack>
    </Dialog>
  );
};

export default AddDataDialog;
