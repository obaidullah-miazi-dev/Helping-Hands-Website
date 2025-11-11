import React, { useEffect, useState } from "react";
import useAxios from "../Hooks/useAxios";
import EventCard from "./EventCard";
import Container from "./Container";
import Swal from "sweetalert2";
import Loading from "./Loading";

const CompletedEvent = () => {
  const [events, setEvents] = useState(null);
  const [upcomingEvents, setUpcomingEvents] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axios = useAxios();
  console.log(events);

  useEffect(() => {
    axios
      .get("/events")
      .then((data) => setEvents(data.data.slice(0, 3)))
      .catch((error) => {
        setError(error);
      })
      .finally(setLoading(false));
  }, [axios]);

  useEffect(() => {
    axios
      .get("/upcomingEvents")
      .then((data) => setUpcomingEvents(data.data.slice(0, 3)))
      .catch((error) => {
        setError(error.code);
      })
      .finally(setLoading(false));
  }, [axios]);

  if (loading) return <Loading></Loading>;
  if (error) {
    return Swal.fire({
      position: "center",
      icon: "error",
      title: error,
      showConfirmButton: false,
      timer: 1500,
    });
  }
  return (
    <>
      <Container>
        <div className="my-28">
          <h2 className="md:text-5xl text-3xl text-primary font-bold border-l-8 border-primary pl-3 mb-10">
            Past Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-5">
            {events?.map((event) => (
              <EventCard key={event._id} events={event}></EventCard>
            ))}
          </div>
        </div>

        <div className="my-28">
          <h2 className="md:text-5xl text-3xl text-primary font-bold border-l-8 border-primary pl-3 mb-10">
            Upcoming Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-5">
            {upcomingEvents?.map((event) => (
              <EventCard key={event._id} events={event}></EventCard>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
};

export default CompletedEvent;
