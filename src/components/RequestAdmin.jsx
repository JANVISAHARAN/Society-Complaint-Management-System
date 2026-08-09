import React, { useState } from "react";
import { Card } from "primereact/card";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { useComplaints } from "./ComplaintsContext";

const statusSeverity = {
  pending: "warning",
  approved: "success",
  rejected: "danger",
};

const RequestAdmin = () => {
  // CHANGED: also read myAdminRequestLoaded so we don't flash the form
  // before we actually know whether a request already exists.
  const {
    isAdmin,
    myAdminRequest,
    myAdminRequestLoaded,
    requestAdminAccess,
    loading,
  } = useComplaints();
  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(""); // CHANGED

  if (loading || !myAdminRequestLoaded) return null; // CHANGED: wait for real data, not a guess

  const handleSubmit = async () => {
    setSubmitting(true);
    setFormError("");
    const result = await requestAdminAccess(reason);
    setSubmitting(false);
    if (!result.ok) {
      setFormError(result.message || "Could not submit request.");
      return;
    }
    setReason("");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 pt-20 pb-8 px-4">
      <Card className="w-full max-w-xl shadow-2xl border border-blue-100 bg-white py-12 px-8 text-center">
        <h2 className="text-2xl font-extrabold text-blue-700 mb-4">
          Request Admin Access
        </h2>

        {isAdmin && (
          <p className="text-gray-500 text-lg">You're already an admin.</p>
        )}

        {!isAdmin && myAdminRequest?.status === "pending" && (
          <div>
            <Tag
              value="Pending review"
              severity={statusSeverity.pending}
              className="mb-3"
            />
            <p className="text-gray-500">
              Your request is waiting for an existing admin to review it. You'll
              get admin access automatically once it's approved — no need to
              resubmit.
            </p>
          </div>
        )}

        {!isAdmin && myAdminRequest?.status === "rejected" && (
          <div>
            <Tag
              value="Rejected"
              severity={statusSeverity.rejected}
              className="mb-3"
            />
            <p className="text-gray-500 mb-6">
              Your previous request was reviewed and not approved. You can
              submit a new one below.
            </p>
            <RequestForm
              reason={reason}
              setReason={setReason}
              onSubmit={handleSubmit}
              submitting={submitting}
              error={formError}
            />
          </div>
        )}

        {/* CHANGED: handles a request that says 'approved' even though the
            person isn't currently an admin — e.g. their access was later
            revoked. Without this branch, nothing rendered at all. */}
        {!isAdmin && myAdminRequest?.status === "approved" && (
          <div>
            <Tag value="Access revoked" severity="danger" className="mb-3" />
            <p className="text-gray-500 mb-6">
              You were previously approved, but you no longer have admin access.
              You can submit a new request below.
            </p>
            <RequestForm
              reason={reason}
              setReason={setReason}
              onSubmit={handleSubmit}
              submitting={submitting}
              error={formError}
            />
          </div>
        )}

        {!isAdmin && !myAdminRequest && (
          <RequestForm
            reason={reason}
            setReason={setReason}
            onSubmit={handleSubmit}
            submitting={submitting}
            error={formError}
          />
        )}
      </Card>
    </div>
  );
};

const RequestForm = ({ reason, setReason, onSubmit, submitting, error }) => (
  <div className="text-left">
    <p className="text-gray-500 mb-4 text-center">
      Submitting a request notifies existing admins. They can approve or reject
      it — you won't gain access until one of them does.
    </p>
    <InputTextarea
      value={reason}
      onChange={(e) => setReason(e.target.value)}
      rows={3}
      placeholder="Why do you need admin access? (optional, but helps reviewers decide)"
      className="w-full mb-4"
    />
    {error && <p className="text-red-600 text-sm mb-3 text-center">{error}</p>}
    <Button
      label="Submit Request"
      className="w-full bg-blue-600 border-0 text-white font-bold py-3 rounded-lg"
      onClick={onSubmit}
      loading={submitting}
    />
  </div>
);

export default RequestAdmin;
