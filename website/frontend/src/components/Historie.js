import React, {useEffect, useState} from "react";

export default function Historie() {
    document.title = 'Historie';

    const [data, setData] = useState(null);

    useEffect(() => {
        fetch("/api/historie?format=json")
            .then((res) => res.json())
            .then((data) => setData(data));
    }, []);

    let time = new Date()
    let formatted_time = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' +
        time.getDay() + 'T' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();


    return (
        <div className="container px-4">
            <h1>{formatted_time}</h1>
            {data &&
            data.map((item) => {
                return (
                    <div>
                        <p key={item.id}>{item.FK_otazka} {item.odpoved} {item.timestamp}</p>
                    </div>
                );
            })}
        </div>
    );
};