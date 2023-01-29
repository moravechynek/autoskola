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
                backgroundColor: "#66B3FF",
                color: "black"
            },
            "&$selected:hover": {
                backgroundColor: "#66B3FF",
                color: "black"
            },
            "&:hover": {
                backgroundColor: "#AACCFF",
                color: "black"
            }
        },
        selected: {}
    })(MuiListItem);

    const [selectedListIndex, setSelectedListIndex] = React.useState(null);
    const [currentquestion, setCurrentquestion] = React.useState(0);
    const [allSelectedAnswers, setAllSelectedAnswers] = React.useState([]);

    const handleListItemClick = (event, answer, question) => {
        setSelectedListIndex(answer);
        selectedAnswer = answer;
        answeredQuestion = question;
        submitQuestion(question);
    };

    const markSelectedAnswer = (question_index) => {
        setSelectedListIndex(0);
        allSelectedAnswers.map((item, index) => {
            if (index === question_index) {
                setSelectedListIndex(item.odpoved);
            }
        })
    }

    const handlePreviousQuestion = (index) => {
        if (currentquestion >= 1) {
            setCurrentquestion(currentquestion - 1);
            markSelectedAnswer(index - 1);
        }
    }
    const handleNextQuestion = (index) => {
        if (currentquestion < Object.keys(data).length - 1) {
            setCurrentquestion(currentquestion + 1);
            markSelectedAnswer(index + 1);
        }
    }

    const submitQuestion = (question) => {
        let time = new Date();
        formatted_time = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' +
            time.getDate() + 'T' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds() + 'Z';
        if (!allSelectedAnswers.length) {
            const addAnswer = allSelectedAnswers.concat({
                'FK_otazka': answeredQuestion,
                'odpoved': selectedAnswer,
                'timestamp': formatted_time
            });
            setAllSelectedAnswers(addAnswer);
        } else {
            const isFound = allSelectedAnswers.some(item => {
                return item.FK_otazka === question;
            })
            if (isFound) {
                allSelectedAnswers.map((item) => {
                    if (item.FK_otazka === question) {
                        item.odpoved = selectedAnswer;
                        item.timestamp = formatted_time;
                    }
                })
            } else {
                const addAnswer = allSelectedAnswers.concat({
                    'FK_otazka': answeredQuestion,
                    'odpoved': selectedAnswer,
                    'timestamp': formatted_time
                });
                setAllSelectedAnswers(addAnswer);
            }
        }
    }

    const formatForm = () => {
        return allSelectedAnswers;
    }

    const handleSendForm = () => {
        let output = formatForm();
        console.log(output);
    }

    return (
        <>
            {data &&
            data.map((item, index) => {
                if (index === currentquestion) {
                    return (
                        <div className="p-4 m-4">
                            <div
                                className="p-5 border border-secondary rounded question d-flex align-items-center justify-content-center">
                                <h3 key={item.id} className="p-2">{item.otazka}</h3>
                                {item.file ? (
                                        <img
                                            src="https://www.znaceni-eshop.cz/fotky55863/fotos/_vyr_116Dopravni-znacka---P4---Dej-prednost-v-jizde.jpg"
                                            alt={item.id}
                                            className="card-img w-25 align-self-center p-2"/>
                                    ) :
                                    null
                                }
                            </div>
                            <h6 className="p-2 mt-2">Odpověď:</h6>
                            <List className="p-0 border border-secondary rounded">
                                <ListItem
                                    button
                                    selected={selectedListIndex === "a"}
                                    onClick={(event) => handleListItemClick(event, "a", item.id)}
                                    key="a"
                                    className="rounded-top"
                                >
                                    <Box className="p-3 border border-3 border-primary rounded bg-white">
                                        <h4>A</h4>
                                    </Box>
                                    <ListItemText className="ms-3" primary={item.odpoved_a}/>
                                </ListItem>

                                <ListItem
                                    button
                                    selected={selectedListIndex === "b"}
                                    onClick={(event) => handleListItemClick(event, "b", item.id)}
                                    key="b"
                                >
                                    <Box className="p-3 border border-3 border-primary rounded bg-white">
                                        <h4>B</h4>
                                    </Box>
                                    <ListItemText className="ms-3" primary={item.odpoved_b}/>
                                </ListItem>
                                <ListItem
                                    button
                                    selected={selectedListIndex === "c"}
                                    onClick={(event) => handleListItemClick(event, "c", item.id)}
                                    key="c"
                                    className="rounded-bottom"
                                >
                                    <Box className="p-3 border border-3 border-primary rounded bg-white">
                                        <h4>C</h4>
                                    </Box>
                                    <ListItemText className="ms-3" primary={item.odpoved_c}/>
                                </ListItem>
                            </List>
                            <Stack className="float-end mt-1" spacing={1} direction="row">
                                <Button variant="contained"
                                        disabled={currentquestion === 0}
                                        onClick={() => handlePreviousQuestion(index)}
                                >
                                    Předchozí
                                </Button>
                                <Button variant="contained"
                                        disabled={currentquestion === Object.keys(data).length - 1}
                                        onClick={() => handleNextQuestion(index)}
                                >
                                    Další
                                </Button>
                                <Button variant="contained"
                                        style={{backgroundColor: 'lightgreen'}}
                                        onClick={() => handleSendForm()}
                                >
                                    Potvrdit
                                </Button>
                            </Stack>
                        </div>
                    );
                }
            })}
        </>
    );
};