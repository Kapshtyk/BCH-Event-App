import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Card from './Card'

interface Event {
    id: number;
    title : string;
    description: string;
    eventData: string;
    location: string

}

const EventsPreview:React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);

useEffect(() => {
    const fetchData = async () => {
    try {
        const response = await axios.get('http://localhost:8007/api/v1/events');
        const data:Event[] = response.data;
        setEvents(data)
        console.log(data)
    } catch (error){
        console.log(error);
    };
};
fetchData();
},[]);
    
    return (
        <div>
            {events.map((event) => (<Card
            key = {event.id}
            title = {event.title}
            />))}
        </div>
    );
};

export default EventsPreview;