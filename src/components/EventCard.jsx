import { Calendar, CircleCheckBig, CircleDot, LocateIcon, MapPin } from "lucide-react";
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
        <div className="flex md:flex-row gap-4">
          <p className="bg-[#efffd6] py-1.5 px-5 rounded-full
          text-nowrap overflow-hidden text-primary font-semibold">
            {events.event_type}
          </p>
          {new Date(events.event_date)>currentDate ?
           <p className="bg-yellow-100 py-1.5 px-3 rounded-full text-yellow-500 font-semibold flex gap-2 items-center"><CircleDot width={16} className="animate-ping"/> Upcoming</p>:
            <p className="flex items-center gap-2 bg-[#efffd6] py-1.5 px-5 rounded-full text-primary font-semibold"> <CircleCheckBig width={18}/> Completed</p>}
        </div>

        <div className="flex  items-center lg:flex-row flex-col gap-3">
          <p className="flex flex-3 text-nowrap overflow-hidden items-center gap-2 bg-[#efffd6] py-1.5 px-2 rounded-full text-primary font-semibold mt-1 w-full">
            <MapPin width={18} /> {events.location}
          </p>


          <p className="flex flex-2 items-center gap-2 bg-[#efffd6] py-1.5 px-2 rounded-full text-primary font-semibold mt-1 w-full">
            <Calendar width={18} /> {new Date(events?.event_date).toLocaleDateString(
                  "en-US",
                  {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  }
                )}
          </p>


        </div>

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
