import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {Events} from '../types/events';
import Card from './Card';
import { getEvents } from '../api/EventsAPI';


const EventsPreview:React.FC = () => {
    const [events, setEvents] = useState<Events>([]);
    const [isLoading, setIsLoading] = useState(false)

useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
    try {
        const response = {
            headers:{
                Accept:'application/json'
            }
        });
        const data:Events = response.data;
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
           {events.map((event)=> (<Card 
           key={event.id}
           title={event.title}
           date={event.eventDate}
           location={event.location}/>)
           )}
        </div>
    );
};

export default EventsPreview;