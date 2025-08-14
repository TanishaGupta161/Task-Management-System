import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AllTask from "./pages/AllTask";
import ImportantTask from "./pages/ImportantTask";
import CompletedTask from "./pages/CompletedTask";
import InCompletedTask from "./pages/InCompletedTask";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Home Layout */}
        <Route path="/home" element={<Home />}>
          <Route index element={<AllTask />} />
          <Route path="important-task" element={<ImportantTask />} />
          <Route path="completed-task" element={<CompletedTask />} />
          <Route path="incompleted-task" element={<InCompletedTask />} />
        </Route>

       
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
