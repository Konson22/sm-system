import { useState, useContext, createContext, useEffect } from "react";
import axiosInstance from "../utils/useAxios";
import { Navigate, useNavigate } from "react-router-dom";
import studentsData from "../constances/students.json";

const contextApi = createContext();

export const useContextApi = () => useContext(contextApi);

export default function ContextProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [message, setMessage] = useState("");
  const [profile, setProfile] = useState(null);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    setStudents(studentsData);
  }, []);

  const value = {
    loading,
    message,
    students,
  };

  return <contextApi.Provider value={value}>{children}</contextApi.Provider>;
}
