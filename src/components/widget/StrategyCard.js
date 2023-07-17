import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import AvatarGroup from '@mui/joy/AvatarGroup';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardActions from '@mui/joy/CardActions';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import { openPromptModal } from '../../store/taskSlice';
import { useDispatch } from 'react-redux';

export default function BottomActionsCard({ name, id, description, prompt, selectedStrategyHandler }) {

    const dispatch = useDispatch();

    return (
        <Card
            variant="outlined"
            sx={{
                width: 320,
                // to make the card resizable
                resize: 'horizontal',
            }}
        >
            <CardContent>
                <Typography level="h5" fontWeight="lg">
                    {name}
                </Typography>
                <Typography level="body2">
                    {description}
                </Typography>
            </CardContent>
            <CardActions buttonFlex="0 1 120px">
                <Button variant="solid" color="primary" onClick={() => {
                    selectedStrategyHandler(id);
                    dispatch(openPromptModal());
                }}>
                    See prompt template
                </Button>
            </CardActions>
        </Card>
    );
}