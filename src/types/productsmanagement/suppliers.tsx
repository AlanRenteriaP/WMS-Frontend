// @/types/producstmanagement/suppliers.tsx

import {Ingredients} from './ingredients';

// Suppliers Types
export interface Suppliers {// Database Table
    supplier_id: number;
    supplier_name: string;
    location: string;
    product_count: number | null;
    ingredients: Ingredients[];
}
export interface SupplierInput {
    supplier_name: string;
    location?: string;
}