import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

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

interface HomeProps {
    movies: Movie[];
    pagination: Pagination | null;
    currentPage: number;
    setCurrentPage: (page: number) => void;
}

function Home({ movies, pagination, currentPage, setCurrentPage }: HomeProps) {
    const handlePageChange = (page: number) => {
        if (pagination && page >= 1 && page <= pagination.totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    // 🔹 Tính toán hiển thị tối đa 5 trang
    const getPageNumbers = () => {
        if (!pagination) return [];
        const total = pagination.totalPages;
        const current = pagination.currentPage;
        const delta = 2;
        let start = Math.max(1, current - delta);
        let end = Math.min(total, current + delta);

        // đảm bảo luôn có 5 nút khi có thể
        if (end - start < 4) {
            if (start === 1) end = Math.min(total, start + 4);
            else if (end === total) start = Math.max(1, end - 4);
        }

        const pages = [];
        for (let i = start; i <= end; i++) pages.push(i);
        return pages;
    };

    return (
        <div className="home px-6 py-8">
            <h2 className="text-2xl font-semibold mb-6 text-white">🎬 Top phim mới</h2>

            {/* Grid phim */}
            <div className="grid grid-cols-5 gap-6">
                {movies.map((movie) => (
                    <Link to={`/phim/${movie.slug}`}>
                        <ProductCard key={movie._id} movie={movie} />
                    </Link>

                ))}
            </div>

            {/* Pagination đẹp */}
            {pagination && (
                <div className="flex justify-center items-center gap-2 mt-10">
                    {/* Mũi tên điều hướng */}
                    <button
                        onClick={() => handlePageChange(1)}
                        disabled={currentPage === 1}
                        className="w-10 h-10 flex justify-center items-center rounded-full bg-gray-800 hover:bg-red-600 text-white text-lg shadow-md transition-all disabled:opacity-50 hover:scale-105"
                    >
                        «
                    </button>

                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="w-10 h-10 flex justify-center items-center rounded-full bg-gray-800 hover:bg-red-600 text-white text-lg shadow-md transition-all disabled:opacity-50 hover:scale-105"
                    >
                        ‹
                    </button>

                    {/* Hiển thị các trang */}
                    {getPageNumbers().map((page) => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`w-10 h-10 flex justify-center items-center rounded-full text-sm font-semibold shadow-md transition-all hover:scale-105 ${page === currentPage
                                ? "bg-red-600 text-white"
                                : "bg-gray-700 hover:bg-gray-600 text-gray-300"
                                }`}
                        >
                            {page}
                        </button>
                    ))}

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === pagination.totalPages}
                        className="w-10 h-10 flex justify-center items-center rounded-full bg-gray-800 hover:bg-red-600 text-white text-lg shadow-md transition-all disabled:opacity-50 hover:scale-105"
                    >
                        ›
                    </button>

                    <button
                        onClick={() => handlePageChange(pagination.totalPages)}
                        disabled={currentPage === pagination.totalPages}
                        className="w-10 h-10 flex justify-center items-center rounded-full bg-gray-800 hover:bg-red-600 text-white text-lg shadow-md transition-all disabled:opacity-50 hover:scale-105"
                    >
                        »
                    </button>
                </div>
            )}

            {/* Thông tin nhỏ dưới pagination */}
            {pagination && (
                <p className="text-center text-gray-400 text-sm mt-3">
                    Trang {currentPage} / {pagination.totalPages} • Tổng {pagination.totalItems.toLocaleString()} phim
                </p>
            )}
        </div>
    );
}

export default Home;
