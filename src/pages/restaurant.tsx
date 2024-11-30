import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, User } from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Restaurant {
  id: string;
  name: string;
  rating: string;
  image: string;
  description: string;
}

interface MenuItem {
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

export default function Restaurant() {
  const { id } = useParams<{ id: string }>(); // Captura o ID da URL
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        const response = await axios.get(`https://apifakedelivery.vercel.app/restaurants/${id}`);
        setRestaurant(response.data);
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
      }
    };

    const fetchMenuItems = async () => {
      try {
        const response = await axios.get(`https://apifakedelivery.vercel.app/foods`);
        setMenuItems(response.data.filter((item: { restaurantId: string | undefined; }) => item.restaurantId === id));
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };

    fetchRestaurantData();
    fetchMenuItems();
  }, [id]); // Reexecuta o efeito quando o ID muda

  if (!restaurant) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-200">
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        

        {/* Menu */}
        <h3 className="text-2xl font-semibold mb-6 text-center font-medium text-blue-950">Menu:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {menuItems.map((item) => (
            <Card key={item.id} className="overflow-hidden shadow-lg rounded-xl bg-white">
              <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded-t-xl" />
              <CardHeader className="p-4">
                <CardTitle className="text-lg font-bold">{item.name}</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-gray-600 mb-2">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-lg">R$ {item.price.toFixed(2)}</span>
                </div>
                <div className="flex items-center mt-2 text-sm text-gray-500">
                  
                  <span className="mr-10">{item.time}</span>
                  
                  <span>Delivery: R$ {item.delivery.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter className="p-4">
                <Link to={`/food/${item.id}`}>
                  <Button className="w-full bg-blue-600 text-white hover:bg-blue-700 rounded-full py-2">
                    Pedir Agora
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
