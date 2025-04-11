import React, { useState, useEffect } from "react";

const Attendance = () => {
  const [records, setRecords] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedRecord, setEditedRecord] = useState({});

  // Load records from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("attendance-records");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setRecords(parsed);
          console.log("Loaded records from localStorage:", parsed);
        }
      }
    } catch (error) {
      console.error("Failed to parse localStorage data:", error);
    }
  }, []);

  // Save records to localStorage on change
  useEffect(() => {
    localStorage.setItem("attendance-records", JSON.stringify(records));
  }, [records]);

  const handleMarkIn = () => {
    const now = new Date();
    const newRecord = {
      date: now.toLocaleDateString(),
      inTime: now.toLocaleTimeString(),
      outTime: "",
    };
    setRecords([newRecord, ...records]);
  };

  const handleMarkOut = () => {
    const now = new Date();
    setRecords((prev) =>
      prev.map((record, index) => {
        if (index === 0 && !record.outTime) {
          return { ...record, outTime: now.toLocaleTimeString() };
        }
        return record;
      })
    );
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditedRecord({ ...records[index] });
  };

  const handleSave = () => {
    setRecords((prev) =>
      prev.map((record, index) =>
        index === editingIndex ? editedRecord : record
      )
    );
    setEditingIndex(null);
    setEditedRecord({});
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setEditedRecord({});
  };

  const handleChange = (field, value) => {
    setEditedRecord((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-2xl">
      <h1 className="text-2xl font-bold mb-6 text-center">Attendance Sheet</h1>
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={handleMarkIn}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-xl shadow"
        >
          Mark In
        </button>
        <button
          onClick={handleMarkOut}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-xl shadow"
        >
          Mark Out
        </button>
      </div>
      <hr className="text-gray-200 mb-4" />
      <table className="w-full border border-gray-300 rounded-xl md:text-lg text-[12px] overflow-hidden truncate">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 text-left border-b">Date</th>
            <th className="py-2 px-4 text-left border-b">In Time</th>
            <th className="py-2 px-4 text-left border-b">Out Time</th>
            <th className="py-2 px-4 text-left border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((rec, index) => (
            <tr key={index} className="border-t">
              <td className="py-2 px-4">
                {editingIndex === index ? (
                  <input
                    type="text"
                    value={editedRecord.date}
                    onChange={(e) => handleChange("date", e.target.value)}
                    className="border rounded px-2 py-1 w-full"
                  />
                ) : (
                  rec.date
                )}
              </td>
              <td className="py-2 px-4">
                {editingIndex === index ? (
                  <input
                    type="text"
                    value={editedRecord.inTime}
                    onChange={(e) => handleChange("inTime", e.target.value)}
                    className="border rounded px-2 py-1 w-full"
                  />
                ) : (
                  rec.inTime
                )}
              </td>
              <td className="py-2 px-4">
                {editingIndex === index ? (
                  <input
                    type="text"
                    value={editedRecord.outTime}
                    onChange={(e) => handleChange("outTime", e.target.value)}
                    className="border rounded px-2 py-1 w-full"
                  />
                ) : (
                  rec.outTime || "-"
                )}
              </td>
              <td className="py-2 px-4">
                {editingIndex === index ? (
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-gray-400 text-white px-3 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleEdit(index)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Attendance;
