import * as React from 'react';
import Textarea from '@mui/joy/Textarea';
import { Button, Popover, StatusIndicator } from '@cloudscape-design/components';
import { Box, Card } from '@mui/material';

export default function PromptTemplate({ content }) {

    const [value, setValue] = React.useState(content);

    return (

        <Box sx={{ maxWidth: "35vw", padding: 2, mt: 3 }}>
            <Textarea
                placeholder={content}
                minRows={2}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                sx={{
                    '--Textarea-focusedInset': 'var(--any, )',
                    '--Textarea-focusedThickness': '0.25rem',
                    '--Textarea-focusedHighlight': 'rgba(13,110,253,.25)',
                    '&::before': {
                        transition: 'box-shadow .15s ease-in-out',
                    },
                    '&:focus-within': {
                        borderColor: '#86b7fe',
                    },
                    mb: 2
                }}
            />
            <Popover
                size="small"
                position="top"
                triggerType="custom"
                dismissButton={false}
                content={<StatusIndicator type="success">Prompt copied</StatusIndicator>}
            >
                <Button iconName="copy"
                    onClick={() => {
                        navigator.clipboard.writeText(value);
                    }}>Copy</Button>
            </Popover>

        </Box>


    );
}