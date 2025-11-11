import React, { use, useEffect, useState } from "react";
import useAxios from "../Hooks/useAxios";
import { AuthContext } from "../Provider/AuthProvider";
import { NavLink } from "react-router";
import Container from "../components/Container";
import Loading from "../components/Loading";
import Swal from "sweetalert2";

const JoinedEvents = () => {
  const axios = useAxios();
  const { user } = use(AuthContext);
  const [joinedEvent, setJoinedEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/joinedEvents?email=${user?.email}`)
      .then((data) => setJoinedEvents(data.data))
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, [axios, user]);

  if (loading) return <Loading></Loading>;

  const handleCancelJoin = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`/joinedEvents/${id}`)
          .then((data) => {
            if (data.data.deletedCount) {
              const remainingEvents = joinedEvent.filter(
                (event) => event._id !== id
              );
              setJoinedEvents(remainingEvents);
            }
          })
          .catch((error) => {
            Swal.fire({
              position: "center",
              icon: "error",
              title: error.code,
              showConfirmButton: false,
              timer: 1500,
            });
          });
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Oh, You canceled to join with us",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  //   console.log(joinedEvent);
  return (
    <Container>
      <h2
        className="md:text-5xl text-3xl text-primary font-bold
         border-l-8 border-primary pl-3 mt-16 mb-8"
      >
        Joined Events
      </h2>
      {joinedEvent.length === 0 ? (
        <div className="my-76 flex justify-center items-center">
          <p className="font-bold text-xl md:text-8xl">⚠️ No Data Found</p>
        </div>
      ) : (
        <div>
          {joinedEvent?.map((events) => (
            <div
              key={events?._id}
              className="flex  my-8 flex-col sm:flex-row rounded-2xl shadow-md
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
                      onClick={() => handleCancelJoin(events?._id)}
                      className="bg-red-100 text-red-600 py-1.5 px-4
               rounded-full font-semibold hover:bg-red-200 cursor-pointer"
                    >
                      Cancel Join
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

export default JoinedEvents;
