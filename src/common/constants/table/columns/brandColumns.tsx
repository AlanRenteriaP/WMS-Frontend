import { Column } from "@/types/common/table";
import { Brand } from "@/types/productsmanagement";

export const brandColumns: Column<Brand>[] = [
    { header: "ID", accessor: "brand_id" },
    { header: "Brand Name", accessor: "brand_name" },
    { header: "Number of Ingredients", accessor: "number_of_ingredients" },
    { header: "Number of Products", accessor: "number_of_products" },
];
