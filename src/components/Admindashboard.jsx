import React, { useState } from "react";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { Dropdown } from "primereact/dropdown";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { useComplaints } from "./ComplaintsContext";

const statusSeverity = {
  Pending: "danger",
  "In Progress": "warning",
  Resolved: "success",
};

const priorityBody = (rowData) => (
  <Tag
    value={rowData.priority}
    severity={
      { Low: "info", Medium: "warning", High: "danger" }[rowData.priority]
    }
    className="capitalize"
  />
);

const formatDate = (date) => {
  if (!date) return "";
  if (date.seconds) return new Date(date.seconds * 1000).toLocaleDateString();
  return new Date(date).toLocaleDateString();
};

const statusOptions = ["Pending", "In Progress", "Resolved"].map((s) => ({
  label: s,
  value: s,
}));

const AdminDashboard = () => {
  const { allComplaints, updateComplaintStatus, isAdmin, loading } =
    useComplaints();
  const [updatingId, setUpdatingId] = useState(null);

  if (loading) return null;

  // Belt-and-suspenders: AdminRoute already blocks non-admins from reaching
  // this component, but this guard means the component is safe even if
  // it's ever rendered somewhere else by mistake.
  if (!isAdmin) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 pt-20 pb-8">
        <Card className="w-full max-w-2xl shadow-2xl border border-red-100 bg-white py-12 px-4 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Admins only</h2>
          <p className="text-gray-500">You don't have access to this page.</p>
        </Card>
      </div>
    );
  }

  const statusBody = (rowData) => (
    <Dropdown
      value={rowData.status}
      options={statusOptions}
      onChange={async (e) => {
        setUpdatingId(rowData.id);
        await updateComplaintStatus(rowData.id, e.value);
        setUpdatingId(null);
      }}
      disabled={updatingId === rowData.id}
      className="w-full"
      itemTemplate={(opt) => (
        <Tag value={opt.label} severity={statusSeverity[opt.value]} />
      )}
      valueTemplate={(opt) =>
        opt ? (
          <Tag value={opt.label} severity={statusSeverity[opt.value]} />
        ) : null
      }
    />
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-8 px-0">
      <Card className="w-full shadow-2xl border border-blue-100 bg-white py-12 px-8">
        <h2 className="text-3xl font-extrabold text-blue-700 mb-4 text-center tracking-tight">
          Admin — All Complaints
        </h2>
        <p className="text-center text-gray-500 mb-8">
          {allComplaints.length} total complaint
          {allComplaints.length === 1 ? "" : "s"} across all residents.
        </p>
        <div className="bg-white rounded-lg border border-gray-100 shadow-sm">
          <DataTable
            value={allComplaints}
            paginator
            rows={10}
            className="p-datatable-sm"
            responsiveLayout="scroll"
            emptyMessage={
              <span className="block text-center text-gray-500 py-8 text-lg">
                No complaints yet.
              </span>
            }
          >
            <Column
              field="title"
              header="Title"
              sortable
              className="min-w-[150px]"
            />
            <Column
              field="email"
              header="Resident Email"
              sortable
              className="min-w-[180px]"
            />
            <Column
              field="category"
              header="Category"
              sortable
              className="min-w-[140px]"
            />
            <Column
              field="city"
              header="City"
              sortable
              className="min-w-[100px]"
            />
            <Column
              field="area"
              header="Area"
              sortable
              className="min-w-[100px]"
            />
            <Column
              header="Date"
              body={(r) => formatDate(r.date)}
              sortable
              className="min-w-[110px]"
            />
            <Column
              header="Priority"
              body={priorityBody}
              sortable
              className="min-w-[100px]"
            />
            <Column
              header="Status"
              body={statusBody}
              className="min-w-[160px]"
            />
          </DataTable>
        </div>
      </Card>
    </div>
  );
};

export default AdminDashboard;
