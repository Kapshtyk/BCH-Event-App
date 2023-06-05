import React, { useState, useEffect } from 'react'
import { format, parseISO, isPast, formatDistanceToNow } from 'date-fns'
import { Events } from '../types/events'
import Card from './Card'
import { getEvents } from '../api/EventsAPI'

const EventsPreview: React.FC = () => {
  const [activeEvents, setActiveEvents] = useState<Events>([])
  const [endedEvents, setEndedEvents] = useState<Events>([])
  const [isLoading, setIsLoading] = useState(false)
  const [sortOption, setSortOption] = useState('')
  const [searchEvents, setSearchEvents] = useState('')

  useEffect(() => {
    setIsLoading(true)
    Promise.all([getEvents()]).then(([events]) => {
      const updateActiveEvents = events.filter((event) => {
        const eventDate = parseISO(event.eventDate)
        const isPastEvent = isPast(eventDate)
        return !isPastEvent
      })
      const updateEndedEvents = events.filter((event) => {
        const eventDate = parseISO(event.eventDate)
        const isPastEvent = isPast(eventDate)
        return isPastEvent
      })
      setActiveEvents(updateActiveEvents)
      setEndedEvents(updateEndedEvents)
      setIsLoading(false)
    })
  }, [])

  if (isLoading) {
    return <p>Loading...</p>
  }
  if (activeEvents.length === 0 && endedEvents.length === 0) {
    return <p> Events not found</p>
  }

  const sortEventsByDate = (option: string) => {
    let sortedEvents = [...activeEvents]
    if (option === 'latest') {
      sortedEvents.sort(
        (a, b) =>
          new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime()
      )
    } else if (option === 'oldest') {
      sortedEvents.sort(
        (a, b) =>
          new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime()
      )
    }
    setActiveEvents(sortedEvents)
  }
  const handleSortOptionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedOption = event.target.value
    setSortOption(selectedOption)
    sortEventsByDate(selectedOption)
  }
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchEvents(event.target.value);
  }

  const filteredActiveEvents = activeEvents.filter((event) => {
    const searchEvent = searchEvents.toLowerCase();
    const searchTitle = event.title.toLowerCase();
    const searchLocation = event.location.toLowerCase();
    return (
      searchTitle.includes(searchEvent) || searchLocation.includes(searchEvent)
    );
  });


  // const activeEventsAll = activeEvents.filter((event)=> !event.isPublished);

  return (
    <div>
      <div>
      <input
        type="text"
        value={searchEvents}
        onChange={handleSearch}
        placeholder="Search by title or location"
      />
      </div>
      <label htmlFor="sortOption">Sort by Date:</label>
      <select
        id="sortOption"
        value={sortOption}
        onChange={handleSortOptionChange}
      >
        <option value="">Select an option</option>
        <option value="latest">Latest Date</option>
        <option value="oldest">Oldest Date</option>
      </select>
      <h2>Active Events</h2>
      {activeEvents.length === 0 && <p>There are no active events currently</p>}
      {filteredActiveEvents.map((event) => (
        <Card
          key={event.id}
          id={event.id}
          title={event.title}
          date={format(parseISO(event.eventDate), 'MMMM d,yyyy')}
          time={format(parseISO(event.eventDate), 'h:mm a')}
          timeDifference={formatDistanceToNow(parseISO(event.eventDate))}
          location={event.location}
          description={event.description}
          isPastEvent={!event.isPublished}
        />
      ))}
      {endedEvents.length > 0 && (
        <div>
          <h2>Ended Events</h2>
          {endedEvents.map((event) => (
            <Card
              key={event.id}
              id={event.id}
              title={event.title}
              date={format(parseISO(event.eventDate), 'MMMM d,yyyy')}
              time={format(parseISO(event.eventDate), 'h:mm a')}
              timeDifference={formatDistanceToNow(parseISO(event.eventDate))}
              location={event.location}
              description={event.description}
              isPastEvent={event.isPublished}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default EventsPreview
