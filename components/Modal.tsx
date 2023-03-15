import React, { useEffect, useState } from "react";
import MuiModal from "@mui/material/Modal";
import { useRecoilState } from "recoil";
import { modalState, movieState } from "@/atoms/modalAtom";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Element, Genre } from "@/typings";
import ReactPlayer from "react-player/lazy";
import { ExclamationCircleIcon, PlayIcon } from "@heroicons/react/24/outline";

export default function Modal() {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [movie, setMovies] = useRecoilState(movieState);
  const [trailer, setTrailer] = useState("");
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    if (!movie) return;
    async function fetchMovie() {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          movie?.media_type === "tv" ? "tv" : "movie"
        }/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      ).then((response) => response.json());

      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (element: Element) => element.type === "Trailer"
        );
        setTrailer(data.videos?.results[index]?.key);
      }

      if (data?.genres) {
        setGenres(data.genres);
      }
    }

    fetchMovie();
  }, [movie]);

  const handleClose = () => {
    setShowModal(false);
  };

  console.log(trailer);

  return (
    <MuiModal
      open={showModal}
      onClose={handleClose}
      className="fixed inset-x-0 !inset-y-16 z-50 mx-auto h-max w-full max-w-4xl px-4 md:px-0"
    >
      <>
        <button
          className="absolute top-0 right-4 z-[666] block h-6 w-6 rounded-full bg-primary text-white md:right-0 md:hidden"
          onClick={handleClose}
        >
          <XMarkIcon className="text-white" />
        </button>
        <div className="mt-10 h-[34rem] overflow-hidden overflow-y-auto rounded-xl scrollbar-none md:mt-0">
          <div className="relative pt-[56.25%]">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${trailer}`}
              width="100%"
              height="100%"
              className="absolute top-0 left-0"
              playing
            />
            <div className="absolute bottom-0 hidden">
              <button className="flex items-center gap-4">
                <PlayIcon className="h-4 w-4" /> Play
              </button>
            </div>
          </div>

          <div className="bg-zinc-900 p-6">
            <div>
              <p>{movie!.vote_average * 10}% Match</p>
              <p>{movie?.release_date || movie?.first_air_date}</p>
            </div>
            <div>
              <p>{movie?.overview}</p>
              <div>
                <div>
                  <span className="text-zinc-500">Genres:</span>{" "}
                  {genres.map((genre) => genre.name).join(", ")}
                </div>

                <div>
                  <span className="text-zinc-500">Original language:</span>{" "}
                  {movie?.original_language}
                </div>

                <div>
                  <span className="text-zinc-500">Total votes:</span>{" "}
                  {movie?.vote_count}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </MuiModal>
  );
}
function setTrailer(key: any) {
  throw new Error("Function not implemented.");
}

function setGenres(genres: any) {
  throw new Error("Function not implemented.");
}
