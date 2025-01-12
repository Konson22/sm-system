import React, { useEffect, useState } from "react";
import { useContextApi } from "../../context-manager/ContextProvider";
import Navbar from "../../components/navbar";
import { Link } from "react-router-dom";

export default function Attendance() {
  const { students } = useContextApi();
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    if (students.length > 0) {
      const depts = students.map((i) => i.department);
      const res = [...new Set(depts)];
      setDepartments(res);
    }
  }, [students]);
  return (
    <>
      <Navbar title="Attendance" />
      <div className="p-4">
        <div className="flex">
          <Link className="bg-blue-600 text-white px-6 py-2 rounded" to="new">
            New Attendance
          </Link>
        </div>
        <div className="bg-white flex-1 p-6 mt-5">
          {departments.length > 0 ? (
            <table className="w-full text-left">
              <thead className="border-y-2 bg-gray-100">
                <tr>
                  <td className="px-5 py-3">Department</td>
                  <td className="px-5 py-3">Students</td>
                  <td className="px-5 py-3">Date</td>
                  <td className="px-5 py-3">Attendance</td>
                  <td className="px-5 py-3">Absents</td>
                  <td className="px-5 py-3 text-center">Actions</td>
                </tr>
              </thead>
              <tbody>
                {departments.map((dept, index) => (
                  <tr className={`${index % 2 ? "bg-gray-100" : ""}`}>
                    <td className="px-5 py-2">{dept}</td>
                    <td className="px-5 py-2">251</td>
                    <td className="px-5 py-2">{new Date().toDateString()}</td>
                    <td className="px-5 py-2 text-green-500">
                      {Math.round(Math.random() * 100)}%
                    </td>
                    <td className="px-5 py-2 text-red-500">27%</td>
                    <td className="px-5 py-2 text-right">
                      <Link
                        className="bg-green-600 text-base rounded text-white px-3 py-1"
                        to={`view/${dept}`}
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="">No students</div>
          )}
        </div>
      </div>
    </>
  );
}
