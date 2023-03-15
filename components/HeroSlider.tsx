import React, { useEffect, useState } from "react";
import { Navigation, Pagination, A11y, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Movie } from "@/typings";
import { baseUrl } from "@/constants/movie";
import { ExclamationCircleIcon, PlayIcon } from "@heroicons/react/24/outline";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Props {
  netflixOriginals: Movie[];
}

export default function HeroSlider({ netflixOriginals }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    setMovies(netflixOriginals.slice(0, 10));
  }, [netflixOriginals]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((currentIndex) => (currentIndex + 1) % movies.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [movies]);

  return (
    <Swiper
      modules={[Navigation, Pagination, A11y, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      autoplay={{ delay: 5000 }}
      grabCursor={true}
      loop={true}
      navigation={{
        prevEl: ".swiper-button-prev",
        nextEl: ".swiper-button-next",
      }}
      pagination={{ clickable: true }}
    >
      {movies.map((movie, index) => (
        <SwiperSlide key={index}>
          <div className="relative h-[30rem] overflow-hidden rounded-xl bg-zinc-800">
            <img
              src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
              className="h-full w-full object-cover"
              alt=""
            />
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-r from-zinc-900/80 via-zinc-900/50 to-transparent p-6 pb-20 text-white md:justify-center md:p-20">
              <div>
                <h1 className="text-4xl font-bold">
                  {movie?.title || movie?.name || movie?.original_name}
                </h1>
                <p>
                  <span className="">Ratings:</span> {movie?.vote_average}
                </p>
                <p className="mt-2 hidden w-1/2 text-zinc-300 md:block">
                  {movie?.overview}
                </p>
              </div>
              <div className="mt-6 flex items-center gap-4">
                <button className="btn-banner">
                  <PlayIcon className="h-4 w-4" /> Play
                </button>
                <button className="btn-banner">
                  <ExclamationCircleIcon className="h-4 w-4" /> Detail
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
      <div className="swiper-button-prev"></div>
      <div className="swiper-button-next"></div>
    </Swiper>
  );
}
