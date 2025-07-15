import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">About Our Project</h1>
      
      <div className="bg-white rounded-lg shadow-md p-8">
        <p className="text-lg leading-relaxed mb-6">
          This website helps users and companies calculate accurate square footage of granite slabs 
          using real-world dimensions, and automatically categorize them for sorting, selling, and inventory. 
        </p>
        
        <p className="text-lg leading-relaxed mb-6">
          It simplifies calculations, tracks historical data, and enhances decision-making 
          in the stone and granite industry.
        </p>
        
        <h2 className="text-2xl font-semibold mt-10 mb-4 text-gray-800">Key Features</h2>
        
        <ul className="list-disc pl-6 space-y-3 text-lg">
          <li>Precise square footage calculation with support for both inches and centimeters</li>
          <li>Automatic categorization based on industry-standard dimensions</li>
          <li>Data persistence to review past calculations</li>
          <li>Export functionality for reporting and analysis</li>
          <li>Efficient data entry with keyboard navigation</li>
          <li>Summary statistics for better inventory management</li>
        </ul>
        
        <h2 className="text-2xl font-semibold mt-10 mb-4 text-gray-800">Who Can Benefit</h2>
        
        <p className="text-lg leading-relaxed">
          Our tool is designed for granite suppliers, fabricators, contractors, and anyone 
          who works with dimensional stone products. By streamlining the calculation and 
          categorization process, we help businesses improve efficiency and reduce errors 
          in their day-to-day operations.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;