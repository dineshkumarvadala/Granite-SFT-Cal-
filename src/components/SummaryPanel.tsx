import React from 'react';
import { Entry } from '../types/calculator';

interface SummaryPanelProps {
  entries: Entry[];
}

const SummaryPanel: React.FC<SummaryPanelProps> = ({ entries }) => {
  // Filter out entries without category
  const validEntries = entries.filter(entry => entry.category);
  
  // Get all unique categories
  const categories = [...new Set(validEntries.map(entry => entry.category))];
  
  // Calculate summary statistics
  const summary = categories.map(category => {
    const categoryEntries = validEntries.filter(entry => entry.category === category);
    const totalSFT = categoryEntries.reduce((sum, entry) => sum + entry.sft, 0);
    
    return {
      category,
      count: categoryEntries.length,
      totalSFT,
    };
  });
  
  // Calculate grand totals
  const totalEntries = validEntries.length;
  const totalSFT = validEntries.reduce((sum, entry) => sum + entry.sft, 0);
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Summary</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium mb-2 text-gray-700">By Category</h3>
          
          {categories.length === 0 ? (
            <p className="text-gray-500 italic">No data to summarize yet.</p>
          ) : (
            <div className="bg-gray-50 p-4 rounded-md">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Count
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total SFT
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {summary.map((item) => (
                    <tr key={item.category}>
                      <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.category}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                        {item.count}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                        {item.totalSFT.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-2 text-gray-700">Total Summary</h3>
          
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700">Total Entries:</span>
              <span className="font-medium text-gray-900">{totalEntries}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Total Square Footage:</span>
              <span className="font-bold text-xl text-blue-600">{totalSFT.toFixed(2)} SFT</span>
            </div>
          </div>
          
          <div className="mt-6 bg-blue-50 p-4 rounded-md border-l-4 border-blue-500">
            <p className="text-blue-700">
              <span className="font-medium">Note:</span> The summary panel automatically updates as you add or modify entries.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryPanel;