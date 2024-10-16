// common/types/table.ts
export interface Column<T> {
    header: string;
    accessor: keyof T | string; // Supports nested keys like 'products.length'
    render?: (item: T) => React.ReactNode;
    align?: 'left' | 'right' | 'center';
}