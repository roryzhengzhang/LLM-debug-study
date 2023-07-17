import { Box, Typography, Grid, Card, Modal, Button, IconButton, TextField } from "@mui/material";
import PromptTemplate from "./widget/PromptTemplate";
import StrategyCard from "./widget/StrategyCard";
import { openPromptModal, closePromptModal } from "../store/taskSlice";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
import { Textarea } from "@mui/joy";

export default function DebugTaskPage() {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "40vw",
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };

    const dispatch = useDispatch();

    const modalOpen = useSelector((state) => state.task.promptModalOpen);
    const strategies = useSelector((state) => state.task.promptStrategies);
    const [selectedeStrategyId, setSelectedStrategy] = useState(-1);
    const startingPrompt = useSelector((state) => state.task.startingPrompt);

    return (
        <Box sx={{
            m: 10, scrollMargin: "10px"
        }}>
            <Box>
                <Typography variant="h2" class="description-item">Task step (2/3): Help LLM get to right solution</Typography>
                <Typography variant="body" class="description-item">Thanks for spending time developing ground truth solution! Now you are invited to help Code Interpreter model develop a right solution of this question. To chat with Code Interpreter, please open a new tab, log in to OpenAI ChatGPT using provided account, select GPT-4 and then Code Interpreter model.</Typography>
                <br />
                <Typography variant="h4" class="task-description-item" sx={{ fontSize: 20, mt: "20px" }}><strong>Step 2.1: Initiate conversation</strong></Typography>
                <Typography variant="body" class="description-item">You can start the conversation by asking model to create first version of algorithmic plan and implemented program using the following prompt template: </Typography>
                <PromptTemplate content={startingPrompt} />
            </Box>
            <Box>
                <Typography variant="h4" class="task-description-item" sx={{ fontSize: 20, mt: "20px" }}><strong>Step 2.2: Debug model's algorithm</strong></Typography>
                <Typography>
                    In the event the model doesn't manage to generate a correct algorithm that can pass all unit tests, you should attempt to guide it toward the right solution. <strong>Instead of outright providing the correct answer, please aim to gently nudge the model in the right direction, unless the discussion has gone beyond 15 rounds.</strong> On each turn, you're welcome to use one of the listed strategies to engage the model. However, you're not obligated to stick strictly to these strategies and can offer feedback in any manner you see fit.</Typography>
                <Typography variant="h4" class="description-item"><i>Suggested strategies:</i></Typography>
                <Grid container
                    rowSpacing={5}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    sx={{ width: '80vw', mt: 5, paddingLeft: 4 }}>
                    {
                        strategies && strategies.map((strategy, i) => {
                            return (
                                <Grid xs={2}>
                                    <StrategyCard sx={{ height: "100%" }} name={strategy.name} id={strategy.id} description={strategy.description} selectedStrategyHandler={setSelectedStrategy} />
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Box>
            <Box>
                <Typography variant="h4" class="task-description-item" sx={{ fontSize: 20, mt: "20px" }}><strong>Step 2.3: Upload shared link</strong></Typography>
                <Typography variant="body">After you finish the conversation (i.e. help model get right solution or exceed 15 rounds of conversation), please copy and paste the shared link of the chat thread below. </Typography>
                <Box sx={{ mt: 2 }}>
                    <TextField sx={{ width: "24vw" }} label="Link" variant="outlined" />
                </Box>
            </Box>
            <Box sx={{ display: "flex", alignContent: "center", justifyContent: "center", mt: 5, paddingBottom: 5 }}>
                <Button variant="contained">Proceed to Step 3/3</Button>
            </Box>
            {
                selectedeStrategyId > -1 && (
                    <Modal
                        open={modalOpen}
                        onClose={() => dispatch(closePromptModal())}
                        aria-labelledby="child-modal-title"
                        aria-describedby="child-modal-description"
                    >
                        <Box sx={style}>
                            <PromptTemplate content={strategies[selectedeStrategyId]['prompt']} />
                        </Box>
                    </Modal>
                )
            }

        </Box>
    );
}