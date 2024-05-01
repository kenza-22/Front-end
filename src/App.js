import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Home } from './pages/Home';
import 'tailwindcss/tailwind.css';
import DashboardIssues from './pages/Dashboards/DashboardsIssues';
import DashboardsProject from './pages/Dashboards/DashboardsProject';
import DashboardsSprintFinish from './pages/Dashboards/DashboardsSprintFinish';
import DashboardsSprintProg from './pages/Dashboards/DashboardsSprintProg';
import Landing from './pages/Landing';
import Login from './pages/login';
function App() {
	return (
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/DashboardsIssues" element={<DashboardIssues />}/>
				<Route path="/DashboardsProject" element={<DashboardsProject />}/>
				<Route path="/DashboardsSprintFinish" element={<DashboardsSprintFinish />}/>
				<Route path="/DashboardsSprintProg" element={<DashboardsSprintProg />}/>
			</Routes>
	);
}

export default App;
