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

type organizationData = {
  name: string;
  members: JSON;
};

export const addOrganizationData = async ({
  name,
  members,
}: organizationData) => {
  try {
    await supabase.from("Organizations").insert({ name, members });
  } catch (error) {
    console.log(error);
  }
};
