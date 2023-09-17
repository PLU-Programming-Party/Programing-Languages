import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../Services/UserContext';
import { db } from '../Services/FirebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { Link as RouterLink } from 'react-router-dom';
import { Link as MuiLink } from '@mui/material';
import { Box, Container, Typography, Skeleton } from '@mui/material';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';


function StudyPlan() {
  const [studyPlan, setStudyPlan] = useState(null);
  const user = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      if (user && user.uid) {
        const docRef = doc(db, 'users', user.uid);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          setStudyPlan(docSnapshot.data().studyPlan);
        }
      }
    };
    
    fetchData();
  }, [user]);

  if (!studyPlan) {
    return (
      <Container sx={{
        display: "flex",
        flexDirection: "column",
        padding: 2,
        gap: 4,
      }}>
        {/* Main title skeleton */}
        <Skeleton variant="text" height={40} width={300} />
  
        {/* Week skeleton */}
        <Box sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}>
          {/* Repeated 3 times for demonstration, you can adjust as needed */}
          {[...Array(3)].map((_, weekIndex) => (
            <Box key={weekIndex} sx={{
              bgcolor: "primary.light",
              borderRadius: 2,
              padding: 2,
            }}>
              {/* Week title skeleton */}
              <Skeleton variant="text" height={30} width={200} />
  
              {/* Day skeleton */}
              {[...Array(3)].map((_, dayIndex) => (
                <Box key={dayIndex}>
                  {/* Day title skeleton */}
                  <Skeleton variant="text" height={25} width={150} />
  
                  <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2
                  }}>
                    {/* Lesson skeleton */}
                    {[...Array(3)].map((_, lessonIndex) => (
                      <Box key={lessonIndex} sx={{
                        display: "flex",
                        gap: 1,
                      }}>
                        {/* Icon skeleton */}
                        <Skeleton variant="circle" width={24} height={24} />
                        {/* Lesson title skeleton */}
                        <Skeleton variant="text" height={20} width={100} />
                      </Box>
                    ))}
                  </Box>
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </Container>
    );
  }
  

  return (
    <>
    <Container sx={{
      display: "flex",
      flexDirection: "column",
      padding: 2,
      gap: 4,
    }}>
    <Typography variant='h1' sx={{color: "primary.light"}}>Welcome {user.displayName} here is your study plan</Typography>
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}>
        {studyPlan.studyPlanData.map(week => (
          <Box key={week.title} sx={{
            bgcolor: "primary.light",
            borderRadius: 2,
          }}>
            <Typography variant="h2" sx={{color: "primary.main", borderBottom: 1, padding: 2,}}>{week.title}</Typography>
            {week.days && week.days.map(day => (
              <Box key={day.title} sx={{padding: 2,}}>
                <Typography variant="h3">{day.title}</Typography>
                <Box sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2
                }}>
                {day.lessons && day.lessons.map(lesson => (
                      <MuiLink component={RouterLink} to={`/lesson/${encodeURIComponent(lesson.topic)}`} sx={{
                        textDecoration: "none",
                        color: "primary.dark"
                      }}>
                        <Box key={lesson.topic} sx={{
                          display: "flex",
                          gap: 1,
                        }}>
                          <LibraryBooksIcon sx={{ color: "primary.main"}}/>
                          <Typography variant="h5">{lesson.topic}</Typography>
                        </Box>
                      </MuiLink>
                  ))}
                </Box>
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Container>
     
    </>
  )
}

export default StudyPlan;
