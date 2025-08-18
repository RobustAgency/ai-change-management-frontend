"use client"
import * as React from "react"
import { ColumnDef, flexRender, getCoreRowModel, useReactTable, getPaginationRowModel, getSortedRowModel, SortingState, getFilteredRowModel, ColumnFiltersState } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import Pagniation from "./Pagniation"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    searchKey?: string
    searchPlaceholder?: string
    pagination?: {
        page: number
        limit: number
        total: number
        totalPages: number
    }
    onPageChange?: (page: number) => void
    onSearch?: (searchTerm: string) => void
    loading?: boolean
    serverSide?: boolean
}

export function DataTable<TData, TValue>({
    columns,
    data,
    searchKey,
    searchPlaceholder = "Search...",
    pagination,
    onPageChange,
    onSearch,
    loading = false,
    serverSide = false,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [searchValue, setSearchValue] = React.useState("")

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: serverSide ? undefined : getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: serverSide ? undefined : getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
        },
        manualPagination: serverSide,
        manualFiltering: serverSide,
        pageCount: serverSide ? pagination?.totalPages || 0 : undefined,
    })

    React.useEffect(() => {
        if (serverSide && onSearch) {
            const timeoutId = setTimeout(() => {
                onSearch(searchValue)
            }, 300)

            return () => clearTimeout(timeoutId)
        }
    }, [searchValue, onSearch, serverSide])

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setSearchValue(value)

        if (!serverSide && searchKey) {
            table.getColumn(searchKey)?.setFilterValue(value)
        }
    }

    const handlePageChange = (page: number) => {
        if (serverSide && onPageChange) {
            onPageChange(page)
        } else {
            table.setPageIndex(page - 1)
        }
    }

    const currentPage = serverSide ? (pagination?.page || 1) : table.getState().pagination.pageIndex + 1
    const totalPages = serverSide ? (pagination?.totalPages || 0) : table.getPageCount()

    return (
        <div>
            {searchKey && (
                <div className="flex items-center mt-4">
                    <Input
                        placeholder={searchPlaceholder}
                        value={serverSide ? searchValue : (table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
                        onChange={handleSearchChange}
                        className="max-w-sm"
                        disabled={loading}
                    />
                </div>
            )}
            <div className="rounded-md border mt-4">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    <div className="flex items-center justify-center">
                                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-border border-t-primary mr-2" />
                                        Loading...
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            {pagination && (
                <Pagniation pagination={pagination} currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} loading={loading} />
            )}
        </div>
    )
}
