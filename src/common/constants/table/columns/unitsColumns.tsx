// common/constants/supplierColumns.ts
import { Column } from "@/types/common/table";
import { Units } from "@/types/productsmanagement";

export const unitsColumns: Column<Units>[] = [
    { header: "ID", accessor: "unit_id" },
    { header: "Name", accessor: "unit_name" },
    { header: "Type", accessor: "unit_type" },
    { header: "Conversion factor to base", accessor: "conversion_factor_to_base" },
    { header: "abbreviation", accessor: "abbreviation" },
];

