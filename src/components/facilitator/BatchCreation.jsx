import { useState } from "react";
import { useNotifications } from "../../context/NotificationContext";

/* =======================
   CONSTANTS
======================= */

const initialFormState = {
  batchName: "",
  batchCode: "IGNITE-2025-",
  domain: "",
  startDate: "",
  endDate: "",
  duration: "16 Weeks",
  capacity: "",
  enrollment: 0,
  waitlist: false,
  mode: "",
  status: "",
};

/* =======================
   HELPER COMPONENTS
======================= */

const Section = ({ title, children }) => (
  <div className="bg-white border border-black/10 rounded-xl p-6 space-y-4">
    <h2 className="font-medium">{title}</h2>
    {children}
  </div>
);

const TwoCol = ({ children }) => (
  <div className="grid grid-cols-2 gap-4">{children}</div>
);

const ThreeCol = ({ children }) => (
  <div className="grid grid-cols-3 gap-4">{children}</div>
);

const Input = ({ label, helper, error, ...props }) => (
  <div>
    <label className="text-sm text-black/70">{label}</label>
    <input
      {...props}
      className={`w-full h-10 mt-1 border rounded-md px-3 text-sm
        focus:outline-none focus:ring-2
        ${error ? "border-red-400 focus:ring-red-400" : "focus:ring-blue-400"}
      `}
    />
    {helper && <p className="text-xs text-black/40">{helper}</p>}
    {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
  </div>
);

const Select = ({ label, options, error, ...props }) => (
  <div>
    <label className="text-sm text-black/70">{label}</label>
    <select
      {...props}
      className={`w-full h-10 mt-1 border rounded-md px-3 text-sm
        focus:outline-none focus:ring-2
        ${error ? "border-red-400 focus:ring-red-400" : "focus:ring-blue-400"}
      `}
    >
      <option value="">Select</option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
    {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
  </div>
);

/* =======================
   MAIN COMPONENT
======================= */

function BatchCreation() {
  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isPublishing, setIsPublishing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { pushNotification } = useNotifications();

  /* =======================
     HANDLERS
  ======================= */

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if ((name === "capacity" || name === "enrollment") && value < 0) return;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.batchName.trim()) newErrors.batchName = "Batch name is required";
    if (!form.domain) newErrors.domain = "Domain is required";
    if (!form.startDate) newErrors.startDate = "Start date is required";
    if (!form.endDate) newErrors.endDate = "End date is required";
    if (!form.capacity) newErrors.capacity = "Capacity is required";
    if (!form.mode) newErrors.mode = "Mode is required";
    if (!form.status) newErrors.status = "Status is required";

    if (Number(form.enrollment) > Number(form.capacity)) {
      newErrors.enrollment = "Enrollment cannot exceed capacity";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePublish = () => {
    if (!validateForm()) return;

    setIsPublishing(true);

    setTimeout(() => {
      setIsPublishing(false);
      setShowSuccess(true);

      pushNotification({
        title: "New Batch Created",
        message: `${form.batchName} has been published`,
      });

      setTimeout(() => {
        setShowSuccess(false);
        setForm(initialFormState);
      }, 1800);
    }, 1200);
  };

  const handleCancel = () => {
    if (confirm("Discard all changes?")) {
      setForm(initialFormState);
      setErrors({});
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Create New Batch</h1>
        <p className="text-sm text-black/50">
          Set up a new Ignite batch with all necessary details
        </p>
      </div>

      <Section title="Basic Batch Details">
        <TwoCol>
          <Input
            label="Batch Name *"
            name="batchName"
            value={form.batchName}
            onChange={handleChange}
            error={errors.batchName}
          />

          <Input
            label="Batch Code"
            value={form.batchCode}
            disabled
            helper="Auto-generated"
          />

          <Input label="Program Name" value="TCS Ignite" disabled />

          <Select
            label="Domain *"
            name="domain"
            value={form.domain}
            onChange={handleChange}
            error={errors.domain}
            options={[
              "Not Specified",
              "Full Stack",
              "Java",
              "AI / ML",
              "Cloud",
              "Data Engineering",
            ]}
          />
        </TwoCol>
      </Section>

      <Section title="Batch Timeline">
        <ThreeCol>
          <Input
            type="date"
            label="Start Date *"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
            error={errors.startDate}
          />

          <Input
            type="date"
            label="End Date *"
            name="endDate"
            value={form.endDate}
            onChange={handleChange}
            error={errors.endDate}
          />

          <Select
            label="Duration"
            name="duration"
            value={form.duration}
            onChange={handleChange}
            options={["8 Weeks", "12 Weeks", "16 Weeks", "24 Weeks"]}
          />
        </ThreeCol>
      </Section>

      {/* CAPACITY */}
      <Section title="Batch Capacity">
        <ThreeCol>
          <Input
            label="Maximum Trainees *"
            name="capacity"
            value={form.capacity}
            onChange={handleChange}
            error={errors.capacity}
          />

          <Input
            label="Current Enrollment"
            name="enrollment"
            type="number"
            value={form.enrollment}
            onChange={handleChange}
            helper="Starts at 0"
            error={errors.enrollment}
          />

          <div className="flex items-center gap-2 mt-6">
            <input
              type="checkbox"
              name="waitlist"
              checked={form.waitlist}
              onChange={handleChange}
            />
            <label className="text-sm">Enable waitlist</label>
          </div>
        </ThreeCol>
      </Section>

      {/* TRAINING STRUCTURE */}
      <Section title="Training Structure">
        <TwoCol>
          <Select
            label="Mode *"
            name="mode"
            value={form.mode}
            onChange={handleChange}
            error={errors.mode}
            options={["Online", "Offline"]}
          />
          <div />
        </TwoCol>
      </Section>

      {/* STATUS */}
      <Section title="Batch Status">
        <TwoCol>
          <Select
            label="Status *"
            name="status"
            value={form.status}
            onChange={handleChange}
            error={errors.status}
            options={["Upcoming", "Stream Specified"]}
          />
          <div />
        </TwoCol>
      </Section>

      {/* ACTIONS */}
      <div className="flex gap-3">
        <button
          onClick={handlePublish}
          disabled={isPublishing}
          className="bg-blue-600 hover:bg-blue-500 cursor-pointer text-white px-6 py-2 rounded-lg disabled:opacity-60"
        >
          {isPublishing ? "Publishing..." : "Publish Batch"}
        </button>

        <button
          onClick={handleCancel}
          className="px-6 hover:bg-black/5 rounded-lg cursor-pointer py-2"
        >
          Cancel
        </button>
      </div>

      {/* SUCCESS MODAL */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl p-8 w-80 text-center animate-scaleIn">
            <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                viewBox="0 0 24 24"
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-semibold">Batch Published</h3>
            <p className="text-sm text-black/50">The batch is now live</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default BatchCreation;
