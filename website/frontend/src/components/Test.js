import React, {useEffect, useState} from "react";
import {Box, Button, List, ListItemText, withStyles} from "@material-ui/core";
import MuiListItem from "@material-ui/core/ListItem";
import {Stack} from "@mui/material";


let selectedAnswer = "none";

export default function Test() {
    document.title = 'Test'

    const [data, setData] = useState(null);
    const [allSelectedAnswers, setAllSelectedAnswers] = React.useState(null);
    const [selectedListIndex, setSelectedListIndex] = React.useState(null);
    const [currentquestion, setCurrentquestion] = React.useState(0);
    let answers = []

    useEffect(() => {
        fetch("/api/test?format=json")
            .then((res) => res.json())
            .then((data) => {
                setData(data)
                data.map((item) => {
                    answers = answers.concat({
                        'FK_otazka': item.id,
                        'odpoved': 'none',
                        'timestamp': getTime()
                    });
                })
                setAllSelectedAnswers(answers)
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
        return curTime.getFullYear() + '-' + (curTime.getMonth() + 1) + '-' +
            curTime.getDate() + 'T' + curTime.getHours() + ':' + curTime.getMinutes() + ':' + curTime.getSeconds() + 'Z';
    }


    const handleListItemClick = (event, answer, question) => {
        setSelectedListIndex(answer);
        selectedAnswer = answer;
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

    const handleQuestionChange = (change, value, index) => {
        if (change === 'btn') {
            setCurrentquestion(value);
            markSelectedAnswer(value);
        } else if (change === 'prev' || change === 'next') {
            setCurrentquestion(currentquestion + value);
            markSelectedAnswer(index + value);
        }
    }

    const submitQuestion = (question) => {
        allSelectedAnswers.map((item) => {
            if (item.FK_otazka === question) {
                item.odpoved = selectedAnswer;
                item.timestamp = getTime();
            }
        })
    }

    const handleSendForm = () => {
        console.log(allSelectedAnswers);
    }

    return (
        <div className="p-4 m-4">
            {data &&
            data.map((item, index) => {
                if (index === currentquestion) {
                    return (
                        <>
                            {data.map((item, index) => {
                                return (
                                    <button className="btn btn-default m-1"
                                            onClick={() => handleQuestionChange('btn', index)}
                                    >
                                        {index + 1}
                                    </button>
                                )
                            })}
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
                                        onClick={() => handleQuestionChange('prev', -1, index)}
                                >
                                    Předchozí
                                </Button>
                                <Button variant="contained"
                                        disabled={currentquestion === Object.keys(data).length - 1}
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
    );
};