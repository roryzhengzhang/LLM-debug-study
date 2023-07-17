import { Box, Typography, FormControlLabel, FormGroup, Button, Card } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import CodeEditor from "./widget/CodeEditor";
import { useEffect, useState } from "react";
import { updateGTCode } from "../store/taskSlice";
import { useSelector } from "react-redux";

export default function GTPage() {

    const gtCode = useSelector((state) => state.task.gtCode);

    const handleMouseUp = (e) => {
        let selection = window.getSelection();
        if (selection) {
            let start = selection.anchorOffset;
            let end = selection.focusOffset;
            let text = selection.toString();
            // TODO: update selected text 
            //   if (start !== end) {
            //     dispatch(setRevisedText(""));
            //     dispatch(setSelectedText(text));
            //     dispatch(setShowCreateThreadModal(true));
            //   }
        }
    };

    return (
        <Box sx={{ margin: 10 }}>
            <Typography variant="h2" class="description-item">Task step (1/3): Get ground truth solution</Typography>
            <Typography variant="h4" class="task-description-item">Step 1.1: Find and understand a ground truth solution</Typography>
            <Typography variant="body" class="description-item">In the first step, you need to find and understand a ground truth solution on the <strong>solution</strong> page of the corresponding online coding question. The soluton page link can be found here:</Typography>
            <br />
            <Typography variant="body" class="description-item"><a href="https://leetcode.com/problems/maximum-number-of-jumps-to-reach-the-last-index/solutions/" target="_blank">Solution page link</a></Typography>
            <Typography variant="h4" class="task-description-item">Step 1.2: Type in the ground truth solution you found</Typography>
            <Box sx={{ marginTop: "20px", maxWidth: "40vw" }}>
                <Box>
                    <CodeEditor
                        text={gtCode}
                        updateText={updateGTCode}
                        editable={true}
                        mouseUpHandler={handleMouseUp}
                    />
                </Box>
                <Box sx={{ marginTop: 2 }}>
                    <FormGroup>
                        <FormControlLabel required control={<Checkbox />} label="I confirm I fully understand the above algorithmic solution" />
                    </FormGroup>
                </Box>
            </Box>
            <Box sx={{ alignContent: "center", justifyContent: "center", display: "flex", marginTop: 10 }}>
                <Button variant="contained">Continue</Button>
            </Box>
        </Box>
    )
}