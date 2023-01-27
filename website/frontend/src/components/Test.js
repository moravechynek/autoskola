import React, {useEffect, useState} from "react";
import {Box, Button, List, ListItemText, withStyles} from "@material-ui/core";
import MuiListItem from "@material-ui/core/ListItem";

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
                <div>
                  <h2 key={item.id}>{item.otazka}</h2>
                  <Button onClick={(event) => handleSendForm()}>KLIK</Button>
                  <Box sx={{ border: 1, borderColor: '#000' }}>
                    <List>
                      <ListItem
                          button
                          selected={selectedIndex === 1}
                          onClick={(event) => handleListItemClick(event, 1, "a", item.id)}
                          key="a"
                      >
                        <ListItemText primary={item.odpoved_a}/>
                      </ListItem>

                      <ListItem
                          button
                          selected={selectedIndex === 2}
                          onClick={(event) => handleListItemClick(event, 2, "b", item.id)}
                          key="b"
                      >
                        <ListItemText primary={item.odpoved_b}/>
                      </ListItem>

                      <ListItem
                          button
                          selected={selectedIndex === 3}
                          onClick={(event) => handleListItemClick(event, 3, "c", item.id)}
                          key="c"
                      >
                        <ListItemText primary={item.odpoved_c}/>
                      </ListItem>
                    </List>
                  </Box>
                </div>
            );
          })}
        </>
      );
    };