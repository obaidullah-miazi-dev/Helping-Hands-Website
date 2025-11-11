/* eslint-disable no-unused-vars */
import { Mail, Send } from "lucide-react";
import Swal from "sweetalert2";
import Container from "./Container";
import { useInView } from "../Hooks/use-in-view";
import { useRef } from "react";
import { motion } from "motion/react"

const Newsletter = () => {
  const cardRef = useRef(null);
       const isInView = useInView(cardRef, 0.6);
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("thanks for subscribing");
  };

  return (
    <Container>
      <motion.section 
      ref={cardRef}
       initial={{ opacity: 0, scale: 0.9, y: 200 }}
       animate={
         isInView
          ? { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
          : { opacity: 0.4, scale: 0.95, y: 20 }
       }
      className="py-30 bg-linear-to-b from-[#f3ffe6] to-[#e0ffbc] rounded-2xl my-16">
        <div className="container mx-auto px-4">
          <div className=" text-center space-y-8">
            <h2 className="text-4xl md:text-6xl font-bold text-primary mb-6">
              Stay Updated with Upcoming Events
            </h2>
            <p className="text-lg font-medium text-gray-700 mb-10 max-w-2xl mx-auto">
              Get notified about new community events, workshops, and volunteer
              opportunities in your inbox.
            </p>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto items-center justify-center"
            >
              <div className="relative flex-1 w-full">
                <Mail
                  className="absolute left-4 top-1/2 transform
               -translate-y-1/2 text-primary w-5 h-5"
                />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-3.5 rounded-full border-2
                   border-secondary bg-white text-gray-800 font-medium
                    placeholder-gray-500 focus:outline-none
                   focus:border-primary "
                />
              </div>

              <button
                type="submit"
                className="bg-gradient hover-eff w-full sm:w-36 cursor-pointer
                 rounded-full py-3.5  px-8 text-white font-semibold
                  flex items-center justify-center gap-2"
              >
                <Send size={20} />
                Subscribe
              </button>
            </form>

            <p className="mt-6 text-sm text-gray-600 font-medium">
              No spam. Unsubscribe anytime.{" "}
              <span className="text-primary">100% free.</span>
            </p>
          </div>
        </div>
      </motion.section>
    </Container>
  );
};

export default Newsletter;
