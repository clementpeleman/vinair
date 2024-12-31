"use server";

import { revalidatePath } from "next/cache";

import { deleteMenuById } from "@/lib/supabase";

export async function deleteProduct(formData: FormData) {
  const id = Number(formData.get("id"));

  if (isNaN(id)) {
    throw new Error("Invalid product ID");
  }

  await deleteMenuById(id);
  revalidatePath("/");
}
