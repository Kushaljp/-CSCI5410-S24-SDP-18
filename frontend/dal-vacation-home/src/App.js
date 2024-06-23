import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/user-authentication/Login';
import Register from './components/user-authentication/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
