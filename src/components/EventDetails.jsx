import React, { use, useEffect, useState } from "react";
import useAxios from "../Hooks/useAxios";
import { useLocation, useNavigate, useParams } from "react-router";
import Container from "./Container";
import { Calendar, CircleCheckBig, CircleDot, MapPin } from "lucide-react";
import { AuthContext } from "../Provider/AuthProvider";

const EventDetails = () => {
  const [eventDetails, setEventDetails] = useState(null);
  const { id } = useParams();
  const {user} = use(AuthContext)
   const [joinedEvent, setJoinedEvents] = useState([]);
  // console.log(eventDetails);
  const currentDate = new Date();
  const axios = useAxios();
  // console.log(joinedEvent);
  const navigate = useNavigate()
  const location = useLocation()
  console.log(location);



  useEffect(() => {
    axios
      .get(`/eventDetails/${id}`)
      .then((data) => setEventDetails(data.data))
      .catch((error) => {
        alert(error.code);
      });
  }, [axios, id]);




  useEffect(() => {
      axios
        .get(`/joinedEvents?email=${user?.email}`)
        .then((data) => setJoinedEvents(data.data))
        .catch((error) => {
          console.log(error);
        });
    }, [axios, user]);



    const alreadyJoined = joinedEvent?.some(event => event.event_id === id)
  const handleJoinIn = () =>{
    if(alreadyJoined){
      return alert('you have already joined in this event')
    }
    if(!user){
      navigate('/login')
    }
    const joinInEventDetails = {
      title: eventDetails.title,
      description: eventDetails.description,
      image:eventDetails.event_img,
      event_id: eventDetails._id,
      person_name: user.displayName,
      person_img: user.photoURL,
      person_email: user.email
    }
    axios.post('/joinInEvent',joinInEventDetails)
    .then(data => {
      if(data.data.insertedId){
       setJoinedEvents([...joinedEvent,joinInEventDetails])
        alert('joined successfully')
      }
    })
    .catch(error=>{
      console.log(error)
    })
  }

  return (
    <>
      <Container>
        <div className="flex flex-col-reverse lg:flex-row gap-18 justify-center items-center mt-32">
          {/* content  */}
          <div className="space-y-3 flex-2">
            <h2 className="lg:text-7xl text-4xl font-bold text-primary">
              {eventDetails?.title}
            </h2>

            <div className="flex gap-3 items-center mt-8">
              <img
                className="lg:w-10 lg:h-10 w-8 h-8 rounded-full bg-secondary"
                src={eventDetails?.creator_image}
                alt={eventDetails?.creator_name}
              />
              <p className="font-bold lg:text-2xl ">
                Hosted By{" "}
                <span className="text-primary">
                  {eventDetails?.creator_name}
                </span>
              </p>
            </div>

            <div className="border-2 border-secondary p-5 rounded-2xl mt-8">
              <p className="lg:font-semibold lg:text-xl ">
                <span className="font-bold text-primary">About Event : </span>
                {eventDetails?.description}
              </p>

              <div className="flex flex-col lg:flex-row gap-4 mt-5">
                <p className="bg-[#d2efa7] py-1.5 px-5 rounded-full text-primary font-semibold">
                  {eventDetails?.event_type}
                </p>
                {new Date(eventDetails?.event_date) > currentDate ? (
                  <p className="bg-orange-100 py-1.5 px-2 rounded-full
                   text-orange-500 font-semibold flex gap-2 items-center">
                    <CircleDot width={18} className="animate-ping" /> Upcoming
                  </p>
                ) : (
                  <p className="flex items-center gap-2 bg-[#d2efa7]
                   py-1.5 px-5 rounded-full text-primary font-semibold">
                    {" "}
                    <CircleCheckBig width={18} /> Completed
                  </p>
                )}
              </div>
            </div>

            <div>
              {new Date(eventDetails?.event_date) < currentDate ? 
                <p></p>
              : 
                <button onClick={handleJoinIn}
                disabled={alreadyJoined}
                className={`${alreadyJoined ? 'cursor-not-allowed bg-gray-500': 'bg-gradient  cursor-pointer hover-eff'}  rounded-xl text-lg 
               py-2.5 px-5 text-white  font-semibold w-full`}
              >
                {alreadyJoined?'Already Joined': 'Join Now'}
              </button>}
              
            </div>
          </div>

          {/* image  */}
          <div className="flex-1">
            <img
              src={eventDetails?.event_img}
              alt={eventDetails?.title}
              className="h-96 rounded-2xl w-full"
            />
            <div className="border-2 border-secondary p-5 rounded-2xl mt-8 space-y-3">
              <p className="flex items-center gap-2 font-bold">
                <Calendar />{" "}
                {new Date(eventDetails?.event_date).toLocaleDateString(
                  "en-US",
                  {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  }
                )}
              </p>
              <p className="flex items-center gap-2 font-bold">
                <MapPin></MapPin> {eventDetails?.location}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default EventDetails;
