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
                return < Transactions />;
            case "Presupuesto":
                return <Budget />;
            case "Educacion Financiera":
                return <EduFinance />;
            default:
                return <Dashboard />;
        }
    };

    return (
        <div className="container bg-gray-50/50">
            {/* Pasamos setSelectedPage al Sidebar */}
            <Sidebar onSelectPage={setSelectedPage} />
            <div className="p-4 xl:ml-80">
                <nav className="block w-full max-w-full bg-transparent text-white shadow-none rounded-xl transition-all px-0 py-1">
                    <Header />
                </nav>
                <div className="mt-12">
                    {renderContent()}
                </div>
                <div className="text-blue-gray-600 mt-4">
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default Layout;


{/* <Sidebar onSelect={(page: string) => console.log(`Selected page: ${page}`)} /> */ }
