// @/types/producstmanagement/brands.tsx
import {Ingredients} from './ingredients';

// Brands Types
export interface Brands { // Database Table
    brand_id: number | null;
    brand_name: string | null;
    // everything after is optional
    number_of_ingredients?: number;
    number_of_products?: number;
    ingredients?: Ingredients[];
}

export interface BrandInput {
    brand_name: string;
}