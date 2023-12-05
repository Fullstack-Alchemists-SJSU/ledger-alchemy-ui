import './App.css';
import Login from './components/features/login/login';
import ProtectedRoute from './components/common/protectedroute/protected-route';
import Signup from './components/features/signup/Signup';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Profile from './components/features/profile/ProfileComponent';
import Chatbot from './components/features/chatbot/Chatbot';
import Conversation from './components/features/chatbot/Conversation';
import Layout from './components/layout/layout';
import Dashboard from './components/features/dashboard/dashboard';
import MyWallet from './components/features/wallet/wallet';
import Settings from './components/features/settings/settings';
import Goals from './components/features/goals/goals';
import RecentTransactions from './components/features/recent-transactions/recent-transactions';

function App() {
	return (
		<div className="bg-slate-200">
			<BrowserRouter>
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/" element={<ProtectedRoute children={Layout} />}>
						{/* Nested routes */}
						<Route index element={<ProtectedRoute children={Dashboard} />} />
						<Route path="mywallet" element={<ProtectedRoute children={MyWallet} />} />
						<Route path="rcttransactions" element={<ProtectedRoute children={RecentTransactions} />} />
						<Route path="goals" element={<ProtectedRoute children={Goals} />} />
						<Route path="settings" element={<ProtectedRoute children={Settings} />} />
						<Route path="/profile" element={<ProtectedRoute children={Profile} />} />
						<Route path="/chat" element={<ProtectedRoute children={Chatbot} />} />
						<Route path="/chat/:id" element={<ProtectedRoute children={Conversation} />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
