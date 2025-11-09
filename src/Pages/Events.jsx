import React, { useEffect, useState } from "react";
import useAxios from "../Hooks/useAxios";
import EventCard from "../components/EventCard";
import Container from "../components/Container";

const Events = () => {
  const [events, setEvents] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axios = useAxios();
  console.log(events);

  useEffect(() => {
    axios
      .get("/events")
      .then((data) => setEvents(data.data))
      .catch((error) => {
        setError(error);
      })
      .finally(setLoading(false));
  }, [axios]);

  if (loading) return <p>loading..................</p>;
  if (error) return alert(error);
  return (
    <>
      <Container>
        <h2 className="md:text-5xl text-3xl text-primary font-bold border-l-8 border-primary pl-3 mt-16 mb-8">
          All Events
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-8">
          {events?.map((event) => (
            <EventCard key={event._id} events={event}></EventCard>
          ))}
        </div>
      </Container>
    </>
  );
};

export default Events;
