import { useState } from "react";
import { FiUpload, FiX } from "react-icons/fi";

export default function BulkUserUpload({ onUpload }) {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);

  const handleFile = (selected) => {
    if (!selected) return;

    const allowed = [
      "text/csv",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];

    if (!allowed.includes(selected.type)) {
      alert("Only CSV or Excel files allowed");
      return;
    }

    setFile(selected);
    onUpload(selected);
  };

  return (
    <div>
      <h3 className="text-sm font-medium mb-2">Bulk User Upload (Optional)</h3>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
          handleFile(e.dataTransfer.files[0]);
        }}
        className={`
          border-2 border-dashed rounded-xl
          p-6 text-center cursor-pointer transition
          ${
            dragActive
              ? "border-blue-500 bg-blue-50"
              : "border-black/20 hover:border-blue-400"
          }
        `}
      >
        <input
          type="file"
          accept=".csv,.xls,.xlsx"
          hidden
          id="bulk-upload"
          onChange={(e) => handleFile(e.target.files[0])}
        />

        <label
          htmlFor="bulk-upload"
          className="flex flex-col items-center gap-2 cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full bg-blue-500/15 flex items-center justify-center">
            <FiUpload className="text-blue-600" />
          </div>

          <p className="text-sm">
            <span className="font-semibold text-blue-600">Click to upload</span>{" "}
            or drag & drop
          </p>
          <p className="text-xs text-black/50">CSV / Excel only</p>
        </label>
      </div>

      {file && (
        <div className="mt-3 flex items-center gap-2 text-sm text-green-600">
          ✅ {file.name}
          <button onClick={() => setFile(null)}>
            <FiX />
          </button>
        </div>
      )}
    </div>
  );
}
