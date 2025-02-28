'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();
  
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0 font-bold text-xl">
            <Link href="/" className="hover:text-blue-200 transition-colors">
              Morality-AI-Web
            </Link>
          </div>
          
          {/* Navigation Links */}
          <div className="flex space-x-4">
            <Link 
              href="/" 
              className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors ${
                pathname === '/' ? 'bg-blue-700' : ''
              }`}
            >
              Simulation
            </Link>
            <Link 
              href="/dashboard" 
              className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors ${
                pathname === '/dashboard' ? 'bg-blue-700' : ''
              }`}
            >
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 