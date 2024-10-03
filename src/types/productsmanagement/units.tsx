

export interface Unit {
    unit_id: number | null; // Universal Product Code, if applicable
    unit_name:string;
    unit_type: number | null; // Current price of the variant, if applicable
    conversion_factor_to_base: number | null;
}
