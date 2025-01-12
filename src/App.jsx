import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home";
import Sidebar from "./components/Sidebar";
import Attendance from "./pages/attendance";
import NewAttendance from "./pages/attendance/NewAttendance";
import ExaminationPage from "./pages/examination";
import CoursesPage from "./pages/courses";
import ReportsPage from "./pages/reports";
import StudentsPage from "./pages/students";
import StudentProfile from "./pages/students/Profile";
import EditProfile from "./pages/students/Edit";
import ViewAttendance from "./pages/attendance/ViewAttendance";

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
          <Route path="/attendance">
            <Route index element={<Attendance />} />
            <Route path="new" element={<NewAttendance />} />
            <Route path="view/:department" element={<ViewAttendance />} />
          </Route>
        </Routes>
      </div>
    </main>
  );
}

export default App;
