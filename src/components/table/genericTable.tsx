"use client";

import React, { useState } from "react";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
} from "@mui/material";
import { Column } from "@/types/common/table";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

interface GenericTableProps<T> {
    data: T[];
    columns: Column<T>[];
    isNested?: boolean;
    renderNestedTable?: (item: T, index: number) => React.ReactNode;
    enableRowClick?: boolean; // New prop to conditionally enable row clicks
    onRowClick?: (item: T) => void; // Callback function to execute when row is clicked
}

const GenericTable = <T,>({
                              data,
                              columns,
                              isNested = false,
                              renderNestedTable,
                              enableRowClick = false, // Optional prop to enable row clicks
                              onRowClick, // Optional callback to trigger on row click
                          }: GenericTableProps<T>) => {
    const [openRows, setOpenRows] = useState<Set<number>>(new Set());
    const [hoveredRow, setHoveredRow] = useState<number | null>(null); // Track hovered row for highlighting

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

    const handleRowClick = (item: T) => {
        if (enableRowClick && onRowClick) {
            onRowClick(item); // Call the callback passed from the parent component
        }
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
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
                                <TableRow
                                    onMouseEnter={() => setHoveredRow(index)} // Handle row hover
                                    onMouseLeave={() => setHoveredRow(null)}  // Remove hover
                                    onClick={() => handleRowClick(item)} // Handle row click
                                    sx={{
                                        cursor: enableRowClick ? 'pointer' : 'default',
                                        backgroundColor: hoveredRow === index ? '#f5f5f5' : 'inherit', // Highlight on hover
                                    }}
                                >
                                    {isNested && renderNestedTable && (
                                        <TableCell>
                                            <IconButton
                                                aria-label="expand row"
                                                size="small"
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Prevent row click when expanding
                                                    handleToggle(index);
                                                }}
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
                                                : typeof column.accessor === "string" &&
                                                column.accessor.includes(".")
                                                    ? column.accessor
                                                        .split(".")
                                                        .reduce((acc, key) => acc && acc[key], item as any)
                                                    : (item[column.accessor as keyof T] as React.ReactNode)}
                                        </TableCell>
                                    ))}
                                </TableRow>
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
