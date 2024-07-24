import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { getUser } from '../util/user-authentication/AuthenticationUtil';
import {AgentDashboard} from '../components/dashboard/AgentDashboard';
import {UserDashboard} from '../components/dashboard/UserDashboard';


const Header = (user) => {
  const navigate = useNavigate();
  //const user = getUser();
   user = {"email": "abcd@example.com",
    "firstname": "ABCD",
    "lastname": "EFGH",
    "role": "student"};
  const handleLogout = () => {
    sessionStorage.removeItem("user");
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar>
        <Button color="inherit" component={Link} to="/landing">
            Home
          </Button>
          {user.role === 'agent' ? (
            <>
              <Button color="inherit" component={Link} to="/agentdashboard">
                Agent Dashboard
              </Button>
              <Button color="inherit" component={Link} to="/addproperty">
                Add Property
              </Button>
              <Button color="inherit" component={Link} to="/editproperty">
                Edit Property
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/userdashboard">
                Student Dashboard
              </Button>
              <Button color="inherit" component={Link} to="/addconcerns">
                Concerns
              </Button>
            </>
          )}
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
