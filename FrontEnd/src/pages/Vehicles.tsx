import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import FilterBar from '../components/FilterBar';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import VehicleCard from '../components/VehicleCard';
import { postService, type Post } from '../services/postService';

export default function Vehicles() {
    // const navigate = useNavigate();
    const [vehicles, setVehicles] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const posts = await postService.getAllPosts();
            setVehicles(posts);
        } catch (error) {
            console.error('Failed to fetch posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredVehicles = vehicles.filter(vehicle => {
        // Search filter
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            const matchesSearch =
                vehicle.title.toLowerCase().includes(query) ||
                vehicle.description.toLowerCase().includes(query);
            if (!matchesSearch) return false;
        }

        // Category filter (Assuming description or title contains category for now as backend doesn't have type field in schema)
        // Ideally backend should have a 'type' field. For now, skipping strict category filter or simple regex match
        if (selectedCategory !== 'all') {
            const categoryMatch =
                vehicle.title.toLowerCase().includes(selectedCategory) ||
                vehicle.description.toLowerCase().includes(selectedCategory);
            if (!categoryMatch) return false;
        }

        return true;
    });

    return (
        <div className="bg-white min-h-screen flex flex-col">
            <Navbar />
            <Hero />

            <main className="max-w-7xl mx-auto px-4 py-16 flex-grow w-full">
                <FilterBar
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                />

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredVehicles.map((vehicle) => (
                            <VehicleCard
                                key={vehicle._id}
                                post={vehicle}
                            />
                        ))}
                        {filteredVehicles.length === 0 && (
                            <div className="col-span-full text-center py-12 text-gray-500">
                                No vehicles found matching your criteria.
                            </div>
                        )}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
