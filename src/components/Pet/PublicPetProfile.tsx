import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Heart, Mail, Phone, MessageCircle, AlertTriangle, User, CheckCircle, X, ChevronLeft, ChevronRight } from 'lucide-react';
import ContactForm from './ContactForm';

interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  color: string;
  description: string;
  photos: string[];
  status: 'safe' | 'lost' | 'found';
  owner: {
    name: string;
    email?: string;
    phone?: string;
  };
}

const PublicPetProfile: React.FC = () => {
  const { petId } = useParams();
  const [pet, setPet] = useState<Pet | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showContactForm, setShowContactForm] = useState(false);
  const [locationRecorded, setLocationRecorded] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const hasRecordedScanRef = useRef(false);

  const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

  const recordScanLocation = useCallback(() => {
    if (hasRecordedScanRef.current || !navigator.geolocation) {
      return;
    }
    hasRecordedScanRef.current = true;

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          // Get address from coordinates (you can use Google Geocoding API)
          const address = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;

          await fetch(`${API_BASE_URL}/public/pet/${petId}/scan`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ latitude, longitude, address }),
          });

          setLocationRecorded(true);
        } catch (error) {
          hasRecordedScanRef.current = false;
          console.error('Failed to record location:', error);
        }
      },
      (error) => {
        hasRecordedScanRef.current = false;
        console.error('Geolocation error:', error);
      }
    );
  }, [API_BASE_URL, petId]);

  useEffect(() => {
    const fetchPetData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/public/pet/${petId}`);
        if (!response.ok) {
          throw new Error('Pet not found');
        }
        const petData = await response.json();
        setPet(petData);
        
        // Record scan location
        recordScanLocation();
      } catch (err: any) {
        setError(err.message || 'Failed to load pet information');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPetData();
  }, [petId, recordScanLocation]);

  useEffect(() => {
    hasRecordedScanRef.current = false;
  }, [petId]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'lost': return 'text-red-600 bg-red-50';
      case 'found': return 'text-green-600 bg-green-50';
      default: return 'text-blue-600 bg-blue-50';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'lost': return 'MISSING';
      case 'found': return 'FOUND';
      default: return 'SAFE AT HOME';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading pet information...</p>
        </div>
      </div>
    );
  }

  if (error || !pet) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="text-center bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Pet Not Found</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (showContactForm) {
    return <ContactForm petId={pet.id} petName={pet.name} onClose={() => setShowContactForm(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {locationRecorded && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center max-w-2xl mx-auto">
            <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
            <span className="text-green-700">Location recorded! Owner has been notified.</span>
          </div>
        )}

        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="relative">
            <div className={`px-6 py-4 ${getStatusColor(pet.status)} border-b`}>
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm tracking-wide">
                  {getStatusText(pet.status)}
                </span>
                <Heart className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Pet Photos */}
          {pet.photos.length > 0 && (
            <div className="relative">
              <img
                src={pet.photos[0]}
                alt={pet.name}
                className="w-full h-80 object-cover cursor-pointer"
                onClick={() => {
                  setActivePhotoIndex(0);
                  setIsLightboxOpen(true);
                }}
              />
              {pet.photos.length > 1 && (
                <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                  +{pet.photos.length - 1} more
                </div>
              )}
            </div>
          )}

          {/* Pet Information */}
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{pet.name}</h1>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {pet.species}
              </span>
              {pet.breed && (
                <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                  {pet.breed}
                </span>
              )}
              {pet.age && (
                <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                  {pet.age} years old
                </span>
              )}
            </div>

            {pet.color && (
              <div className="mb-4">
                <h3 className="font-medium text-gray-900 mb-1">Color/Markings:</h3>
                <p className="text-gray-600">{pet.color}</p>
              </div>
            )}

            {pet.description && (
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-1">Description:</h3>
                <p className="text-gray-600">{pet.description}</p>
              </div>
            )}

            {/* Photo Thumbnails */}
            {pet.photos.length > 1 && (
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-2">Photos</h3>
                <div className="grid grid-cols-4 gap-3">
                  {pet.photos.map((photo, index) => (
                    <button
                      key={index}
                      type="button"
                      className="relative group focus:outline-none"
                      onClick={() => {
                        setActivePhotoIndex(index);
                        setIsLightboxOpen(true);
                      }}
                    >
                      <img
                        src={photo}
                        alt={`${pet.name} ${index + 1}`}
                        className="w-full h-20 object-cover rounded-lg border border-gray-200"
                      />
                      <span className="absolute inset-0 rounded-lg ring-2 ring-transparent group-hover:ring-blue-500 transition" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Owner Contact Information */}
            <div className="border-t pt-6">
              <h3 className="font-bold text-gray-900 mb-4">Contact Owner</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <User className="w-5 h-5 text-gray-400 mr-3" />
                  <span className="text-gray-700">{pet.owner.name}</span>
                </div>
                
                {pet.owner.email && (
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-gray-400 mr-3" />
                    <a
                      href={`mailto:${pet.owner.email}`}
                      className="text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      {pet.owner.email}
                    </a>
                  </div>
                )}
                
                {pet.owner.phone && (
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-gray-400 mr-3" />
                    <a
                      href={`tel:${pet.owner.phone}`}
                      className="text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      {pet.owner.phone}
                    </a>
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <button
                  onClick={() => setShowContactForm(true)}
                  className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Send Message</span>
                </button>
                
                {pet.status === 'lost' && (
                  <button
                    onClick={() => setShowContactForm(true)}
                    className="flex items-center justify-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Heart className="w-5 h-5" />
                    <span>Found This Pet</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && pet.photos.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <button
            aria-label="Close"
            className="absolute top-4 right-4 text-white bg-white/10 hover:bg-white/20 rounded-full p-2"
            onClick={() => setIsLightboxOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
          <button
            aria-label="Previous"
            className="absolute left-4 text-white bg-white/10 hover:bg-white/20 rounded-full p-2"
            onClick={() => setActivePhotoIndex((activePhotoIndex - 1 + pet.photos.length) % pet.photos.length)}
          >
            <ChevronLeft className="w-7 h-7" />
          </button>
          <img
            src={pet.photos[activePhotoIndex]}
            alt={`${pet.name} ${activePhotoIndex + 1}`}
            className="max-h-[80vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
          />
          <button
            aria-label="Next"
            className="absolute right-4 text-white bg-white/10 hover:bg-white/20 rounded-full p-2"
            onClick={() => setActivePhotoIndex((activePhotoIndex + 1) % pet.photos.length)}
          >
            <ChevronRight className="w-7 h-7" />
          </button>
        </div>
      )}
    </div>
  );
};

export default PublicPetProfile;