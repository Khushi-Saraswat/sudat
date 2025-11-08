"use client";
import React, { useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';
import { Search, Filter, ChevronLeft, ChevronRight, Package, MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import AddProductModal from '@/components/models/AddProductModel';

// Sample product data
const sampleProducts = [
  {
    id: 'P001',
    name: 'Wireless Bluetooth Headphones',
    category: 'Electronics',
    price: 89.99,
    stock: 45,
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop&crop=center',
    sku: 'WBH-001'
  },
  {
    id: 'P002',
    name: 'Organic Cotton T-Shirt',
    category: 'Clothing',
    price: 24.99,
    stock: 120,
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop&crop=center',
    sku: 'OCT-002'
  },
  {
    id: 'P003',
    name: 'Stainless Steel Water Bottle',
    category: 'Home & Garden',
    price: 19.99,
    stock: 0,
    status: 'Out of Stock',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=100&h=100&fit=crop&crop=center',
    sku: 'SWB-003'
  },
  {
    id: 'P004',
    name: 'Gaming Mechanical Keyboard',
    category: 'Electronics',
    price: 129.99,
    stock: 28,
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=100&h=100&fit=crop&crop=center',
    sku: 'GMK-004'
  },
  {
    id: 'P005',
    name: 'Yoga Mat Premium',
    category: 'Sports & Fitness',
    price: 34.99,
    stock: 67,
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=100&h=100&fit=crop&crop=center',
    sku: 'YMP-005'
  },
  {
    id: 'P006',
    name: 'Coffee Bean Grinder',
    category: 'Kitchen',
    price: 49.99,
    stock: 15,
    status: 'Low Stock',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=100&h=100&fit=crop&crop=center',
    sku: 'CBG-006'
  },
  {
    id: 'P007',
    name: 'LED Desk Lamp',
    category: 'Home & Garden',
    price: 39.99,
    stock: 82,
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=center',
    sku: 'LDL-007'
  },
  {
    id: 'P008',
    name: 'Smartphone Case',
    category: 'Electronics',
    price: 14.99,
    stock: 200,
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=100&h=100&fit=crop&crop=center',
    sku: 'SPC-008'
  }
];

const columnHelper = createColumnHelper();

export default function ProductsTable() {
  const [data] = useState<Product[]>(sampleProducts);
  const [globalFilter, setGlobalFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const StatusBadge = ({ status }: { status: string }) => {
    const getStatusColor = (status: string) => {
      switch (status) {
        case 'Active':
          return 'bg-green-100 text-green-800';
        case 'Out of Stock':
          return 'bg-red-100 text-red-800';
        case 'Low Stock':
          return 'bg-yellow-100 text-yellow-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
        {status}
      </span>
    );
  };

  const ActionDropdown = ({ product }: { product: Product }) => {
    return (
      <button
        onClick={() => {
          setSelectedProduct(product);
          setIsDialogOpen(true);
        }}
        className="p-1 hover:bg-gray-100 cursor-pointer rounded-full transition-colors"
      >
        <MoreHorizontal className="w-4 h-4 text-gray-600" />
      </button>
    );
  };

  const ActionDialog = () => {
    if (!isDialogOpen || !selectedProduct) return null;

    return (
      <>
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/60 z-40 flex items-center justify-center"
          onClick={() => setIsDialogOpen(false)}
        >
          {/* Dialog */}
          <div
            className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Actions for {selectedProduct.name}
            </h3>
            
            <div className="flex gap-2">
              <button
                onClick={() => {
                  console.log('Edit product:', selectedProduct.id);
                  setIsDialogOpen(false);
                }}
                className="w-full flex cursor-pointer items-center justify-center px-4 py-3 bg-purple-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Product
              </button>
              
              <button
                onClick={() => {
                  console.log('Delete product:', selectedProduct.id);
                  setIsDialogOpen(false);
                }}
                className="w-full flex cursor-pointer items-center justify-center px-4 py-3 bg-pink-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Product
              </button>
              
             
            </div>
          </div>
        </div>
      </>
    );
  };

  const columns = useMemo(() => [
    columnHelper.accessor('image', {
      header: 'Image',
      cell: (info) => (
        <div className="flex items-center justify-center">
          <img
            src={info.getValue()}
            alt="Product"
            className="w-12 h-12 rounded-lg object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://via.placeholder.com/100x100?text=No+Image';
            }}
          />
        </div>
      ),
      enableSorting: false,
      size: 80,
    }),
    columnHelper.accessor('name', {
      header: 'Product Name',
      cell: (info) => (
        <div className="flex flex-col">
          <span className="font-medium text-gray-900 text-sm">
            {info.getValue()}
          </span>
          <span className="text-xs text-gray-500">
            SKU: {info.row.original.sku}
          </span>
        </div>
      ),
      size: 250,
    }),
    columnHelper.accessor('category', {
      header: 'Category',
      cell: (info) => (
        <span className="text-sm text-gray-700">
          {info.getValue()}
        </span>
      ),
      size: 150,
    }),
    columnHelper.accessor('price', {
      header: 'Price',
      cell: (info) => (
        <span className="font-medium text-gray-900">
          ${info.getValue().toFixed(2)}
        </span>
      ),
      size: 100,
    }),
    columnHelper.accessor('stock', {
      header: 'Stock',
      cell: (info) => (
        <span className="font-medium text-gray-900">
          {info.getValue()}
        </span>
      ),
      size: 80,
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: (info) => <StatusBadge status={info.getValue()} />,
      size: 120,
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Actions',
      cell: (info) => <ActionDropdown product={info.row.original} />,
      size: 80,
    }),
  ], []);

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchesGlobal = !globalFilter || 
        item.name.toLowerCase().includes(globalFilter.toLowerCase()) ||
        item.id.toLowerCase().includes(globalFilter.toLowerCase()) ||
        item.sku.toLowerCase().includes(globalFilter.toLowerCase());
      
      const matchesCategory = !categoryFilter || item.category === categoryFilter;
      const matchesStatus = !statusFilter || item.status === statusFilter;
      
      return matchesGlobal && matchesCategory && matchesStatus;
    });
  }, [data, globalFilter, categoryFilter, statusFilter]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  const categories = [...new Set(data.map(item => item.category))];
  const statuses = [...new Set(data.map(item => item.status))];

  return (
    <div className="min-h-screen bg-gray-50 p-6 w-full">
      <div className="w-full">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center mb-4 justify-between">
            <div className="flex items-center">
              <h1 className="text-2xl font-semibold text-gray-900">Products</h1>
            </div>
             <button
                onClick={() => {
                  // console.log('Edit product:', selectedProduct.id);
                  setIsAddProductModalOpen(true);
                }}
                className="w-40 flex cursor-pointer items-center justify-center px-3 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-600 transition-colors"
              >
                <Edit className="w-4 h-4 mr-2" />
                Add Product
              </button>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="flex flex-wrap gap-4">
              {/* Search */}
              <div className="flex-1 min-w-64">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={globalFilter}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="min-w-40">
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div className="min-w-40">
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="">All Statuses</option>
                  {statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              {/* Clear Filters */}
              {(globalFilter || categoryFilter || statusFilter) && (
                <button
                  onClick={() => {
                    setGlobalFilter('');
                    setCategoryFilter('');
                    setStatusFilter('');
                  }}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                      <th
                        key={header.id}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={header.column.getToggleSortingHandler()}
                        style={{ width: header.getSize() }}
                      >
                        <div className="flex items-center space-x-1">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          <span>
                            {header.column.getIsSorted() === 'asc' ? ' ↑' : 
                             header.column.getIsSorted() === 'desc' ? ' ↓' : ''}
                          </span>
                        </div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {table.getRowModel().rows.map(row => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    {row.getVisibleCells().map(cell => (
                      <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing{' '}
                  <span className="font-medium">
                    {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}
                  </span>{' '}
                  to{' '}
                  <span className="font-medium">
                    {Math.min(
                      (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                      table.getFilteredRowModel().rows.length
                    )}
                  </span>{' '}
                  of{' '}
                  <span className="font-medium">{table.getFilteredRowModel().rows.length}</span>{' '}
                  results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <button
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                    Page {table.getState().pagination.pageIndex + 1} of{' '}
                    {table.getPageCount()}
                  </span>
                  <button
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
          <ActionDialog/>
          <AddProductModal isOpen={isAddProductModalOpen} setIsOpen={setIsAddProductModalOpen}/>
        </div>
      </div>
    </div>
  );
}