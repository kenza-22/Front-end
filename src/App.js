import { Routes, Route } from "react-router-dom";
import { HomeLayout } from "./pages/Home";
import "tailwindcss/tailwind.css";
import DashboardIssues from "./pages/Dashboards/DashboardsIssues";
import DashboardsProject from "./pages/Dashboards/DashboardsProject";
import DashboardsSprintFinish from "./pages/Dashboards/DashboardsSprintFinish";
import DashboardsSprintProg from "./pages/Dashboards/DashboardsSprintProg";
import AddUser from "./components/AddUser";
import GestionUser from "./pages/GestionUser";
import AssignUser from "./components/AssignUser";
import AddGroup from "./components/AddGroup";
import GestionGroups from "./pages/GestionGroups";
import UpdateUser from "./pages/UpdateUser";
import ListMembers from "./components/Listmembers";
import Welcome from "./components/Welcome";
function App() {
  return (
    <Routes>
      <Route path="/" element={ <HomeLayout/>}>
       
        <Route path="/GestionUser" element={<GestionUser />} />
        <Route path="/GestionGroups" element={<GestionGroups />} />
        <Route path="/Members/:groupId" element={<ListMembers/>} />
        <Route path="/UpdateUser/:userId" element={<UpdateUser/>} />
        <Route path="/AddUser" element={<AddUser />} />
        <Route path="/AddGroup" element={<AddGroup/>} />
        <Route path="/AssignUser/:userId" element={<AssignUser/>} />
        <Route path="/DashboardsIssues" element={<DashboardIssues />}/>
        <Route path="/DashboardsProject" element={<DashboardsProject />} />
        <Route
          path="/DashboardsSprintFinish"
          element={<DashboardsSprintFinish />}
        />
        <Route
          path="/DashboardsSprintProg"
          element={<DashboardsSprintProg />}
        />
      </Route>
    </Routes>
  );
}

export default App;
