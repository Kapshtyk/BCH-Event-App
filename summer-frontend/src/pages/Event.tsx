import React,{useState,useEffect} from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import classes from './Event.module.css';
import imagine from "../media/images/rock.jpg";
import { EventType } from '../types/events';



const Event:React.FC = () => {
    const [singleEvent, setEvent] = useState<EventType | null>(null);
    const {event} = useParams<{event:string}>();
    const [isLoading, setIsLoading] = useState(false)

useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
    try {
        const response = await axios.get(`http://localhost:8007/api/v1/events/${event}`,{
            headers:{
                Accept:'application/json'
            }
        });
        const data:EventType = response.data;
        setEvent(data);
        setIsLoading(false)
        console.log(data)
    } catch (error){
        console.log(error);
        setEvent(null)
    };
};
fetchData();
},[event]);

if(isLoading) {
    return <p>Loading...</p>
}
if (singleEvent === null) {
    return <p>Event not found</p>;
  }
    return (
        <div className={classes.event}>
            <img src={imagine} alt="" />
            <h3>Event title : {singleEvent.title}</h3>
            <p>Description: {singleEvent.description}</p>
            <p>Date/Time: {singleEvent.eventDate}</p>
            <p>Location: {singleEvent.location}</p>
            <div>
                {singleEvent.comments?.map((cmnt)=> 
                    <li>{cmnt.text}
                    {cmnt.publishDate}
                    </li>
                )}
            </div>
        </div>
    );
};

export default Event;