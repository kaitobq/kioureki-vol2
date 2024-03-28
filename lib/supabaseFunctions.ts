import supabase from "./supabase";

export const fetchDatabase = async (
  tableName: string,
  organizationId: string
) => {
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

export const addDataToDatabase = async (
  tableName: string,
  organizationId: string,
  newData: object
) => {
  try {
    const dataWithOrganizationId = {
      ...newData,
      organizationId: organizationId,
    };

    await supabase.from(tableName).insert([dataWithOrganizationId]);
  } catch (error) {
    console.error("データ追加エラー:", error);
    return null;
  }
};

export const removeSupabaseData = async (tableName: string, dataId: string) => {
  try {
    await supabase.from(tableName).delete().eq("id", dataId); // 指定したIDの行を削除
  } catch (error) {
    console.error(error);
  }
};
