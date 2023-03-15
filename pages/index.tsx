import HeroSlider from "@/components/HeroSlider";
import Row from "@/components/Row";
import { Movie } from "@/typings";
import requests from "@/utils/requests";

interface Props {
  netflixOriginals: Movie[];
  trendingNow: Movie[];
  topRated: Movie[];
  actionMovies: Movie[];
  comedyMovies: Movie[];
  horrorMovies: Movie[];
  romanceMovies: Movie[];
  documentaries: Movie[];
}

const Home = ({
  netflixOriginals,
  actionMovies,
  comedyMovies,
  documentaries,
  horrorMovies,
  romanceMovies,
  topRated,
  trendingNow,
}: Props) => {
  return (
    <>
      <section className="container mt-24 min-h-screen">
        <HeroSlider netflixOriginals={netflixOriginals} />
        <div className="mt-20 space-y-10 md:space-y-20">
          <Row title="Lagi Trend" movies={trendingNow} />
          <Row title="Top Rating" movies={topRated} />
          <Row title="Thriller Aksi" movies={actionMovies} />

          <Row title="Komedi" movies={comedyMovies} />
          <Row title="Horror" movies={horrorMovies} />
          <Row title="Romantis" movies={romanceMovies} />
          <Row title="Dokumentasi" movies={documentaries} />
        </div>
      </section>
    </>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
  ]);

  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
    },
  };
};
