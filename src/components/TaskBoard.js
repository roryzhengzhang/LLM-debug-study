import * as React from 'react';
import { List, Typography, Box, IconButton, Button } from "@mui/material";
import LinearProgressWithLabel from './widget/ProgressBar';
import ImageIcon from '@mui/icons-material/Image';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from "react-router-dom";
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';

export default function TaskBoard() {

    const [progress, setProgress] = React.useState(10);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
        }, 800);
        return () => {
            clearInterval(timer);
        };
    }, []);

    let navigate = useNavigate();
    const routeChange = () =>{ 
      let path = `/gt`; 
      navigate(path);
    }

    return (
        <Box sx={{ margin: 10 }}>
            <Typography variant="h1" class="description-item">Your task dashboard</Typography>
            <Box>
                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    <ListItem secondaryAction={
                        <IconButton><ArrowCircleRightRoundedIcon /></IconButton>
                    }>
                        <ListItemAvatar>
                            <Avatar>
                                <ImageIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Problem 1" secondary="Not started" />
                    </ListItem>
                    <ListItem secondaryAction={
                        <IconButton onClick={routeChange}><ArrowCircleRightRoundedIcon /></IconButton>
                    }>
                        <ListItemAvatar>
                            <Avatar>
                                <ImageIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Problem 2" secondary="Not started" />
                    </ListItem>
                    <ListItem secondaryAction={
                        <IconButton><ArrowCircleRightRoundedIcon /></IconButton>
                    }>
                        <ListItemAvatar>
                            <Avatar>
                                <ImageIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Problem 3" secondary="Not started" />
                    </ListItem>
                </List>
            </Box>
            <Box sx={{ maxWidth: "100%", display: "flex", justifyContent: "center", alignItems: "center", margin: 2 }}>
                <Button variant='contained'>Exit</Button>
            </Box>
        </Box>
    );
}