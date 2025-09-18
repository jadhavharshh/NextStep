"use client"

import { useState, useMemo } from "react"
import {
  IconExternalLink,
  IconMapPin,
  IconSchool,
  IconUsers,
  IconCurrencyRupee,
  IconStar,
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconLayoutColumns,
} from "@tabler/icons-react"
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface College {
  id: number
  name: string
  shortName: string
  location: string
  state: string
  type: "Government" | "Private"
  establishedYear: number
  ranking: number
  branches: {
    name: string
    degreeTypes: string[]
    seats: Record<string, number>
  }[]
  fees: Record<string, number>
  website: string
  nirf_ranking: number
}

interface CollegeDirectoryTableProps {
  colleges: College[]
  selectedLocation?: string
  selectedBranch?: string | null
  selectedDegreeType?: string | null
  selectedCollegeType?: string | null
}

export function CollegeDirectoryTable({
  colleges,
  selectedLocation,
  selectedBranch,
  selectedDegreeType,
  selectedCollegeType,
}: CollegeDirectoryTableProps) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })

  const filteredColleges = useMemo(() => {
    return colleges.filter((college) => {
      // Location filter
      if (selectedLocation && college.location !== selectedLocation) {
        return false
      }

      // College type filter
      if (selectedCollegeType && college.type !== selectedCollegeType) {
        return false
      }

      // Branch and degree type filter
      if (selectedBranch || selectedDegreeType) {
        const hasMatchingBranch = college.branches.some((branch) => {
          const branchMatches = !selectedBranch || branch.name === selectedBranch
          const degreeMatches =
            !selectedDegreeType || branch.degreeTypes.includes(selectedDegreeType)
          return branchMatches && degreeMatches
        })
        if (!hasMatchingBranch) {
          return false
        }
      }

      return true
    })
  }, [colleges, selectedLocation, selectedBranch, selectedDegreeType, selectedCollegeType])

  const columns: ColumnDef<College>[] = [
    {
      accessorKey: "name",
      header: "College Name",
      cell: ({ row }) => {
        const college = row.original
        return (
          <div className="space-y-1">
            <div className="font-medium">{college.name}</div>
            <div className="text-sm text-muted-foreground flex items-center gap-1">
              <IconMapPin className="h-3 w-3" />
              {college.location}, {college.state}
            </div>
          </div>
        )
      },
      enableHiding: false,
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => (
        <Badge
          variant={row.original.type === "Government" ? "default" : "secondary"}
          className="text-xs"
        >
          {row.original.type}
        </Badge>
      ),
    },
    {
      accessorKey: "nirf_ranking",
      header: "NIRF Rank",
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <IconStar className="h-4 w-4 text-yellow-500" />
          <span className="font-medium">#{row.original.nirf_ranking}</span>
        </div>
      ),
    },
    {
      accessorKey: "branches",
      header: "Available Branches",
      cell: ({ row }) => {
        const college = row.original
        const relevantBranches = selectedBranch
          ? college.branches.filter((branch) => branch.name === selectedBranch)
          : college.branches.slice(0, 2)

        return (
          <div className="space-y-1">
            {relevantBranches.map((branch, index) => (
              <div key={index} className="space-y-1">
                <div className="text-sm font-medium">{branch.name}</div>
                <div className="flex gap-1">
                  {branch.degreeTypes
                    .filter((degree) => !selectedDegreeType || degree === selectedDegreeType)
                    .map((degree) => (
                      <Badge key={degree} variant="outline" className="text-xs">
                        {degree}
                      </Badge>
                    ))}
                </div>
              </div>
            ))}
            {!selectedBranch && college.branches.length > 2 && (
              <div className="text-xs text-muted-foreground">
                +{college.branches.length - 2} more
              </div>
            )}
          </div>
        )
      },
    },
    {
      accessorKey: "seats",
      header: "Seats",
      cell: ({ row }) => {
        const college = row.original
        const relevantBranches = selectedBranch
          ? college.branches.filter((branch) => branch.name === selectedBranch)
          : college.branches.slice(0, 1)

        return (
          <div className="space-y-1">
            {relevantBranches.map((branch, index) => (
              <div key={index} className="space-y-1">
                {Object.entries(branch.seats)
                  .filter(([degree]) => !selectedDegreeType || degree === selectedDegreeType)
                  .map(([degree, seats]) => (
                    <div key={degree} className="flex items-center gap-1 text-sm">
                      <IconUsers className="h-3 w-3" />
                      <span className="font-medium">{seats}</span>
                      <span className="text-muted-foreground">({degree})</span>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        )
      },
    },
    {
      accessorKey: "fees",
      header: "Fees (Annual)",
      cell: ({ row }) => {
        const college = row.original
        const relevantFees = selectedDegreeType
          ? { [selectedDegreeType]: college.fees[selectedDegreeType] }
          : college.fees

        return (
          <div className="space-y-1">
            {Object.entries(relevantFees)
              .filter(([, fee]) => fee !== undefined)
              .map(([degree, fee]: any) => (
                <div key={degree} className="flex items-center gap-1 text-sm">
                  <IconCurrencyRupee className="h-3 w-3" />
                  <span className="font-medium">
                    {(fee / 100000).toFixed(1)}L
                  </span>
                  <span className="text-muted-foreground">({degree})</span>
                </div>
              ))}
          </div>
        )
      },
    },
    {
      accessorKey: "establishedYear",
      header: "Established",
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <IconSchool className="h-4 w-4 text-blue-500" />
          <span>{row.original.establishedYear}</span>
        </div>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => window.open(row.original.website, "_blank")}
          className="flex items-center gap-1"
        >
          <IconExternalLink className="h-4 w-4" />
          Visit
        </Button>
      ),
    },
  ]

  const table = useReactTable({
    data: filteredColleges,
    columns,
    state: {
      sorting,
      columnVisibility,
      columnFilters,
      pagination,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">
            Colleges in {selectedLocation || "All Locations"}
          </h2>
          <Badge variant="outline">
            {filteredColleges.length} college{filteredColleges.length !== 1 ? "s" : ""}
          </Badge>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <IconLayoutColumns className="h-4 w-4" />
              <span className="hidden lg:inline">Columns</span>
              <IconChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {table
              .getAllColumns()
              .filter(
                (column) =>
                  typeof column.accessorFn !== "undefined" && column.getCanHide()
              )
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader className="bg-muted">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
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
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No colleges found matching your criteria.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between px-4">
        <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
          Showing {table.getRowModel().rows.length} of {filteredColleges.length} colleges
        </div>
        <div className="flex w-full items-center gap-8 lg:w-fit">
          <div className="hidden items-center gap-2 lg:flex">
            <Label htmlFor="rows-per-page" className="text-sm font-medium">
              Rows per page
            </Label>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value))
              }}
            >
              <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                <SelectValue placeholder={table.getState().pagination.pageSize} />
              </SelectTrigger>
              <SelectContent side="top">
                {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-fit items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <IconChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <IconChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <IconChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <IconChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}