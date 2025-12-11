export default function Footer() {
    return (
        <footer className="bg-black text-white py-12 mt-20">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h4 className="font-bold tracking-widest mb-4">SPORTS ELITE</h4>
                    <p className="text-sm text-gray-400 font-light">
                        The premier marketplace for premium sports vehicles.
                    </p>
                </div>
                <div>
                    <h4 className="font-bold text-sm tracking-wide mb-4">PLATFORM</h4>
                    <ul className="space-y-2 text-sm text-gray-400 font-light">
                        <li><a href="#" className="hover:text-white transition">Vehicles</a></li>
                        <li><a href="#" className="hover:text-white transition">Sellers</a></li>
                        <li><a href="#" className="hover:text-white transition">Services</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-sm tracking-wide mb-4">COMPANY</h4>
                    <ul className="space-y-2 text-sm text-gray-400 font-light">
                        <li><a href="#" className="hover:text-white transition">About Us</a></li>
                        <li><a href="#" className="hover:text-white transition">Contact</a></li>
                        <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-sm tracking-wide mb-4">CONNECT</h4>
                    <div className="flex gap-4">
                        {/* Social Icons Placeholder */}
                        <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition cursor-pointer">IG</div>
                        <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition cursor-pointer">TW</div>
                        <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition cursor-pointer">FB</div>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-gray-900 text-center text-xs text-gray-500">
                © 2024 Sports Elite. All rights reserved.
            </div>
        </footer>
    );
}
