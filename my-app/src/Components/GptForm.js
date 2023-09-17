import { createLesson } from '../Services/GptService';
import UserContext from "../Services/UserContext";
import React, { useState, useContext } from 'react';

//firebase
import { db } from '../Services/FirebaseConfig'
import { doc, setDoc } from 'firebase/firestore'
import { Container, Typography, TextField, Button, Slider, Box, Paper} from "@mui/material";
import LegoAnimation from './LegoAnimation';
import SpiderChibiSwing from "../Assets/Chibi1.png"



export default function GptForm( props ) {
  const [weekCount, setWeekCount] = useState("");
  const [dayCount, setDayCount] = useState(3); // default value set to 3
  const [isLoading, setIsLoading] = useState(false); // Add a new state for loading status
  const [formSubmitted, setFormSubmitted] = useState(false);



  const user = useContext(UserContext);


  


  const handleSubmit =  async (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  
    const studyPlanString = `
Please create a study plan for learning HTML, CSS, and JavaScript. The duration of the plan is ${weekCount} weeks, with ${dayCount} days of learning each week. I want the output in a specific format:

### Week X
## Day Y
- [Topic Name]

Make sure to provide clear newline separations between weeks, days, and topics. I will be parsing through the data to display it and create lessons so anything that would mess up the parser please do not do: such as putting the "-" character in a heading topic or topic description, same goes for #
You can have multiple topics per day, just make sure it is doable in 1 day and to seperate them using the format for example:
## Day Y
- [Topic Name]
- [Topic Name]
Only respond with the studyplan in the format
Start with the basics of HTML, then CSS, and finally delve into JavaScript. Ensure there's a clear progression. Given these guidelines, generate a study plan for HTML, CSS, and JavaScript.
`;

  
    setIsLoading(true); // Set loading to true when the request is made

    try {
        console.log("creating study plan");
        const studyPlan = await createLesson(studyPlanString);

        //parsedData
        const weeks = studyPlan.split("###").filter(week => week.trim() !== "");

        let parsedData = weeks.map(weekContent => {
          let days = weekContent.split("##").filter(day => day.trim() !== "");
          let weekTitle = days.shift().trim();

          let parsedDays = days.map(dayContent => {
            let [daytitle, ...lessons] = dayContent.split("-").map(text => text.trim());
            return {
              title: daytitle,
              lessons: lessons
            };
          });

          return {
            title: weekTitle,
            days: parsedDays,
          }
          });
        let extendedData = await Promise.all(parsedData.map(async week => {
          let days = await Promise.all(week.days.map(async day => {
            let lessons = await Promise.all(day.lessons.map(async lessonTopic => {
              let lessonContent = await createLesson("generate a lesson about: " + lessonTopic + " remember to only respond in markdown. Do not include any links");
              return {
                topic: lessonTopic,
                content: lessonContent
              };
            }));
            return {
              ...day,
              lessons
            };
          }));
          return {
            ...week,
            days
          };
        }));

        //add to firestore
        const userDocRef = doc(db, 'users', user.uid);
        setDoc(userDocRef, {
          studyPlan: {
            studyPlanString: studyPlan,
            studyPlanData: extendedData,
          }
        }, { merge: true});

        if (props.onPlanUpdated) {
          props.onPlanUpdated();
      }
      

    } catch (error) {
        console.error(error);
        // you could set some error state here to notify the user, if you wanted
    } finally {
        setIsLoading(false);
    }
  };
  

  return (
    <>
    {!formSubmitted ? (
    <Container sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      <Paper sx={{
        padding: 2,
        marginTop: 4,
      }}>
        <Typography variant="h1" sx={{color: "primary.main", marginBottom: 3,}}>Create your study plan!</Typography>
        <form onSubmit={handleSubmit}>
          <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
          >
            <Typography variant="h2" sx={{color: "primary.dark",}}>How many weeks?</Typography>
            <TextField
            required
            type="number"
            variant="outlined"
            value={weekCount}
            onChange={(e) =>setWeekCount(e.target.value)}
            fullWidth
            />
            <Typography variant="h2" sx={{color: "primary.dark"}}>How many times a week?</Typography>
            <Slider 
            valueLabelDisplay="auto"
            step={1}
            marks
            min={1}
            value={dayCount}
            onChange={(e, newValue) => setDayCount(newValue)}
            max={7}
            defaultValue={3}
            />
            <Button type="submit" variant="contained" color="primary" sx={{
              alignSelf: "center",
              width: "20%",
            }}>
              Create Plan 
            </Button>
          </Box>
        </form>
      </Paper>
      <img src={SpiderChibiSwing} alt="Spiderman" style={{width: "20%", marginTop: "-10px"}}></img>
    </Container>
    ) : null}
    {isLoading && <Box sx={{bgcolor: "primary.main", display: "flex", justifyContent: "center"}}><LegoAnimation /></Box>}
    </>
    
  );
}
