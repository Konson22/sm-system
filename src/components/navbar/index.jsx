import React from "react";

export default function Navbar({ title }) {
  return (
    <nav className="bg-white sticky left-0 top-0 right-0 z-40 flex items-center justify-between px-[3%] h-[4.5rem]">
      <div className="">
        <span className="text-3xl">{title}</span>
      </div>
    </nav>
  );
}
