import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

interface Category {
    id: string;
    name: string;
    slug: string;
}

interface Country {
    id: string;
    name: string;
    slug: string;
}

interface Movie {
    _id: string;
    name: string;
    slug: string;
    origin_name: string;
    content: string;
    poster_url: string;
    thumb_url: string;
    time: string;
    quality: string;
    lang: string;
    year: number;
    episode_current: string;
    episode_total: string;
    actor: string[];
    director: string[];
    category: Category[];
    country: Country[];
    trailer_url: string;
}

interface EpisodeItem {
    name: string;
    slug: string;
    link_embed: string;
    link_m3u8: string;
}

interface Server {
    server_name: string;
    server_data: EpisodeItem[];
}

function DetailMovie() {

    const { slug } = useParams<{ slug: string }>();

    const location = useLocation();
    const [movie, setMovie] = useState<Movie | null>(null);
    const [episodes, setEpisodes] = useState<Server[]>([]);
    const [selectedServer, setSelectedServer] = useState(0);
    const [currentEpisode, setCurrentEpisode] = useState<EpisodeItem | null>(null);
    const [loading, setLoading] = useState(true);
    const fetchMovieDetail = async () => {
        try {
            setLoading(true);
            const res = await fetch(`https://phimapi.com/phim/${slug}`);
            const data = await res.json();
            if (data?.movie) {
                setMovie(data.movie);
                setEpisodes(data.episodes || []);
                setCurrentEpisode(data.episodes?.[0]?.server_data?.[0] || null);
            }
        } catch (err) {
            console.error("Error fetching movie detail:", err);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchMovieDetail();
    }, [slug, location.key]);

    if (loading)
        return (
            <div className="flex justify-center items-center h-screen text-white text-lg">
                ⏳ Đang tải dữ liệu phim...
            </div>
        );

    if (!movie)
        return (
            <div className="text-center text-gray-400 mt-10">
                ❌ Không tìm thấy thông tin phim.
            </div>
        );

    return (
        <div className="bg-black text-white min-h-screen px-8">
            <div className="relative w-full h-[70vh] overflow-hidden">
                <img
                    src={movie.poster_url}
                    alt={movie.slug}
                    className="w-full h-full object-cover brightness-50 blur-[1px] scale-105 transition-all duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent"></div>
                <div className="absolute bottom-20 left-10">
                    <h1 className="text-5xl font-bold text-yellow-500">{movie.name}</h1>
                    <p className="text-gray-300 text-lg mt-2">{movie.origin_name}</p>
                </div>
            </div>
            <div className="flex flex-col md:flex-row gap-8 mb-10">
                <img
                    src={movie.poster_url}
                    alt={movie.name}
                    className="w-[250px] h-[360px] rounded-lg object-cover shadow-lg"
                />

                <div>

                    <p className="text-gray-300 mb-4 leading-relaxed max-w-2xl">
                        {movie.content}
                    </p>

                    <div className="grid grid-cols-2 gap-3 mt-6">
                        {[
                            { label: "Thể loại", value: movie.category.map(c => c.name).join(", "), icon: "🎥" },
                            { label: "Quốc gia", value: movie.country.map(c => c.name).join(", "), icon: "🌍" },
                            { label: "Thời lượng", value: movie.time, icon: "🕒" },
                            { label: "Chất lượng", value: movie.quality, icon: "💿" },
                            { label: "Ngôn ngữ", value: movie.lang, icon: "💬" },
                        ].map((item, i) => (
                            <div key={i} className="bg-gray-800/50 p-3 rounded-md hover:bg-gray-700/70 transition">
                                <span className="text-yellow-400 font-medium">{item.icon} {item.label}:</span>{" "}
                                <span className="text-gray-200">{item.value}</span>
                            </div>
                        ))}


                        <div className="col-span-1 bg-gray-800/50 p-3 rounded-md hover:bg-gray-700/70 transition">
                            <span className="text-yellow-400 font-medium">🎬 Đạo diễn:</span>{" "}
                            {movie.director.join(", ")}
                        </div>
                        <div className="col-span-2 bg-gray-800/50 p-3 rounded-md hover:bg-gray-700/70 transition">
                            <span className="text-yellow-400 font-medium">🎭 Diễn viên:</span>{" "}
                            {movie.actor.join(", ")}
                        </div>
                    </div>


                    {movie.trailer_url && (
                        <a
                            href={movie.trailer_url}
                            target="_blank"
                            className="inline-block mt-5 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 transition rounded-md font-semibold text-black"
                        >
                            Xem trailer
                        </a>
                    )}
                </div>
            </div>
            {currentEpisode && (
                <div className="mb-10">
                    <h3 className="text-xl font-semibold mb-3">
                        📺 Đang xem:{" "}
                        <span className="text-yellow-400">{currentEpisode.name}</span>
                    </h3>
                    <div className="aspect-video border-yellow-700 bg-gray-800 rounded-xl overflow-hidden shadow-lg">
                        <iframe
                            src={currentEpisode.link_embed}
                            title={currentEpisode.name}
                            allowFullScreen
                            className="w-full h-full"
                        />
                    </div>
                </div>
            )}
            <div className="mb-6 flex gap-3 flex-wrap">
                {episodes.map((server, idx) => (
                    <button
                        key={idx}
                        onClick={() => {
                            setSelectedServer(idx);
                            setCurrentEpisode(server.server_data[0]);
                        }}
                        className={`px-4 py-2 rounded-md border transition ${selectedServer === idx
                            ? "bg-red-600 border-red-500"
                            : "bg-gray-800 border-gray-700 hover:bg-gray-700"
                            }`}
                    >
                        {server.server_name}
                    </button>
                ))}
            </div>
            <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-3">
                {episodes[selectedServer]?.server_data.map((ep, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentEpisode(ep)}
                        className={`px-3 py-2 rounded-md border text-sm transition ${currentEpisode?.slug === ep.slug
                            ? "bg-yellow-500 text-black font-semibold"
                            : "bg-gray-800 hover:bg-gray-700 border-gray-700"
                            }`}
                    >
                        {ep.name}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default DetailMovie;
