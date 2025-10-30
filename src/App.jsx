import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import AdminProfile from "./pages/Admin/AdminProfile.jsx";
import CreateVacancy from "./pages/Admin/CreateVacancy.jsx";
import ManageVacancies from "./pages/Admin/ManageVacancies.jsx";
import CandidateProfile from "./pages/Candidate/CandidateProfile.jsx";
import JobList from "./pages/Candidate/JobList.jsx";
import AppliedJobs from "./pages/Candidate/AppliedJobs.jsx";
import MainLayout from "./layout/MainLayout.jsx";

function App() {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Register />} />

      {/* Rutas protegidas con navbar */}
      <Route element={<MainLayout />}>
        {/* Admin */}
        <Route path="/a/perfil" element={<AdminProfile />} />
        <Route path="/a/crearVacante" element={<CreateVacancy />} />
        <Route path="/a/gestionarVacantes" element={<ManageVacancies />} />

        {/* Candidato */}
        <Route path="/c/perfil" element={<CandidateProfile />} />
        <Route path="/c/vacantes" element={<JobList />} />
        <Route path="/c/vacantesAplicadas" element={<AppliedJobs />} />
      </Route>
    </Routes>
  );
}

export default App;
