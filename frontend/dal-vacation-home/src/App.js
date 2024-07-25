import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/user-authentication/Login';
import Register from './components/user-authentication/Register';
import  AddProperty  from './components/AddProperty';
import  RoomDetails  from './components/RoomDetails';
import ListApprovals from './components/ListApprovals';
import ListRooms from './components/ListRooms';
import AgentDashboard from './components/dashboard/AgentDashboard';
import UserDashboard from './components/dashboard/UserDashboard'
import LandingPage from './components/LandingPage';
import AddConcerns from './components/concerns/AddConcerns';
import SubscribeConcerns from './components/concerns/SubscribeConcerns';
import EditProperty from './components/EditProperty';
import Home from './components/Home';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/agentdashboard" element={<AgentDashboard/>} />
        <Route path="/userdashboard" element={<UserDashboard/>} />
        <Route path="/addproperty" element={<AddProperty/>} />
        <Route path="/room/:id" element={<RoomDetails />} />
        <Route path="/landing" element={<LandingPage/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/addconcerns" element={<AddConcerns/>}/>
        <Route path="/subscribedconcerns" element={<SubscribeConcerns/>}/>
        <Route path='/editproperty' element={<EditProperty/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
