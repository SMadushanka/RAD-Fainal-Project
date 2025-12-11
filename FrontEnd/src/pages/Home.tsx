import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen flex flex-col font-sans">
      <Navbar />

      {/* Landing Hero */}
      <div className="relative h-[85vh] bg-black text-white flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="../public/pic 01.avif"
            alt="Premium Car"
            className="w-full h-full object-cover opacity-80"
          />
          {/* subtle gradient overlay for text readability, but keeping image visible */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 w-full pt-12">
          <div className="max-w-3xl">
            <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-8 leading-[1.1] drop-shadow-2xl">
              FIND YOUR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                DREAM RIDE
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 font-light max-w-xl mb-12 shadow-black drop-shadow-md">
              The premier marketplace for luxury, sports, and exotic vehicles. Verified sellers. Secure transactions.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <button
                onClick={() => navigate('/vehicles')}
                className="px-10 py-4 bg-white text-black font-bold tracking-widest hover:bg-gray-200 hover:scale-105 transition duration-300 shadow-lg text-sm md:text-base"
              >
                BROWSE VEHICLES
              </button>
              <button
                onClick={() => navigate('/sellers')}
                className="px-10 py-4 border-2 border-white text-white font-bold tracking-widest hover:bg-white hover:text-black hover:scale-105 transition duration-300 text-sm md:text-base backdrop-blur-sm"
              >
                MEET SELLERS
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section (New) */}
      <div className="bg-black border-y border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-800">
            <div className="text-white">
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-xs tracking-widest text-gray-500 uppercase">Premium Vehicles</div>
            </div>
            <div className="text-white">
              <div className="text-4xl font-bold mb-2">120+</div>
              <div className="text-xs tracking-widest text-gray-500 uppercase">Verified Sellers</div>
            </div>
            <div className="text-white">
              <div className="text-4xl font-bold mb-2">$50M+</div>
              <div className="text-xs tracking-widest text-gray-500 uppercase">Total Inventory</div>
            </div>
            <div className="text-white">
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-xs tracking-widest text-gray-500 uppercase">Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 text-black py-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold tracking-tighter mb-4">WHY CHOOSE US</h2>
            <div className="w-20 h-1 bg-black mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="p-10 bg-white shadow-xl rounded-xl hover:-translate-y-2 transition duration-500 group">
              <div className="text-5xl mb-8 group-hover:scale-110 transition duration-300">💎</div>
              <h3 className="text-xl font-bold tracking-widest mb-4">PREMIUM ONLY</h3>
              <p className="text-gray-600 font-light leading-relaxed">
                Curated selection of high-performance and luxury vehicles. We maintain strict quality standards to ensure excellence.
              </p>
            </div>
            <div className="p-10 bg-white shadow-xl rounded-xl hover:-translate-y-2 transition duration-500 group">
              <div className="text-5xl mb-8 group-hover:scale-110 transition duration-300">🛡️</div>
              <h3 className="text-xl font-bold tracking-widest mb-4">VERIFIED SELLERS</h3>
              <p className="text-gray-600 font-light leading-relaxed">
                Every seller is thoroughly vetted. Connect directly with trusted individuals and reputable dealerships with peace of mind.
              </p>
            </div>
            <div className="p-10 bg-white shadow-xl rounded-xl hover:-translate-y-2 transition duration-500 group">
              <div className="text-5xl mb-8 group-hover:scale-110 transition duration-300">⚡</div>
              <h3 className="text-xl font-bold tracking-widest mb-4">FAST & SECURE</h3>
              <p className="text-gray-600 font-light leading-relaxed">
                Streamlined buying process to get you behind the wheel faster. Secure communication channels and transaction support.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Trending Categories (New) */}
      <div className="bg-black text-white py-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-bold tracking-tighter mb-2">TRENDING</h2>
              <p className="text-gray-400">Popular categories this week</p>
            </div>
            <button onClick={() => navigate('/vehicles')} className="hidden md:block text-sm border-b border-white pb-1 hover:text-gray-300 hover:border-gray-300 transition">VIEW ALL</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div
              onClick={() => navigate('/vehicles')}
              className="relative h-96 group overflow-hidden cursor-pointer rounded-lg"
            >
              <img src="https://images.unsplash.com/photo-1617788138017-80ad40651399?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-110" alt="Supercars" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-6 left-6">
                <h3 className="text-2xl font-bold mb-1">SUPERCARS</h3>
                <p className="text-gray-300 text-sm">Lamborghini, Ferrari, McLaren</p>
              </div>
            </div>

            {/* Card 2 */}
            <div
              onClick={() => navigate('/vehicles')}
              className="relative h-96 group overflow-hidden cursor-pointer rounded-lg"
            >
              <img src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-110" alt="Luxury Sedans" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-6 left-6">
                <h3 className="text-2xl font-bold mb-1">LUXURY SEDANS</h3>
                <p className="text-gray-300 text-sm">Mercedes, BMW, Audi</p>
              </div>
            </div>

            {/* Card 3 */}
            <div
              onClick={() => navigate('/vehicles')}
              className="relative h-96 group overflow-hidden cursor-pointer rounded-lg"
            >
              <img src="https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-110" alt="Vintage" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-6 left-6">
                <h3 className="text-2xl font-bold mb-1">VINTAGE CLASSICS</h3>
                <p className="text-gray-300 text-sm">Authentic timepieces</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gray-900 text-white py-32 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">
            READY TO SELL?
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 font-light mb-12">
            List your vehicle in front of thousands of qualified buyers today. <br />
            Zero hidden fees. Maximum exposure.
          </p>
          <button
            onClick={() => {
              if (!localStorage.getItem('currentUser')) {
                navigate('/login');
              } else {
                navigate('/create-post');
              }
            }}
            className="px-12 py-5 bg-white text-black font-bold tracking-widest text-lg hover:bg-gray-200 hover:scale-105 transition duration-300 rounded-full"
          >
            START SELLING
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
