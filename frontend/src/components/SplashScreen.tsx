"use client"

import React from 'react';
import Link from 'next/link';

const SplashScreen: React.FC = () => {
  return (
    <main className="flex flex-col min-h-screen bg-white">
      {/* Banner section */}
      <header className="w-full py-16 bg-blue-950"></header>

      {/* Hero Section */}
      <section className="w-full bg-blue-950 text-white py-20 px-4" aria-labelledby="hero-heading">
        <div className="max-w-5xl mx-auto text-center">
          <h1 id="hero-heading" className="text-5xl md:text-6xl font-serif mb-8">
            Meet Dine Flow:<br />
            Your all-in-one restaurant<br />
            management solution
          </h1>
          <p className="text-xl max-w-3xl mx-auto mb-10">
            Dine Flow is a restaurant management platform that gives your team an AI-powered*, interactive space to streamline operations, manage inventory, and execute your customer-focused strategy.
          </p>
          <div className="flex justify-center">
            <Link href="/select-portal">
              <button
                className="group relative flex items-center bg-gradient-to-r from-yellow-400 to-yellow-300 hover:from-yellow-500 hover:to-yellow-400 text-black font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                aria-label="Try Dine Flow now"
              >
                <span className="mr-2">Get Started</span>
                <span className="text-xl transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Video Demo Section */}
      <section className="w-full py-20 px-4 bg-white" aria-labelledby="demo-heading">
        <div className="max-w-5xl mx-auto">
          <h2 id="demo-heading" className="text-3xl font-bold text-center mb-10 text-blue-600">See Dine Flow in action</h2>
          <figure className="w-full rounded-lg overflow-hidden aspect-video">
            <iframe
              src="https://drive.google.com/file/d/1mWDPXmuKYEWDxxKgkq5tGWDjms3KrfdJ/preview"
              className="w-full h-full border-0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="Dine Flow Demo Video"
              aria-label="Demo video showing Dine Flow features and functionality"
            ></iframe>
            <figcaption className="mt-4 text-gray-600 text-center">Video Demo of Dine Flow</figcaption>
          </figure>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-16 px-4 bg-white" aria-labelledby="features-heading">
        <h2 id="features-heading" className="sr-only">Key Features</h2>
        <div className="max-w-7xl mx-auto">
          <ul className="grid grid-cols-4 gap-4 list-none
           mobile:grid-cols-1 mobile:text-center
            tablet:grid-cols-2 tablet:text-center
          ">
            {/* Feature 1 */}
            <li className="grid_item">
              <article>
                <div className="w-16 h-16 mb-4 bg-green-100 rounded-full flex items-center justify-center
                 mobile:grid mobile:justify-self-center
                 tablet:grid tablet:justify-self-center
                 ">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Increase efficiency</h3>
                <p className="text-gray-700">Speed up daily tasks and improve workflows for better outcomes for your restaurant.</p>
              </article>
            </li>

            {/* Feature 2 */}
            <li className="grid_item">
              <article>
                <div className="w-16 h-16 mb-4 bg-yellow-100 rounded-full flex items-center justify-center
                  mobile:grid mobile:justify-self-center
                  tablet:grid tablet:justify-self-center
                ">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Empower productivity</h3>
                <p className="text-gray-700">Get everyone on the same page to get more done in less time.</p>
              </article>
            </li>

            {/* Feature 3 */}
            <li className="grid_item">
              <article>
                <div className="w-16 h-16 mb-4 bg-purple-100 rounded-full flex items-center justify-center
                  mobile:grid mobile:justify-self-center
                 tablet:grid tablet:justify-self-center
                ">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Get the big picture</h3>
                <p className="text-gray-700">Put all the moving parts of your restaurant in context and say goodbye to silos.</p>
              </article>
            </li>

            {/* Feature 4 */}
            <li className="grid_item">
              <article>
                <div className="w-16 h-16 mb-4 bg-blue-100 rounded-full flex items-center justify-center
                  mobile:grid mobile:justify-self-center
                 tablet:grid tablet:justify-self-center
                ">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Stay safe and sound</h3>
                <p className="text-gray-700">Compliant with regulations to keep your data and employees secure</p>
              </article>
            </li>
          </ul>

          {/* Orange section */}
          <aside className="bg-orange-400 text-white p-8 mt-16 rounded-lg">
            <h2 className="text-3xl font-bold mb-4">Manage your inventory, teams, and menu<br />with our smart solutions</h2>
            <p className="mb-4">Take your team to new heights of collaboration, connection, and creation with<br />our housebuilt AI solutions</p>
          </aside>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 px-4 bg-white border-t border-gray-200" aria-labelledby="cta-heading">
        <div className="max-w-5xl mx-auto text-center">
          <h2 id="cta-heading" className="text-4xl font-bold mb-6 text-gray-800">Experience a better way to work with Dine Flow</h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto text-gray-600">
            Take your restaurant to new heights of collaboration, connection, and efficiency with Dine Flow{`${"'"}`}s integrated platform — available now.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 bg-white text-center">
        <p className="text-gray-600">Dine Flow - Restaurant Management Solution</p>
        <nav aria-label="Footer navigation" className="mt-4">
          {/* Add navigation links here */}
        </nav>
      </footer>
    </main>
  );
};

export default SplashScreen;