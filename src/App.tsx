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
import { useEffect } from 'react';

function App() {
	return (
		<div className="bg-slate-200">
			<BrowserRouter>
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route
						path="/"
						element={
							<ProtectedRoute>
								<Layout />{' '}
							</ProtectedRoute>
						}
					>
						{/* Nested routes */}
						<Route
							index
							element={
								<ProtectedRoute>
									<Dashboard />{' '}
								</ProtectedRoute>
							}
						/>
						<Route
							path="mywallet"
							element={
								<ProtectedRoute>
									<MyWallet />{' '}
								</ProtectedRoute>
							}
						/>
						<Route
							path="rcttransactions"
							element={
								<ProtectedRoute>
									<RecentTransactions />{' '}
								</ProtectedRoute>
							}
						/>
						<Route
							path="goals"
							element={
								<ProtectedRoute>
									<Goals />{' '}
								</ProtectedRoute>
							}
						/>
						<Route
							path="settings"
							element={
								<ProtectedRoute>
									<Settings />{' '}
								</ProtectedRoute>
							}
						/>
						<Route
							path="/profile"
							element={
								<ProtectedRoute>
									<Profile />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/chat"
							element={
								// <ProtectedRoute>
								<Chatbot />
								//</ProtectedRoute>
							}
						/>
						<Route
							path="/chat/:id"
							element={
								// <ProtectedRoute>
								<Conversation />
								//</ProtectedRoute>
							}
						/>
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
