"use client";
import Link from 'next/link';
import React from 'react'
import Logo from './logo';
export default function Navbar() {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const href = e.currentTarget.href.split("#")[1];
    window.scrollTo({
        top: document.getElementById(href)?.offsetTop,
        left: 0,
        behavior: "smooth",
    });
};

  return (
    <nav className="fixed top-0 left-30 right-30 z-50 p-4 bg-transparent backdrop-blur-sm bg-opacity-20 border-b border-purple-400/30">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-3xl font-bold">
          <Link href="/"
          className='flex items-center space-x-2'
          area-label="Home">
          <Logo />
          </Link>
        </div>
        <ul className="flex items-center space-x-6">
          <li>
            <Link 
              href="#home"
              onClick={handleScroll} 
              area-label="Home"
              className="text-gray-300 text-2xl hover:text-purple-300 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-purple-400 hover:after:w-full after:transition-all after:duration-300 transition-colors duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              href="#skills" 
              onClick={handleScroll} 
              area-label="Skills"
              className="text-gray-300 text-2xl hover:text-purple-300 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-purple-400 hover:after:w-full after:transition-all after:duration-300 transition-colors duration-300"
            >
              Skills
            </Link>
          </li>
          <li>
            <Link 
              href="#projects" 
              onClick={handleScroll} 
              area-label="Projects"
              className="text-gray-300 text-2xl hover:text-purple-300 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-purple-400 hover:after:w-full after:transition-all after:duration-300 transition-colors duration-300"
            >
              Projects
            </Link>
          </li>
          <li>
            <Link 
              href="#contact" 
              onClick={handleScroll} 
              area-label="Contact"
              className="text-gray-300 text-2xl hover:text-purple-300 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-purple-400 hover:after:w-full after:transition-all after:duration-300 transition-colors duration-300"
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}