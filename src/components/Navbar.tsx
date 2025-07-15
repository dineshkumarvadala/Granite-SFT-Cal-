import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Calculator, Info, Mail, LogIn } from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItemClass = (path: string) => `
    relative px-4 py-2 text-lg transition-all duration-300
    ${isActive(path) 
      ? 'text-blue-600 font-semibold' 
      : 'text-gray-700 hover:text-blue-500'}
    before:content-['']
    before:absolute
    before:bottom-0
    before:left-0
    before:w-full
    before:h-0.5
    before:bg-blue-600
    before:transform
    before:scale-x-0
    before:transition-transform
    before:duration-300
    hover:before:scale-x-100
    ${isActive(path) ? 'before:scale-x-100' : ''}
  `;

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link 
            to="/" 
            className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-300"
          >
            Granite SFT Calculator
          </Link>
          
          {/* Mobile menu button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 hover:text-blue-600 transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={navItemClass('/')}>
              <span className="flex items-center space-x-2">
                <Home size={20} />
                <span>Home</span>
              </span>
            </Link>
            <Link to="/calculator" className={navItemClass('/calculator')}>
              <span className="flex items-center space-x-2">
                <Calculator size={20} />
                <span>Calculator</span>
              </span>
            </Link>
            <Link to="/about" className={navItemClass('/about')}>
              <span className="flex items-center space-x-2">
                <Info size={20} />
                <span>About</span>
              </span>
            </Link>
            <Link to="/contact" className={navItemClass('/contact')}>
              <span className="flex items-center space-x-2">
                <Mail size={20} />
                <span>Contact</span>
              </span>
            </Link>
            <button className="
              bg-blue-600 
              hover:bg-blue-700 
              text-white 
              px-6 
              py-2 
              rounded-full
              font-medium
              transform
              transition-all
              duration-300
              hover:scale-105
              hover:shadow-lg
              active:scale-95
              flex
              items-center
              space-x-2
            ">
              <LogIn size={20} />
              <span>Login</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`
          md:hidden 
          overflow-hidden 
          transition-all 
          duration-300 
          ease-in-out
          ${isOpen ? 'max-h-64 opacity-100 mt-4' : 'max-h-0 opacity-0'}
        `}>
          <div className="flex flex-col space-y-4 py-4">
            <Link 
              to="/" 
              className={`${navItemClass('/')} block`}
              onClick={() => setIsOpen(false)}
            >
              <span className="flex items-center space-x-2">
                <Home size={20} />
                <span>Home</span>
              </span>
            </Link>
            <Link 
              to="/calculator" 
              className={`${navItemClass('/calculator')} block`}
              onClick={() => setIsOpen(false)}
            >
              <span className="flex items-center space-x-2">
                <Calculator size={20} />
                <span>Calculator</span>
              </span>
            </Link>
            <Link 
              to="/about" 
              className={`${navItemClass('/about')} block`}
              onClick={() => setIsOpen(false)}
            >
              <span className="flex items-center space-x-2">
                <Info size={20} />
                <span>About</span>
              </span>
            </Link>
            <Link 
              to="/contact" 
              className={`${navItemClass('/contact')} block`}
              onClick={() => setIsOpen(false)}
            >
              <span className="flex items-center space-x-2">
                <Mail size={20} />
                <span>Contact</span>
              </span>
            </Link>
            <button className="
              bg-blue-600 
              hover:bg-blue-700 
              text-white 
              px-6 
              py-2 
              rounded-full
              font-medium
              transform
              transition-all
              duration-300
              hover:scale-105
              hover:shadow-lg
              active:scale-95
              w-full
              flex
              items-center
              justify-center
              space-x-2
            ">
              <LogIn size={20} />
              <span>Login</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;