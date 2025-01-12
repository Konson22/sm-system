import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import { useParams } from "react-router-dom";
import { useContextApi } from "../../context-manager/ContextProvider";

export default function ViewAttendance() {
  const { department } = useParams();
  const { students } = useContextApi();
  const [selectedDept, setSelectedDept] = useState([]);

  useEffect(() => {
    const results = students.filter((s) => s.department === department);
    results.length > 0 && setSelectedDept(students);
  }, [students]);

  return (
    <>
      <Navbar title="View Attendance" />
      <div className="p-4">
        <div className="bg-white p-6">
          <h2 className="text-2xl font-bold mb-7">
            {department} students attendance
          </h2>
          {selectedDept.length > 0 ? (
            <table className="w-full text-left">
              <thead className="bg-gray-100 border-y-2">
                <tr>
                  <th className="py-3 px-5">Name</th>
                  <th className="py-3 px-5">Gender</th>
                  <th className="py-3 px-5">Date</th>
                  <th className="py-3 px-5">Time</th>
                  <th className="py-3 px-5">Status</th>
                </tr>
              </thead>
              <tbody>
                {selectedDept.map((student, index) => (
                  <tr className={`${index % 2 ? "bg-gray-100" : ""}`}>
                    <td className="px-5 py-2">{student.name}</td>
                    <td className="px-5 py-2">{student.gender}</td>
                    <td className="px-5 py-2">{new Date().toDateString()}</td>
                    <td className="px-5 py-2">{student.age}</td>
                    <td className="px-5 py-2">
                      {Math.random() > 0.5 ? (
                        <span className="px-3 py-1 text-white rounded bg-green-600">
                          Presence
                        </span>
                      ) : (
                        <span className="px-3 py-1 text-white rounded bg-red-600">
                          Absent
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="">no data</div>
          )}
        </div>
      </div>
    </>
  );
}
