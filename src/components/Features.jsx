/* eslint-disable no-unused-vars */
import React, { useRef } from "react";
import { Calendar, Users, Sparkles, MapPin, Bell, Trophy } from "lucide-react";
import Container from "./Container";
import { useInView } from "../Hooks/use-in-view";
import { motion } from "motion/react";

const Features = () => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, 0.6);
  const features = [
    {
      icon: <Calendar className="w-8 h-8 text-primary" />,
      title: "Discover Events",
      desc: "Explore community gatherings, workshops, and volunteer opportunities near you.",
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Join Communities",
      desc: "Connect with like-minded people and be part of meaningful causes.",
    },
    {
      icon: <Sparkles className="w-8 h-8 text-primary" />,
      title: "Create Your Event",
      desc: "Host your own event and inspire others to make a difference.",
    },
    {
      icon: <Bell className="w-8 h-8 text-primary" />,
      title: "Stay Notified",
      desc: "Get instant updates on upcoming events and registration deadlines.",
    },
    {
      icon: <MapPin className="w-8 h-8 text-primary" />,
      title: "Local & Global",
      desc: "Find events in your city or join virtual sessions from anywhere.",
    },
    {
      icon: <Trophy className="w-8 h-8 text-primary" />,
      title: "Track Progress",
      desc: "View joined events, manage participation, and celebrate impact.",
    },
  ];

  return (
    <motion.section 
    ref={cardRef}
        initial={{ opacity: 0, scale: 0.9, y: 200 }}
        animate={
          isInView
            ? {
                opacity: 1,
                scale: 1,
                y: 0,
                transition: { duration: 0.8, ease: "easeOut" },
              }
            : { opacity: 0.4, scale: 0.95, y: 20 }
        }
    className="bg-linear-to-b from-white to-[#f6ffec] w-11/12 mx-auto rounded-2xl py-28 my-32">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold text-primary mb-4">
            Why Choose Helping Hands?
          </h2>
          <p className="text-lg font-medium text-gray-700 max-w-3xl mx-auto">
            Empowering communities with tools to discover, create, and join
            events that matter.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 bg-white border-2 border-secondary rounded-2xl hover:shadow-lg  transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#d2efa7] rounded-xl group-hover:text-white transition-colors">
                  {feature.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-primary mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 font-medium leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </motion.section>
  );
};

export default Features;
