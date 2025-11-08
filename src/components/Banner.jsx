import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../index.css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import banner1 from "../assets/Images/Banner-1.jpg";
import banner2 from "../assets/Images/Banner-2.jpg";
import banner3 from "../assets/Images/Banner-3.jpg";
import logo from '../assets/Images/Logo-Icon.png'
import Container from "./Container";
import { NavLink } from "react-router";

const Banner = () => {
  const images = [{ img: banner1 }, { img: banner2 }, { img: banner3 }];
  return (
    <>
      <Container>
        <div className="flex justify-between flex-col-reverse md:flex-row gap-12 mt-16">
          <div className="bg-[#d2efa7] flex-1 rounded-2xl p-5 flex-col flex relative">
            <h1 className="md:text-8xl text-5xl font-bold h-full inline text-primary mb-5 md:mb-0">
              Together,
              we create positive change.
            </h1>
            <NavLink to='/events'>
              <button className="bg-gradient w-full border-2 border-secondary hover-eff cursor-pointer
             rounded-2xl md:py-4 py-2 px-4 text-white font-semibold md:text-2xl text-lg z-10">
              Explore Events
            </button>
            </NavLink>
            <img src={logo} alt="" className="absolute bottom-16 right-0 opacity-10 hidden md:block"/>
          </div>
          <div className="md:w-8/12 md:h-6/12 w-11/12 mx-auto rounded-2xl overflow-hidden flex-2">
            <Swiper
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Autoplay, Pagination, Navigation]}
              className="mySwiper"
            >
              {images.map((image) => (
                <SwiperSlide>
                  {" "}
                  <img src={image.img} alt="banner image" />{" "}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Banner;
