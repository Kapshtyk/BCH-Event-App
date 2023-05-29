import React,{useState,useEffect} from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import classes from './Event.module.css';
import imagine from "../media/images/rock.jpg";
import { Events } from '../types/events';

const Event:React.FC = () => {
    const [singleEvent, setEvent] = useState<Events>([]);
    const params = useParams();
    const [isLoading, setIsLoading] = useState(false)

useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
    try {
        const response = await axios.get(`http://localhost:8007/api/v1/events/${params.event}`,{
            headers:{
                Accept:'application/json'
            }
        });
        const data:Events = response.data;
        setEvent(data);
        setIsLoading(false)
        console.log(data)
    } catch (error){
        console.log(error);
        setEvent([])
    };
};
fetchData();
},[]);

if(isLoading) {
    return <p>Loading...</p>
}
    return (
        <div className={classes.event}>
            <img src={imagine} alt="" />
            <h3>Event title :</h3>
            <p>Description</p>
            <p>Date/Time</p>
            <p>Location</p>
        </div>
    );
};

export default Event;