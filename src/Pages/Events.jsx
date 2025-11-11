import React, { useEffect, useState } from "react";
import useAxios from "../Hooks/useAxios";
import EventCard from "../components/EventCard";
import Container from "../components/Container";
import Swal from "sweetalert2";
import Loading from "../components/Loading";

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
      .finally(()=>setLoading(false));
  }, [axios]);

  const handleSubmit = (searchedText) => {
    setLoading(true);
    axios.get(`/searchAllEvent?search=${searchedText}`)
    .then((data) => {
      setEvents(data.data)
    }).catch(error=>{
      setError(error.code)
    }).finally(()=>setLoading(false))
  };

  if (error) {
    Swal.fire({
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
        <div className="flex justify-between items-center gap-5  mt-28 mb-12">
          <h2 className="md:text-5xl text-xl text-primary font-bold text-nowrap md:border-l-8 border-primary pl-3">
            All Events
          </h2>

          <form onChange={(e) => handleSubmit(e.target.value)}>
            <label className="input rounded-full md:w-xs">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>
              <input type="search" required placeholder="Search" />
            </label>
          </form>
        </div>

        {loading ? (
          <Loading />
        ) : events?.length === 0 ? (
          <div className="my-76 flex justify-center items-center">
            <p className="font-bold min-h-screen text-xl md:text-8xl">⚠️ No Data Found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-8">
            {events?.map((event) => (
              <EventCard key={event._id} events={event}></EventCard>
            ))}
          </div>
        )}
      </Container>
    </>
  );
};

export default Events;
