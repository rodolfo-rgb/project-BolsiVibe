import React, { useState } from "react";
import { AiOutlineTransaction } from 'react-icons/ai';
import { TbHomeFilled } from "react-icons/tb";
import { IoMdCash } from "react-icons/io";
import { MdCastForEducation } from "react-icons/md";
import { FaSignOutAlt } from "react-icons/fa";

// Definición de las props
interface SidebarProps {
    onSelectPage: (page: string) => void;
}

// Componente Sidebar
const Sidebar: React.FC<SidebarProps> = ({ onSelectPage }) => {
    const [activePage, setActivePage] = useState<string>("Principal");

    const handlePageSelect = (page: string) => {
        setActivePage(page);
        onSelectPage(page);
    };

    const isActive = (page: string) => activePage === page;

    return (
        <aside className="bg-gradient-to-br from-gray-800 to-gray-900 -translate-x-80 fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0">
            {/* Logo */}
            <div className="relative border-b border-white/20">
                <a className="flex items-center gap-4 py-6 px-8" href="#">
                    <img src="ABOUT ME.png" alt="BolsiVibe Logo" className="h-8 w-8" />
                    <h6 className="font-bold text-white text-lg">
                        <span className="text-blue-800">Bolsi</span>Vibe
                    </h6>
                </a>
            </div>

            {/* Opciones del Sidebar */}
            <div className="m-4">
                <ul className="mb-4 flex flex-col gap-1">
                    <li>
                        <button
                            onClick={() => handlePageSelect("Principal")}
                            className={`flex items-center gap-4 px-4 py-3 rounded-lg w-full text-white hover:bg-white/10 active:bg-white/30 transition-all duration-200 ${isActive("Principal") ? "bg-white/10 shadow-md shadow-blue-900" : ""
                                }`}
                        >
                            <TbHomeFilled className="w-5 h-5 text-inherit" />
                            <p className="text-base font-medium">Principal</p>
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => handlePageSelect("Transacciones")}
                            className={`flex items-center gap-4 px-4 py-3 rounded-lg w-full text-white hover:bg-white/10 active:bg-white/30 transition-all duration-200 ${isActive("Transacciones") ? "bg-white/10 shadow-md shadow-blue-900" : ""
                                }`}
                        >
                            <AiOutlineTransaction className="w-5 h-5 text-inherit" />
                            <p className="text-base font-medium">Transacciones</p>
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => handlePageSelect("Presupuesto")}
                            className={`flex items-center gap-4 px-4 py-3 rounded-lg w-full text-white hover:bg-white/10 active:bg-white/30 transition-all duration-200 ${isActive("Presupuesto") ? "bg-white/10 shadow-md shadow-blue-900" : ""
                                }`}
                        >
                            <IoMdCash className="w-5 h-5 text-inherit" />
                            <p className="text-base font-medium">Presupuesto</p>
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => handlePageSelect("Educacion Financiera")}
                            className={`flex items-center gap-4 px-4 py-3 rounded-lg w-full text-white hover:bg-white/10 active:bg-white/30 transition-all duration-200 ${isActive("Educacion Financiera") ? "bg-white/10 shadow-md shadow-blue-900" : ""
                                }`}
                        >
                            <MdCastForEducation className="w-5 h-5 text-inherit" />
                            <p className="text-base font-medium">Educación Financiera</p>
                        </button>
                    </li>
                </ul>

                {/* Línea divisoria */}
                <ul className="mb-4 flex flex-col gap-1">
                    <li className="mx-3.5 mt-4 mb-2">
                        <div className="border-t border-gray-300 mb-2"></div>
                    </li>
                    <li>
                        <button
                            onClick={() => handlePageSelect("Sign Out")}
                            className={`flex items-center gap-4 px-4 py-3 rounded-lg w-full text-white hover:bg-white/10 active:bg-white/30 transition-all duration-200 ${isActive("Sign Out") ? "bg-white/10 shadow-md shadow-blue-900" : ""
                                }`}
                        >
                            <FaSignOutAlt className="w-5 h-5 text-inherit" />
                            <p className="text-base font-medium">Sign Out</p>
                        </button>
                    </li>
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;
