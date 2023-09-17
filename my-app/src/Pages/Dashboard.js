import GptForm from "../Components/GptForm"
import StudyPlan from "../Components/StudyPlan"
import UserContext from '../Services/UserContext'
import React, { useState, useEffect, useContext} from 'react';
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../Services/FirebaseConfig'
import { Typography, Container } from "@mui/material";
import SpiderChibi from "../Assets/Chibi2.png"

export default function Dashboard() {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [planUpdated, setPlanUpdated] = useState(false);
    const user = useContext(UserContext);


    useEffect(() => {
        const fetchData = async () => {
            if (user && user.uid) {   // Making sure user exists and has a uid
                const docRef = doc(db, 'users', user.uid); 
                const docSnapshot = await getDoc(docRef);
                
                if (docSnapshot.exists()) {
                    setData(docSnapshot.data());
                }
            }
            setIsLoading(false);
        };
    
        fetchData();
    }, [user, planUpdated]);

    if (isLoading) {
        return (
        <>
         
        </>
        )
    }
    if (!user) {
        return (<>
        <Container 
        sx={{  
            marginTop: 2, 
            display: "flex", 
            flexDirection: "column", 
            justifyContent: "space-between", 
            alignItems: "center",
            height: "87vh",
        }}>
            <Typography variant="h1" sx={{
                color: "primary.light"
            }}>
            Please Sign in at the top right!!!
            </Typography>
            <img src={SpiderChibi} alt="Spiderman" style={{width: "20%"}}></img>
        </Container>   

        </>)
    } else if (data && data.studyPlan) {
        return <StudyPlan />
    } else {
        return <GptForm onPlanUpdated={() => setPlanUpdated(prev => !prev)} />
    }

}
