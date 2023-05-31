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
                    {data.map(image => (
                        <li key={image.id}>
                            <img src={image.url} alt={image.alt_text} />
                            <p>{image.name}</p>
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
