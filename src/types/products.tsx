// src/types/products.ts
export interface ProductVariant {
    id: number;
    product_id: number;
    sku: string;
    presentation: string | null;
    quantity: number | null;
    unit: string | null;
    price: number | null;
    is_active: boolean | null;
    created_at: string | null;
    updated_at: string | null;
    source: string | null;
}

export interface Product {
    id: number;
    product_name: string;
    measurement_id: number | null;
    measurement_name: string | null;
    measurement_abbreviation: string | null;
    last_updated: string | null;
    variants: ProductVariant[];
}
