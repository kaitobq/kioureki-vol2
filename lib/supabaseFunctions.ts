import supabase from "./supabase";

export const fetchDatabase = async (tableName: string) => {
  try {
    const { data } = await supabase.from(tableName).select("*");
    console.log("success");
    return data;
  } catch (error) {
    console.log(error);
  }
};
