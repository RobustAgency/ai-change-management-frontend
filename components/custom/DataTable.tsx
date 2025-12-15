"use client"
import * as React from "react"
import { ColumnDef, flexRender, getCoreRowModel, useReactTable, getPaginationRowModel, getSortedRowModel, SortingState, getFilteredRowModel, ColumnFiltersState } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import Pagniation from "./Pagniation"
import { CardDescription, CardTitle } from "../ui/card"
import { Search, Sparkle } from "lucide-react"

interface DataTableProps<TData, TValue> {
    title?: string
    description?: string
    icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>
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
    cellPadding?: string | number
    loading?: boolean
    serverSide?: boolean
    onRowClick?: (row: TData) => void
    rowClickable?: boolean
}

export function DataTable<TData, TValue>({
    title,
    description,
    icon,
    columns,
    data,
    searchKey,
    searchPlaceholder = "Search...",
    pagination,
    onPageChange,
    onSearch,
    cellPadding = '0.75rem',
    loading = false,
    serverSide = false,
    onRowClick,
    rowClickable = false,
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

    const renderSkeletonRows = () => {
        const skeletonRowCount = 5
        return Array.from({ length: skeletonRowCount }).map((_, rowIndex) => (
            <TableRow key={`skeleton-${rowIndex}`}>
                {columns.map((_, colIndex) => {
                    const widths = ['w-16', 'w-24', 'w-32', 'w-20', 'w-28', 'w-36', 'w-40']
                    const randomWidth = widths[colIndex % widths.length]

                    return (
                        <TableCell
                            key={`skeleton-cell-${rowIndex}-${colIndex}`}
                            style={{ paddingTop: cellPadding, paddingBottom: cellPadding }}
                        >
                            <Skeleton className={`h-4 ${randomWidth}`} />
                        </TableCell>
                    )
                })}
            </TableRow>
        ))
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-4 ">
                <div>
                    <CardTitle className="text-xl flex items-center gap-2">
                        {icon && React.createElement(icon, { className: "w-5 h-5" })}
                        {title}
                    </CardTitle>
                    <CardDescription>{description}</CardDescription>
                </div>
                {searchKey && (
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                            placeholder={searchPlaceholder}
                            value={serverSide ? searchValue : (table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
                            onChange={handleSearchChange}
                            className="pl-10 max-w-sm"
                        // disabled={loading}
                        />
                    </div>
                )}
            </div>
            <div className="mt-5">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className="py-4">
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
                            renderSkeletonRows()
                        ) : table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className={rowClickable ? "cursor-pointer hover:bg-muted/50" : ""}
                                    onClick={(e) => {
                                        if (rowClickable && onRowClick) {
                                            const target = e.target as HTMLElement
                                            const isInteractiveElement = target.closest('button, [role="menuitem"], [role="dialog"], [data-radix-popper-content-wrapper], a, input, select, textarea, [data-state]')

                                            if (!isInteractiveElement) {
                                                onRowClick(row.original)
                                            }
                                        }
                                    }}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}
                                            style={{ paddingTop: cellPadding, paddingBottom: cellPadding }}
                                        >
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
