import { Route, Routes } from "react-router-dom";
import HomePage from "./components/home/Homepage";
import Login from "./components/admin/Login";
import Dashboard from "./components/admin/Dashboard";
import GardRoute from "./components/admin/gardRoute";
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/admin" element={<Login />} />
      <Route element={<GardRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
