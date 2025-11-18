import React from 'react';
import { Link } from 'react-router-dom';
import { QrCode, MapPin, MessageCircle } from 'lucide-react';

const HowItWorksPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-white text-gray-900 font-sans">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-14 md:pt-24 md:pb-18 border-b border-amber-100/60">
        <div className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl">
          <div className="relative left-1/2 -z-10 aspect-[1155/678] w-[72rem] -translate-x-1/2 bg-gradient-to-tr from-amber-400 to-rose-300 opacity-35" />
        </div>
        <div className="max-w-5xl mx-auto px-6 text-left md:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600 mb-3">
            How it works
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-4">
            From scan to &quot;they&apos;re home&quot; in three simple steps.
          </h1>
          <p className="text-sm md:text-base text-gray-600 max-w-2xl">
            Lost Find is built for the moment a stranger bends down to read your pet&apos;s tag. No apps, no accounts—just a QR code and a clear path back to you.
          </p>
        </div>
      </section>

      {/* Step Timeline */}
      <section className="py-14 md:py-18">
        <div className="max-w-5xl mx-auto px-6 space-y-10">
          {/* Step 1 */}
          <div className="grid md:grid-cols-[auto,1fr] gap-6 md:gap-8 items-start">
            <div className="flex md:flex-col items-center md:items-start space-x-4 md:space-x-0 md:space-y-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-500 text-white font-semibold text-sm">
                1
              </div>
              <div className="hidden md:block w-px flex-1 bg-gradient-to-b from-amber-200 to-transparent" />
            </div>
            <div className="rounded-3xl bg-white border border-amber-100 shadow-sm p-6 md:p-7 flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <div className="inline-flex items-center space-x-2 rounded-full bg-amber-50 px-3 py-1 text-[11px] font-semibold text-amber-700 mb-3">
                  <QrCode className="w-3.5 h-3.5" />
                  <span>Step 1 · Create your pet profile</span>
                </div>
                <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                  Register your pet and link them to a QR tag
                </h2>
                <p className="text-sm md:text-base text-gray-600 mb-3">
                  In the dashboard, you&apos;ll add your pet&apos;s name, photos, important notes, and how you want to be contacted.
                  Lost Find generates a unique QR code that points to their profile.
                </p>
                <ul className="text-xs md:text-sm text-gray-600 space-y-1.5">
                  <li>• Upload photos so finders can double-check they have the right pet</li>
                  <li>• Add medical details or temperament notes (e.g. &quot;nervous around men&quot;)</li>
                  <li>• Decide whether to show phone, email, or use only the secure contact form</li>
                </ul>
              </div>
              <div className="flex-1 rounded-2xl bg-amber-50 border border-amber-100 p-4 text-xs text-gray-700">
                <p className="font-semibold mb-2 text-amber-800">Tag options</p>
                <p className="mb-2">
                  You can print the QR code at home, stick it on a tag, or engrave it on a custom tag—anything that
                  keeps it visible on your pet&apos;s collar or harness.
                </p>
                <p className="text-gray-600">
                  Lost Find works with any physical tag provider; our job is the smart part behind the code.
                </p>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="grid md:grid-cols-[auto,1fr] gap-6 md:gap-8 items-start">
            <div className="flex md:flex-col items-center md:items-start space-x-4 md:space-x-0 md:space-y-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-500 text-white font-semibold text-sm">
                2
              </div>
              <div className="hidden md:block w-px flex-1 bg-gradient-to-b from-amber-200 to-transparent" />
            </div>
            <div className="rounded-3xl bg-white border border-amber-100 shadow-sm p-6 md:p-7 flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <div className="inline-flex items-center space-x-2 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold text-blue-700 mb-3">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Step 2 · Scan & location</span>
                </div>
                <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                  A finder scans the tag and we quietly log where
                </h2>
                <p className="text-sm md:text-base text-gray-600 mb-3">
                  When someone scans the QR code, their phone opens a simple pet page in the browser. At the same time,
                  Lost Find attempts to record an approximate location to help you narrow down the search.
                </p>
                <ul className="text-xs md:text-sm text-gray-600 space-y-1.5">
                  <li>• We ask the finder&apos;s browser for permission to share a location</li>
                  <li>• If granted, we send you a notification with coordinates and a rough address</li>
                  <li>• If not, you&apos;ll still know that someone scanned the tag</li>
                </ul>
              </div>
              <div className="flex-1 rounded-2xl bg-blue-50 border border-blue-100 p-4 text-xs text-gray-700">
                <p className="font-semibold mb-2 text-blue-900">No tracking, just moments</p>
                <p className="mb-2">
                  Lost Find doesn&apos;t continuously track your pet. We only store scan events—the moments when a human
                  has actually found and helped.
                </p>
                <p className="text-gray-600">
                  That means no constant GPS battery drain, and no permanent location history of your pet.
                </p>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="grid md:grid-cols-[auto,1fr] gap-6 md:gap-8 items-start">
            <div className="flex md:flex-col items-center md:items-start space-x-4 md:space-x-0 md:space-y-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-500 text-white font-semibold text-sm">
                3
              </div>
              <div className="hidden md:block w-px flex-1 bg-gradient-to-b from-amber-200 to-transparent" />
            </div>
            <div className="rounded-3xl bg-white border border-amber-100 shadow-sm p-6 md:p-7 flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <div className="inline-flex items-center space-x-2 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700 mb-3">
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Step 3 · Safe contact</span>
                </div>
                <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                  The finder reaches you through a secure contact card
                </h2>
                <p className="text-sm md:text-base text-gray-600 mb-3">
                  On the pet page, the finder sees exactly what you&apos;ve chosen to share—nothing more. They can
                  call, email, or send a message through a secure form that forwards straight to you.
                </p>
                <ul className="text-xs md:text-sm text-gray-600 space-y-1.5">
                  <li>• No accounts for finders, just a simple form</li>
                  <li>• Your details are never sold or used for marketing</li>
                  <li>• You can update or disable a profile at any time from your dashboard</li>
                </ul>
              </div>
              <div className="flex-1 rounded-2xl bg-emerald-50 border border-emerald-100 p-4 text-xs text-gray-700">
                <p className="font-semibold mb-2 text-emerald-900">Built for kindness</p>
                <p className="mb-2">
                  Most people who stop to scan a tag genuinely want to help. We make it effortless for them to do the right thing.
                </p>
                <p className="text-gray-600">
                  The faster they can reach you, the less time your pet spends scared or confused away from home.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-14 bg-gradient-to-r from-amber-500 to-amber-600">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            You can&apos;t control every open gate or sudden firework.
          </h2>
          <p className="text-sm md:text-base text-amber-50 mb-6 max-w-2xl mx-auto">
            But you can make sure that if someone kind finds your pet, they know exactly what to do next.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/register"
              className="inline-flex items-center justify-center rounded-full bg-white px-7 py-2.5 text-sm font-semibold text-amber-600 shadow-md hover:bg-amber-50 transition-colors"
            >
              Create your free Lost Find account
            </Link>
            <Link
              to="/"
              className="text-xs font-medium text-amber-50 hover:text-white transition-colors"
            >
              Or go back to the home page
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorksPage;


