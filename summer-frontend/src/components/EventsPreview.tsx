import React,{useState,useEffect} from 'react';
import { format, parseISO} from 'date-fns';
import {Events} from '../types/events';
import Card from './Card';
import { getEvents } from '../api/EventsAPI';


const EventsPreview:React.FC = () => {
    const [events, setEvents] = useState<Events>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [sortOption, setSortOption] = useState('');

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
const sortEventsByDate = (option: string) => {
    let sortedEvents = [...events];
    if (option === 'latest') {
      sortedEvents.sort((a, b) => new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime());
    } else if (option === 'oldest') {
      sortedEvents.sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime());
    }
    setEvents(sortedEvents);
  };
const handleSortOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = event.target.value;
    setSortOption(selectedOption);
    sortEventsByDate(selectedOption);
  };

const activeEvents = events.filter((event)=> !event.isPublished);
    
    return (
        <div>
           <label htmlFor="sortOption">Sort by Date:</label>
           <select id="sortOption" value={sortOption} onChange={handleSortOptionChange}>
           <option value="">Select an option</option>
           <option value="latest">Latest Date</option>
           <option value="oldest">Oldest Date</option>
           </select>
           {activeEvents.map((event)=> (<Card 
           key={event.id}
           id={event.id}
           title={event.title}
           date={format(parseISO(event.eventDate), 'MMMM d,yyyy')}
           time={format(parseISO(event.eventDate), 'h:mm a')}
           location={event.location}
           description={event.description}/>)
           )}
        </div>
    );
};

export default EventsPreview;