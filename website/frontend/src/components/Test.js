import { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import React from "react";
import {List, ListItemText, withStyles} from "@material-ui/core";
import MuiListItem from "@material-ui/core/ListItem";

let selectedAnswer = "none";

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

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const handleListItemClick = (event, index, answer) => {
    setSelectedIndex(index);
    selectedAnswer = answer;
  };

    return (
        <>
          {data &&
          data.map((item) => {
            return (
                <div>
                  <h2 key={item.id}>{item.otazka}</h2>
                  <List>
                    <ListItem
                        button
                        selected={selectedIndex === 1}
                        onClick={(event) => handleListItemClick(event, 1, "a")}
                        key="a"
                    >
                      <ListItemText primary={item.odpoved_a}/>
                    </ListItem>

                    <ListItem
                        button
                        selected={selectedIndex === 2}
                        onClick={(event) => handleListItemClick(event, 2, "b")}
                        key="b"
                    >
                      <ListItemText primary={item.odpoved_b}/>
                    </ListItem>

                    <ListItem
                        button
                        selected={selectedIndex === 3}
                        onClick={(event) => handleListItemClick(event, 3, "c")}
                        key="c"
                    >
                      <ListItemText primary={item.odpoved_c}/>
                    </ListItem>
                  </List>
                </div>
            );
          })}
        </>
      );
    };