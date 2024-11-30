import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag, User } from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Definindo a interface para o tipo de restaurante
interface Restaurant {
    id: number;
    name: string;
    description: string;
    image: string;
    rating: number;
}

export default function Component() {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await axios.get<Restaurant[]>('https://apifakedelivery.vercel.app/restaurants');
                setRestaurants(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchRestaurants();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-200">
            {/* Cabeçalho com fundo colorido e logo */}
            <header className="bg-blue-900 shadow-xl">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center text-white">
                    <div className="flex items-center">
                        <ShoppingBag className="h-10 w-10 text-yellow-400 mr-3" />
                        <span className="font-extrabold text-2xl">Food Delivery</span>
                    </div>
                    <div className="flex items-center justify-center shadow-xl">
                        <Link to={"/profile"}>
                            <User className="h-6 w-6 text-white" />
                        </Link>
                    </div>
                </div>
            </header>

            {/* Área de boas-vindas com texto */}
            <div className="mt-4">
                <div className="max-w-7xl mx-auto text-center text-blue-950">
                    <p className="text-2xl font-light">Confira os melhores restaurantes perto de você:</p>
                </div>
            </div>

            {/* Grid de restaurantes */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {restaurants.map(restaurant => (
                        <Card key={restaurant.id} className="overflow-hidden shadow-lg rounded-lg bg-white">
                            <div className="relative">
                                <img src={restaurant.image} alt={restaurant.name} className="w-full h-64 object-cover rounded-t-lg" />
                            </div>
                            <CardHeader className="p-4">
                                <CardTitle className="text-lg font-semibold">{restaurant.name}</CardTitle>
                            </CardHeader>
                            <CardContent className="px-4 pb-4">
                                <p className="text-gray-600">{restaurant.description}</p>
                                <div className="flex items-center mt-2">
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-center pb-4">
                                <Link to={`/restaurant/${restaurant.id}`}>
                                    <Button className="w-full bg-blue-600 text-white hover:bg-blue-700 rounded-full py-2">
                                        Ver Restaurante
                                    </Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </main>
        </div>
    );
}
