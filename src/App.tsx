import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import DetailMovie from "./components/DetailMovie";

// ---- Interface ----
interface Type {
  _id: string;
  name: string;
  slug: string;
}

interface Region {
  _id: string;
  name: string;
  slug: string;
}

interface Year {
  year: number;
}

interface Movie {
  _id: string;
  name: string;
  slug: string;
  origin_name: string;
  poster_url: string;
  thumb_url: string;
  year: number;
  tmdb: {
    type: string;
    id: string;
    season: number;
    vote_average: number;
    vote_count: number;
  };
  imdb: {
    id: string | null;
  };
  modified: {
    time: string;
  };
}

interface Pagination {
  totalItems: number;
  totalItemsPerPage: number;
  currentPage: number;
  totalPages: number;
}

function App() {
  const API_BASE = process.env.REACT_APP_API_BASE || "https://phimapi.com";

  const [type, setType] = useState<Type[]>([]);
  const [region, setRegion] = useState<Region[]>([]);
  const [year, setYear] = useState<Year[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // ---- Fetch thể loại ----
  const fetchType = async () => {
    try {
      const res = await fetch(`${API_BASE}/the-loai`);
      const data = await res.json();
      setType(data || []);
    } catch (err) {
      console.error("Error fetching type:", err);
    }
  };

  // ---- Fetch quốc gia ----
  const fetchRegion = async () => {
    try {
      const res = await fetch(`${API_BASE}/quoc-gia`);
      const data = await res.json();
      setRegion(data || []);
    } catch (err) {
      console.error("Error fetching region:", err);
    }
  };

  // ---- Danh sách năm ----
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const years: Year[] = [];
    for (let y = 2000; y <= currentYear; y++) {
      years.push({ year: y });
    }
    setYear(years.reverse());
  }, []);

  // ---- Fetch phim có pagination ----
  const fetchMovieList = async (page: number) => {
    try {
      const res = await fetch(`${API_BASE}/danh-sach/phim-moi-cap-nhat?page=${page}`);
      const data = await res.json();
      setMovies(data.items || []);
      setPagination(data.pagination || null);
    } catch (error) {
      console.error("Error fetching Movie List:", error);
    }
  };

  // ---- Gọi API khi load trang hoặc đổi trang ----
  useEffect(() => {
    fetchType();
    fetchRegion();
    fetchMovieList(currentPage);
  }, [currentPage]);

  return (
    <div className="App bg-gray-900 min-h-screen text-white">
      <Header type={type} region={region} year={year} />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              movies={movies}
              pagination={pagination}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          }
        />

        <Route path="/phim/:slug" element={<DetailMovie />} />
      </Routes>
    </div>
  );
}

export default App;
