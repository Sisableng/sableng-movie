import { Movie } from "@/typings";
import React from "react";

interface Props {
  movie: Movie;
}

export default function Card({ movie }: Props) {
  return (
    <>
      <div className="group h-48 w-full cursor-pointer select-none overflow-hidden rounded-xl bg-zinc-800 ring-primary transition-all ease-out md:h-96 md:hover:ring-2">
        <img
          loading="lazy"
          src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
          className="h-full w-full object-cover object-center transition-all ease-out group-hover:scale-125"
          alt=""
        />
      </div>
    </>
  );
}
