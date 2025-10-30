import { useState } from "react";
import { Link } from "react-router-dom";

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

interface HeaderProps {
    type: Type[];
    region: Region[];
    year: Year[];
}

function Header({ type, region, year }: HeaderProps) {
    const menuItems = [
        { label: "Phim lẻ" },
        { label: "Phim bộ" },
        { label: "Thể loại ▼", data: type },
        { label: "Quốc gia ▼", data: region },
        { label: "Năm ▼", data: year },
    ];

    const [activeMenu, setActiveMenu] = useState<number | null>(null);

    return (
        <header className="bg-black text-white grid grid-cols-10 items-center px-6 py-3 shadow-md border-b-1 border-gray-800">
            {/* Logo - 2 cột */}
            <div className="col-span-2 flex items-center">
                <Link to="/">
                    <img
                        src="/images/Realphim.png"
                        alt="Real Phim Logo"
                        className="w-[150px] h-[30px] object-cover"
                    />
                </Link>
            </div>

            {/* Menu - 8 cột */}
            <nav className="col-span-8">
                <ul className="flex justify-around text-sm font-medium">
                    {menuItems.map((menu, index) => (
                        <li
                            key={index}
                            className="relative cursor-pointer group select-none"
                            onMouseEnter={() => setActiveMenu(index)}
                            onMouseLeave={() => setActiveMenu(null)}
                        >
                            {/* Tiêu đề */}
                            <span
                                className="
                  relative after:content-[''] after:absolute after:left-0 after:-bottom-1 
                  after:w-0 after:h-[2px] after:bg-yellow-500 after:transition-all after:duration-300 
                  group-hover:after:w-full
                "
                            >
                                {menu.label}
                            </span>

                            {/* Dropdown */}
                            {activeMenu === index && menu.data && (
                                <ul
                                    className={`
                    absolute top-10 bg-black text-sm min-w-[500px]
                    py-2 rounded-md shadow-lg border border-gray-700 z-50
                    grid grid-cols-3 transition-all duration-300 ease-out
                    ${menu.label === "Năm ▼" || menu.label === "Quốc gia ▼"
                                            ? "right-0"
                                            : menu.label === "Thể loại ▼"
                                                ? "left-1/2 -translate-x-1/2"
                                                : "left-0"
                                        }
                    ${activeMenu === index
                                            ? "opacity-100 translate-y-0 visible"
                                            : "opacity-0 -translate-y-3 invisible"
                                        }
                  `}
                                >
                                    {menu.data.length > 0 ? (
                                        menu.data.map((item, i) => (
                                            <li
                                                key={i}
                                                className="col-span-1 px-4 py-2 hover:bg-gray-700 hover:text-yellow-400 transition-colors"
                                            >
                                                {"name" in item ? item.name : item.year}
                                            </li>
                                        ))
                                    ) : (
                                        <li className="px-4 py-2 text-gray-400 italic">
                                            Không có dữ liệu
                                        </li>
                                    )}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}

export default Header;
