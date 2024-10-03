// src/types/products.ts

export interface ProductVariant {
    upc: string | null; // Universal Product Code, if applicable
    brand:string;
    price: number | null; // Current price of the variant, if applicable
    supplier: string;
    is_default: boolean;
    variant_id: number; // ID of the variant
    last_updated: Date | string;
    presentation: string;

}

export interface ProductVariantInput {
    product_id: number; // Product to which the variant belongs
    package_size: string;
    unit: string;
    upc?: string | null;
    brand: string;
    supplier: string;
    attributes?: string;
    price: number;
}

export interface Product {
    product_id: number; // ID of the product
    product_name: string; // Name of the product
    default_variant_id: number;
    measurement: string; // Measurement unit for the product, e.g., 'kg', 'liters'
    number_of_variants: number; // Number of product variants
    price_range: string; // Price range of the product, e.g., '$10 - $20'
    last_updated: Date | string; // Last time the product information was updated
    variants: ProductVariant[]; // Array of product variants
}

