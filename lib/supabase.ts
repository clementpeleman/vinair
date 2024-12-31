import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const statusEnum = ["active", "inactive", "archived"] as const;

export const menus = {
  id: "id",
  imageUrl: "image_url",
  name: "name",
  status: "status",
  price: "price",
  stock: "stock",
  availableAt: "available_at",
};

export type SelectMenu = {
  id: number;
  imageUrl: string;
  name: string;
  status: (typeof statusEnum)[number];
  price: number;
  stock: number;
  availableAt: number;
};

export const deleteMenuById = async (id: number) => {
  const { error } = await supabase.from("menus").delete().eq("id", id);

  if (error) {
    throw new Error(`Error deleting menu item: ${error.message}`);
  }
};

export const getMenus = async (search: string, offset: number | null) => {
  const validOffset = offset ?? 0;

  const { data, error, count } = await supabase
    .from("menus")
    .select("*", { count: "exact" })
    .ilike("name", `%${search}%`)
    .range(validOffset, validOffset + 9);

  if (error) {
    throw new Error(`Error fetching menus: ${error.message}`);
  }

  return {
    menus: data,
    newOffset: validOffset + data.length,
    totalMenus: count,
  };
};
