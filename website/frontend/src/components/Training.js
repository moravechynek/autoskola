import React, {useEffect, useState} from "react";
import {Box, Button, List, ListItem, ListItemText, withStyles} from "@material-ui/core";
import {Stack} from "@mui/material";
import MuiListItem from "@material-ui/core/ListItem";


export default function Training() {
    document.title = 'Trénink';

    const [data, setData] = useState(null);
    const [allSelectedAnswers, setAllSelectedAnswers] = useState([]);
    const [selectedListIndex, setSelectedListIndex] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    useEffect(() => {
        fetch("/api/trenink?format=json")
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
                            "odpoved": "none"
                        })
                    }
                })
            });
    }, []);

    const ListItem = withStyles({
        root: {
            "&:hover": {
                backgroundColor: "#AACCFF !important",
                color: "black"
            },
            "&.Mui-disabled": {
                opacity: 1
            }
        },
        selected: {},
    })(MuiListItem);

    const pickColor = (answer) => {
        let pickedColor;
        let spravnaOdpoved;
        data.map((item, index) => {
            if (index === currentQuestion) {
                spravnaOdpoved = item.spravna_odpoved;
                if (item.spravna_odpoved === answer) {
                    pickedColor = "#00FF00";
                }
            }
        })
        allSelectedAnswers.map((item, index) => {
            if (index === currentQuestion) {
                if (item.odpoved === 'none') {
                    pickedColor = "white";
                } else if (item.odpoved === answer && answer !== spravnaOdpoved) {
                    pickedColor = "red";
                }
            }
        })
        return pickedColor
    }

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
        handleSendForm();
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
        selectedAnswer.odpoved = answer;
    }

    const loadNextQuestion = () => {
        fetch("/api/trenink?format=json")
            .then((res) => res.json())
            .then((nextData) => {
                setData(data.concat(nextData));
                nextData.map((item, index) => {
                    if (index === 0) {
                        setAllSelectedAnswers(allSelectedAnswers.concat({
                            'FK_otazka': item.id,
                            'odpoved': 'none',
                            'timestamp': getTime()
                        }))
                        setSelectedAnswer({
                            "FK_otazka": item.id,
                            "odpoved": "none"
                        })
                    }
                })
            });
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
        }).then()
        loadNextQuestion();
    }

    const wh = window.innerHeight;
    const ww = window.innerWidth;

    return (
        <div className="container px-4">
            <div className="p-4 m-auto" style={{height: wh, width: ww / 1.7}}>
                {data && allSelectedAnswers && data.map((item, index) => {
                    if (index === currentQuestion) {
                        return (
                            <>
                                <div
                                    className="p-5 border border-secondary rounded d-flex align-items-center justify-content-center"
                                    style={{height: wh / 3}}>
                                    <h3 key={item.id} className="p-2">{item.otazka}</h3>
                                    {item.file ? (
                                        <>
                                            {item.file.endsWith(".mp4") ? (
                                                    <video className="p-4 m-4 align-self-center w-auto"
                                                           style={{'max-height': wh / 3}}
                                                           autoPlay muted loop
                                                    >
                                                        <source src={item.file} type="video/mp4"/>
                                                        Váš prohlížeč nepodpoduje video.
                                                    </video>
                                                ) :
                                                <img
                                                    src={item.file}
                                                    alt={item.id}
                                                    className="card-img align-self-center p-4 m-4 w-auto"
                                                    style={{'max-height': wh / 3}}
                                                />
                                            }
                                        </>
                                    ) : null}
                                </div>
                                <h6 className="p-2 mt-2">Odpověď:</h6>
                                <List className="p-0 border border-secondary rounded"
                                      style={{height: wh / 3 + 2}}>
                                    <ListItem
                                        button
                                        selected={selectedListIndex === "a"}
                                        onClick={(event) => handleListItemClick(event, "a", item.id)}
                                        disabled={allSelectedAnswers.length > currentQuestion + 1}
                                        style={item.odpoved_c ? (
                                                {height: wh / 9, backgroundColor: pickColor("a")}
                                            ) :
                                            {height: wh / 6, backgroundColor: pickColor("a")}
                                        }
                                        id="a"
                                        className="rounded-top"
                                    >
                                        <Box
                                            className="p-3 border border-3 border-primary rounded bg-white d-flex align-items-center justify-content-center"
                                            style={{height: wh / 12, width: self.innerHeight / 15}}>
                                            <h4 style={{color: "black"}}>A</h4>
                                        </Box>
                                        <ListItemText className="ms-3" primary={item.odpoved_a}/>
                                    </ListItem>
                                    <ListItem
                                        button
                                        selected={selectedListIndex === "b"}
                                        onClick={(event) => handleListItemClick(event, "b", item.id)}
                                        disabled={allSelectedAnswers.length > currentQuestion + 1}
                                        style={item.odpoved_c ? (
                                                {height: wh / 9, backgroundColor: pickColor("b")}
                                            ) :
                                            {height: wh / 6, backgroundColor: pickColor("b")}
                                        }
                                        id="b"
                                    >
                                        <Box
                                            className="p-3 border border-3 border-primary rounded bg-white d-flex align-items-center justify-content-center"
                                            style={{height: wh / 12, width: self.innerHeight / 15}}>
                                            <h4 style={{color: "black"}}>B</h4>
                                        </Box>
                                        <ListItemText className="ms-3" primary={item.odpoved_b}/>
                                    </ListItem>
                                    {item.odpoved_c ? (
                                        <ListItem
                                            button
                                            selected={selectedListIndex === "c"}
                                            onClick={(event) => handleListItemClick(event, "c", item.id)}
                                            disabled={allSelectedAnswers.length > currentQuestion + 1}
                                            style={{height: wh / 9, backgroundColor: pickColor("c")}}
                                            id="c"
                                            className="rounded-bottom"
                                        >
                                            <Box
                                                className="p-3 border border-3 border-primary rounded bg-white d-flex align-items-center justify-content-center"
                                                style={{height: wh / 12, width: self.innerHeight / 15}}>
                                                <h4 style={{color: "black"}}>C</h4>
                                            </Box>
                                            <ListItemText className="ms-3" primary={item.odpoved_c}/>
                                        </ListItem>
                                    ) : null}
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
                                </Stack>
                            </>
                        )
                    }
                })}
            </div>
        </div>
    )
}