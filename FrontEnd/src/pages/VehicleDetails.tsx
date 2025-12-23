
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
  // Fallback: show button only if phone exists, else show disabled
  const whatsappNumber = sellerPhone.replace(/[^\d]/g, '');
  const defaultMsg = encodeURIComponent(
    `Hello, I'm interested in your vehicle: ${vehicle.title} (ID: ${vehicle._id}). Is it still available?`
  );
  const whatsappUrl = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${defaultMsg}`
    : '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex flex-col items-center py-12 px-4">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-2xl p-10 flex flex-col md:flex-row gap-10 border border-gray-200">
        <div className="flex-shrink-0 w-full md:w-1/2 flex flex-col items-center">
          <img
            src={vehicle.image || 'https://images.unsplash.com/photo-1494905998402-395d579af905?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
            alt={vehicle.title}
            className="rounded-xl w-full h-72 object-cover mb-6 shadow-md border"
          />
          <div className="flex gap-2 mb-4">
            <span className="bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-semibold shadow">{vehicle.condition}</span>
            <span className="bg-green-100 text-green-800 px-4 py-1 rounded-full text-sm font-semibold shadow">{vehicle.category}</span>
          </div>
          <div className="text-gray-600 text-base mb-2"><strong>Location:</strong> {vehicle.location}</div>
          <div className="flex gap-4 mt-4">
            <span className="text-gray-700 font-medium">Likes: {vehicle.likes?.length || 0}</span>
            <span className="text-gray-700 font-medium">Comments: {vehicle.comments?.length || 0}</span>
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-extrabold mb-3 text-gray-900 leading-tight">{vehicle.title}</h1>
            <div className="text-3xl font-bold text-green-700 mb-6">${vehicle.price?.toLocaleString() || 'N/A'}</div>
            <p className="text-gray-800 text-lg mb-8 leading-relaxed">{vehicle.description}</p>
            <div className="flex items-center gap-4 mb-6">
              <img
                src={vehicle.author?.profileImage || 'https://ui-avatars.com/api/?name=Seller'}
                alt={vehicle.author?.fullName || vehicle.author?.username || 'Seller'}
                className="w-14 h-14 rounded-full border shadow"
              />
              <div>
                <div className="font-bold text-lg">{vehicle.author?.fullName || vehicle.author?.username || 'Seller'}</div>
                <div className="text-sm text-gray-500">Seller</div>
                {vehicle.author?.phone && <div className="text-sm text-gray-600 mt-1">{vehicle.author.phone}</div>}
              </div>
            </div>
            <div className="text-xs text-gray-400 mb-4">Posted on {new Date(vehicle.createdAt).toLocaleString()}</div>
          </div>
          <div className="mt-8 flex flex-col md:flex-row gap-4 items-center">
            <a
              href={whatsappUrl || '#'}
              target={whatsappNumber ? '_blank' : undefined}
              rel={whatsappNumber ? 'noopener noreferrer' : undefined}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg text-lg font-semibold shadow transition-colors duration-200 ${whatsappNumber ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
              onClick={(e) => !whatsappNumber && e.preventDefault()}
              style={!whatsappNumber ? { pointerEvents: 'none' } : {}}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 12c0 4.556-3.694 8.25-8.25 8.25A8.207 8.207 0 013.75 19.5L2 22l2.5-.75A8.25 8.25 0 1120.25 12z" />
              </svg>
              Chat on WhatsApp
            </a>
            {!whatsappNumber && (
              <span className="text-sm text-gray-500">Seller's WhatsApp not available</span>
            )}
          </div>
        </div>
      </div>
      {/* Comments section or more info can go here */}
    </div>
  );
};

export default VehicleDetails;
