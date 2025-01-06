import React, { useState } from "react";
import Header from "./header";
import Sidebar from "./sidebar";
import Footer from "./footer";
import Dashboard from "../pages/dasboard";
import Transactions from "../pages/transactions";
import Budget from "../pages/budget";
import EduFinance from "../pages/edu-finance";

const Layout: React.FC = () => {
    // Estado para gestionar la página seleccionada
    const [selectedPage, setSelectedPage] = useState<string>("Principal");

    // Función para renderizar el contenido según la página seleccionada
    const renderContent = () => {
        switch (selectedPage) {
            case "Principal":
                return <Dashboard />;
            case "Transacciones":
                return <Transactions />;
            case "Presupuesto":
                return <Budget />;
            case "Educacion Financiera":
                return <EduFinance />;
            default:
                return <Dashboard />;
        }
    };

    return (
        <div className="container bg-gray-50/50 min-h-screen flex">
            {/* Sidebar ocupa su propio espacio */}
            <Sidebar onSelectPage={setSelectedPage} />
            {/* Contenedor principal con flex column */}
            <div className="flex flex-col p-4 xl:ml-80 w-full">
                {/* Header */}
                <nav className="block w-full max-w-full bg-transparent text-white shadow-none rounded-xl transition-all px-0 py-1">
                    <Header />
                </nav>

                {/* Contenido principal */}
                <div className="mt-12 flex-1">
                    {renderContent()}
                </div>

                {/* Footer empujado hacia abajo */}
                <div className="text-blue-gray-600 mt-auto pt-4">
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default Layout;



{/* <Sidebar onSelect={(page: string) => console.log(`Selected page: ${page}`)} /> */ }
