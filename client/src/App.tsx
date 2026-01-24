import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import LoginGuard from "./routes/LoginGuard";
import HomePage from "./pages/home/Home";
import Register from "./pages/auth/Register";
import CoursePage from "./pages/course/Course";

function App() {
  return (
    <div>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />

          <Route
            path="/course/:courseId/module/:moduleId/lesson/:lessonId"
            element={<CoursePage />}
          />
        </Route>

        <Route
          path="/login"
          element={
            <LoginGuard>
              <Login />
            </LoginGuard>
          }
        />
        <Route
          path="/register"
          element={
            <LoginGuard>
              <Register />
            </LoginGuard>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
