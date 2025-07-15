import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calculator } from 'lucide-react';

const HomePage: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax */}
        <div 
          className="absolute inset-0 bg-black bg-opacity-50 z-0"
          style={{
            backgroundImage: 'url("https://images.pexels.com/photos/2341290/pexels-photo-2341290.jpeg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundBlendMode: 'overlay',
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        />
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 
            className="text-5xl md:text-7xl font-bold text-white mb-6 
                       opacity-0 animate-[fadeIn_0.8s_ease-out_0.2s_forwards]
                       drop-shadow-lg"
          >
            Let's Find SFT
          </h1>
          
          <p 
            className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto mb-12
                       opacity-0 animate-[fadeIn_0.8s_ease-out_0.4s_forwards]
                       leading-relaxed"
          >
            Calculate square footage for granite slabs with precision, 
            categorize them automatically, and manage your inventory efficiently.
          </p>
          
          <Link 
            to="/calculator" 
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 
                       text-white font-bold py-4 px-8 rounded-full text-lg
                       transition-all duration-300 transform hover:scale-105
                       shadow-lg hover:shadow-xl active:scale-95
                       opacity-0 animate-[fadeIn_0.8s_ease-out_0.6s_forwards]"
          >
            <Calculator className="mr-2" size={24} />
            Start Now
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className="text-center p-6 rounded-xl bg-gray-50 shadow-md
                          transform transition-all duration-300 hover:-translate-y-2
                          opacity-0 animate-[fadeIn_0.8s_ease-out_forwards]"
                style={{ animationDelay: `${0.8 + index * 0.2}s` }}
              >
                <div className="text-blue-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const features = [
  {
    icon: <Calculator size={32} />,
    title: "Precise Calculations",
    description: "Get accurate square footage measurements for your granite slabs with our advanced calculator."
  },
  {
    icon: <Calculator size={32} />,
    title: "Auto Categorization",
    description: "Automatically categorize slabs based on dimensions for efficient inventory management."
  },
  {
    icon: <Calculator size={32} />,
    title: "Data Management",
    description: "Save, export, and manage your calculations with our intuitive interface."
  }
];

export default HomePage;