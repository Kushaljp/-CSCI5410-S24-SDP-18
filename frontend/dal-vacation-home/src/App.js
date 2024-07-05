import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/user-authentication/Login';
import Register from './components/user-authentication/Register';
import  AddProperty  from './components/AddProperty';
import  RoomDetails  from './components/RoomDetails';
import ListApprovals from './components/ListApprovals';
import ListRooms from './components/ListRooms';
import AgentDashboard from './components/dashboard/AgentDashboard';
import UserDashboard from './components/dashboard/UserDashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/agentdashboard" element={<AgentDashboard/>} />
        <Route path="/userdashboard" element={<UserDashboard/>} />
        <Route path="/addproperty" element={<AddProperty/>} />
        <Route path="/roomdetails" element={<RoomDetails/>} />
        <Route path="/listrooms" element={<ListRooms/>} />
        <Route path="/listapprovals" element={<ListApprovals/>} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
