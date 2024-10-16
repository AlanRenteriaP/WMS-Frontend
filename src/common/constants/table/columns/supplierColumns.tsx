// common/constants/supplierColumns.ts
import { Column } from "@/types/common/table";
import { Suppliers } from "@/types/productsmanagement";

export const supplierColumns: Column<Suppliers>[] = [
    { header: "ID", accessor: "supplier_id" },
    { header: "Name", accessor: "supplier_name" },
    { header: "Location", accessor: "location" },
    { header: "Number of Products", accessor: "ingredient_count" },
];

