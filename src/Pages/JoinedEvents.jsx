import React, { use, useEffect, useState } from "react";
import useAxios from "../Hooks/useAxios";
import { AuthContext } from "../Provider/AuthProvider";
import { NavLink } from "react-router";
import Container from "../components/Container";

const JoinedEvents = () => {
  const axios = useAxios();
  const { user } = use(AuthContext);
  const [joinedEvent, setJoinedEvents] = useState();
  useEffect(() => {
    axios
      .get(`/joinedEvents?email=${user?.email}`)
      .then((data) => setJoinedEvents(data.data))
      .catch((error) => {
        console.log(error);
      });
  }, [axios, user]);
//   console.log(joinedEvent);
  return (
    <Container>
        <h2 className="md:text-5xl text-3xl text-primary font-bold
         border-l-8 border-primary pl-3 mt-16 mb-8">
          Joined Events
        </h2>
        <div>
      {joinedEvent?.map((events) => (
        <div
          key={events?._id}
          className="flex  my-8 flex-col sm:flex-row bg-white rounded-2xl shadow-md
         hover:shadow-lg transition-shadow duration-300 overflow-hidden
          p-4 gap-4 border border-gray-100"
        >
          <div className="flex  md:justify-center items-center">
            <img
              src={events?.image}
              className="w-96 h-54 object-cover rounded-xl "
            />
          </div>

          <div className="flex flex-col space-y-4 w-full justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                {events?.title}
              </h2>

              <p className="line-clamp-3">{events?.description}</p>
             </div>

             

            <div>
                <div
              className="flex flex-wrap items-center justify-between
               border-b-2 border-gray-200 pb-3">
              <div className="flex items-center gap-3">
                <span
                  className="text-sm font-medium text-blue-600
               bg-blue-50 px-3 py-1 rounded-full"
                >
                  Event Id : {events?.event_id}
                </span>
              </div>
            </div>
                <div className="flex items-center gap-3 mt-3">
                
              <NavLink to={`/eventDetails/${events?.event_id}`}>
                <button
                  className="bg-green-500 hover:bg-green-600
               text-white text-sm px-4 py-2 rounded-full  sm:mt-0 w-full md:w-28 cursor-pointer"
                >
                  View Details
                </button>
              </NavLink>

              <button
                className="bg-red-100 text-red-600 py-1.5 px-4
               rounded-full font-semibold hover:bg-red-200 cursor-pointer"
              >
                Remove
              </button>
            </div>
            </div>
          </div>
        </div>
      ))}
    </div>
    </Container>
  );
};

export default JoinedEvents;
