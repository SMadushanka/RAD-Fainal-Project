interface FilterBarProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
}

export default function FilterBar({
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
}: FilterBarProps) {
    const categories = ['all', 'car', 'van', 'suv', 'sedan', 'truck', 'bike'];

    return (
        <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight mb-6">FEATURED VEHICLES</h2>

            {/* Search Bar */}
            <input
                type="text"
                placeholder="Search by brand, model, or year..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:border-black transition"
            />

            {/* Category Buttons */}
            <div className="flex flex-wrap gap-3 mb-6">
                {categories.map(category => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-6 py-2 font-bold tracking-wide transition uppercase ${selectedCategory === category
                                ? 'bg-black text-white'
                                : 'border border-black text-black hover:bg-black hover:text-white'
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>
    );
}
