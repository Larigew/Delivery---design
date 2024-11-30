import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Minus, Plus, User } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

interface FoodItem {
    id: string;
    name: string;
    price: number;
    time: string;
    delivery: number;
    rating: number;
    image: string;
    restaurantId: string;
    description: string;
}

export default function Food() {
    const { id } = useParams<{ id: string }>();
    const [quantity, setQuantity] = useState(1);
    const [foodItem, setFoodItem] = useState<FoodItem | null>(null);

    useEffect(() => {
        const fetchFoodItem = async () => {
            try {
                const response = await fetch(`https://apifakedelivery.vercel.app/foods/${id}`);
                const data: FoodItem = await response.json();
                setFoodItem(data);
            } catch (error) {
                console.error("Error fetching food item:", error);
            }
        };

        fetchFoodItem();
    }, [id]);

    const incrementQuantity = () => setQuantity(prev => prev + 1);
    const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

    if (!foodItem) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Cabeçalho */}
            <header className="bg-gradient-to-r from-blue-900 to-blue-700 shadow-xl">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center text-white">
                    <Button variant="ghost" className="mr-4" onClick={() => window.history.back()}>
                        <ArrowLeft className="h-6 w-6 text-white" />
                    </Button>
                    <div className="shadow-xl">
                        <Link to={"/profile"}>
                            <User className="h-6 w-6 text-white" />
                        </Link>
                    </div>
                </div>
            </header>

            {/* Conteúdo Principal */}
            <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Card de Alimento */}
                <Card className="mb-8 shadow-lg rounded-xl">
                    <CardContent className="p-6">
                        <img src={foodItem.image} alt={foodItem.name} className="w-full h-64 object-cover rounded-lg mb-6" />
                        <h2 className="text-3xl font-bold mb-2">{foodItem.name}</h2>
                        <p className="text-gray-600 mb-4">{foodItem.description}</p>
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-2xl font-bold">R$ {foodItem.price.toFixed(2)}</span>
                            <div className="flex items-center">
                                {/* Avaliação */}
                            </div>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mb-6">
                            <span className="mr-4">{foodItem.time}</span>
                            <span>Delivery: R$ {foodItem.delivery.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center justify-between mb-4">
                            {/* Controles de Quantidade */}
                            <div className="flex items-center">
                                <Button variant="outline" size="icon" onClick={decrementQuantity}>
                                    <Minus className="h-4 w-4" />
                                </Button>
                                <Input
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                    className="w-16 mx-2 text-center"
                                />
                                <Button variant="outline" size="icon" onClick={incrementQuantity}>
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                        {/* Botão de Adicionar ao Carrinho */}
                        <div className="mt-4">
                            <Button className="w-full bg-blue-600 text-white hover:bg-blue-700 rounded-full py-2">
                                Adicionar ao Carrinho - R$ {(foodItem.price * quantity).toFixed(2)}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
