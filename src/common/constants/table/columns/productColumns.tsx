// common/constants/supplierColumns.ts
import { Column } from "@/types/common/table";
import { Products } from "@/types/productsmanagement";

export const productsColumns: Column<Products>[] = [
    { header: "ID", accessor: "product_id" },
    { header: "Name", accessor: "brand_name" },
    { header: "package size", accessor: "package_size" },
    { header: "abbreviation", accessor: "abbreviation" },
];

