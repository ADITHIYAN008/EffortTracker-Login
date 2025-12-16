import { useState } from "react";
import { FiX } from "react-icons/fi";
import { getBatchStatus } from "../../../util/getBatchStatus";

function BatchDetailsModal({ mode, batch, onClose, onUpdateBatch }) {
  const isView = mode === "view";

  const formatToInputDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toISOString().split("T")[0];
  };

  const [formData, setFormData] = useState({
    ...batch,
    startDate: formatToInputDate(batch.startDate),
    endDate: formatToInputDate(batch.endDate),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const updatedStatus = getBatchStatus(formData.startDate, formData.endDate);

    onUpdateBatch({
      ...formData,
      status: updatedStatus,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg overflow-hidden">
        {/* HEADER */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <div>
            <h2 className="text-lg font-semibold">
              {mode === "view" && "Batch Details"}
              {mode === "edit" && "Edit Batch"}
            </h2>
            <p className="text-sm text-black/50">
              {mode === "view"
                ? "View batch information"
                : "Update batch details"}
            </p>
          </div>
          <button onClick={onClose}>
            <FiX size={18} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-black/70">Batch Name</label>
              <input
                name="name"
                disabled={isView}
                value={formData.name}
                onChange={handleChange}
                className="w-full h-10 border rounded-md px-3 text-sm"
              />
            </div>

            <div>
              <label className="text-sm text-black/70">Start Date</label>
              <input
                type="date"
                name="startDate"
                disabled={isView}
                value={formData.startDate}
                onChange={handleChange}
                className="w-full h-10 border rounded-md px-3 text-sm"
              />
            </div>

            <div>
              <label className="text-sm text-black/70">End Date</label>
              <input
                type="date"
                name="endDate"
                disabled={isView}
                value={formData.endDate}
                onChange={handleChange}
                className="w-full h-10 border rounded-md px-3 text-sm"
              />
            </div>
          </div>

          <div className="text-xs bg-blue-50 border border-blue-200 p-3 rounded-md">
            ℹ Batch creation and deletion are restricted. Only updates are
            permitted.
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-md text-sm"
          >
            Close
          </button>

          {mode === "edit" && (
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Update Batch
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default BatchDetailsModal;
