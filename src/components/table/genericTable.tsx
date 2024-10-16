// components/GenericTable/genericTable.tsx
"use client";

import React from "react";
import {
    Box,
    Collapse,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    IconButton,
} from "@mui/material";
import { Column } from "@/types/common/table";

import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

interface GenericTableProps<T> {
    data: T[];
    columns: Column<T>[];
    isNested?: boolean;
    renderNestedTable?: (item: T, index: number) => React.ReactNode; // Function to render nested table
}

const GenericTable = <T,>({
                              data,
                              columns,
                              isNested = false,
                              renderNestedTable,
                          }: GenericTableProps<T>) => {
    const [openRows, setOpenRows] = React.useState<Set<number>>(new Set());

    const handleToggle = (index: number) => {
        setOpenRows((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(index)) {
                newSet.delete(index);
            } else {
                newSet.add(index);
            }
            return newSet;
        });
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {/* Conditionally render an extra cell for expand/collapse buttons */}
                        {isNested && renderNestedTable && <TableCell />}
                        {columns.map((column, idx) => (
                            <TableCell key={idx} align={column.align || "left"}>
                                {column.header}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.length > 0 ? (
                        data.map((item, index) => (
                            <React.Fragment key={index}>
                                <TableRow>
                                    {/* Render expand/collapse button if not nested and provided */}
                                    {isNested && renderNestedTable && (
                                        <TableCell>
                                            <IconButton
                                                aria-label="expand row"
                                                size="small"
                                                onClick={() => handleToggle(index)}
                                            >
                                                {openRows.has(index) ? (
                                                    <KeyboardArrowUp />
                                                ) : (
                                                    <KeyboardArrowDown />
                                                )}
                                            </IconButton>
                                        </TableCell>
                                    )}
                                    {columns.map((column, idx) => (
                                        <TableCell key={idx} align={column.align || "left"}>
                                            {column.render
                                                ? column.render(item)
                                                : // Handle nested accessors like 'products.length'
                                                typeof column.accessor === "string" &&
                                                column.accessor.includes(".")
                                                    ? column.accessor
                                                        .split(".")
                                                        .reduce((acc, key) => acc && acc[key], item as any)
                                                    : (item[column.accessor as keyof T] as React.ReactNode)}
                                        </TableCell>
                                    ))}
                                </TableRow>
                                {/* Render nested table if applicable */}
                                {isNested && renderNestedTable && openRows.has(index) && (
                                    <TableRow>
                                        <TableCell colSpan={columns.length + 1}>
                                            {renderNestedTable(item, index)}
                                        </TableCell>
                                    </TableRow>
                                )}
                            </React.Fragment>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length + (isNested ? 0 : 1)} align="center">
                                No data available
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default GenericTable;