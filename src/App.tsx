import './App.css';
import Login from './components/features/login/login';
import ProtectedRoute from './components/common/protectedroute/protected-route';
import Signup from './components/features/signup/Signup';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Profile from './components/features/profile/Profile';
import Chatbot from './components/features/chatbot/Chatbot';
import Conversation from './components/features/chatbot/Conversation';

function App() {
	return (
		<div className="bg-slate-200">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
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
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
