// src/components/CreateProductForm.jsx
import React, { use, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { AuthContext } from "../Provider/AuthProvider";
import { Link, useNavigate } from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { subDays } from "date-fns";
import useAxios from "../Hooks/useAxios";

const CreateEvent = () => {
  const { user } = use(AuthContext);
  const [eventDate, setEventDate] = useState(null);
  const navigate = useNavigate()
  const axios = useAxios()
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      title: e.target.title.value,
      event_type: e.target.category.value,
      event_img: e.target.event_img.value,
      creator_name: e.target.name.value,
      creator_email: e.target.email.value,
      creator_contact: e.target.contact.value,
      creator_image: e.target.creator_image.value,
      location: e.target.location.value,
      description: e.target.description.value,
      event_date: eventDate.toISOString(),
    };

    axios.post('/createEvent',formData)
    .then(data => {
        if(data.data.insertedId){
            alert('event created Successfully')
            navigate('/upcomingEvents')
        }
        
    })
    .catch(error=>{
        console.log(error);
    })

  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Link to="/upcomingEvents">
          <button
            className="flex items-center gap-2  hover:text-primary
           transition mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Back To Events
          </button>
        </Link>

        <h1 className="text-4xl font-bold text-center text-primary mb-8">
          Create an Event
        </h1>

        <form
          onSubmit={handleSubmit}
          className="border-white border-2 rounded-2xl shadow-xl p-8 space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium  mb-1"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Event Title"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg
                 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                required
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium  mb-1"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg
                 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                required
              >
                <option value="">Select a Category</option>
                <option>Community Meetup</option>
                <option>Charity & Fundraising</option>
                <option>Sports & Fitness</option>
                <option>Cultural Program</option>
                <option>Educational Workshop</option>
                <option>Religious Event</option>
                <option>Music & Concert</option>
                <option>Festival & Celebration</option>
                <option>Food & Cooking Event</option>
                <option>Business Conference</option>
                <option>Startup & Networking</option>
                <option>Health & Awareness</option>
                <option>Volunteer Program</option>
                <option>Travel & Outdoor Trip</option>
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="event_img"
              className="block text-sm font-medium  mb-1"
            >
              Your Events Image URL
            </label>
            <input
              type="url"
              id="event_img"
              name="event_img"
              placeholder="https://..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="YourName"
                className="block text-sm font-medium  mb-1"
              >
                Your Name
              </label>
              <input
                type="text"
                id="YourName"
                name="name"
                value={user?.displayName}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 
                focus:ring-primary focus:border-transparent outline-none transition"
                required
              />
            </div>

            <div>
              <label
                htmlFor="YourEmail"
                className="block text-sm font-medium  mb-1"
              >
                Your Email
              </label>
              <input
                type="email"
                id="YourEmail"
                name="email"
                value={user?.email}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                required
              />
            </div>

            <div>
              <label
                htmlFor="YourContact"
                className="block text-sm font-medium  mb-1"
              >
                Your Contact
              </label>
              <input
                type="tel"
                id="YourContact"
                name="contact"
                placeholder="Your Contact Number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                required
              />
            </div>

            <div>
              <label
                htmlFor="YourImageUrl"
                className="block text-sm font-medium  mb-1"
              >
                Your Image URL
              </label>
              <input
                type="url"
                id="creatorImageUrl"
                name="creator_image"
                value={user?.photoURL}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
              />
            </div>
          </div>

          <div className="flex justify-between gap-5">
            <div className="flex-1">
              <label
                htmlFor="location"
                className="block text-sm font-medium  mb-1"
              >
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                placeholder="City, Country"
                className="w-full px-4 py-2 border border-gray-300
                 rounded-lg focus:ring-2 focus:ring-primary
                  focus:border-transparent outline-none transition"
                required
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium  mb-1">
                Event Date
              </label>
              <DatePicker
                wrapperClassName="w-full"
                selected={eventDate}
                onChange={(date) => setEventDate(date)}
                minDate={subDays(new Date(), -1)}
                dateFormat="yyyy-MM-dd"
                placeholderText="Select Event Date"
                className="w-full px-4 py-2 border
                 border-gray-300 rounded-lg
                   focus:ring-2 focus:ring-primary focus:border-transparent
                   outline-none transition"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium  mb-1"
            >
              Simple Description about your Event
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              placeholder="Write Your Event Details"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition resize-none"
              required
            ></textarea>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-gradient text-white py-4 rounded-xl
               font-semibold text-lg shadow-lg hover-eff transition"
            >
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
