import React, { useState, useEffect } from 'react';
import { auth, db } from '../Services/FirebaseConfig'
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { Button, Avatar, IconButton, Tooltip, Menu, MenuItem, Typography} from "@mui/material"

export default function SignIn() {
    const [user, setUser] = useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);


    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((authUser) => {
        if(authUser) {
          setUser(authUser);
        } else {
          setUser(null);
        }
      });

      return () => {
          unsubscribe();
      };
    }, []);

    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
            const user = result.user;
            
            const userDocRef = doc(db, 'users', user.uid);
            setDoc(userDocRef, {
              displayName: user.displayName,
              email: user.email,

              
            }, { merge: true });
            console.log('Logged in user:', user);
            })
            .catch((error) => {
                console.error('Error during google Sign-in', error);
            });
    };
    const handleSignOut = () => {
      signOut(auth)
        .then(() => {
          setUser(null);
        })
        .catch((error) => {
          console.error("Error during Sign Out", error);
        });
    };

  return (
    <div>

    
    {user ? (
      <>
        <Tooltip title="Open Settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar src={user.photoURL} alt={user.displayName} />
          </IconButton>
        </Tooltip>
        <Menu 
          sx={{ mt: '45px' }}
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem onClick={handleSignOut}>
            <Typography>Sign Out</Typography>
          </MenuItem> 
        </Menu>
      </>
    ) : (
      <Button onClick={signInWithGoogle} sx={{color:"primary.light"}}>Sign in</Button>
    )}
    </div>
  );
}