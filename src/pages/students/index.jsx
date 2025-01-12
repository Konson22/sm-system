import React, { useEffect, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { useContextApi } from "../../context-manager/ContextProvider";
import Navbar from "../../components/navbar";
import { Link } from "react-router-dom";

export default function StudentsPage() {
  const { students } = useContextApi();
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("All Students");

  useEffect(() => {
    if (students.length) {
      const departmentList = [...new Set(students.map((s) => s.department))];
      setDepartments(departmentList);
      setSelectedStudents(students);
    }
  }, []);

  useEffect(() => {
    if (students.length) {
      if (selectedDepartment === "All Students") {
        setSelectedStudents(students);
      } else {
        const departmentList = students.filter(
          (s) => s.department == selectedDepartment
        );
        setSelectedStudents(departmentList);
      }
    }
  }, [selectedDepartment]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    const results = students.filter((item) => {
      return (
        item.name.toLowerCase().startsWith(query) ||
        item.department.toLowerCase().startsWith(query) ||
        item.faculty.toLowerCase().startsWith(query)
      );
    });
    results.length > 0 && setSelectedStudents(results);
  };

  return (
    <>
      <Navbar title="Students Management" />
      <div className="p-4">
        <div className="bg-white p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">{selectedDepartment}</h2>
            <div className="flex">
              <Dropdown
                title="Department"
                width="w-[250px]"
                data={departments}
                setSelectedDepartment={setSelectedDepartment}
              />
              <div className="flex bg-gray-100 rounded ml-3 w-[350px] border border-gray-400">
                <input
                  className="h-12 bg-transparent w-full px-4"
                  type="search"
                  onChange={handleSearch}
                  placeholder="Search..."
                />
              </div>
            </div>
          </div>
          {selectedStudents.length > 0 ? (
            <table className="w-full text-left text-base">
              <thead className="bg-gray-200">
                <tr>
                  <td className="px-5 py-3">Name</td>
                  <td className="px-5 py-3">Gender</td>
                  <td className="px-5 py-3">Age</td>
                  <td className="px-5 py-3">Faculty</td>
                  <td className="px-5 py-3">Department</td>
                  <td className="px-5 py-3">Year</td>
                  <td className="px-5 py-3 text-center">Actions</td>
                </tr>
              </thead>
              <tbody>
                {selectedStudents.map((student, index) => (
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
                    <td className="px-5 py-2">{student.age}</td>
                    <td className="px-5 py-2">{student.faculty}</td>
                    <td className="px-5 py-2">{student.department}</td>
                    <td className="px-5 py-2">{student.year}</td>
                    <td className="px-5 py-2 text-right">
                      <Link
                        className="bg-blue-600 text-base rounded text-white px-3 py-1"
                        to={`profile/${student.id}`}
                      >
                        profile
                      </Link>
                      <Link
                        className="bg-green-600 text-base rounded text-white px-3 py-1"
                        to={`edit/${student.id}`}
                      >
                        Edit
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

function Dropdown({ title, data, setSelectedDepartment, width = "w-[200px]" }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className="flex items-center justify-between ml-4 border border-gray-400 bg-gray-100 px-6 rounded relative py-2 cursor-pointer"
      onClick={() => setIsOpen(!isOpen)}
    >
      {title} <FiChevronDown className="ml-3" />
      {isOpen && (
        <div
          className={`${width} absolute right-0 py-2 top-full bg-gray-50 border border-gray-300`}
        >
          <div
            className="px-5 py-1 hover:bg-gray-200"
            onClick={() => setSelectedDepartment("All Students")}
          >
            All Students
          </div>
          {data.map((item) => (
            <div
              className="px-5 py-1 hover:bg-gray-200"
              onClick={() => setSelectedDepartment(item)}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
