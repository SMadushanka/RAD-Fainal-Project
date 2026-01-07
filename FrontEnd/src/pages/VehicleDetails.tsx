
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Post } from '../services/postService';
import { postService } from '../services/postService';

const VehicleDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [vehicle, setVehicle] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchVehicle = async () => {
      try {
        const data = await postService.getPostById(id);
        setVehicle(data);
      } catch (err) {
        setError('Failed to load vehicle details.');
      } finally {
        setLoading(false);
      }
    };
    fetchVehicle();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  if (!vehicle) return <div className="min-h-screen flex items-center justify-center">Vehicle not found.</div>;

  // WhatsApp chat button logic
  const sellerPhone = vehicle.author?.phone || '';

  // Format phone number for WhatsApp
  // Remove all non-digit characters first
  let whatsappNumber = sellerPhone.replace(/[^\d+]/g, '');

  // Handle Sri Lankan numbers (or any number starting with 0)
  // Convert local format (0XX XXXX XXX) to international format (94XX XXXX XXX)
  if (whatsappNumber.startsWith('0')) {
    whatsappNumber = '94' + whatsappNumber.substring(1);
  }
  // Remove + if present (WhatsApp URL doesn't need it)
  whatsappNumber = whatsappNumber.replace(/^\+/, '');

  const defaultMsg = encodeURIComponent(
    `Hi! I'm interested in your vehicle: ${vehicle.title} listed for $${vehicle.price?.toLocaleString()}. Is it still available?`
  );
  const whatsappUrl = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${defaultMsg}`
    : '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex flex-col items-center py-6 px-3 sm:py-8 sm:px-4 w-full h-full">
      <div className="w-full max-w-4xl bg-white rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 border border-gray-200 overflow-auto max-h-[90vh]">
        <div className="w-full md:w-1/2 flex flex-col items-center">
          <img
            src={vehicle.image || 'https://images.unsplash.com/photo-1494905998402-395d579af905?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
            alt={vehicle.title}
            className="rounded-lg sm:rounded-xl w-full h-48 sm:h-64 md:h-72 object-cover mb-4 shadow-md border"
          />
          <div className="flex flex-wrap gap-2 justify-center mb-3">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold shadow">{vehicle.condition}</span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold shadow">{vehicle.category}</span>
          </div>
          <div className="text-gray-600 text-sm sm:text-base mb-2 text-center"><strong>Location:</strong> {vehicle.location}</div>
          <div className="flex gap-4 mt-3 flex-wrap justify-center">
            <span className="text-gray-700 font-medium text-sm">Likes: {vehicle.likes?.length || 0}</span>
            <span className="text-gray-700 font-medium text-sm">Comments: {vehicle.comments?.length || 0}</span>
          </div>
        </div>
        <div className="w-full md:flex-1 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-2 sm:mb-3 text-gray-900 leading-tight">{vehicle.title}</h1>
            <div className="text-2xl sm:text-3xl font-bold text-green-700 mb-4 sm:mb-6">${vehicle.price?.toLocaleString() || 'N/A'}</div>
            <p className="text-gray-800 text-sm sm:text-base mb-6 leading-relaxed line-clamp-4">{vehicle.description}</p>
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <img
                src={vehicle.author?.profileImage || 'https://ui-avatars.com/api/?name=Seller'}
                alt={vehicle.author?.fullName || vehicle.author?.username || 'Seller'}
                className="w-12 sm:w-14 h-12 sm:h-14 rounded-full border shadow"
              />
              <div>
                <div className="font-bold text-base sm:text-lg">{vehicle.author?.fullName || vehicle.author?.username || 'Seller'}</div>
                <div className="text-xs sm:text-sm text-gray-500">Seller</div>
                {vehicle.author?.phone && <div className="text-xs sm:text-sm text-gray-600 mt-1">📞 {vehicle.author.phone}</div>}
              </div>
            </div>
            <div className="text-xs text-gray-400 mb-4">Posted on {new Date(vehicle.createdAt).toLocaleString()}</div>
          </div>
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 items-center">
            <a
              href={whatsappUrl || '#'}
              target={whatsappNumber ? '_blank' : undefined}
              rel={whatsappNumber ? 'noopener noreferrer' : undefined}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl text-base sm:text-lg font-bold shadow-lg transition-all duration-200 ${whatsappNumber ? 'bg-green-500 hover:bg-green-600 hover:scale-105 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
              onClick={(e) => !whatsappNumber && e.preventDefault()}
              style={!whatsappNumber ? { pointerEvents: 'none' } : {}}
            >
              {/* WhatsApp Icon */}
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 sm:w-7 h-5 sm:h-7">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span className="hidden sm:inline">Chat on WhatsApp</span>
              <span className="sm:hidden">WhatsApp</span>
            </a>
            {!whatsappNumber && (
              <span className="text-xs sm:text-sm text-gray-500 text-center">Seller's WhatsApp not available</span>
            )}
          </div>
        </div>
      </div>
      {/* Comments section or more info can go here */}
    </div>
  );
};

export default VehicleDetails;
