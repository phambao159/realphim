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

interface ProductCardProps {
    movie: Movie;
}

function ProductCard({ movie }: ProductCardProps) {
    return (
        <div
            className="
        relative group bg-gray-900 rounded-lg overflow-hidden
        transform transition-all duration-300 hover:z-10 
        hover:shadow-2xl cursor-pointer
      "
        >
            {/* Ảnh Poster */}
            <div className="w-full aspect-[3/4] overflow-hidden bg-gray-800">
                <img
                    src={movie.thumb_url || movie.poster_url}
                    alt={movie.slug}
                    className="
            w-full h-full object-cover object-center
            transition-transform duration-500 group-hover:scale-110
          "
                    loading="lazy"
                />
            </div>

            {/* Overlay gradient + thông tin */}
            <div
                className="
          absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent
          opacity-0 group-hover:opacity-100 transition-opacity duration-500
          flex flex-col justify-end p-4
        "
            >
                <h3 className="text-white text-sm md:text-base font-semibold line-clamp-1">
                    {movie.name}
                </h3>
                <p className="text-gray-300 text-xs italic line-clamp-1">
                    {movie.origin_name}
                </p>

                {/* Điểm và năm */}
                <div className="flex items-center justify-between mt-2 text-gray-400 text-xs">
                    <span>{movie.year}</span>
                    {movie.tmdb.vote_average > 0 && (
                        <span className="text-yellow-400">
                            ★ {movie.tmdb.vote_average.toFixed(1)}
                        </span>
                    )}
                </div>

                {/* Nút Xem Ngay */}
                <button
                    className="
            mt-3 bg-red-600 hover:bg-red-700 text-white 
            text-xs font-medium py-1 px-3 rounded-full 
            transition-all duration-300 opacity-0 
            group-hover:opacity-100 group-hover:translate-y-0 translate-y-2
          "
                >
                    ▶ Xem ngay
                </button>
            </div>
        </div>
    );
}

export default ProductCard;
