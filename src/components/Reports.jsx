import React, { useEffect, useState } from "react";

const shiftEndTime = new Date();
shiftEndTime.setHours(18, 0, 0, 0); // 6:00 PM

const Reports = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("attendance-records");
    if (saved) {
      setRecords(JSON.parse(saved));
    }
  }, []);

  const calculateTimeDifference = (outTime) => {
    if (!outTime) return { overtime: "-", earlyBy: "-" };

    const out = new Date();
    const [outHour, outMin, outSec] = outTime.split(":").map((t) => parseInt(t));
    const isPM = outTime.includes("PM");

    out.setHours(isPM && outHour !== 12 ? outHour + 12 : outHour, outMin, outSec);

    const shiftEnd = new Date(out);
    shiftEnd.setHours(18, 0, 0); // 6:00 PM

    const diffMs = out.getTime() - shiftEnd.getTime();
    const diffMin = Math.floor(Math.abs(diffMs) / 60000);
    const hrs = Math.floor(diffMin / 60);
    const mins = diffMin % 60;
    const formatted = `${hrs > 0 ? `${hrs}h ` : ""}${mins}m`;

    if (diffMs > 0) {
      return { overtime: formatted, earlyBy: "-" };
    } else if (diffMs < 0) {
      return { overtime: "-", earlyBy: formatted };
    } else {
      return { overtime: "-", earlyBy: "-" };
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-2xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Attendance Report</h2>
      <table className="w-full border md:text-xl text-[11px] truncate border-gray-300 rounded-md overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 text-left border-b">Date</th>
            <th className="py-2 px-4 text-left border-b">In Time</th>
            <th className="py-2 px-4 text-left border-b">Out Time</th>
            <th className="py-2 px-4 text-left border-b">Overtime</th>
            <th className="py-2 px-4 text-left border-b">Early By</th>
          </tr>
        </thead>
        <tbody>
          {records.map((rec, idx) => {
            const { overtime, earlyBy } = calculateTimeDifference(rec.outTime);
            return (
              <tr key={idx} className="border-t">
                <td className="py-2 px-4">{rec.date}</td>
                <td className="py-2 px-4">{rec.inTime}</td>
                <td className="py-2 px-4">{rec.outTime || "-"}</td>
                <td className="py-2 px-4">{overtime}</td>
                <td className="py-2 px-4">{earlyBy}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Reports;
