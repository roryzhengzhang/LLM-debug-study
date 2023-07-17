import { Box, Card, FormControlLabel, Typography, FormGroup, Button } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { useNavigate } from "react-router-dom";

export default function TaskDescription() {

    let navigate = useNavigate();
    const routeChange = () =>{ 
      let path = `/dashboard`; 
      navigate(path);
    }

    return (
        <Box sx={{ alignContent: "center", display: "flex", justifyContent: "center" }}>
            <Card sx={{ width: "70vw", margin: 5, padding: 4 }}>
                <Typography variant="h1" class="description-item">Welcome to this study 👋</Typography>
                <Typography variant="body" class="description-item">Thanks for choosing to participate in our study! We are researchers from AWS SageMaker Ground Truth team aiming to investigate the behavior of large language model as tackling complex programming tasks and how human programmer could assist model to debug itself. The findings of this study could support the design of effective debugger for LM-generated code.</Typography>
                <Typography variant="h2" class="description-item">Disclaimer</Typography>
                <Typography variant="body" class="description-item">Participation in this study is <strong>entirely voluntary</strong> and will <strong>have no bearing on the employment status of either yourself or your family members</strong>.</Typography>
                <Typography variant="h2" class="description-item">Prerequisite</Typography>
                <Box>
                    <ul>
                        <li class="description-list-item">To participate in this study, you must be Amazon employee</li>
                        <li class="description-list-item">You should be familiar with at least one of the major programming languages such as Python, Java, C(++), etc</li>
                        <li class="description-list-item">You should have strong algorithmic knowledge and feel comfortable about dealing with algorithmic problems presented in online coding interview style (e.g. LeetCode, CodeForcing, HackerRank)</li>
                    </ul>
                </Box>
                <Typography variant="h2" class="description-item">Task description</Typography>
                <Typography variant="body" class="description-item">In this task, you're presented with a set of Leetcode-type problem. Your job is to understand how to solve this problem first and instruct LLM to devleop a correct algorithmic plan. In detail, at first, you need to comprehend the definitive solution to the presented problem by referring to the available explanations or solutions in the corresponding problem panel. Once you've understood the solution, guide the OpenAI Coder Interpreter model to attempt the problem on its own. If the model is unable to provide a successful submission after K self-correction rounds, your responsibility changes to aid the model in debugging its strategy until it reaches a successful solution. Remember, it's important not to directly give the model the correct code. Instead, you should devise or employ suggested tactics to assist the model in devising and executing the correct plan. If after 15 interaction rounds you've been unsuccessful in steering the model towards the right solution, end the task by directly prompting the model with the correct solution.
                    <br /><br />
                    After finishing the above task, you are invited to review and label the conversation thread that you just produced with AI. You will label the following things:
                </Typography>
                <Box>
                    <ul>
                        <li class="description-list-item">For each AI-generated message:
                            <ul>
                                <li class="description-list-item">What issue(s) happened in the AI message that causes it fail to arrive at a correct program (e.g. misunderstanding, incorrect algorithm, miss corner cases, mess up with some particular steps, etc)</li>
                                <li class="description-list-item">How close the plan/code in the AI message is it to a correct one? (1 to 5)</li>
                            </ul>
                        </li>
                        <li class="description-list-item">For each human message (except the starting prompt):
                            <ul>
                                <li class="description-list-item">What types of strategy did you use in the message to clue model?</li>
                                <li class="description-list-item">Based on the AI response, how useful do you think this feedback helped model to avoid previous mistake and make up a correct plan? (1 to 5)</li>
                            </ul>
                        </li>
                        <li class="description-list-item">Whole conversation:
                            <ul>
                                <li class="description-list-item">How effortful is it to steer AI to a correct solution?</li>
                            </ul>
                        </li>
                    </ul>
                </Box>

                <Box>
                    <FormGroup>
                        <FormControlLabel required control={<Checkbox />} label="I've read the requirement and description and agree to take part in this study" />
                    </FormGroup>
                </Box>
                <Box sx={{ alignContent: "center", justifyContent: "center", display: "flex", marginTop: 2 }}>
                    <Button variant="contained" onClick={routeChange}>
                        Continue
                    </Button>
                </Box>
            </Card>
        </Box>

    );
}