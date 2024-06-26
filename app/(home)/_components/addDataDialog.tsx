"use client";

import { addData } from "@/lib/supabaseFunctions";
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
  const [date, setDate] = useState<Date | undefined>(new Date());

  const handleSubmit = async (e: any) => {
    if (!name || !part || !category || !date) {
      alert("全ての必須フィールドを入力してください。");
      return;
    }

    if (typeof props.organizationId === "undefined") {
      console.error("organizationId is undefined.");
      return;
    }

    // DatePickerで日付を選んだ時にのみ日付がずれるのを解消
    const currentDate = new Date();
    if (date?.getDate() !== currentDate.getDate()) {
      date?.setDate(date.getDate() + 1);
    }

    try {
      await addData("Injuries", props.organizationId, {
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
      props.onClose();
      props.reloadData();
    } catch (error) {
      console.error("データ追加エラー:", error);
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
        <FormControl label="名前" isRequired>
          <Input
            defaultValue={name}
            placeholder="名前"
            onBlur={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl label="部位" isRequired>
          <Input
            defaultValue={part}
            placeholder="部位"
            onBlur={(e) => setPart(e.target.value)}
          />
        </FormControl>
        <FormControl label="診断" isRequired>
          <Input
            defaultValue={diagnosis}
            placeholder="診断"
            onBlur={(e) => setDiagnosis(e.target.value)}
          />
        </FormControl>
        <FormControl label="カテゴリ" isRequired>
          <Input
            defaultValue={category}
            placeholder="カテゴリ"
            onBlur={(e) => setCategory(e.target.value)}
          />
        </FormControl>
        <FormControl label="備考">
          <Textarea
            defaultValue={memo}
            placeholder="備考"
            onBlur={(e) => setMemo(e.target.value)}
          />
        </FormControl>
        <FormControl label="日付" isRequired>
          <DatePicker value={date} onChange={setDate} placement="top" />
        </FormControl>
      </VStack>
    </Dialog>
  );
};

export default AddDataDialog;
