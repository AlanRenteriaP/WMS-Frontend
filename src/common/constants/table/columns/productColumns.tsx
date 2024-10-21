// common/constants/supplierColumns.ts
import { Column } from "@/types/common/table";
import { Products } from "@/types/productsmanagement";

export const productsColumns: Column<Products>[] = [
    { header: "ID", accessor: "product_id" },
    { header: "Brand Name", accessor: "brand_name" },
    { header: "package size", accessor: "package_size" },
    { header: "abbreviation", accessor: "abbreviation" },
    { header: "ingredient name", accessor: "ingredient_name" },
    {header: "Default Supplier", accessor: "default_supplier_name" },
];

