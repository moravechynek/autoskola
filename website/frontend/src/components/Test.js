import React, {useEffect, useState} from "react";
import {Box, Button, List, ListItemText, withStyles} from "@material-ui/core";
import MuiListItem from "@material-ui/core/ListItem";
import {Stack} from "@mui/material";


export default function Test() {
    document.title = 'Test';

    const [data, setData] = useState(null);
    const [allSelectedAnswers, setAllSelectedAnswers] = React.useState(null);
    const [selectedListIndex, setSelectedListIndex] = React.useState(null);
    const [currentQuestion, setCurrentQuestion] = React.useState(0);
    let answers = [];

    useEffect(() => {
        fetch("/api/test?format=json")
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                if (!localStorage.getItem("allSelectedAnswers")) {
                    data.map((item) => {
                        answers = answers.concat({
                            'FK_otazka': item.id,
                            'odpoved': 'none',
                            'timestamp': getTime()
                        });
                    })
                    setAllSelectedAnswers(answers);
                }
            });
    }, []);

    useEffect(() => {
        const storedQuestion = localStorage.getItem("currentQuestion");
        if (storedQuestion) {
            setCurrentQuestion(parseInt(storedQuestion));
        }
        try {
            const storedAnswers = JSON.parse(localStorage.getItem("allSelectedAnswers"));
            if (storedAnswers) {
                setAllSelectedAnswers(storedAnswers);
                markSelectedAnswer(parseInt(storedQuestion));
            }
        } catch {
        }

    }, []);

    useEffect(() => {
        localStorage.setItem("currentQuestion", String(currentQuestion));
    }, [currentQuestion]);


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
        return curTime.getFullYear() + '-' + month + '-' + day + 'T' + hours + ':' + minutes + ':' + seconds + 'Z';
    }

    const handleListItemClick = (event, answer, question) => {
        setSelectedListIndex(answer);
        submitQuestion(question, answer);
    };

    const markSelectedAnswer = (question_index) => {
        setSelectedListIndex(0);
        if (allSelectedAnswers) {
            allSelectedAnswers.map((item, index) => {
                if (index === question_index) {
                    setSelectedListIndex(item.odpoved);
                }
            })
        } else {
            const storedAnswers = JSON.parse(localStorage.getItem("allSelectedAnswers"));
            storedAnswers.map((item, index) => {
                if (index === question_index) {
                    setSelectedListIndex(item.odpoved);
                }
            })
        }
    }

    const handleQuestionChange = (change, value, index) => {
        if (change === 'btn') {
            localStorage.currentQuestion = value;
            setCurrentQuestion(value);
            markSelectedAnswer(value);
        } else if (change === 'prev' || change === 'next') {
            localStorage.currentQuestion = currentQuestion + value;
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
        localStorage.allSelectedAnswers = JSON.stringify(allSelectedAnswers);
    }

    const handleSendForm = () => {
        console.log(allSelectedAnswers);
        localStorage.removeItem("allSelectedAnswers");
        localStorage.removeItem("currentQuestion");
    }

    return (
        <div className="container px-4">
            <div className="m-auto" id="center-container"
                 style={{height: window.innerHeight, width: window.innerWidth / 1.6}}>
                {data &&
                data.map((item, index) => {
                    if (index === currentQuestion) {
                        let centerWidth = $("#center-container").width()
                        return (
                            <>
                                <div className="my-2 text-center">
                                    {data.map((item, index) => {
                                        if (index === currentQuestion) {
                                            return (
                                                <button className="btn btn-primary btn-sm"
                                                        onClick={() => handleQuestionChange('btn', index)}
                                                        style={{
                                                            width: centerWidth / 30,
                                                            'margin-left': centerWidth / 300,
                                                            'margin-right': centerWidth / 300
                                                        }}
                                                >
                                                    {index + 1}
                                                </button>
                                            )
                                        } else {
                                            return (
                                                <button className="btn btn-outline-primary btn-sm"
                                                        onClick={() => handleQuestionChange('btn', index)}
                                                        style={{
                                                            width: centerWidth / 30,
                                                            'margin-left': centerWidth / 300,
                                                            'margin-right': centerWidth / 300
                                                        }}
                                                >
                                                    {index + 1}
                                                </button>
                                            )
                                        }
                                    })}
                                </div>
                                <div
                                    className="p-5 border border-secondary rounded d-flex align-items-center justify-content-center"
                                    style={{height: window.innerHeight / 3}}>
                                    <h3 key={item.id} className="p-2">{item.otazka}</h3>
                                    {item.file ? (
                                        <>
                                            {item.file.endsWith(".mp4") ? (
                                                    <video className="p-4 m-4 align-self-center w-auto"
                                                           style={{'max-height': window.innerHeight / 3}}
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
                                                    style={{'max-height': window.innerHeight / 3}}
                                                />
                                            }
                                        </>
                                    ) : null}
                                </div>
                                <h6 className="p-2 mt-2">Odpověď:</h6>
                                <List className="p-0 border border-secondary rounded"
                                      style={{height: window.innerHeight / 3 + 2}}>
                                    <ListItem
                                        button
                                        selected={selectedListIndex === "a"}
                                        onClick={(event) => handleListItemClick(event, "a", item.id)}
                                        style={item.odpoved_c ? (
                                                {height: window.innerHeight / 9}
                                            ) :
                                            {height: window.innerHeight / 6}
                                        }
                                        key="a"
                                        className="rounded-top"
                                    >
                                        <Box
                                            className="p-3 border border-3 border-primary rounded bg-white d-flex align-items-center justify-content-center"
                                            style={{height: window.innerHeight / 12, width: self.innerHeight / 15}}>
                                            <h4>A</h4>
                                        </Box>
                                        <ListItemText className="ms-3" primary={item.odpoved_a}/>
                                    </ListItem>
                                    <ListItem
                                        button
                                        selected={selectedListIndex === "b"}
                                        onClick={(event) => handleListItemClick(event, "b", item.id)}
                                        style={item.odpoved_c ? (
                                                {height: window.innerHeight / 9}
                                            ) :
                                            {height: window.innerHeight / 6}
                                        }
                                        key="b"
                                    >
                                        <Box
                                            className="p-3 border border-3 border-primary rounded bg-white d-flex align-items-center justify-content-center"
                                            style={{height: window.innerHeight / 12, width: self.innerHeight / 15}}>
                                            <h4>B</h4>
                                        </Box>
                                        <ListItemText className="ms-3" primary={item.odpoved_b}/>
                                    </ListItem>
                                    {item.odpoved_c ? (
                                            <ListItem
                                                button
                                                selected={selectedListIndex === "c"}
                                                onClick={(event) => handleListItemClick(event, "c", item.id)}
                                                style={{height: window.innerHeight / 9}}
                                                key="c"
                                                className="rounded-bottom"
                                            >
                                                <Box
                                                    className="p-3 border border-3 border-primary rounded bg-white d-flex align-items-center justify-content-center"
                                                    style={{height: window.innerHeight / 12, width: self.innerHeight / 15}}>
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
                                            disabled={currentQuestion === Object.keys(data).length - 1}
                                            style={{backgroundColor: 'lightblue'}}
                                            onClick={() => handleQuestionChange('next', 1, index)}
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
                            </>
                        );
                    }
                })}
            </div>
        </div>
    );
};