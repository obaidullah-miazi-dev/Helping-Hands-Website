import React, { useEffect, useState } from "react";
import useAxios from "../Hooks/useAxios";
import EventCard from "../components/EventCard";
import Container from "../components/Container";
import { Search, Send } from "lucide-react";
import Loading from "../components/Loading";

const UpcomingEvents = () => {
  const [events, setEvents] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [eventType, setEventType] = useState('');
  const axios = useAxios();
  console.log(events);

  useEffect(() => {
    axios
      .get("/upcomingEvents")
      .then((data) => setEvents(data.data))
      .catch((error) => {
        setError(error);
      })
      .finally(()=>setLoading(false))
  }, [axios]);

  const handleSubmit = (searchedText) => {
    setLoading(true);
    axios.get(`/search?search=${searchedText}`).then((data) => {
      setEvents(data.data);
    }).catch(error => {
      console.log(error)
    }).finally(()=> setLoading(false))
  };

 const handletype = (categoryType)=>{
   setLoading(true);
   setEventType(categoryType)
    axios.get(`/filteredEvent?eventType=${categoryType}`).then((data) => {
      setEvents(data.data);
    }).catch(error=>{
      console.log(error)
    })
    .finally(()=>setLoading(false))
 }

  if (error) return alert(error);
  return (
    <>
      <Container>
        <div className="flex justify-between flex-col-reverse md:flex-row md:items-center mt-28 mb-12">
          <h2 className="md:text-5xl text-3xl text-primary font-bold border-l-8 border-primary pl-3 ">
            Upcoming Events
          </h2>

          <div className="flex flex-col md:flex-row gap-3 mb-8 md:mb-0 mx-auto md:mx-0">
            <label className="form-control flex-1">
              <select
                className="select select-bordered font-semibold md:w-44  rounded-full"
                value={eventType}
                onChange={(e) => handletype(e.target.value)}
              >
                <option value=''>Filter By Category</option>
                <option value='Community Meetup'>Community Meetup</option>
                <option value='Charity & Fundraising'>Charity & Fundraising</option>
                <option value='Sports & Fitness'>Sports & Fitness</option>
                <option value='Cultural Program'>Cultural Program</option>
                <option value='Educational Workshop'>Educational Workshop</option>
                <option value='Religious Event'>Religious Event</option>
                <option value='Music & Concert'>Music & Concert</option>
                <option value='Festival & Celebration'>Festival & Celebration</option>
                <option value='Food & Cooking Event'>Food & Cooking Event</option>
                <option value='Business Conference'>Business Conference</option>
                <option value='Startup & Networking'>Startup & Networking</option>
                <option value='Health & Awareness'>Health & Awareness</option>
                <option value='Volunteer Program'>Volunteer Program</option>
                <option value='Travel & Outdoor Trip'>Travel & Outdoor Trip</option>
              </select>
            </label>

            <form onChange={(e) => handleSubmit(e.target.value)}>
              <label className="input rounded-full  flex-2">
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
        </div>

        {loading ? (
          <Loading />
        ) : events?.length === 0 ? (
          <div className="my-76 flex justify-center items-center">
            <p className="font-bold text-xl md:text-8xl">⚠️ No Data Found</p>
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

export default UpcomingEvents;
