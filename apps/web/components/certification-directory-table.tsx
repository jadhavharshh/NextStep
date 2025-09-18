"use client"

import { useState, useMemo } from "react"
import {
  IconExternalLink,
  IconCertificate,
  IconClock,
  IconCurrencyDollar,
  IconStar,
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconLayoutColumns,
  IconTrendingUp,
  IconBriefcase,
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
import Image from "next/image"

interface Certification {
  id: number
  name: string
  provider: string
  category: string
  level: string
  duration: string
  cost: number
  image: string
  description: string
  skills: string[]
  prerequisites: string[]
  examCode: string
  popularity: number
  averageSalary: number
  jobTitles: string[]
  officialUrl: string
}

interface CertificationDirectoryTableProps {
  certifications: Certification[]
  selectedCategory?: string | null
  selectedLevel?: string | null
  selectedProvider?: string | null
  selectedPriceRange?: string | null
}

export function CertificationDirectoryTable({
  certifications,
  selectedCategory,
  selectedLevel,
  selectedProvider,
  selectedPriceRange,
}: CertificationDirectoryTableProps) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })

  const filteredCertifications = useMemo(() => {
    return certifications.filter((certification) => {
      // Category filter
      if (selectedCategory && certification.category !== selectedCategory) {
        return false
      }

      // Level filter
      if (selectedLevel && certification.level !== selectedLevel) {
        return false
      }

      // Provider filter
      if (selectedProvider && certification.provider !== selectedProvider) {
        return false
      }

      // Price range filter
      if (selectedPriceRange) {
        const cost: any = certification.cost
        if (selectedPriceRange === '300+') {
          if (cost <= 300) return false
        } else {
          const [min, max] = selectedPriceRange.split('-').map((val: any) => parseInt(val))
          const minPrice: any = min
          const maxPrice: any = max
          if (cost < minPrice || cost > maxPrice) return false
        }
      }

      return true
    })
  }, [certifications, selectedCategory, selectedLevel, selectedProvider, selectedPriceRange])

  const formatSalary = (salary: number) => {
    return `$${(salary / 1000).toFixed(0)}K`
  }

  const columns: ColumnDef<Certification>[] = [
    {
      accessorKey: "name",
      header: "Certification",
      cell: ({ row }) => {
        const certification = row.original
        return (
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <Image
                src={certification.image}
                alt={certification.name}
                width={48}
                height={48}
                className="rounded-lg object-contain"
                onError={(e) => {
                  e.currentTarget.src = "https://via.placeholder.com/48x48/3b82f6/ffffff?text=CERT"
                }}
              />
            </div>
            <div className="space-y-1 min-w-0">
              <div className="font-medium text-sm leading-5">{certification.name}</div>
              <div className="text-xs text-muted-foreground flex items-center gap-1">
                <IconCertificate className="h-3 w-3" />
                {certification.provider}
              </div>
            </div>
          </div>
        )
      },
      enableHiding: false,
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => (
        <Badge variant="outline" className="text-xs">
          {row.original.category}
        </Badge>
      ),
    },
    {
      accessorKey: "level",
      header: "Level",
      cell: ({ row }) => {
        const level = row.original.level
        const variant = level === "Professional" ? "default" :
                      level === "Associate" ? "secondary" :
                      level === "Fundamental" ? "outline" : "secondary"
        return (
          <Badge variant={variant} className="text-xs">
            {level}
          </Badge>
        )
      },
    },
    {
      accessorKey: "cost",
      header: "Cost",
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <IconCurrencyDollar className="h-4 w-4 text-green-500" />
          <span className="font-medium">${row.original.cost}</span>
        </div>
      ),
    },
    {
      accessorKey: "duration",
      header: "Validity",
      cell: ({ row }) => (
        <div className="flex items-center gap-1 text-sm">
          <IconClock className="h-3 w-3" />
          <span>{row.original.duration}</span>
        </div>
      ),
    },
    {
      accessorKey: "skills",
      header: "Key Skills",
      cell: ({ row }) => {
        const skills = row.original.skills.slice(0, 3)
        return (
          <div className="space-y-1">
            {skills.map((skill, index) => (
              <Badge key={index} variant="outline" className="text-xs mr-1">
                {skill}
              </Badge>
            ))}
            {row.original.skills.length > 3 && (
              <div className="text-xs text-muted-foreground">
                +{row.original.skills.length - 3} more
              </div>
            )}
          </div>
        )
      },
    },
    {
      accessorKey: "popularity",
      header: "Popularity",
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <IconStar className="h-4 w-4 text-yellow-500" />
          <span className="font-medium">{row.original.popularity}%</span>
        </div>
      ),
    },
    {
      accessorKey: "averageSalary",
      header: "Avg Salary",
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <IconTrendingUp className="h-4 w-4 text-green-500" />
          <span className="font-medium">{formatSalary(row.original.averageSalary)}</span>
        </div>
      ),
    },
    {
      accessorKey: "jobTitles",
      header: "Job Roles",
      cell: ({ row }) => {
        const jobTitles = row.original.jobTitles.slice(0, 2)
        return (
          <div className="space-y-1">
            {jobTitles.map((title, index) => (
              <div key={index} className="text-xs flex items-center gap-1">
                <IconBriefcase className="h-3 w-3" />
                {title}
              </div>
            ))}
            {row.original.jobTitles.length > 2 && (
              <div className="text-xs text-muted-foreground">
                +{row.original.jobTitles.length - 2} more
              </div>
            )}
          </div>
        )
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => window.open(row.original.officialUrl, "_blank")}
          className="flex items-center gap-1"
        >
          <IconExternalLink className="h-4 w-4" />
          Learn More
        </Button>
      ),
    },
  ]

  const table = useReactTable({
    data: filteredCertifications,
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
            {selectedCategory ? `${selectedCategory} Certifications` : "All Certifications"}
          </h2>
          <Badge variant="outline">
            {filteredCertifications.length} certification{filteredCertifications.length !== 1 ? "s" : ""}
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
                  No certifications found matching your criteria.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between px-4">
        <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
          Showing {table.getRowModel().rows.length} of {filteredCertifications.length} certifications
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