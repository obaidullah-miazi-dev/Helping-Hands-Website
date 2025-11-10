import { CircleCheckBig, CircleDot, LocateIcon, MapPin } from "lucide-react";
import React from "react";
import { NavLink } from "react-router";

const EventCard = ({ events }) => {
  console.log(events);
  const currentDate = new Date()
  return (
    <div>
      <div className="p-5 border-2 border-secondary rounded-2xl h-full space-y-3 flex flex-col justify-between">
        <img
          className="rounded-2xl h-[250px] w-full"
          src={events?.event_img}
          alt={events.title}
        />
        <h2 className="text-primary font-bold text-3xl line-clamp-2">{events.title}</h2>
        <p className="line-clamp-3 font-semibold">{events.description}</p>
        <div className="flex flex-col md:flex-row gap-4">
          <p className="bg-[#d2efa7] py-1.5 px-5 rounded-full text-primary font-semibold">
            {events.event_type}
          </p>
          {new Date(events.event_date)>currentDate ?
           <p className="bg-orange-100 py-1.5 px-2 rounded-full text-orange-500 font-semibold flex gap-2 items-center"><CircleDot width={18} className="animate-ping"/> Upcoming</p>:
            <p className="flex items-center gap-2 bg-[#d2efa7] py-1.5 px-5 rounded-full text-primary font-semibold"> <CircleCheckBig width={18}/> Completed</p>}
        </div>

        <p className="flex items-center gap-2 bg-[#d2efa7] py-1.5 px-2 rounded-full text-primary font-semibold mt-4">
            <MapPin width={18} /> {events.location}
          </p>

        <NavLink to={`/eventDetails/${events._id}`}>
            <button
          className="bg-gradient w-full hover-eff cursor-pointer
             rounded-2xl py-2 px-4 text-white font-semibold mt-3"
        >
          View Details
        </button>
        </NavLink>
      </div>
    </div>
  );
};

export default EventCard;
