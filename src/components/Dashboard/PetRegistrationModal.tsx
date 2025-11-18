import React from 'react';
import { X, Sparkles } from 'lucide-react';
import PetRegistrationForm from '../Pet/PetRegistrationForm';

interface PetRegistrationModalProps {
  onClose: () => void;
  onSuccess: (petId: string, qrCode: string) => void;
}

const PetRegistrationModal: React.FC<PetRegistrationModalProps> = ({ onClose, onSuccess }) => {
  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-start sm:items-center justify-center p-4 z-50 animate-in fade-in duration-300 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl max-w-3xl w-full border border-white/20 animate-in slide-in-from-bottom-4 duration-500 my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative p-6 md:p-8 pb-4 md:pb-6">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 to-indigo-100/80 rounded-t-3xl"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Register New Pet</h3>
                <p className="text-slate-600 font-medium">Create a digital ID & QR code</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-xl text-slate-400 hover:text-slate-600 hover:bg-white transition-all duration-200 flex items-center justify-center shadow-md hover:shadow-lg group"
              aria-label="Close"
            >
              <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
            </button>
          </div>
        </div>

        <div className="px-6 md:px-8 pb-6 md:pb-8 max-h-[85vh] overflow-y-auto">
          <PetRegistrationForm
            onSuccess={(petId, qrCode) => {
              onSuccess(petId, qrCode);
              onClose();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PetRegistrationModal;


