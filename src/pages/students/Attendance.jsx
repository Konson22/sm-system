import React from "react";
import { useContextApi } from "../../context-manager/ContextProvider";
import Navbar from "../../components/navbar";

export default function Attendance() {
  const { students } = useContextApi();
  return (
    <>
      <Navbar title="Attendance" />
      <div className="p-4">
        <div className="bg-white p-6 mt-5">
          {students.length > 0 ? (
            <table className="w-full text-left">
              <thead className="bg-gray-200">
                <tr>
                  <td className="px-5 py-3">Name</td>
                  <td className="px-5 py-3">Gender</td>
                  <td className="px-5 py-3">Faculty</td>
                  <td className="px-5 py-3">Department</td>
                  <td className="px-5 py-3">Year</td>
                  <td className="px-5 py-3 text-center">Actions</td>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr className={`${index % 2 ? "bg-gray-100" : ""}`}>
                    <td className="px-5 py-2">
                      <div className="flex items-center">
                        <img
                          className="h-12 w-12 rounded-full mr-3"
                          src={student.profile_image}
                          alt=""
                        />
                        {student.name}
                      </div>
                    </td>
                    <td className="px-5 py-2">{student.gender}</td>
                    <td className="px-5 py-2">{student.faculty}</td>
                    <td className="px-5 py-2">{student.department}</td>
                    <td className="px-5 py-2">{student.year}</td>
                    <td className="px-5 py-2 text-right">
                      <button className="bg-blue-600 text-base rounded text-white px-3 py-1">
                        profile
                      </button>
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
