import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, QrCode, MapPin, AlertTriangle, CheckCircle, Heart, Activity, Eye, Search } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import PetRegistrationModal from './PetRegistrationModal';
import QRCodeModal from './QRCodeModal';

interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  status: 'safe' | 'lost' | 'found';
  photos: string[];
  qr_code: string;
  created_at: string;
}

interface ScanLocation {
  id: string;
  latitude: number;
  longitude: number;
  address: string;
  scanned_at: string;
}

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [pets, setPets] = useState<Pet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [selectedPetForQR, setSelectedPetForQR] = useState<Pet | null>(null);
  const [scanHistory, setScanHistory] = useState<{ [petId: string]: ScanLocation[] }>({});
  const [searchQuery, setSearchQuery] = useState('');

  const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

  useEffect(() => {
    fetchPets();
  }, []);

  // Refresh scan history periodically and when window gains focus
  useEffect(() => {
    const refreshScans = () => {
      pets.forEach((pet) => fetchScanHistory(pet.id));
    };

    // On window focus
    const handleFocus = () => {
      refreshScans();
    };
    window.addEventListener('focus', handleFocus);

    // Poll every 15 seconds
    const intervalId = setInterval(() => {
      refreshScans();
    }, 15000);

    return () => {
      window.removeEventListener('focus', handleFocus);
      clearInterval(intervalId);
    };
  }, [pets]);

  const fetchPets = async () => {
    setError('');
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You are not logged in. Please log in to view your pets.');
        setPets([]);
        return;
      }

      const response = await fetch(`${API_BASE_URL}/pets`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        let message = 'Failed to load pets';
        try {
          const { error } = await response.json();
          if (error) message = error;
        } catch {}
        if (response.status === 401 || response.status === 403) {
          logout();
          navigate('/login');
          return;
        }
        setError(message);
        setPets([]);
        return;
      }

      const petsData = await response.json();
      setPets(petsData);

      // Fetch scan history for each pet
      petsData.forEach((pet: Pet) => {
        fetchScanHistory(pet.id);
      });
    } catch (err) {
      console.error('Failed to fetch pets:', err);
      setError('Network error while loading pets');
      setPets([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchScanHistory = async (petId: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/pets/${petId}/scans`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const scans = await response.json();
        setScanHistory(prev => ({ ...prev, [petId]: scans }));
      }
    } catch (error) {
      console.error('Failed to fetch scan history:', error);
    }
  };

  const updatePetStatus = async (petId: string, status: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/pets/${petId}/status`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      });
      
      if (response.ok) {
        fetchPets(); // Refresh pets list
      }
    } catch (error) {
      console.error('Failed to update pet status:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'lost': return 'text-red-500 bg-red-500/10 border-red-200';
      case 'found': return 'text-emerald-500 bg-emerald-500/10 border-emerald-200';
      default: return 'text-blue-500 bg-blue-500/10 border-blue-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'lost': return <AlertTriangle className="w-4 h-4" />;
      case 'found': return <CheckCircle className="w-4 h-4" />;
      default: return <Heart className="w-4 h-4" />;
    }
  };

  const onPetRegistrationSuccess = (_petId: string, _qrCode: string) => {
    setShowRegistrationForm(false);
    fetchPets(); // Refresh pets list
  };

  // Stats calculations
  const totalScans = Object.values(scanHistory).reduce((total, scans) => total + scans.length, 0);
  const safePets = pets.filter(pet => pet.status === 'safe').length;
  const lostPets = pets.filter(pet => pet.status === 'lost').length;

  // Filter pets based on search
  const filteredPets = pets.filter(pet => 
    pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pet.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pet.species.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 mx-auto mb-6"></div>
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 mx-auto absolute top-0 left-1/2 transform -translate-x-1/2"></div>
          </div>
          <p className="text-slate-600 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Render modal instead of separate page when adding a pet

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Header Section */}
        <div className="mb-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-slate-900">
                    Hey there, {user?.firstName}! 👋
                  </h1>
                  <p className="text-slate-600 text-lg">Your pet guardian command center</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowRegistrationForm(true)}
                className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <div className="relative flex items-center space-x-2">
                  <Plus className="w-5 h-5" />
                  <span className="font-semibold">Add New Pet</span>
                </div>
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium uppercase tracking-wide">Total Pets</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">{pets.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-blue-500" />
                </div>
              </div>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium uppercase tracking-wide">Safe at Home</p>
                  <p className="text-2xl font-bold text-emerald-600 mt-1">{safePets}</p>
                </div>
                <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-emerald-500" />
                </div>
              </div>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium uppercase tracking-wide">Missing</p>
                  <p className="text-2xl font-bold text-red-500 mt-1">{lostPets}</p>
                </div>
                <div className="w-12 h-12 bg-red-500/10 rounded-2xl flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-500" />
                </div>
              </div>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium uppercase tracking-wide">Total Scans</p>
                  <p className="text-2xl font-bold text-indigo-600 mt-1">{totalScans}</p>
                </div>
                <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center">
                  <Eye className="w-6 h-6 text-indigo-500" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-2xl text-red-700 shadow-lg">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5" />
              <span className="font-medium">{error}</span>
            </div>
          </div>
        )}

        {pets.length === 0 ? (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-10 border border-white/50">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Plus className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Welcome to PetGuardian!</h3>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Ready to keep your furry friends safe? Register your first pet to generate QR codes and track their adventures.
              </p>
              <button
                onClick={() => setShowRegistrationForm(true)}
                className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <span className="relative">Register Your First Pet</span>
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Search Bar */}
            <div className="mb-8">
              <div className="relative max-w-md">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search pets by name, breed, or species..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/70 backdrop-blur-sm border border-white/50 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder-slate-400 shadow-lg"
                />
              </div>
            </div>

            {/* Pets Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredPets.map((pet) => (
                <div key={pet.id} className="group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-white/50 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                  <div className="relative overflow-hidden">
                    {pet.photos.length > 0 ? (
                      <img
                        src={pet.photos[0]}
                        alt={pet.name}
                        className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-56 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-400">
                        <Heart className="w-16 h-16" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
                      <div>
                        <h3 className="text-white text-2xl font-bold drop-shadow-lg mb-1">{pet.name}</h3>
                        <p className="text-white/90 text-sm drop-shadow">
                          {pet.breed ? `${pet.breed} ${pet.species}` : pet.species}
                        </p>
                      </div>
                      <span className={`inline-flex items-center space-x-1 px-3 py-2 rounded-full text-xs font-semibold border backdrop-blur-md bg-white/90 ${getStatusColor(pet.status)}`}>
                        {getStatusIcon(pet.status)}
                        <span className="ml-1 uppercase tracking-wide">{pet.status}</span>
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6 space-y-6">
                    {/* Activity Section */}
                    <div className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center">
                          <Activity className="w-5 h-5 text-blue-500" />
                        </div>
                        <div>
                          <p className="text-slate-900 font-semibold">{scanHistory[pet.id]?.length || 0} scans</p>
                          <p className="text-slate-500 text-sm">Total activity</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedPetForQR(pet)}
                        className="group/btn relative overflow-hidden bg-gradient-to-r from-slate-600 to-slate-700 text-white p-3 rounded-xl hover:from-slate-700 hover:to-slate-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
                        <QrCode className="w-5 h-5 relative z-10" />
                      </button>
                    </div>

                    {/* Last Seen */}
                    {scanHistory[pet.id] && scanHistory[pet.id].length > 0 && (
                      <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3">
                            <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center mt-0.5">
                              <MapPin className="w-5 h-5 text-blue-500" />
                            </div>
                            <div>
                              <p className="text-slate-900 font-semibold text-sm">Last Seen</p>
                              <p className="text-slate-600 text-sm">
                                {new Date(scanHistory[pet.id][0].scanned_at).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </p>
                            </div>
                          </div>
                          <a
                            href={`https://www.google.com/maps?q=${scanHistory[pet.id][0].latitude},${scanHistory[pet.id][0].longitude}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium hover:underline transition-colors"
                          >
                            View Map →
                          </a>
                        </div>
                      </div>
                    )}

                    {/* Status Selector */}
                    <div>
                      <label className="block text-slate-700 text-sm font-semibold mb-3">Pet Status</label>
                      <select
                        value={pet.status}
                        onChange={(e) => updatePetStatus(pet.id, e.target.value)}
                        className="block w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 font-medium shadow-sm hover:shadow-md"
                      >
                        <option value="safe">🏠 Safe at Home</option>
                        <option value="lost">🚨 Missing</option>
                        <option value="found">✅ Found</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {selectedPetForQR && (
        <QRCodeModal
          pet={selectedPetForQR}
          onClose={() => setSelectedPetForQR(null)}
        />
      )}

      {showRegistrationForm && (
        <PetRegistrationModal
          onClose={() => setShowRegistrationForm(false)}
          onSuccess={onPetRegistrationSuccess}
        />
      )}
    </div>
  );
};

export default Dashboard;