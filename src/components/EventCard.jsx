import { LocateIcon, MapPin } from "lucide-react";
import React from "react";

const EventCard = ({ events }) => {
  console.log(events);
  return (
    <div>
      <div className="p-5 border-2 border-secondary rounded-2xl h-full space-y-3">
        <img
          className="rounded-2xl h-[400px]"
          src={events?.event_img}
          alt={events.title}
        />
        <h2 className="text-primary font-bold text-3xl">{events.title}</h2>
        <p className="line-clamp-3 font-semibold">{events.description}</p>
        <div className="flex justify-between gap-5">
          <p className="bg-[#d2efa7] py-1.5 px-5 rounded-full text-primary font-semibold">
            {events.event_type}
          </p>
          <p className="flex flex-2 items-center gap-2 bg-[#d2efa7] py-1 px-2 rounded-full text-primary font-semibold">
            <MapPin /> {events.location}
          </p>
        </div>

        <button
          className="bg-gradient w-full hover-eff cursor-pointer
             rounded-2xl py-2 px-4 text-white font-semibold mt-3"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default EventCard;
