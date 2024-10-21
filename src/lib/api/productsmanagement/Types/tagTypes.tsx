

export const productsTypes = [ 'Products', 'ProductsOverview'];
export const suppliersTypes = [ 'Suppliers', 'SuppliersOverview'];
export const brandsTypes = ['Brands', 'BrandsOverview'];
export const ingredientsTypes = [ 'Ingredients', 'IngredientsOverview'];
export const unitsTypes = [ 'Units'];

export const tagTypes = [
    ...productsTypes,
    ...suppliersTypes,
    ...brandsTypes,
    ...ingredientsTypes,
    ...unitsTypes
];

export const tagObject = {
    productsTypes: {
        Products: 'Products',
        ProductsOverview: 'ProductsOverview'
    },
    suppliersTypes: {
        Suppliers: 'Suppliers',
        SuppliersOverview: 'SuppliersOverview'
    },
    brandsTypes: {
        Brands: 'Brands',
        BrandsOverview: 'BrandsOverview'
    },
    ingredientsTypes: {
        Ingredients: 'Ingredients',
        IngredientsOverview: 'IngredientsOverview'
    },
    unitsTypes: {
        Units: 'Units'
    }
};