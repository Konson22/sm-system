import React from "react";
import Navbar from "../../components/navbar";

export default function HomePage() {
  return (
    <>
      <Navbar title="Dashboard" />
      <div className="p-4">
        <div className="flex justify-between space-x-6">
          {data.map((item) => (
            <div className="bg-white p-4 rounded-lg shadow-lg flex-1">
              {item.title}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

const data = [
  {
    title: "total students",
    count: 251,
    icon: "",
  },
  {
    title: "fee collection",
    count: 251,
    icon: "",
  },
  {
    title: "attendance",
    count: 251,
    icon: "",
  },
  {
    title: "performance",
    count: 251,
    icon: "",
  },
];
