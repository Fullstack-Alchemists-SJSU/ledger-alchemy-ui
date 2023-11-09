import './App.css';
import Login from './components/features/login/login';
import ProtectedRoute from './components/common/protectedroute/protected-route';
import Signup from './components/features/signup/Signup';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Profile from './components/features/profile/profile';
import Layout from './components/layout/layout';
import Dashboard from './components/dashboard/dashboard';
import MyWallet from './components/wallet/wallet';
import Settings from './components/settings/settings';
import Chatbot from './components/chatbot/chatbot';
import Goals from './components/goals/goals';
import RecentTransactions from './components/recent-transactions/recent-transactions';

function App() {
	return (
		<div className="bg-slate-200">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/user" element={<Layout />}>
						{/* Nested routes */}
						<Route path="dashboard" element={<Dashboard />} />
						<Route path="mywallet" element={<MyWallet />} />
						<Route path="rcttransactions" element={<RecentTransactions />} />
						<Route path="goals" element={<Goals />} />
						<Route path="chatbot" element={<Chatbot />} />
						<Route path="settings" element={<Settings />} />
					</Route>
					<Route
						path="/profile"
						element={
							<ProtectedRoute>
								<Profile />
							</ProtectedRoute>
						}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
