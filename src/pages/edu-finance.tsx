import { BookOpen, Users, Calculator } from "lucide-react";
import { Card } from "../components/ui/card";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";

const EduFinance = () => {
    const navigate = useNavigate();

    const handleForumRedirect = () => {
        // This would redirect to an external forum
        window.open('https://www.reddit.com/r/personalfinance/', '_blank');
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-8 text-custom-blue">
                    Educación Financiera
                </h1>
                <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                    Aprende, conecta y simula tu futuro financiero con nuestras herramientas especializadas
                </p>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Tutorial Panel */}
                    <Card className="p-6 hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between">
                        <div className="flex flex-col items-center text-center space-y-4 flex-grow">
                            <div className="p-3 bg-[rgb(13,40,71)] bg-opacity-10 rounded-full">
                                <BookOpen className="w-8 h-8 text-custom-blue" />
                            </div>
                            <h2 className="text-xl font-semibold text-custom-blue">Tutorial Financiero</h2>
                            <p className="text-gray-600">
                                Aprende los conceptos básicos de finanzas personales con nuestros tutoriales interactivos
                            </p>
                        </div>
                        <Button
                            className="w-full mt-auto bg-[rgb(13,40,71)] hover:bg-opacity-90"
                            onClick={() => navigate("/tutorial")}
                        >
                            Comenzar Tutorial
                        </Button>
                    </Card>

                    {/* Forums Panel */}
                    <Card className="p-6 hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between">
                        <div className="flex flex-col items-center text-center space-y-4 flex-grow">
                            <div className="p-3 bg-[rgb(13,40,71)] bg-opacity-10 rounded-full">
                                <Users className="w-8 h-8 text-custom-blue" />
                            </div>
                            <h2 className="text-xl font-semibold text-custom-blue">Foros de Finanzas</h2>
                            <p className="text-gray-600">
                                Conecta con una comunidad de personas interesadas en mejorar sus finanzas
                            </p>
                        </div>
                        <Button
                            className="w-full mt-auto bg-[rgb(13,40,71)] hover:bg-opacity-90"
                            onClick={handleForumRedirect}
                        >
                            Ir a los Foros
                        </Button>
                    </Card>

                    {/* Simulation Panel */}
                    <Card className="p-6 hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between">
                        <div className="flex flex-col items-center text-center space-y-4 flex-grow">
                            <div className="p-3 bg-[rgb(13,40,71)] bg-opacity-10 rounded-full">
                                <Calculator className="w-8 h-8 text-custom-blue" />
                            </div>
                            <h2 className="text-xl font-semibold text-custom-blue">Simulador Financiero</h2>
                            <p className="text-gray-600">
                                Simula diferentes escenarios financieros y planifica tu futuro
                            </p>
                        </div>
                        <Button
                            className="w-full mt-auto bg-[rgb(13,40,71)] hover:bg-opacity-90"
                            onClick={() => navigate("/simulator")}
                        >
                            Usar Simulador
                        </Button>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default EduFinance;
