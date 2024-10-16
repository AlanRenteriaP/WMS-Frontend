// common/hooks/useFilteredData.ts
import { useState, useMemo } from "react";

const useFilteredData = <T,>(
    data: T[] | undefined,
    searchKey: keyof T,
    initialSearchValue: string = ""
) => {
    const [search, setSearch] = useState(initialSearchValue);

    const handleSearchChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setSearch(event.target.value.toLowerCase());
    };

    const filteredData = useMemo(() => {
        if (!data) return [];
        return data.filter((item) => {
            const value = item[searchKey];
            if (typeof value === "string") {
                return value.toLowerCase().includes(search);
            }
            return false;
        });
    }, [data, search, searchKey]);

    return { search, handleSearchChange, filteredData };
};

export default useFilteredData;
