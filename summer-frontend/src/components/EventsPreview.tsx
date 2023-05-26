import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { EventType } from '../types/events';
import Card from './Card';


const EventsPreview:React.FC = () => {
    const [events, setEvents] = useState<EventType[]>([]);
    const [isLoading, setIsLoading] = useState(false)

useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
    try {
        const response = await axios.get('http://localhost:8007/api/v1/events',{
            headers:{
                Accept:'application/json'
            }
        });
        const data:EventType[] = response.data;
        setEvents(data);
        setIsLoading(false)
        console.log(data)
    } catch (error){
        console.log(error);
        setEvents([])
    };
};
fetchData();
},[]);

if(isLoading) {
    return <p>Loading...</p>
}
if(events.length === 0){
    return <p>Events not found</p>
}
    
    return (
        <div>
           <ul>
           {events.map((event)=> 
            <li key={event.id}>Title: {event.title}</li>
           )}
           </ul>
        </div>
    );
};

export default EventsPreview;