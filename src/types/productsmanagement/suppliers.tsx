// @/types/producstmanagement/suppliers.tsx

import {Ingredients} from './ingredients';

// Suppliers Types
export interface Suppliers {// Database Table
    supplier_id: number;
    supplier_name: string;
    location: string;
    ingredient_count: number;
    ingredients: Ingredients[];
}
export interface SupplierInput {
    supplier_name: string;
    location?: string;
}

export interface SuppliersPrice{
    price: number;
    supplier_id: number;
    product_id: number;
}