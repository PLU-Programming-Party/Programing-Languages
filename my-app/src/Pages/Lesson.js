import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../Services/UserContext';
import { db } from '../Services/FirebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import JsIde from '../Components/JsIde';
import { Box, Skeleton } from '@mui/material';
import "../styles/Lesson.css"

function Lesson() {
  const [lessonContent, setLessonContent] = useState(null);
  const { topic } = useParams(); // Get the topic from the URL
  const user = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      if (user && user.uid) {
        const docRef = doc(db, 'users', user.uid);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          const studyPlanData = docSnapshot.data().studyPlan.studyPlanData;
          
          for (let week of studyPlanData) {
            for (let day of week.days) {
              const foundLesson = day.lessons.find(l => l.topic === decodeURIComponent(topic));
              if (foundLesson) {
                setLessonContent(foundLesson.content);
                return;
              }
            }
          }
        }
      }
    };

    fetchData();
  }, [user, topic]);

  if (!lessonContent) {
    return (
      <Box sx={{
        display: "flex",
        flexDirection: "row",
        height: "100vh",
        overflow: "hidden"
      }}>
        {/* JsIde skeleton */}
        <Box sx={{
          width: "50%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "grey.200"
        }}>
          <Skeleton variant="rectangular" width={300} height={50} />
          <Skeleton variant="rectangular" width="90%" height="80%" mt={2} />
        </Box>
  
        {/* Markdown content skeleton */}
        <Box sx={{
          width: "50%",
          overflowY: "auto",
          overflowX: "hidden",
          wordWrap: "break-word",
          whiteSpace: "pre-wrap",
          bgcolor: "primary.light",
          padding: "0 20px"
        }}>
          {/* Repeated 5 times for demonstration, you can adjust as needed */}
          {[...Array(5)].map((_, index) => (
            <Skeleton key={index} variant="text" width="90%" height={30} mt={2} />
          ))}
        </Box>
      </Box>
    );
  }
  

  return (
    <Box sx={{
      display: "flex",
      flexDirection: "row", // We changed this from row to column
      height: "100vh", 
      overflow: "hidden"  // Add this

    }}>
      <JsIde />
      <Box sx={{
        width: "50%",
        overflowY: "auto",
        overflowX: "hidden",
        wordWrap: "break-word", 
        whiteSpace: "pre-wrap",
        bgcolor: "primary.light",
        padding: "0 20px" // Add some padding to ensure content doesn't touch the edges
      }}>
          <ReactMarkdown className="markdown-content">{lessonContent}</ReactMarkdown>
      </Box>
    </Box>
    
  )
}

export default Lesson;
