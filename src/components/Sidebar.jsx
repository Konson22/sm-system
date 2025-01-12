import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-[20%] bg-sky-500 text-white">
      <div className="h-[4.5rem] flex items-center px-5 bg-sky-600">
        <span className="text-3xl">SM-System</span>
      </div>
      <ul className="">
        {data.map((link) => (
          <li className="">
            <Link
              className="block py-3 hover:bg-white hover:text-gray-800 px-6"
              to={link.path}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

const data = [
  { name: "Dashboard", path: "/" },
  { name: "Students Management", path: "/students" },
  { name: "Attendance Management", path: "/attendance" },
  { name: "Courses Management", path: "/courses" },
  { name: "Examination and Grades", path: "/examination" },
  { name: "Reports", path: "/reports" },
];
