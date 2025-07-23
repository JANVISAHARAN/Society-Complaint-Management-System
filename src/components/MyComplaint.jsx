import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import { Dropdown } from 'primereact/dropdown';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import { useComplaints } from './ComplaintsContext';
import { Button } from 'primereact/button';

const statusSeverity = {
  'Pending': 'danger',
  'In Progress': 'warning',
  'Resolved': 'success',
};

const prioritySeverity = {
  'Low': 'info',
  'Medium': 'warning',
  'High': 'danger',
};

// Format Firestore Timestamp to readable date
const formatDate = (date) => {
  if (!date) return '';
  if (date.seconds) {
    return new Date(date.seconds * 1000).toLocaleDateString();
  }
  return new Date(date).toLocaleDateString();
};

const MyComplaint = () => {
  const { complaints, userId, deleteComplaint } = useComplaints();
  const [globalFilter, setGlobalFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [expandedRows, setExpandedRows] = useState({});
  const [deletingId, setDeletingId] = useState(null);

  const statusOptions = [
    { label: 'All', value: null },
    { label: 'Pending', value: 'Pending' },
    { label: 'In Progress', value: 'In Progress' },
    { label: 'Resolved', value: 'Resolved' },
  ];
  const categoryOptions = [
    { label: 'All', value: null },
    ...Array.from(new Set(complaints.map(c => c.category))).map(cat => ({ label: cat, value: cat }))
  ];

  const descriptionBody = (rowData) => rowData.description;

  const statusBody = (rowData) => (
    <Tag value={rowData.status} severity={statusSeverity[rowData.status]} className="capitalize" />
  );

  const priorityBody = (rowData) => (
    <Tag value={rowData.priority} severity={prioritySeverity[rowData.priority]} className="capitalize" />
  );

  // Delete button for each row
  const deleteBody = (rowData) => {
    if (!rowData.id) return null;
    return (
      <Button
        icon="pi pi-trash"
        label="Delete Complaint"
        className="p-button-danger p-button-sm"
        onClick={() => {
          if (window.confirm('Are you sure you want to delete this complaint?')) {
            setDeletingId(rowData.id);
            deleteComplaint(rowData.id).finally(() => setDeletingId(null));
          }
        }}
        loading={deletingId === rowData.id}
      />
    );
  };

  if (!userId) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 pt-20 pb-8">
        <Card className="w-full max-w-3xl shadow-2xl border border-blue-100 bg-white py-12 px-4 text-center">
          <h2 className="text-3xl font-extrabold text-blue-700 mb-4 tracking-tight">My Complaints</h2>
          <div className="text-gray-500 text-lg bg-blue-50 border border-blue-100 rounded-lg py-8 mt-4">Please log in to view your complaints.</div>
        </Card>
      </div>
    );
  }

  const userComplaints = complaints.filter(c => c.userId === userId);

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-8 px-0">
      <Card className="w-full shadow-2xl border border-blue-100 bg-white py-12 px-8">
        <h2 className="text-3xl font-extrabold text-blue-700 mb-4 text-center tracking-tight">My Complaints</h2>
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <span className="p-input-icon-left w-full md:w-1/3">
              <i className="pi pi-search text-blue-600" />
              <input
                type="text"
                className="p-inputtext p-component w-full focus:ring-2 focus:ring-blue-400"
                placeholder="Search by title, area, city..."
                value={globalFilter}
                onChange={e => setGlobalFilter(e.target.value)}
              />
            </span>
            <Dropdown
              value={statusFilter}
              options={statusOptions}
              onChange={e => setStatusFilter(e.value)}
              placeholder="Filter by Status"
              className="w-full md:w-1/4 focus:ring-2 focus:ring-blue-400"
              showClear
            />
            <Dropdown
              value={categoryFilter}
              options={categoryOptions}
              onChange={e => setCategoryFilter(e.value)}
              placeholder="Filter by Category"
              className="w-full md:w-1/4 focus:ring-2 focus:ring-blue-400"
              showClear
            />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-100 shadow-sm mt-8">
          <DataTable
            value={userComplaints.filter(c =>
              (!globalFilter ||
                c.title.toLowerCase().includes(globalFilter.toLowerCase()) ||
                c.area.toLowerCase().includes(globalFilter.toLowerCase()) ||
                c.city.toLowerCase().includes(globalFilter.toLowerCase())
              ) &&
              (!statusFilter || c.status === statusFilter) &&
              (!categoryFilter || c.category === categoryFilter)
            )}
            paginator
            rows={5}
            className="p-datatable-sm"
            responsiveLayout="scroll"
            emptyMessage={<span className="block text-center text-gray-500 py-8 text-lg">No complaints found.</span>}
          >
            <Column field="title" header="Title" sortable className="min-w-[150px]" />
            <Column field="category" header="Category" sortable className="min-w-[120px]" />
            <Column header="Description" body={descriptionBody} className="min-w-[200px]" />
            <Column field="city" header="City" sortable className="min-w-[100px]" />
            <Column field="area" header="Area" sortable className="min-w-[100px]" />
            <Column field="state" header="State" sortable className="min-w-[100px]" />
            <Column header="Date Submitted" body={rowData => formatDate(rowData.date)} sortable className="min-w-[120px]" />
            <Column header="Status" body={statusBody} sortable className="min-w-[120px]" />
            <Column header="Priority" body={priorityBody} sortable className="min-w-[100px]" />
            <Column header="Delete" body={deleteBody} className="min-w-[80px] text-center" />
          </DataTable>
        </div>
      </Card>
    </div>
  );
};

export default MyComplaint;
