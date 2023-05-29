import React,{useState,useEffect} from 'react';
import {Events} from '../types/events';
import Card from './Card';
import { getEvents } from '../api/EventsAPI';


const EventsPreview:React.FC = () => {
    const [events, setEvents] = useState<Events>([]);
    const [isLoading, setIsLoading] = useState(false);

useEffect(() => {
    setIsLoading(true);
    Promise.all([getEvents()]).then(
        ([events]) => {
          setEvents(events)
          setIsLoading(false)
        }
      )
    
   
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
           id={event.id}
           title={event.title}
           date={event.eventDate}
           location={event.location}
           description={event.description}/>)
           )}
        </div>
    );
};

export default EventsPreview;