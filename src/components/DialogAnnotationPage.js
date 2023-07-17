import { useEffect, useState } from "react";
import { Box, Divider, FormGroup, Menu, Typography, Button } from "@mui/material";
import parse from 'html-react-parser';
import '../dependency/openai/04e5c508d23c3a37.css';
import { Helmet } from "react-helmet";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import EditIcon from '@mui/icons-material/Edit';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { Textarea } from "@mui/joy";
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
// import 'dependency/openai/_app-c21e6269359721f3.js';
// import '../dependency/openai/polyfills-c67a75d1b6f99dc8.js';
// import '../dependency/openai/_ssgManifest.js';

export default function DialogAnnotationPage() {

    const [elements, setElements] = useState();

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    const [selectedStrategyState, setSelectedStrategyState] = useState({
        s0: false,
        s1: false,
        s2: false,
        s3: false,
        s4: false,
        s5: false,
        s6: false,
        s7: false,
        s8: false,
    });

    const [selectedIssueState, setSelectedIssueState] = useState({
        i0: false,
        i1: false,
        i2: false,
        i3: false
    })

    const handleStrategyChange = (event) => {

        setSelectedStrategyState({
            ...selectedStrategyState,
            [event.target.name]: event.target.checked,
        });
    };

    const handleIssueChange = (event) => {

        setSelectedIssueState({
            ...selectedIssueState,
            [event.target.name]: event.target.checked,
        });
    };

    const [CorrectnessValue, setCorrectnessValue] = useState('');

    const handleCorrectnessChange = (event) => {
        setCorrectnessValue(event.target.value);
    };

    const [EffectiveValue, setEffectiveValue] = useState('');

    const handleEffectiveChange = (event) => {
        setEffectiveValue(event.target.value);
    };

    let strategies = [
        'Hint what algorithm to use',
        'Hint specific step of algorithm',
        'Explain why model is wrong',
        'Explain problem requirement',
        'Correct model\'s misconception',
        'Explain how unit test result is achieved',
        'Chooce from model\'s multiple generations',
        'Ask model to explore alternative methods',
        'Ask model to reflect on its mistaken program',
        'Provide new unit tests',
    ];

    let issues = [
        'Model misunderstands requirement',
        'Model uses a wrong algorithm',
        'Some steps in model\'s algorithm is incorrect',
        'Model misses some corner cases',
    ]

    useEffect(() => {
        // Proxy base url
        const proxyBaseUrl =
            'https://3bwy77en48.execute-api.us-west-2.amazonaws.com/prod?url=';

        fetch(proxyBaseUrl + 'https://chat.openai.com/share/4ab440f5-c2c2-4b4d-9f1c-cb3dd35381b2')
            .then(response => {
                return response.text();
            })
            .then(text => {

                const cleanText = text.replaceAll("\\'", "'");
                const data = JSON.parse(cleanText);

                let parser = new DOMParser();
                // console.log(data)
                let doc = parser.parseFromString(data, 'text/html');
                let matched_DOM = doc.querySelectorAll('.group');
                let innerElements = [];
                matched_DOM.forEach((e) => {
                    innerElements.push(e.innerHTML);
                })
                // console.log("Elements: ", innerElements);
                setElements(innerElements);
            })
            .catch((error) => {
                console.log(error);
            });

    }, [])

    return (
        <Box sx={{ m: 10 }}>
            {/* <Helmet> */}
            {/* <script src="dependency/openai/_app-c21e6269359721f3.js" type="text/javascript" />
                <script src="dependency/openai/polyfills-c67a75d1b6f99dc8.js" type="text/javascript" />
                <script src="dependency/openai/_ssgManifest.js" type="text/javascript" />
                <script src="dependency/openai/[[...shareParams]]-e977a8f28e0cc1df.js" type="text/javascript" />
                <script src="dependency/openai/1f110208-cda4026aba1898fb.js" type="text/javascript" />
                <script src="dependency/openai/012ff928-bcfa62e3ac82441c.js" type="text/javascript" />
                <script src="dependency/openai/68a27ff6-b1db347c50639918.js" type="text/javascript" />
                <script src="dependency/openai/114-3f7b7596dd323d8b.js" type="text/javascript" />
                <script src="dependency/openai/171-7ae5fcdc243f5b87.js" type="text/javascript" />
                <script src="dependency/openai/254-2d42144a9120e19f.js" type="text/javascript" />
                <script src="dependency/openai/911-d5e69add3e22feb4.js" type="text/javascript" />
                <script src="dependency/openai/984-1278472924e49180.js" type="text/javascript" />
                <script src="dependency/openai/2802bd5f-15923fb46be55b45.js" type="text/javascript" />
                <script src="dependency/openai/bd26816a-7ae54dd3357d90b4.js" type="text/javascript" />
                <script src="dependency/openai/framework-e23f030857e925d4.js" type="text/javascript" />
                <script src="dependency/openai/main-0438431c68fbeb27.js" type="text/javascript" />
                <script src="dependency/openai/webpack-06319d852f1a2d57.js" type="text/javascript" /> */}
            {/* </Helmet> */}

            <Box sx={{ margin: 10, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <Box display="block" sx={{mb: 5}}>
                    <Box>
                        <Typography variant="h2" class="description-item">Step (3/3): Annotate dialog just created</Typography>
                    </Box>
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="body" class="description-item">We appreciate your earnest efforts to guide the model towards the correct solution! As a final step, we invite you to annotate the conversation just produced. Please respond to the questions about each human/AI message as well as the overall dialogue.
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{ marginBottom: 5 }}>
                    {elements &&
                        elements.map((raw_html, i) => {
                            return (
                                <Box>
                                    <Box sx={{ maxWidth: "80vw" }}>
                                        {parse(raw_html)}
                                        <Box sx={{ margin: 5 }}>
                                            <Typography variant="h7"><strong>Please answer the following question for this message:</strong></Typography>
                                            <Box sx={{ mt: 2 }}>
                                                {
                                                    i % 2 == 0 ? (
                                                        <ol>
                                                            <li class="question-item">1. What types of action(s) did you use in this message to clue model?
                                                                <div>
                                                                    <FormControl sx={{ m: 3, width: 500 }}>
                                                                        <FormGroup>
                                                                            {
                                                                                strategies.map((strategy, i) => (
                                                                                    <FormControlLabel control={<Checkbox onChange={handleStrategyChange} checked={selectedStrategyState['s' + i]} name={'s' + i} />} label={strategy} />
                                                                                ))
                                                                            }
                                                                        </FormGroup>
                                                                    </FormControl>
                                                                </div>
                                                            </li>
                                                            <li class="question-item">2. How effective do you think your feedback in this message helps the model correct itself based on your observation of the AI's response?
                                                                <div>
                                                                    <FormControl>
                                                                        {/* <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel> */}
                                                                        <RadioGroup
                                                                            aria-labelledby="demo-controlled-radio-buttons-group"
                                                                            name="controlled-radio-buttons-group"
                                                                            value={EffectiveValue}
                                                                            onChange={handleEffectiveChange}
                                                                        >
                                                                            <FormControlLabel value="1" control={<Radio />} label="The feedback caused even negative effect in model's thinking and debugging process" />
                                                                            <FormControlLabel value="2" control={<Radio />} label="The feedback didn't help model in any positive way but also cause no backfire as well" />
                                                                            <FormControlLabel value="3" control={<Radio />} label="The feedback helped the model correct some steps in their old solution but the model still cannot reach a correct one on its own" />
                                                                            <FormControlLabel value="4" control={<Radio />} label="The feedback helped the model come up with a almost correct plan and solution" />
                                                                            <FormControlLabel value="5" control={<Radio />} label="The feedback helped the model come up with a correct solution" />

                                                                        </RadioGroup>
                                                                    </FormControl>
                                                                </div>
                                                            </li>
                                                        </ol>
                                                    ) : (
                                                        <ol>
                                                            <li class="question-item">1. Please select the most appropriate choice that describes the correctness of model's solution proposed in this message?
                                                                <div>
                                                                    <FormControl>
                                                                        {/* <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel> */}
                                                                        <RadioGroup
                                                                            aria-labelledby="demo-controlled-radio-buttons-group"
                                                                            name="controlled-radio-buttons-group"
                                                                            value={CorrectnessValue}
                                                                            onChange={handleCorrectnessChange}
                                                                        >
                                                                            <FormControlLabel value="1" control={<Radio />} label="The algorithm used by model is totally inappropriate and couldn't reach a correct solution by any means" />
                                                                            <FormControlLabel value="2" control={<Radio />} label="While the model used an appropriate type of algorithm to tackle the problem, the way of appling this algorithm is totally wrong" />
                                                                            <FormControlLabel value="3" control={<Radio />} label="The model overall used an appropriate algorithm and apply it in a right way, while messing up with some critical steps" />
                                                                            <FormControlLabel value="4" control={<Radio />} label="The solution model proposed is close to a correct one while ignoring some corner cases or messing up with a few details" />
                                                                            <FormControlLabel value="5" control={<Radio />} label="The solution model proposed is correct and pass all unit tests" />

                                                                        </RadioGroup>
                                                                    </FormControl>
                                                                </div>
                                                            </li>
                                                            <li class="question-item">2. What is/are issue(s) happend in AI's thinking process and solution shown in this message?
                                                                <div>
                                                                    <FormControl sx={{ m: 3, width: 500 }}>
                                                                        <FormGroup>
                                                                            {
                                                                                issues.map((issue, i) => (
                                                                                    <FormControlLabel control={<Checkbox onChange={handleIssueChange} checked={selectedIssueState['s' + i]} name={'s' + i} />} label={issue} />
                                                                                ))
                                                                            }
                                                                        </FormGroup>
                                                                    </FormControl>
                                                                </div>
                                                            </li>
                                                        </ol>
                                                    )
                                                }
                                            </Box>
                                        </Box>
                                        {
                                            i < elements.length - 1 && <Divider />
                                        }
                                    </Box>
                                    <Divider variant="middle" />
                                </Box>
                            )
                        })
                    }
                </Box>
                <Box>
                    <Typography><strong>The following questions are about the whole conversation thread:</strong></Typography>
                    <Box sx={{ mt: 2 }}>
                        <ul>
                            <li class="question-item">1. Please rate the following statement "It is easy for me to steer model towards right solution":
                                <div>
                                    <FormControl>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                        >
                                            <FormControlLabel value="e1" control={<Radio />} label="Totally disagree" />
                                            <FormControlLabel value="e2" control={<Radio />} label="Disagree" />
                                            <FormControlLabel value="e3" control={<Radio />} label="Somewhat disagree" />
                                            <FormControlLabel value="e4" control={<Radio />} label="Neither agree nor disagree" />
                                            <FormControlLabel value="e5" control={<Radio />} label="Somewhat agree" />
                                            <FormControlLabel value="e6" control={<Radio />} label="Agree" />
                                            <FormControlLabel value="e7" control={<Radio />} label="Totally agree" />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                            </li>
                            <li class="question-item">
                                2. Could you briefly explain your overall approach in selecting strategies throughout this conversation?
                                <Box sx={{ mt: 2 }}>
                                    <Textarea placeholder="Type anything…" />
                                </Box>
                            </li>
                            <li class="question-item">
                                3. If applicable, could you please briefly indicate where you first observed an issue with your strategy or feedback?
                                <Box sx={{ mt: 2 }}>
                                    <Textarea placeholder="Type anything…" />
                                </Box>
                            </li>
                            <li class="question-item">
                                4. If applicable, could you briefly explain the point at which you noticed your strategy or feedback was effectively guiding the model towards the correct solution?
                                <Box sx={{ mt: 2 }}>
                                    <Textarea placeholder="Type anything…" />
                                </Box>
                            </li>
                        </ul>
                    </Box>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mt: 2 }}>
                    <Button variant="contained">Compelete and return to dashboard</Button>
                </Box>
            </Box>
        </Box>
    );
}