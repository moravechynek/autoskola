import React, {useEffect, useState} from "react";
import SimpleBar from "simplebar-react";

export default function Historie() {
    document.title = 'Historie';

    const [data, setData] = useState(null);
    const [history, setHistory] = useState([]);
    const [lastMonthDay] = useState({});
    let tempHistory = [];
    let monthIndex = 0;

    useEffect(() => {
        fetch("/api/historie?format=json")
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                data.map((item, index) => {
                    const month = getTime(item.timestamp, 'month')
                    const day = getTime(item.timestamp, 'day')
                    if (!tempHistory[monthIndex] || tempHistory[monthIndex].month !== month) {
                        tempHistory = tempHistory.concat({
                            'month': month,
                            'days': []
                        })
                        if (index > 0) {
                            monthIndex++;
                        }
                    }
                    if (!tempHistory[monthIndex].days.includes(day)) {
                        tempHistory[monthIndex].days = tempHistory[monthIndex].days.concat(day);
                    }
                })
                tempHistory.map((item) => {
                    item.days = item.days.reverse();
                })
                setHistory(tempHistory.reverse());
            });
    }, []);

    const today = (format) => {
        let curTime = new Date();
        let month = curTime.getMonth() + 1;
        let day = curTime.getDate();
        let hours = curTime.getHours();
        let minutes = curTime.getMinutes();
        let seconds = curTime.getSeconds();
        if (month < 10) {
            month = '0' + month;
            if (format === 'month') {
                return month
            }
        }
        if (day < 10) {
            day = '0' + day;
            if (format === 'day') {
                return day
            }
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

    const [currentMonth, setCurrentMonth] = useState(today('month'));
    const [currentDay, setCurrentDay] = useState(today('day'));

    const getTime = (timestamp, format) => {
        if (format === 'month') {
            return timestamp.slice(5, 7)
        } else if (format === 'day') {
            return timestamp.slice(8, 10)
        } else if (format === 'time') {
            return timestamp.slice(11, 19)
        }
    }

    const handleHistoryChange = (format, value) => {
        if (format === 'day') {
            setCurrentDay(value);
            lastMonthDay[currentMonth] = value;
        } else if (format === 'month') {
            setCurrentMonth(value);
            if (lastMonthDay[value]) {
                setCurrentDay(lastMonthDay[value]);
            } else {
                history.map((item) => {
                    if (item.month === value) {
                        let day = Math.max.apply(Math, item.days);
                        if (day < 10) {
                            day = '0' + day;
                        } else {
                            day = day.toString();
                        }
                        setCurrentDay(day);
                    }
                })
            }
        }
    }

    if (data && history) {
        return (
            <SimpleBar style={{maxHeight: window.innerHeight}}>
                <div className="container px-4">
                    <h1>{today()}</h1>
                    <div>
                        {history.map((item) => {
                            if (currentMonth === item.month) {
                                return <button className="btn btn-primary m-1">{item.month}</button>
                            }
                            return <button className="btn btn-outline-primary m-1"
                                           onClick={() => handleHistoryChange('month', item.month)}>{item.month}</button>
                        })}
                    </div>
                    <div>
                        {history.map((item) => {
                            if (item.month === currentMonth) {
                                return (
                                    <>
                                        {item.days.map((day) => {
                                            if (currentDay === day) {
                                                return <button className="btn btn-primary m-1">{day}</button>
                                            }
                                            return <button className="btn btn-outline-primary m-1"
                                                           onClick={() => handleHistoryChange('day', day)}>{day}</button>
                                        })}
                                    </>

                                )
                            }
                        })}
                    </div>
                    <div>
                        {data.map((item) => {
                            if (currentDay === getTime(item.timestamp, 'day') &&
                                currentMonth === getTime(item.timestamp, 'month')) {
                                return <p key={item.id}>Otázka č. {item.FK_otazka},
                                    Odpověď: {item.odpoved.toUpperCase()},
                                    Čas: {getTime(item.timestamp, 'time')}</p>
                            }
                        })}
                    </div>
                </div>
            </SimpleBar>
        );
    }

};