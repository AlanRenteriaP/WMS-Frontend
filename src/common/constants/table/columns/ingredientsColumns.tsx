// common/constants/supplierColumns.ts
import { Column } from "@/types/common/table";
import { Ingredients } from "@/types/productsmanagement";

export const ingredientsColumns: Column<Ingredients>[] = [
    { header: "ID", accessor: "ingredient_id" },
    { header: "Name", accessor: "ingredient_name" },
    { header: "products count", accessor: "products_count" },
];

