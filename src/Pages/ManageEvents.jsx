import React, { use, useEffect, useState } from "react";
import useAxios from "../Hooks/useAxios";
import { AuthContext } from "../Provider/AuthProvider";
import { NavLink } from "react-router";
import Container from "../components/Container";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { subDays } from "date-fns";
import { ArrowLeft } from "lucide-react";
import Loading from "../components/Loading";

const ManageEvents = () => {
  const axios = useAxios();
  const { user } = use(AuthContext);
  const [myEvent, setMyEvents] = useState([]);
  const [eventDate, setEventDate] = useState(null);
  const [editId, setEditId] = useState(null);
  const [eventData, setEventData] = useState(null);
  const [loading,setLoading]= useState(true)

  useEffect(() => {
    setLoading(true)
    axios
      .get(`/myEvents?email=${user?.email}`)
      .then((data) => setMyEvents(data.data))
      .catch((error) => {
        console.log(error);
      })
      .finally(()=> setLoading(false))
  }, [axios, user]);



  const handleDeleteEvent = (id) => {
    alert("are you sure to Delete");
    axios
      .delete(`/myEvent/${id}`)
      .then((data) => {
        if (data.data.deletedCount) {
          const remainingEvents = myEvent.filter((event) => event._id !== id);
          setMyEvents(remainingEvents);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
      event_date: eventDate?.toISOString(),
    };

    axios
      .patch(`/myEvents/${editId}`, formData)
      .then((data) => {
        if (data.data.modifiedCount) {
          axios
            .get(`/myEvents?email=${user?.email}`)
            .then((data) => setMyEvents(data.data))
            .catch((error) => {
              console.log(error);
            });
          alert("updated successfully");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    e.target.reset();
    document.getElementById("my_modal").close();
  };

  const handleModalOpen = (id) => {
    setEditId(id);
    document.getElementById("my_modal").showModal();
    axios
      .get(`/eventDetails/${id}`)
      .then((data) => setEventData(data.data))
      .catch((error) => {
        alert(error.code);
      });
  };

  if(loading) return <Loading></Loading>



  return (
    <Container>
      <h2
        className="md:text-5xl text-3xl text-primary font-bold
         border-l-8 border-primary pl-3 mt-16 mb-8"
      >
        My Events
      </h2>
      {myEvent.length === 0 ? (
        <div className="my-76 flex justify-center items-center">
          <p className="font-bold text-xl md:text-8xl">⚠️ No Data Found</p>
        </div>
      ) : (
        <div>
          {myEvent?.map((events) => (
            <div
              key={events?._id}
              className="flex  my-8 flex-col sm:flex-row rounded-2xl shadow-md
         hover:shadow-lg transition-shadow duration-300 overflow-hidden
          p-4 gap-4 border border-gray-100"
            >
              <div className="flex  md:justify-center items-center">
                <img
                  src={events?.event_img}
                  className="w-96 h-54 object-cover rounded-xl "
                />
              </div>

              <div className="flex flex-col space-y-4 w-full justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-primary mb-3">
                    {events?.title}
                  </h2>

                  <p className="line-clamp-3">{events?.description}</p>
                </div>

                <div>
                  <div
                    className="flex flex-wrap items-center justify-between
               border-b-2 border-gray-200 pb-3"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="text-sm font-medium text-blue-600
               bg-blue-50 px-3 py-1 rounded-full"
                      >
                        Event Id : {events?._id}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-3">
                    <NavLink to={`/eventDetails/${events?._id}`}>
                      <button
                        className="bg-green-500 hover:bg-green-600
               text-white text-sm px-4 py-2 rounded-full  sm:mt-0 w-full md:w-28 cursor-pointer"
                      >
                        View Details
                      </button>
                    </NavLink>

                    {/* Open the modal using document.getElementById('ID').showModal() method */}
                    <button
                      className="bg-green-500 hover:bg-green-600
               text-white text-sm px-4 py-2 rounded-full  sm:mt-0 w-full md:w-28 cursor-pointer"
                      onClick={() => handleModalOpen(events?._id)}
                    >
                      Edit Event
                    </button>
                    <dialog id="my_modal" className="modal">
                      <div className="modal-box">
                        <form method="dialog">
                          {/* if there is a button in form, it will close the modal */}
                          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                          </button>
                        </form>

                        <div>
                          <h1 className="text-4xl font-bold text-center text-primary mb-8">
                            Edit Event
                          </h1>

                          <form
                            onSubmit={handleSubmit}
                            className="bg-white rounded-2xl p-8 space-y-6"
                          >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <label
                                  htmlFor="title"
                                  className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                  Title
                                </label>
                                <input
                                  type="text"
                                  defaultValue={eventData?.title}
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
                                  className="block text-sm font-medium text-gray-700 mb-1"
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
                                className="block text-sm font-medium text-gray-700 mb-1"
                              >
                                Your Events Image URL
                              </label>
                              <input
                                type="url"
                                id="event_img"
                                name="event_img"
                                defaultValue={eventData?.event_img}
                                placeholder="https://..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                                required
                              />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <label
                                  htmlFor="YourName"
                                  className="block text-sm font-medium text-gray-700 mb-1"
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
                                  className="block text-sm font-medium text-gray-700 mb-1"
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
                                  className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                  Your Contact
                                </label>
                                <input
                                  type="tel"
                                  id="YourContact"
                                  name="contact"
                                  defaultValue={eventData?.creator_contact}
                                  placeholder="Your Contact Number"
                                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                                  required
                                />
                              </div>

                              <div>
                                <label
                                  htmlFor="YourImageUrl"
                                  className="block text-sm font-medium text-gray-700 mb-1"
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
                                  className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                  Location
                                </label>
                                <input
                                  type="text"
                                  id="location"
                                  name="location"
                                  defaultValue={eventData?.location}
                                  placeholder="City, Country"
                                  className="w-full px-4 py-2 border border-gray-300
                 rounded-lg focus:ring-2 focus:ring-primary
                  focus:border-transparent outline-none transition"
                                  required
                                />
                              </div>

                              <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Event Date
                                </label>
                                <DatePicker
                                  wrapperClassName="w-full"
                                  value={eventData?.event_date}
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
                                className="block text-sm font-medium text-gray-700 mb-1"
                              >
                                Simple Description about your Event
                              </label>
                              <textarea
                                id="description"
                                name="description"
                                defaultValue={eventData?.description}
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
                      <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                      </form>
                    </dialog>

                    <button
                      onClick={() => handleDeleteEvent(events?._id)}
                      className="bg-red-100 text-red-600 py-1.5 px-4
               rounded-full font-semibold hover:bg-red-200 cursor-pointer"
                    >
                      Delete Event
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
};

export default ManageEvents;
