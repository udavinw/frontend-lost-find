import React from 'react';
import { Link } from 'react-router-dom';
import { QrCode, MapPin, MessageCircle, ShieldCheck, Heart, UserPlus } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-white text-gray-900 font-sans">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl">
          <div className="relative left-1/2 -z-10 aspect-[1155/678] w-[72rem] -translate-x-1/2 bg-gradient-to-tr from-amber-400 to-rose-300 opacity-40" />
        </div>

        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div className="relative space-y-8">
              <span className="inline-flex items-center space-x-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                <ShieldCheck className="w-4 h-4" />
                <span>Smart QR tags for real peace of mind</span>
              </span>
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                  Your pet gets lost.
                  <span className="block text-amber-600">Their tag brings them home.</span>
                </h1>
                <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-xl">
                  Lost Find turns a simple QR tag into a smart rescue system so kind strangers can contact you in seconds,
                  not hours.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center rounded-full bg-amber-500 px-7 py-3 text-base font-semibold text-white shadow-md hover:bg-amber-600 transition-colors"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Get started free
                </Link>
                <Link
                  to="/how-it-works"
                  className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-6 py-3 text-sm font-medium text-gray-700 hover:border-amber-300 hover:text-amber-700 transition-colors"
                >
                  See how it works
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                <div className="flex items-center space-x-2">
                  <Heart className="w-4 h-4 text-amber-500" />
                  <span>No monthly fees</span>
                </div>
                <span className="h-1 w-1 rounded-full bg-gray-300" />
                <span>Works with any collar</span>
                <span className="h-1 w-1 rounded-full bg-gray-300" />
                <span>Designed for dogs & cats</span>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-amber-200/60 via-white to-rose-100/70 blur-2xl" />
              <div className="relative rounded-3xl bg-white/80 backdrop-blur border border-amber-100 shadow-xl p-4 md:p-6">
                <div className="overflow-hidden rounded-2xl bg-amber-50">
                  <img
                    src="/assets/homeDog.jpg"
                    alt="A dog wearing a smart QR tag on its collar"
                    className="w-full h-64 md:h-80 object-cover"
                  />
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3 text-xs">
                  <div className="rounded-xl border border-gray-100 bg-white p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="inline-flex items-center justify-center rounded-full bg-amber-50 p-2">
                        <QrCode className="w-4 h-4 text-amber-600" />
                      </span>
                      <span className="text-[10px] font-medium uppercase tracking-wide text-amber-600">
                        Step 1
                      </span>
                    </div>
                    <p className="font-semibold text-gray-800 mb-1">Scan the tag</p>
                    <p className="text-[11px] text-gray-500">
                      Finder scans the QR code with any smartphone.
                    </p>
                  </div>

                  <div className="rounded-xl border border-gray-100 bg-white p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="inline-flex items-center justify-center rounded-full bg-blue-50 p-2">
                        <MapPin className="w-4 h-4 text-blue-600" />
                      </span>
                      <span className="text-[10px] font-medium uppercase tracking-wide text-blue-600">
                        Step 2
                      </span>
                    </div>
                    <p className="font-semibold text-gray-800 mb-1">Location captured</p>
                    <p className="text-[11px] text-gray-500">
                      We quietly log where your pet was scanned.
                    </p>
                  </div>

                  <div className="rounded-xl border border-gray-100 bg-white p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="inline-flex items-center justify-center rounded-full bg-emerald-50 p-2">
                        <MessageCircle className="w-4 h-4 text-emerald-600" />
                      </span>
                      <span className="text-[10px] font-medium uppercase tracking-wide text-emerald-600">
                        Step 3
                      </span>
                    </div>
                    <p className="font-semibold text-gray-800 mb-1">Instant contact</p>
                    <p className="text-[11px] text-gray-500">
                      The finder sees a safe profile and can message you.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-12 md:py-16 border-t border-amber-100/60">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-2xl bg-white border border-gray-100 p-5 shadow-sm">
              <p className="text-sm font-semibold text-amber-700 mb-1">
                Smart QR profiles
              </p>
              <p className="text-sm text-gray-600">
                Every tag links to a secure pet page with photos, notes, and your preferred contact details.
              </p>
            </div>
            <div className="rounded-2xl bg-white border border-gray-100 p-5 shadow-sm">
              <p className="text-sm font-semibold text-amber-700 mb-1">
                Privacy built in
              </p>
              <p className="text-sm text-gray-600">
                Share as much or as little as you like—your contact info is only visible through the tag.
              </p>
            </div>
            <div className="rounded-2xl bg-white border border-gray-100 p-5 shadow-sm">
              <p className="text-sm font-semibold text-amber-700 mb-1">
                Minutes to set up
              </p>
              <p className="text-sm text-gray-600">
                Create an account, register your pet, and you’re ready to print or order QR tags.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid Section */}
      <section className="py-14 md:py-20 bg-gradient-to-br from-white via-amber-50/40 to-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Designed for real-life “oh no” moments
              </h2>
              <p className="text-sm md:text-base text-gray-600 max-w-xl">
                Lost Find focuses on the first few minutes after your pet is found—when it matters most.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-2xl bg-white border border-gray-100 p-6 shadow-sm flex flex-col">
              <div className="inline-flex items-center justify-center rounded-xl bg-amber-50 p-2 mb-4 w-10 h-10">
                <QrCode className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                One scan, full profile
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Finders see your pet’s name, photos, and any important notes (medications, anxiety, etc.).
              </p>
            </div>

            <div className="rounded-2xl bg-white border border-gray-100 p-6 shadow-sm flex flex-col">
              <div className="inline-flex items-center justify-center rounded-xl bg-blue-50 p-2 mb-4 w-10 h-10">
                <MapPin className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Automatic location ping
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                We record where your pet was scanned and notify you, so you know exactly where to go.
              </p>
            </div>

            <div className="rounded-2xl bg-white border border-gray-100 p-6 shadow-sm flex flex-col">
              <div className="inline-flex items-center justify-center rounded-xl bg-emerald-50 p-2 mb-4 w-10 h-10">
                <MessageCircle className="w-5 h-5 text-emerald-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Safe, simple contact
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                The finder can call, email, or message you through our secure contact form—no app required.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-amber-500 to-amber-600">
        <div className="max-w-5xl mx-auto px-6 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Give your pet a voice when they can’t find their way home.
          </h2>
          <p className="text-base md:text-lg text-amber-50 mb-8 max-w-2xl mx-auto">
            Create a free Lost Find profile today and be ready before they slip out the door, bolt at a firework, or wander too far at the park.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/register"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-base font-semibold text-amber-600 shadow-md hover:bg-amber-50 transition-colors"
            >
              Create your free account
            </Link>
            <Link
              to="/about"
              className="text-sm font-medium text-amber-50 hover:text-white transition-colors"
            >
              Learn more about Lost Find
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;