import { NavLink } from 'react-router-dom';
import SignIn from './SignIn';
import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material';
import logo from '../Assets/SpiderLogo.png'

export default function NavBar() {
    return (   
      <AppBar position="static" sx={{
         bgcolor: "primary.dark",
      }}>
            <Container maxWidth="xl" sx={{
               display: "flex",
               justifyContent: 'center',
               alignItems: 'center',
               height: "100px",
            }}>
                <Toolbar disableGutters sx={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  gap: 4,
                }}>
                     {/* Wrap the logo and title with NavLink */}
                     <NavLink to="/" style={{ textDecoration: 'none' }}>
                        <Box sx={{
                           display: "flex",
                           justifyContent: "center",
                           alignItems: "center",
                           cursor: "pointer", // To show it's clickable
                        }}>
                           <img src={logo} alt="Logo" style={{ width: '80px', marginRight: '20px' }} />
                           <Typography variant='h1' sx={{
                              color: 'primary.main'
                           }}>WebWoven</Typography>
                        </Box>
                     </NavLink>
                     <Box>
                           {/*<Button color="inherit" component={NavLink} to="/">Home</Button>*/}
                           <Button color="inherit" component={NavLink} to="/Dashboard">Dashboard</Button>
                     </Box>
                     <div style={{ marginLeft: 'auto' }}>
                     <SignIn />
                     </div>
                </Toolbar>
            </Container>
        </AppBar>
     );
}
