function BatchOverview({ batch }) {
  if (!batch) {
    return (
      <div className="border border-black/10 p-6 rounded-2xl text-sm text-black/50">
        Select a batch to view overview details
      </div>
    );
  }

  return (
    <div className="border border-black/10 p-6 rounded-2xl space-y-6">
      <h2 className="text-lg font-semibold">Batch Overview – {batch.code}</h2>

      <div className="grid grid-cols-4 gap-6">
        <div>
          <p className="text-xs text-black/50">Batch Timeline</p>
          <p className="font-medium">
            {batch.startDate} – {batch.endDate}
          </p>
          <p className="text-xs text-black/40">16 Weeks</p>
        </div>

        <div>
          <p className="text-xs text-black/50">Trainee Count</p>
          <p className="font-medium">{batch.trainees} / 30</p>
          <p className="text-xs text-green-600">93% Capacity</p>
        </div>

        <div>
          <p className="text-xs text-black/50">Avg. Attendance</p>
          <p className="font-medium">92%</p>
          <p className="text-xs text-green-600">Above Target</p>
        </div>

        <div>
          <p className="text-xs text-black/50">Assessment Score</p>
          <p className="font-medium">85%</p>
          <p className="text-xs text-green-600">Good Performance</p>
        </div>
      </div>

      <div className="border-t pt-4 text-sm text-black/60">
        🔒 <strong>Access Control:</strong>
        Batch deletion is restricted while the batch is ongoing.
      </div>
    </div>
  );
}

export default BatchOverview;
