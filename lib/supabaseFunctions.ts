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
  newData: object
) => {
  try {
    const dataWithOrganizationId = {
      ...newData,
      organizationId: organizationId,
    };
    console.log(newData.date);
    await supabase.from(tableName).insert([dataWithOrganizationId]);
  } catch (error) {
    console.error("データ追加エラー:", error);
    return null;
  }
};

export const updateData = async (
  tableName: string,
  dataId: string,
  newData: object
) => {
  const { data, error } = await supabase
    .from("Injuries")
    .update({ other_column: "otherValue" })
    .eq("some_column", "someValue")
    .select();
};

export const removeData = async (tableName: string, dataId: string) => {
  try {
    await supabase.from(tableName).delete().eq("id", dataId); // 指定したIDの行を削除
  } catch (error) {
    console.error(error);
  }
};
