import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-white text-gray-900 font-sans">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-16 md:pt-24 md:pb-20 border-b border-amber-100/60">
        <div className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl">
          <div className="relative left-1/2 -z-10 aspect-[1155/678] w-[72rem] -translate-x-1/2 bg-gradient-to-tr from-amber-400 to-rose-300 opacity-35" />
        </div>
        <div className="max-w-5xl mx-auto px-6">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600 mb-3">
              About Lost Find
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-4">
              Built by pet people who have felt that “heart drop” moment.
            </h1>
            <p className="text-sm md:text-base text-gray-600 max-w-xl">
              Lost Find started as a simple question: why, in 2025, is losing a pet still so chaotic?
              We set out to build something calm, clear, and human for the moments when you need it most.
            </p>
          </div>
        </div>
      </section>

      {/* Story & Values */}
      <section className="py-14 md:py-18">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Our story
            </h2>
            <p className="text-sm md:text-base text-gray-600">
              Like many pet parents, we&apos;ve had those long, anxious walks around the block calling a name
              into the dark. Flyers on lamp posts, group chats buzzing, social media posts shared and reshared.
              It&apos;s exhausting—and it often relies on luck.
            </p>
            <p className="text-sm md:text-base text-gray-600">
              We imagined something different: a world where any stranger with a smartphone can instantly see who
              your pet belongs to, send you a message, and share where they were found. No app to download, no
              accounts to create, just a gentle bridge between “I found a pet” and “they&apos;re back home”.
            </p>
            <p className="text-sm md:text-base text-gray-600">
              Lost Find is our answer—a simple, privacy-respecting platform built on QR codes, smart profiles,
              and thoughtful notifications.
            </p>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl bg-white border border-amber-100 shadow-sm p-6">
              <h3 className="text-sm font-semibold text-amber-700 mb-3">
                What we care about
              </h3>
              <dl className="space-y-4 text-sm text-gray-700">
                <div>
                  <dt className="font-semibold text-gray-900">Pets first</dt>
                  <dd className="text-gray-600">
                    Every design decision starts with a simple question: does this help reunite pets with their humans faster and safer?
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-gray-900">Calm technology</dt>
                  <dd className="text-gray-600">
                    When you&apos;re stressed, you don&apos;t need more noise. Lost Find is intentionally clear, quiet, and focused.
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-gray-900">Respectful privacy</dt>
                  <dd className="text-gray-600">
                    You choose what to share. Your data is used to bring your pet home, not to build a marketing list.
                  </dd>
                </div>
              </dl>
            </div>

            <div className="rounded-3xl bg-amber-50 border border-amber-100 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700 mb-2">
                Our mission
              </p>
              <p className="text-sm md:text-base text-amber-900">
                To make “lost pet” stories shorter, kinder, and more likely to end with a happy reunion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How we think about safety */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-white via-amber-50/40 to-white border-t border-amber-100/60">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
              Thoughtful by design
            </h2>
            <p className="text-sm text-gray-600">
              Lost Find is not a GPS tracker. It&apos;s a lightweight safety net for the everyday realities of living with curious animals.
            </p>
          </div>
          <div className="md:col-span-2 grid sm:grid-cols-3 gap-4">
            <div className="rounded-2xl bg-white border border-gray-100 p-4 text-sm">
              <p className="font-semibold text-gray-900 mb-1">No batteries, no charging</p>
              <p className="text-gray-600">
                QR tags never run out of power, so they&apos;re always ready when you need them.
              </p>
            </div>
            <div className="rounded-2xl bg-white border border-gray-100 p-4 text-sm">
              <p className="font-semibold text-gray-900 mb-1">Works anywhere</p>
              <p className="text-gray-600">
                If a phone can scan a QR code and open a browser, it can help bring your pet home.
              </p>
            </div>
            <div className="rounded-2xl bg-white border border-gray-100 p-4 text-sm">
              <p className="font-semibold text-gray-900 mb-1">People-friendly</p>
              <p className="text-gray-600">
                Finders don&apos;t need to log in or install anything—helping is as easy as tapping a link.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
