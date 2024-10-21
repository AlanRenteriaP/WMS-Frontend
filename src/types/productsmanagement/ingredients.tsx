// @/types/producstmanagement/ingredients.tsx
import {Products} from './products';
// Ingredients Type
export interface Ingredients { // Database Table
    ingredient_id: number;
    ingredient_name: string;
    products_count: number;
    products: Products[];
}

export interface IngredientInput {
    ingredient_name: string;
    default_unit_id: number;
    default_product_id?: number;
}
