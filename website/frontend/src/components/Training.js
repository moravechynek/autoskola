import React, {useEffect, useState} from "react";
import {Box, Button, List, ListItem, ListItemText, withStyles} from "@material-ui/core";
import {Stack} from "@mui/material";
import MuiListItem from "@material-ui/core/ListItem";
import SimpleBar from 'simplebar-react';


export default function Training() {
    document.title = 'Trénink';

    const [data, setData] = useState(null);
    const [allSelectedAnswers, setAllSelectedAnswers] = React.useState([]);
    const [selectedListIndex, setSelectedListIndex] = React.useState(null);
    const [currentQuestion, setCurrentQuestion] = React.useState(0);
    const [selectedAnswer, setSelectedAnswer] = React.useState(null);

    useEffect(() => {
        fetch("/api/test?format=json")
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                data.map((item, index) => {
                    if (index === 0) {
                        setAllSelectedAnswers(allSelectedAnswers.concat({
                            'FK_otazka': item.id,
                            'odpoved': 'none',
                            'timestamp': getTime()
                        }))
                        setSelectedAnswer({
                            "FK_otazka": item.id,
                            "odpoved": "none",
                            "timestamp": getTime()
                        })
                    }
                })
            });
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

    const getTime = () => {
        let curTime = new Date();
        let month = curTime.getMonth() + 1;
        let day = curTime.getDate();
        let hours = curTime.getHours();
        let minutes = curTime.getMinutes();
        let seconds = curTime.getSeconds();
        if (month < 10) {
            month = '0' + month;
        }
        if (day < 10) {
            day = '0' + day;
        }
        if (hours < 10) {
            hours = '0' + hours;
        }
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        return curTime.getFullYear() + '-' + month + '-' + day + 'T' + hours + ':' + minutes + ':' + seconds;
    }


    const handleListItemClick = (event, answer, question) => {
        setSelectedListIndex(answer);
        submitQuestion(question, answer);
    };

    const markSelectedAnswer = (question_index) => {
        setSelectedListIndex(0);
        allSelectedAnswers.map((item, index) => {
            if (index === question_index) {
                setSelectedListIndex(item.odpoved);
            }
        })
    }

    const handleQuestionChange = (change, value, index) => {
        if (change === 'btn') {
            setCurrentQuestion(value);
            markSelectedAnswer(value);
        } else if (change === 'prev' || change === 'next') {
            setCurrentQuestion(currentQuestion + value);
            markSelectedAnswer(index + value);
        }
    }

    const submitQuestion = (question, answer) => {
        allSelectedAnswers.map((item) => {
            if (item.FK_otazka === question) {
                item.odpoved = answer;
                item.timestamp = getTime();
            }
        })
        setSelectedAnswer({
            "FK_otazka": question,
            "odpoved": answer,
            "timestamp": getTime()
        })
    }

    const loadNextQuestion = () => {
        data.map((item, index) => {
            if (index === Object.keys(allSelectedAnswers).length) {
                setAllSelectedAnswers(allSelectedAnswers.concat({
                    'FK_otazka': item.id,
                    'odpoved': 'none',
                    'timestamp': getTime()
                }))
            }
        })
    }

    const handleSendForm = () => {
        console.log(allSelectedAnswers);
        console.log(selectedAnswer);
        fetch('/api/odpoved-create', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(selectedAnswer)
        })
        loadNextQuestion();
    }

    return (
        <SimpleBar style={{maxHeight: parent.innerHeight - 180}}>
            <div className="p-4 m-4">
                {data && allSelectedAnswers && data.map((item, index) => {
                    if (index === currentQuestion) {
                        return (
                            <>
                                <div className="mb-4">
                                    {allSelectedAnswers && allSelectedAnswers.map((item, index) => {
                                        if (index === currentQuestion) {
                                            return (
                                                <button className="btn btn-primary mx-1"
                                                        disabled={true}
                                                        onClick={() => handleQuestionChange('btn', index)}
                                                >
                                                    {index + 1}
                                                </button>
                                            )
                                        } else {
                                            return (
                                                <button className="btn btn-outline-primary mx-1"
                                                        onClick={() => handleQuestionChange('btn', index)}
                                                >
                                                    {index + 1}
                                                </button>
                                            )
                                        }
                                    })}
                                </div>
                                <div
                                    className="p-5 border border-secondary rounded question d-flex align-items-center justify-content-center">
                                    <h3 key={item.id} className="p-2">{item.otazka}</h3>
                                    {item.file ? (
                                            <img
                                                src={item.file}
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
                                        disabled={allSelectedAnswers.length > currentQuestion + 1}
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
                                        disabled={allSelectedAnswers.length > currentQuestion + 1}
                                        key="b"
                                    >
                                        <Box className="p-3 border border-3 border-primary rounded bg-white">
                                            <h4>B</h4>
                                        </Box>
                                        <ListItemText className="ms-3" primary={item.odpoved_b}/>
                                    </ListItem>
                                    {item.odpoved_c ? (
                                            <ListItem
                                                button
                                                selected={selectedListIndex === "c"}
                                                onClick={(event) => handleListItemClick(event, "c", item.id)}
                                                disabled={allSelectedAnswers.length > currentQuestion + 1}
                                                key="c"
                                                className="rounded-bottom"
                                            >
                                                <Box className="p-3 border border-3 border-primary rounded bg-white">
                                                    <h4>C</h4>
                                                </Box>
                                                <ListItemText className="ms-3" primary={item.odpoved_c}/>
                                            </ListItem>
                                        ) :
                                        null
                                    }
                                </List>
                                <Stack className="float-end mt-1" spacing={1} direction="row">
                                    <Button variant="contained"
                                            disabled={currentQuestion === 0}
                                            style={{backgroundColor: 'lightblue'}}
                                            onClick={() => handleQuestionChange('prev', -1, index)}
                                    >
                                        Předchozí
                                    </Button>
                                    <Button variant="contained"
                                            disabled={currentQuestion === Object.keys(allSelectedAnswers).length - 1}
                                            style={{backgroundColor: 'lightblue'}}
                                            onClick={() => handleQuestionChange('next', 1, index)}
                                    >
                                        Další
                                    </Button>
                                    <Button variant="contained"
                                            style={{backgroundColor: 'lightgreen'}}
                                            onClick={() => handleSendForm()}
                                            disabled={currentQuestion < allSelectedAnswers.length - 1}
                                    >
                                        Potvrdit
                                    </Button>
                                </Stack>
                            </>
                        )
                    }
                })}
            </div>
        </SimpleBar>
    )
}