import React, {useEffect, useState} from "react";
import {Box, Button, List, ListItemText, withStyles} from "@material-ui/core";
import MuiListItem from "@material-ui/core/ListItem";
import {Stack} from "@mui/material";

let selectedAnswer, answeredQuestion, formatted_time = "none";

export default function Test() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch("/api/test?format=json")
            .then((res) => res.json())
            .then((data) => setData(data));
    }, []);

    const ListItem = withStyles({
        root: {
            "&$selected": {
                backgroundColor: "#999",
                color: "black"
            },
            "&$selected:hover": {
                backgroundColor: "#999",
                color: "black"
            },
            "&:hover": {
                backgroundColor: "#BBB",
                color: "black"
            }
        },
        selected: {}
    })(MuiListItem);

    const [selectedIndex, setSelectedIndex] = React.useState(null);
    const handleListItemClick = (event, index, answer, question) => {
        setSelectedIndex(index);
        selectedAnswer = answer;
        answeredQuestion = question;
    };

    const formatForm = (event) => {
        let time = new Date()
        formatted_time = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' +
            time.getDate() + 'T' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds() + 'Z';
        return {'FK_otazka': answeredQuestion, 'odpoved': selectedAnswer, 'timestamp': formatted_time};
    }

    const handleSendForm = (event) => {
        let output = formatForm();
        console.log(output);
    }

    return (
        <>
            {data &&
            data.map((item) => {
                return (
                    <div className="p-4 m-4">
                        <div className="border border-secondary rounded p-5">
                            <h3 key={item.id}>{item.otazka}</h3>
                        </div>
                        <h6 className="p-2 mt-2">Odpověď:</h6>
                        <List className="p-0 border border-secondary rounded">
                            <ListItem
                                button
                                selected={selectedIndex === 1}
                                onClick={(event) => handleListItemClick(event, 1, "a", item.id)}
                                key="a"
                            >
                                <Box className="p-3 border border-3 border-primary rounded bg-white">
                                    <h4>A</h4>
                                </Box>
                                <ListItemText className="ms-3" primary={item.odpoved_a}/>
                            </ListItem>

                            <ListItem
                                button
                                selected={selectedIndex === 2}
                                onClick={(event) => handleListItemClick(event, 2, "b", item.id)}
                                key="b"
                            >
                                <Box className="p-3 border border-3 border-primary rounded bg-white">
                                    <h4>B</h4>
                                </Box>
                                <ListItemText className="ms-3" primary={item.odpoved_b}/>
                            </ListItem>

                            <ListItem
                                button
                                selected={selectedIndex === 3}
                                onClick={(event) => handleListItemClick(event, 3, "c", item.id)}
                                key="c"
                            >
                                <Box className="p-3 border border-3 border-primary rounded bg-white">
                                    <h4>C</h4>
                                </Box>
                                <ListItemText className="ms-3" primary={item.odpoved_c}/>
                            </ListItem>
                        </List>
                        <Stack className="float-end mt-1" spacing={1} direction="row">
                            <Button variant="contained">Předchozí</Button>
                            <Button variant="contained">Další</Button>
                            <Button variant="contained"
                                    style={{backgroundColor: 'lightgreen'}}
                                    onClick={(event) => handleSendForm()}
                            >
                                Potvrdit
                            </Button>
                        </Stack>
                    </div>
                );
            })}
        </>
    );
};