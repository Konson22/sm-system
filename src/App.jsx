import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home";
import Navbar from "./components/navbar";
import Sidebar from "./components/Sidebar";
import Attendance from "./pages/students/Attendance";
import ExaminationPage from "./pages/examination";
import CoursesPage from "./pages/courses";
import ReportsPage from "./pages/reports";
import StudentsPage from "./pages/students";
import StudentProfile from "./pages/students/Profile";
import EditProfile from "./pages/students/Edit";

function App() {
  return (
    <main className="flex bg-slate-100 text-gray-700 min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/students">
            <Route index element={<StudentsPage />} />
            <Route path="profile/:id" element={<StudentProfile />} />
            <Route path="edit/:id" element={<EditProfile />} />
          </Route>
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/examination" element={<ExaminationPage />} />
          <Route path="/attendance" element={<Attendance />} />
        </Routes>
      </div>
    </main>
  );
}

export default App;
