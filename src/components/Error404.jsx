/* eslint-disable no-unused-vars */
import React from "react";
import { Home, ArrowLeft, HeartHandshake } from "lucide-react";
import { motion } from "framer-motion";
import Container from "../components/Container";
import { Link } from "react-router";

const Error404 = () => {
  return (
    <section className="min-h-screen flex items-center py-16">
      <Container>
        <div className="text-center max-w-3xl mx-auto">
         
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            className="mb-8"
          >
            <h1 className="text-9xl md:text-[180px] font-bold text-primary dark:text-green-400 leading-none flex justify-center items-center">
              4
              <span className=" animate-pulse">
                <HeartHandshake className="w-32 h-32 md:w-48 md:h-48 mx-auto text-secondary dark:text-green-300" />
              </span>
              4
            </h1>
          </motion.div>

        
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
              Oops! Page Not Found
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 font-medium mb-8 max-w-xl mx-auto">
              The page you're looking for seems to have wandered off. But don't worry — 
              there are plenty of meaningful events waiting for you!
            </p>
          </motion.div>


          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              to="/"
              className="bg-gradient hover-eff cursor-pointer rounded-full py-3 px-8 text-white font-semibold flex items-center gap-2 text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              <Home size={20} />
              Back to Home
            </Link>

            <Link
              to="/upcomingEvents"
              className="border-2 border-secondary dark:border-green-400 text-primary dark:text-green-400 hover:bg-secondary dark:hover:bg-green-400 hover:text-white dark:hover:text-gray-900 font-semibold rounded-full py-3 px-8 flex items-center gap-2 text-lg transition-all transform hover:scale-105"
            >
              <ArrowLeft size={20} />
              Explore Events
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-16"
          >
            <div className="relative inline-block">
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                Let's find a way to help together
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default Error404;