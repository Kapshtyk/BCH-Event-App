import React, { useEffect, useState } from 'react';
import axios from 'axios';
import classes from './Helsinki.module.css';
import Event from "../models/Event";

const Helsinki = () => {
    const [data, setData] = useState<Event[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let allData = [];
                let nextPage = 'https://api.hel.fi/linkedevents/v1/event/';

                while (nextPage) {
                    const response = await axios.get(nextPage);
                    const { data: responseData, meta } = response.data;
                    allData.push(...responseData);
                    nextPage = meta.next;
                }

                const today = new Date().toISOString().split('T')[0]; // Get today's date in the format "YYYY-MM-DD"
                const filteredData = allData.filter(
                    (event: Event) => event.start_time.split('T')[0] === today // Filter events with "start_time" equal to today
                );

                setData(filteredData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    console.log(data);

    const getFinnishEventNameSpan = (event: Event) => {
        if (!event.name) {
            return <span>Event</span>;
        }
        return <span>{event.name.fi}</span>;
    };

    const getEventNameSpan = (event: Event) => {
        if (!event.name) {
            return <span>Event</span>;
        }
        if (!event.name.en) {
            return getFinnishEventNameSpan(event);
        }
        if (event.name.en.length === 0) {
            return getFinnishEventNameSpan(event);
        }
        return <span>{event.name.en}</span>;
    };

    return (
        <div className={classes.helsinki}>
            {data.length ? (
                <ul>
                    {data.map((event) => (
                        <li key={event.id}>
                            {event.images![0] ? <img src={event.images![0].url} alt="Event" /> : null}
                            {event.end_time ? (
                                <span>
                                    {new Date(event.start_time).toLocaleDateString()} -{' '}
                                    {new Date(event.end_time).toLocaleDateString()}
                                </span>
                            ) : (
                                <span>{new Date(event.start_time).toLocaleDateString()}</span>
                            )}
                            {getEventNameSpan(event)}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Helsinki;