import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/user-authentication/Login';
import Register from './components/user-authentication/Register';
import  AddProperty  from './components/AddProperty';
import  RoomDetails  from './components/RoomDetails';
import ListApprovals from './components/ListApprovals';
import ListRooms from './components/ListRooms';
import Dashboard from './components/dashboard/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/addproperty" element={<AddProperty/>} />
        <Route path="/roomdetails" element={<RoomDetails/>} />
        <Route path="/listrooms" element={<ListRooms/>} />
        <Route path="/listapprovals" element={<ListApprovals/>} />  */}
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
