import React, {useEffect, useState} from "react";
import {Box, Button, List, ListItemText, withStyles} from "@material-ui/core";
import MuiListItem from "@material-ui/core/ListItem";
import {Stack} from "@mui/material";


export default function Test() {
    document.title = 'Test';

    const [data, setData] = useState(null);
    const [allSelectedAnswers, setAllSelectedAnswers] = useState(null);
    const [selectedListIndex, setSelectedListIndex] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
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

    const handleQuestionChange = (type, value, index) => {
        console.log(type, value);
        if (type === 'btn') {
            localStorage.currentQuestion = value;
            setCurrentQuestion(value);
            markSelectedAnswer(value);
        } else if (type === 'prev' || type === 'next') {
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

    const wh = window.innerHeight;
    const ww = window.innerWidth;

    return (
        <div className="row">
            <div className="col-sm-2 p-4"
                 style={{
                     'margin-top': wh / 30,
                     'margin-left': ww / 20,
                     'box-sizing': 'content-box'
                 }}
            >
                <List className="border border-secondary rounded p-0"
                      style={{'border-collapse': 'collapse', 'border-color': '#FFF'}}
                >
                    <ListItem button onClick={() => handleQuestionChange('btn', 0)}
                              className="py-1 my-0 rounded-top border border-secondary"
                    >
                        <p className="m-0" style={{'font-size': ww / 110}}>Znalost pravidel provozu na pozemních
                            komunikacích (10)</p>
                    </ListItem>
                    <ListItem button onClick={() => handleQuestionChange('btn', 10)}
                              className="py-1 my-0 border border-secondary"
                    >
                        <p className="m-0" style={{'font-size': ww / 110}}>Znalost zásad bezpečné jízdy a ovládání
                            vozidla (4)</p>
                    </ListItem>
                    <ListItem button onClick={() => handleQuestionChange('btn', 14)}
                              className="py-1 my-0 border border-secondary"
                    >
                        <p className="m-0" style={{'font-size': ww / 110}}>Znalost dopravních značek, světelných a
                            akustických signálů, výstražných světel,
                            speciálních
                            označení vozidel a osob, dopravních zařízení a zařízení pro provozní informace včetně
                            náležitého chování řidiče, jež odpovídá jejich významu (3)</p>
                    </ListItem>
                    <ListItem button onClick={() => handleQuestionChange('btn', 17)}
                              className="py-1 my-0 border border-secondary"
                    >
                        <p className="m-0" style={{'font-size': ww / 110}}>Schopnost řešení dopravních situací (3)</p>
                    </ListItem>
                    <ListItem button onClick={() => handleQuestionChange('btn', 20)}
                              className="py-1 my-0 border border-secondary"
                    >
                        <p className="m-0" style={{'font-size': ww / 110}}>Znalost předpisů o podmínkách provozu vozidel
                            na pozemních komunikacích (2)</p>
                    </ListItem>
                    <ListItem button onClick={() => handleQuestionChange('btn', 22)}
                              className="py-1 my-0 border border-secondary"
                    >
                        <p className="m-0" style={{'font-size': ww / 110}}>Znalost předpisů souvisejícíchtype s provozen
                            na pozemních komunikacích (2)</p>
                    </ListItem>
                    <ListItem button onClick={() => handleQuestionChange('btn', 24)}
                              className="py-1 my-0 rounded-bottom border border-secondary"
                    >
                        <p className="m-0" style={{'font-size': ww / 110}}>Znalost zdravotnické přípravy (1)</p>
                    </ListItem>
                </List>
            </div>
            <div className="mx-5" id="center-container"
                 style={{height: wh, width: ww / 1.7}}
            >
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
                                        style={item.odpoved_c ? (
                                                {height: wh / 9}
                                            ) :
                                            {height: wh / 6}
                                        }
                                        key="a"
                                        className="rounded-top"
                                    >
                                        <Box
                                            className="p-3 border border-3 border-primary rounded bg-white d-flex align-items-center justify-content-center"
                                            style={{height: wh / 12, width: self.innerHeight / 15}}>
                                            <h4>A</h4>
                                        </Box>
                                        <ListItemText className="ms-3" primary={item.odpoved_a}/>
                                    </ListItem>
                                    <ListItem
                                        button
                                        selected={selectedListIndex === "b"}
                                        onClick={(event) => handleListItemClick(event, "b", item.id)}
                                        style={item.odpoved_c ? (
                                                {height: wh / 9}
                                            ) :
                                            {height: wh / 6}
                                        }
                                        key="b"
                                    >
                                        <Box
                                            className="p-3 border border-3 border-primary rounded bg-white d-flex align-items-center justify-content-center"
                                            style={{height: wh / 12, width: self.innerHeight / 15}}>
                                            <h4>B</h4>
                                        </Box>
                                        <ListItemText className="ms-3" primary={item.odpoved_b}/>
                                    </ListItem>
                                    {item.odpoved_c ? (
                                            <ListItem
                                                button
                                                selected={selectedListIndex === "c"}
                                                onClick={(event) => handleListItemClick(event, "c", item.id)}
                                                style={{height: wh / 9}}
                                                key="c"
                                                className="rounded-bottom"
                                            >
                                                <Box
                                                    className="p-3 border border-3 border-primary rounded bg-white d-flex align-items-center justify-content-center"
                                                    style={{
                                                        height: wh / 12,
                                                        width: self.innerHeight / 15
                                                    }}>
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