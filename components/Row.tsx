import { Movie } from "@/typings";
import React, { useRef } from "react";
import Card from "./Card";

import { Navigation, FreeMode } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

interface Props {
  title: string;
  movies: Movie[];
}

export default function Row({ title, movies }: Props) {
  return (
    <section>
      <div>
        <h1 className="text-xl font-bold">{title}</h1>
      </div>
      <div className="relative mt-6">
        <Swiper
          modules={[Navigation, FreeMode]}
          spaceBetween={5}
          slidesPerView={5}
          navigation={{
            prevEl: ".row-button-prev",
            nextEl: ".row-button-next",
          }}
          freeMode={true}
          breakpoints={{
            320: {
              slidesPerView: 2.5,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 3.5,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 3.5,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 4.5,
              spaceBetween: 5,
            },
          }}
        >
          {movies.map((movie, index) => (
            <SwiperSlide key={index} className="lg:p-2">
              <Card key={movie.id} movie={movie} />
            </SwiperSlide>
          ))}
          <div className="swiper-button-prev row-button-prev"></div>
          <div className="swiper-button-next row-button-next"></div>
        </Swiper>
      </div>
    </section>
  );
}
