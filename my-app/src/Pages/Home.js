import { Link } from 'react-router-dom';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Container, Typography, Paper} from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import spiderWeb from "../Assets/spider.png"
import NavigateNextIcon from '@mui/icons-material/NavigateNext';


export default function Home() {
    

    return (
        <>
            <Box sx={{
                backgroundImage: `url(${spiderWeb})`,
                backgroundSize: "160%",
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center top',
                width: "100%",
                display: 'flex',  // Use flexbox
                flexDirection: 'column',
                position: "relative",
            }}>
                <Box sx={{
                    height: "30vh",
                }} />
                <Container sx={{
                    display: "flex",
                    flexDirection: 'column',
                    alignItems: "center",
                    gap: 12,
                }}>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 4,
                        marginBottom: "70vh",
                    }}>
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 1,

                        }}> 
                            <Typography variant="h1" sx={{color: "primary.light"}}>Web Woven: Weave your Web Skills</Typography>
                            <Typography variant="h3"sx={{color: "secondary.main"}}>Personalized Learning Paths in HTML, CSS, and JS</Typography>
                        </Box>
                        <Link to="/Dashboard"><Button variant="contained" size="large" sx={{
                                bgcolor: "primary.dark",
                            }}>Start Weaving Today</Button></Link>
                    </Box>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        alignItems: "center",
                    }}>
                        <Typography variant="h1">How it Works</Typography>
                        <Paper sx={{padding: 2}}>
                            <Typography variant='h2' sx={{color: "primary.main"}}>Choose Your Schedule</Typography>
                            <Typography variant='h3'>Tell us how many weeks and days per week you can dedicate to learning</Typography>
                        </Paper>
                        <NavigateNextIcon sx={{ transform: 'rotate(90deg)', fontSize: 60, color: "primary.light"}} />
                        <Paper sx={{padding: 2}}>
                            <Typography variant='h2' sx={{color: "primary.main"}}>Get Your Personalized Plan</Typography>
                            <Typography variant='h3'>Based on your availability, we craft a lesson plan tailored just for you.</Typography>
                        </Paper>
                        <NavigateNextIcon sx={{ transform: 'rotate(90deg)', fontSize: 60, color: "primary.light"}} />
                        <Paper sx={{padding: 2}}>
                            <Typography variant='h2' sx={{color: "primary.main"}}>Learn with ChatGPT</Typography>
                            <Typography variant='h3'>Tell us how many weeks and days per week you can dedicate to learning</Typography>
                        </Paper>
                    </Box>
                    
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                    }}>
                        <Typography variant="h1">FAQ</Typography>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography variant="h3" sx={{color: "primary.dark"}}>Do I need prior coding experience?</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>No, you don't need any prior coding experience to start with Web Woven. Our platform is designed to cater to both beginners and experienced coders. If you're new to coding, our introductory modules will guide you through the basics, ensuring you build a strong foundation. For those with some experience, you can skip ahead to more advanced topics or use the beginner modules as a refresher. Our personalized learning paths adapt to your current skill level, ensuring you get the most out of your learning journey.</Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography variant="h3" sx={{color: "primary.dark"}}>How long are the lessons?</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>The duration of each lesson varies based on the topic and its complexity. For instance, a lesson on "HTML Images" is designed to be thorough, taking approximately 20-30 minutes to read and understand fully. This includes time for reading, reviewing examples, and practicing the concepts introduced. Some lessons might be shorter, taking around 10-15 minutes, while more advanced topics could take up to an hour. We recommend setting aside dedicated time for each lesson to ensure you grasp the concepts and can apply them effectively.</Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography variant="h3" sx={{color: "primary.dark"}}>Can I adjust my schedule later?</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>Absolutely! We understand that life can be unpredictable and your availability might change. At Web Woven, you have the flexibility to adjust your schedule. If your current schedule isn't working out, you can easily delete it and generate a new one that better suits your needs. Our goal is to make your learning journey as convenient and adaptable as possible.</Typography>
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 4,
                        marginTop: 12,
                        marginBottom: 12,
                        alignItems: "center"
                    }}>
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 1,
                        }}>
                            <Typography variant='h1'>Ready to Weave Your Web Journey?</Typography>
                            <Typography variant='h2'>Join us today and embark on a transformative learning experience.</Typography>
                        </Box>
                        <Link to="/Dashboard"><Button size="large" variant="contained" sx={{bgcolor: "primary.dark"}}>Start Learning Now</Button></Link>
                    </Box>
                </Container>
            </Box>
        </>
    )
}
