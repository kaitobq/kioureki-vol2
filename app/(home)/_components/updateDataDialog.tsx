import { Dialog, FormControl, Input, Textarea, VStack } from "@yamada-ui/react";
import { DatePicker } from "@yamada-ui/calendar";
import { useEffect, useState } from "react";
import { updateData } from "@/lib/supabaseFunctions";
import { injuryData } from "@/types/injuryData";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  reloadData: any;
  prevData: injuryData | null;
};

const UpdateDataDialog = (props: Props) => {
  const [name, setName] = useState("");
  const [part, setPart] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [category, setCategory] = useState("");
  const [memo, setMemo] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());

  useEffect(() => {
    if (props.prevData) {
      setName(props.prevData.name);
      setPart(props.prevData.part);
      setDiagnosis(props.prevData.diagnosis);
      setCategory(props.prevData.category);
      setMemo(props.prevData.memo);
      setDate(new Date(props.prevData.date));
    }
  }, [props.prevData]);

  const handleSubmit = async () => {
    if (!props.prevData || !name || !part || !category || !date) {
      alert("全ての必須フィールドを入力してください。");
      return;
    }
    date?.setDate(date.getDate() + 1);
    try {
      await updateData("Injuries", props.prevData?.id, {
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
      console.error("データ更新エラー:", error);
    }
  };

  return (
    <Dialog
      isOpen={props.isOpen}
      onClose={props.onClose}
      header="データ修正"
      cancel="閉じる"
      onCancel={props.onClose}
      success="修正"
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

export default UpdateDataDialog;
