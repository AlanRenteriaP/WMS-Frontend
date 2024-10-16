// @/types/producstmanagement/ingredients.tsx
import {Products} from './products';
// Ingredients Type
export interface Ingredients { // Database Table
    ingredient_id: number;
    ingredient_name: string;
    products: Products[];
}