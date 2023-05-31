import React, { useEffect, useState } from 'react';
import axios from 'axios';
import classes from './Helsinki.module.css';

const Helsinki = () => {
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        axios.get('https://api.hel.fi/linkedevents/v1/event/')
            .then(response => {
                setData(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);
    console.log(data);
    return (
        <div className={classes.helsinki}>
            {data.length ? (
                <ul>
                    {data.map(event => (
                        <li key={event.id}>
                            <a href={event.info_url.fi}>{event.name.fi}</a>
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
