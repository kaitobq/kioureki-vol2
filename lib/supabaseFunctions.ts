import supabase from "./supabase";

export const fetchData = async (tableName: string, organizationId: string) => {
  try {
    const { data } = await supabase
      .from(tableName)
      .select("*")
      .eq("organizationId", organizationId);
    console.log(organizationId, "success");
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const addData = async (
  tableName: string,
  organizationId: string,
  newData: {
    name: string;
    part: string;
    diagnosis: string;
    category: string;
    memo: string;
    date: Date;
  }
) => {
  try {
    const dataWithOrganizationId = {
      ...newData,
      organizationId: organizationId,
    };
    console.log(newData.date);
    await supabase.from(tableName).insert([dataWithOrganizationId] as never);
  } catch (error) {
    console.error("データ追加エラー:", error);
    return null;
  }
};

export const updateData = async (
  tableName: string,
  dataId: string,
  newData: {
    name: string;
    part: string;
    diagnosis: string;
    category: string;
    memo: string;
    date: Date;
  }
) => {
  const { data, error } = await supabase
    .from(tableName)
    .update({
      name: newData.name,
      part: newData.part,
      diagnosis: newData.diagnosis,
      category: newData.category,
      memo: newData.memo,
      date: newData.date,
    } as never)
    .eq("id", dataId);

  if (error) {
    console.error("データ更新エラー:", error);
    return null;
  }

  console.log("更新成功:", data);
  return data;
};

export const removeData = async (tableName: string, dataId: string) => {
  try {
    await supabase.from(tableName).delete().eq("id", dataId); // 指定したIDの行を削除
  } catch (error) {
    console.error(error);
  }
};
