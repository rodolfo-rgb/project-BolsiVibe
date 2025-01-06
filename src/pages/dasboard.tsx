import React from 'react';
import { FaCreditCard } from "react-icons/fa";
import { MdAccountBalanceWallet } from "react-icons/md";

const Dashboard: React.FC = () => {
    return (
        <div className="dashboard">
            {/* Botón de Saldo Actual */}
            <button className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4 w-full">
                <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md col-span-full">
                    <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-[rgb(13,40,71)] text-white shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center hover:bg-[rgb(29,71,118)]">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-6 h-6 text-white">
                            <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"></path>
                            <path fillRule="evenodd" d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z" clipRule="evenodd"></path>
                            <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z"></path>
                        </svg>
                    </div>
                    <div className="p-4 text-right">
                        <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">Saldo actual</p>
                        <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">$00.00</h4>
                    </div>
                    <div className="border-t border-blue-gray-50 p-4">
                        <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600 text-left">
                            <strong className="text-green-500">+0%</strong>&nbsp;En el último mes
                        </p>
                    </div>
                </div>
            </button>

            {/* Panel de Cuentas */}
            <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                {/* Encabezado del Card */}
                <div className="flex items-center justify-between px-6 py-4 border-b">

                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        {/* Icono de Tarjeta desde PNG */}
                        <MdAccountBalanceWallet className="w-6 h-6" />
                        Mis Cuentas
                    </h2>
                    <button className="flex items-center gap-2 bg-[rgb(13,40,71)] text-white px-4 py-2 rounded-md hover:bg-[rgb(29,71,118)]">
                        <svg xmlns="http://www.w 3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Nueva Cuenta
                    </button>
                </div>

                {/* Contenido del Card */}
                <div className="p-6">
                    {/* Contenedor Scroll */}
                    <div className="max-h-48 overflow-y-auto space-y-4 border-b pb-4">
                        {/* Cuenta 1 */}
                        <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg cursor-pointer hover:bg-blue-100 transition">
                            <span className="font-medium">Cuenta Principal</span>
                            <span className="text-lg">$5,000</span>
                        </div>

                        {/* Cuenta 2 */}
                        <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg cursor-pointer hover:bg-blue-100 transition">
                            <span className="font-medium">Cuenta de Ahorros</span>
                            <span className="text-lg">$10,000</span>
                        </div>

                        {/* Cuenta 3 */}
                        <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg cursor-pointer hover:bg-blue-100 transition">
                            <span className="font-medium">Cuenta de Inversiones</span>
                            <span className="text-lg">$15,000</span>
                        </div>

                        {/* Cuenta 4 */}
                        <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg cursor-pointer hover:bg-blue-100 transition">
                            <span className="font-medium">Cuenta Extra</span>
                            <span className="text-lg">$7,000</span>
                        </div>
                    </div>

                    {/* Total */}
                    <div className="flex items-center justify-between pt-4 mt-4">
                        <span className="font-semibold">Total</span>
                        <span className="text-xl font-bold">$37,000</span>
                    </div>
                </div>
            </div>

            {/* Panel de Tarjetas de Crédito */}
            <div className="w-full max-w-2xl mx-auto mt-6 bg-white rounded-lg shadow-md overflow-hidden">
                {/* Encabezado del Card */}
                <div className="flex items-center justify-between px-6 py-4 border-b">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        {/* Icono de Tarjeta desde PNG */}
                        <FaCreditCard className="w-6 h-6" />
                        Mis Tarjetas de Crédito
                    </h2>
                    <button className="flex items-center gap-2  bg-[rgb(13,40,71)] text-white px-4 py-2 rounded-md hover:bg-[rgb(29,71,118)]">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Nueva Tarjeta
                    </button>
                </div>

                {/* Contenido del Card */}
                <div className="p-6">
                    {/* Contenedor Scroll */}
                    <div className="max-h-48 overflow-y-auto space-y-4 border-b pb-4">
                        {/* Tarjeta 1 */}
                        <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg cursor-pointer hover:bg-blue-100 transition">
                            <span className="font-medium">Visa Clásica</span>
                            <span className="text-lg text-red-500">$2,500</span>
                        </div>

                        {/* Tarjeta 2 */}
                        <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg cursor-pointer hover:bg-blue-100 transition">
                            <span className="font-medium">Mastercard Gold</span>
                            <span className="text-lg text-red-500">$1,800</span>
                        </div>

                        {/* Tarjeta 3 */}
                        <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg cursor-pointer hover:bg-blue-100 transition">
                            <span className="font-medium">American Express</span>
                            <span className="text-lg text-red-500">$ 3,200</span>
                        </div>

                        {/* Tarjeta 4 */}
                        <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg cursor-pointer hover:bg-blue-100 transition">
                            <span className="font-medium">Tarjeta Extra</span>
                            <span className="text-lg text-red-500">$1,500</span>
                        </div>
                    </div>

                    {/* Deuda Total */}
                    <div className="flex items-center justify-between pt-4 mt-4">
                        <span className="font-semibold">Deuda Total</span>
                        <span className="text-xl font-bold text-red-500">$9,000</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;