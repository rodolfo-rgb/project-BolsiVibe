import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { ExternalLink, PlayCircle, BookOpen, Users } from "lucide-react"

const Education = () => {
    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Educación Financiera</h1>

            <Tabs defaultValue="tutorial" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="tutorial">Tutorial</TabsTrigger>
                    <TabsTrigger value="forums">Foros</TabsTrigger>
                    <TabsTrigger value="simulation">Simulación</TabsTrigger>
                </TabsList>

                <TabsContent value="tutorial">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BookOpen className="h-5 w-5" />
                                Tutorial Financiero
                            </CardTitle>
                            <CardDescription>
                                Aprende los conceptos básicos de finanzas personales
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4">
                                {[
                                    "Presupuesto personal",
                                    "Ahorro e inversión",
                                    "Control de gastos",
                                    "Deudas y créditos",
                                ].map((topic) => (
                                    <Card key={topic}>
                                        <CardHeader>
                                            <CardTitle className="text-lg">{topic}</CardTitle>
                                            <Button variant="outline" className="mt-2">
                                                <PlayCircle className="mr-2 h-4 w-4" />
                                                Comenzar lección
                                            </Button>
                                        </CardHeader>
                                    </Card>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="forums">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Users className="h-5 w-5" />
                                Foros de Finanzas
                            </CardTitle>
                            <CardDescription>
                                Únete a la conversación y aprende de otros
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {[
                                {
                                    title: "Reddit Personal Finance",
                                    url: "https://www.reddit.com/r/personalfinance/",
                                    description: "Comunidad de Reddit sobre finanzas personales"
                                },
                                {
                                    title: "Rankia",
                                    url: "https://www.rankia.com/foros/",
                                    description: "Foro español sobre inversiones y finanzas"
                                },
                                {
                                    title: "Investing.com",
                                    url: "https://es.investing.com/forums/",
                                    description: "Foros de trading e inversión"
                                }
                            ].map((forum) => (
                                <Card key={forum.title}>
                                    <CardHeader>
                                        <CardTitle className="text-lg flex items-center justify-between">
                                            {forum.title}
                                            <Button variant="outline" asChild>
                                                <a href={forum.url} target="_blank" rel="noopener noreferrer">
                                                    <ExternalLink className="mr-2 h-4 w-4" />
                                                    Visitar
                                                </a>
                                            </Button>
                                        </CardTitle>
                                        <CardDescription>{forum.description}</CardDescription>
                                    </CardHeader>
                                </Card>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="simulation">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <PlayCircle className="h-5 w-5" />
                                Simulador Financiero
                            </CardTitle>
                            <CardDescription>
                                Practica la gestión de tus finanzas sin riesgo
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-center p-8">
                                <h3 className="text-lg font-medium mb-4">
                                    ¡Próximamente!
                                </h3>
                                <p className="text-muted-foreground mb-4">
                                    Estamos trabajando en un simulador que te permitirá practicar
                                    la gestión de tus finanzas en un entorno seguro.
                                </p>
                                <Button disabled>
                                    <PlayCircle className="mr-2 h-4 w-4" />
                                    Iniciar Simulación
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default Education