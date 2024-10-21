// @/types/producstmanagement/products.tsx
// Products Types
export interface Products { // Database Table
    product_id: number;
    brand_id: number;
    package_size: number;
    unit_id: number;
    ingredient_id: number;
    default_supplier_product_id: number;
    // everything after is optional
    brand_name?: string;
    abbreviation?: string;
    default_supplier?: string;
    ingredient_name?: string;
    supplier_price?: number[];
}


export interface AddProductInput {
    brand_id: number;
    package_size: number;
    unit_id: number;
    ingredient_id?: number;
    default_supplier_product_id?: number;
}


export interface SupplierPricebyProductId{
    supplier_id: number;
    supplier_name: string;
    default_price: number;
    is_default: boolean;
}