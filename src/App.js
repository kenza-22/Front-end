import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import 'tailwindcss/tailwind.css';
import Landing from './pages/Landing';
import Login from './pages/login';
function App() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/login" element={<Login />} />
		</Routes>
	);
}

export default App;
