import React from 'react';

interface CalculatorFormProps {
  companyName: string;
  setCompanyName: (name: string) => void;
  graniteType: string;
  setGraniteType: (type: string) => void;
  unit: 'inches' | 'centimeters';
  setUnit: (unit: 'inches' | 'centimeters') => void;
  rowCount: number;
  setRowCount: (count: number) => void;
}

const CalculatorForm: React.FC<CalculatorFormProps> = ({
  companyName,
  setCompanyName,
  graniteType,
  setGraniteType,
  unit,
  setUnit,
  rowCount,
  setRowCount,
}) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Input Details</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
            Company Name
          </label>
          <input
            type="text"
            id="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter company name"
          />
        </div>
        
        <div>
          <label htmlFor="graniteType" className="block text-sm font-medium text-gray-700 mb-1">
            Type of Granite
          </label>
          <input
            type="text"
            id="graniteType"
            value={graniteType}
            onChange={(e) => setGraniteType(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter granite type"
          />
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row md:items-center mb-8">
        <div className="mb-4 md:mb-0 md:mr-8">
          <span className="block text-sm font-medium text-gray-700 mb-2">Measurement Unit</span>
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-blue-600 h-5 w-5"
                checked={unit === 'inches'}
                onChange={() => setUnit('inches')}
              />
              <span className="ml-2 text-gray-700">Inches</span>
            </label>
            
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-blue-600 h-5 w-5"
                checked={unit === 'centimeters'}
                onChange={() => setUnit('centimeters')}
              />
              <span className="ml-2 text-gray-700">Centimeters</span>
            </label>
          </div>
        </div>
        
        <div className="md:ml-auto">
          <label htmlFor="rowCount" className="block text-sm font-medium text-gray-700 mb-1">
            How many rows do you want to enter?
          </label>
          <input
            type="number"
            id="rowCount"
            min="1"
            max="100"
            value={rowCount}
            onChange={(e) => setRowCount(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-full md:w-32 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default CalculatorForm;