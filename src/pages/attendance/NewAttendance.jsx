import React from "react";
import Navbar from "../../components/navbar";
import { useContextApi } from "../../context-manager/ContextProvider";

export default function NewAttendance() {
  const { students } = useContextApi();

  const date = new Date();
  const h = date.getHours();
  const time = `${h}:${date.getMinutes()} ${h <= 12 ? "AM" : "PM"}`;

  return (
    <>
      <Navbar title="New Attendance" />
      <div className="flex items-start p-4">
        <div className="w-[45%] bg-white p-1 rounded-lg">
          {students.length > 0 ? (
            <table className="w-full text-left">
              <thead className="border-y-2 bg-gray-100">
                <tr>
                  <td className="px-5 py-3">Student Name</td>
                  <td className="px-5 py-3">Time in</td>
                  <td className="px-5 py-3 text-center">Actions</td>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr className={`${index % 2 ? "bg-gray-100" : ""}`}>
                    <td className="px-5 py-2">
                      <div className="flex items-center">
                        <img
                          src={student.profile_image}
                          className="h-10 w-10 rounded-full"
                          alt=""
                        />
                        {student.name}
                      </div>
                    </td>
                    <td className="px-5 py-2 text-green-500">{time}</td>
                    <td className="px-5 py-2 text-right">
                      <input
                        type="checkbox"
                        className="h-6 w-6"
                        checked={Math.round(Math.random() > 0.5 ? true : false)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="">No students</div>
          )}
        </div>
        <div className="flex-1 h-[65vh] bg-white p-6 rounded-lg shadow-lg ml-5">
          Camera goes here....
        </div>
      </div>
    </>
  );
}
