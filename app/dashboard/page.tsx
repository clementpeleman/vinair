import { File, PlusCircle } from "lucide-react";

import { ProductsTable } from "./products-table";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { getMenus } from "@/lib/supabase";

export default async function ProductsPage(props: {
  searchParams: Promise<{ q: string; offset: string }>;
}) {
  const searchParams = await props.searchParams;
  const search = searchParams.q ?? "";
  const offset = searchParams.offset ?? 0;
  const { menus, newOffset, totalMenus } = await getMenus(
    search,
    Number(offset),
  );

  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="draft">Draft</TabsTrigger>
          <TabsTrigger className="hidden sm:flex" value="archived">
            Archived
          </TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <Button className="h-8 gap-1" size="sm" variant="outline">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button>
          <Button className="h-8 gap-1" size="sm">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Product
            </span>
          </Button>
        </div>
      </div>
      <TabsContent value="all">
        <ProductsTable
          offset={newOffset ?? 0}
          products={menus}
          totalProducts={totalMenus ?? 0}
        />
      </TabsContent>
    </Tabs>
  );
}
