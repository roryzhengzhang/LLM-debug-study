import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient, BatchGetCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const promptStrategies = [
    {
        id: 0,
        name: "Ask model to self-correction",
        description: "If model fails to generate the correct program, you can prompt it to analyze the failed unit tests and make modifications to the program based on that analysis.",
        prompt: `Your algorithm fails to pass the following unit tests:

[Unit tests]

Analyze why the algorithm is unable to pass the provided unit tests, devise potential solutions to address the existing issues, and provide an updated version of the program along with the execution results for all the given unit tests.

Your resposne should follow the format:

[Failure analysis]

[Solutions for failure]

[Updated program and unit test results]

        `
    },
    {
        id: 1,
        name: "Clarify problem requirement",
        description: "If you notice model fails because of misunderstanding or ignoring some requirements, you can clarify of emphasize the requirements",
        prompt: `You [misunderstand/ignore] the following requirement: 
        
[Requirements]

[Your explanation]

Based on above feedback, update your algorithmic plan and program in order to pass all the unit tests.

Your response should follow the format:

[Your understanding of human feedback]

[Updated Solutions for failure]

[Updated program and unit test results]

        `
    },
    {
        id: 2,
        name: "Point out buggy place and explain",
        description: "You can point out and explain the mistake(s) that model makes",
        prompt: `You makes mistake(s) in the following place(s):

[Mistake 1]

[Your explanation]

[Mistake 2]

[Your explanation]

Based on above feedback, update your algorithmic plan and program in order to pass all the unit tests.

Your response should follow the format:

[Your understanding of human feedback]

[Updated Solutions for failure]

[Updated program and unit test results]

        `
    },
    {
        id: 3,
        name: "Decompose into subtasks",
        description: "You can prompt model to decompose the tasks into a series of subtasks and find solution by combining them together",
        prompt: `Please think of how to decompose this problem into a series of simpler subproblems that would lead you to the final right answer.

Please respond in the following format:

To solve this problem, I need to do the following subtasks in sequence:

[Subtask 1]

[Subtask 2]

[Subtask 3]

...

I can implement the above plan as follow:

[Implementation of your solution]

[Unit test results] 
        
        `
    },
    {
        id: 4,
        name: "Provide model with hint",
        description: "If the model doesn't identify crucial steps on its own, you can drop hints about what actions it should take.",
        prompt: `There are some clues how to solve this problem correctly:

[Hint 1]

[Hint 2]

[Hint 3]

...

Based on above feedback, update your algorithmic plan and program in order to pass all the unit tests.

Your response should follow the format:

[Your understanding of human feedback]

[Updated Solutions for failure]

[Updated program and unit test results]
        
        `
    },
    {
        id: 5,
        name: "Explain unit test",
        description: "You can clarify how to arrive at the correct outcomes for the unit tests, then prompt the model to adjust or correct its programming based on this understanding",
        prompt: `You can find the explanation of how to arrive at the correct outcomes for the unit tests below:
        
[Unit test 1]

[Explanation]

[Unit test 2]

[Explanation]

...

Based on above feedback, update your algorithmic plan and program in order to pass all the unit tests.

Your response should follow the format:

[Your understanding of human feedback]

[Updated Solutions for failure]

[Updated program and unit test results]

        `
    }
]

const startingPrompt = `
You are given a function signature and description the programming tasks. Complete the function body that pass all the unit tests. \n

Task description: \n

[Paste task description here] \n

Function signature: \n

[Paste function signature here] \n

Unit test: \n

[Paste unit test here] \n

Constraints: \n

[Paste constraints here] \n

Your task:

First, describe your plan for solving this problem in natural language. Please clearly describe how your would approach this problem, any human feedback you think would help you better understand this problem or come up with correct plan. When you describe your plan, please clarify what steps the algorithm includes and how would you implement them.

Then implement your plan in [Programming language you are familiar with] to solve this problem and make sure your algorithm passes all the given unit tests and comply with given constraints.

`

export const Login = createAsyncThunk(
    'task/login',
    async (email) => {

        const getCommand = new BatchGetCommand({
            RequestItems: {
                "LLM-debug-study-user": {
                    Keys: [
                        {
                            Email: { S: email }
                        }
                    ]
                }
            }
        })

        const putCommand = new PutCommand({
            TableName: "LLM-debug-study-user",
            Item: {
                Email: email
            }
        })

        const getResponse = await client.send(getCommand);
        console.log("Existing user with same email: ", getResponse.Responses['LLM-debug-study-user']);
        if (getResponse.Responses['LLM-debug-study-user'] == null) {
            const putResponse = await client.send(putCommand);
            console.log("Put response: ", putResponse);
        }
    }
);


export const taskSlice = createSlice({
    name: "task",
    initialState: {
        gtCode: "# Copy or type the ground truth solution here",
        promptStrategies: promptStrategies,
        promptModalOpen: false,
        startingPrompt: startingPrompt,
    },
    reducers: {
        updateGTCode: (state, action) => {
            state.gtCode = action.payload;
        },
        openPromptModal: (state, action) => {
            state.promptModalOpen = true
        },
        closePromptModal: (state, action) => {
            state.promptModalOpen = false
        }
    },
    extraReducers(builder) {
        builder.addCase(Login.fulfilled, (state, action) => {
            console.log("Log in action finished")
        });
      },
})

export const {
    updateGTCode,
    openPromptModal,
    closePromptModal
} = taskSlice.actions;

export default taskSlice.reducer;