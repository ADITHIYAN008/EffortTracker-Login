import { useState } from "react";
import { FiX } from "react-icons/fi";
import { getBatchStatus } from "../../../util/getBatchStatus";

function AddBatchModal({ onClose, onAdd }) {
  const [form, setForm] = useState({
    name: "",
    startDate: "",
    endDate: "",
    trainees: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = () => {
    const { name, startDate, endDate, trainees } = form;

    /* =========================
       VALIDATIONS
    ========================== */

    // Required fields
    if (!name || !startDate || !endDate || !trainees) {
      alert("Please fill all required fields");
      return;
    }

    // Date validation
    if (new Date(endDate) < new Date(startDate)) {
      alert("End date cannot be before start date");
      return;
    }

    const status = getBatchStatus(startDate, endDate);

    onAdd({
      code: `IGNITE-${Date.now()}`,
      name,
      domain: "Not Specified",
      startDate,
      endDate,
      trainees: Number(trainees),
      status,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg">
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Add Batch</h2>
          <button onClick={onClose}>
            <FiX />
          </button>
        </div>

        <div className="p-6 grid grid-cols-2 gap-4">
          <input
            name="name"
            placeholder="Batch Name"
            value={form.name}
            onChange={handleChange}
            className="border rounded-md px-3 h-10"
          />

          <input
            type="number"
            name="trainees"
            placeholder="Trainees Count"
            value={form.trainees}
            onChange={handleChange}
            className="border rounded-md px-3 h-10"
          />

          <input
            type="date"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
            className="border rounded-md px-3 h-10"
          />

          <input
            type="date"
            name="endDate"
            value={form.endDate}
            min={form.startDate} // 🔒 prevents earlier date selection
            onChange={handleChange}
            className="border rounded-md px-3 h-10"
          />
        </div>

        <div className="flex justify-end gap-3 px-6 py-4 border-t">
          <button onClick={onClose} className="px-4 py-2 border rounded-md">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Add Batch
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddBatchModal;
