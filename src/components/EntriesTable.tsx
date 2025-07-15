import React, { useRef, useEffect } from 'react';
import { calculateSFT, categorizeSlabLocally } from '../utils/calculator';
import { Entry, EntryData } from '../types/calculator';
import { AlertCircle } from 'lucide-react';

interface EntriesTableProps {
  entries: Entry[];
  updateEntry: (id: number, data: Partial<EntryData>) => void;
  deleteEntry: (id: number) => void;
  unit: 'inches' | 'centimeters';
}

const EntriesTable: React.FC<EntriesTableProps> = ({
  entries,
  updateEntry,
  deleteEntry,
  unit,
}) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Handle dimension input change
  const handleDimensionChange = (
    id: number,
    field: 'length' | 'width',
    value: string
  ) => {
    // Allow empty string or numeric values
    if (value === '' || !isNaN(Number(value))) {
      const numValue = value === '' ? '' : value;
      updateEntry(id, { [field]: numValue });

      // If both length and width have values, calculate SFT and category
      const entry = entries.find((e) => e.id === id);
      if (entry) {
        const otherField = field === 'length' ? 'width' : 'length';
        const otherValue = entry[otherField];
        
        if (numValue !== '' && otherValue !== '') {
          const length = field === 'length' ? Number(numValue) : Number(otherValue);
          const width = field === 'width' ? Number(numValue) : Number(otherValue);
          
          const sft = calculateSFT(length, width, unit);
          const category = categorizeSlabLocally(length, width, unit);
          
          updateEntry(id, { sft, category });
        }
      }
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    rowIndex: number,
    colIndex: number
  ) => {
    // Define max column (0-based index)
    const maxCol = 1; // length and width columns only
    
    if (e.key === 'Enter' || e.key === 'ArrowRight') {
      e.preventDefault();
      
      // Move to next column or next row
      if (colIndex < maxCol) {
        // Move to next column in same row
        inputRefs.current[(rowIndex * 2) + colIndex + 1]?.focus();
      } else if (rowIndex < entries.length - 1) {
        // Move to first column in next row
        inputRefs.current[((rowIndex + 1) * 2)]?.focus();
      }
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      
      // Move to previous column or previous row
      if (colIndex > 0) {
        // Move to previous column in same row
        inputRefs.current[(rowIndex * 2) + colIndex - 1]?.focus();
      } else if (rowIndex > 0) {
        // Move to last column in previous row
        inputRefs.current[((rowIndex - 1) * 2) + maxCol]?.focus();
      }
    } else if (e.key === 'ArrowUp' && rowIndex > 0) {
      e.preventDefault();
      // Move to same column in previous row
      inputRefs.current[((rowIndex - 1) * 2) + colIndex]?.focus();
    } else if (e.key === 'ArrowDown' && rowIndex < entries.length - 1) {
      e.preventDefault();
      // Move to same column in next row
      inputRefs.current[((rowIndex + 1) * 2) + colIndex]?.focus();
    }
  };

  // Check if a dimension value needs a warning
  const needsWarning = (value: string | number) => {
    if (value === '') return false;
    
    const numValue = Number(value);
    return numValue >= 1 && numValue <= 9 || numValue >= 100 && numValue <= 999;
  };

  // Update refs when entries change
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, entries.length * 2);
  }, [entries]);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              S.No
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Length ({unit === 'inches' ? 'in' : 'cm'})
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Width ({unit === 'inches' ? 'in' : 'cm'})
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              SFT
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {entries.map((entry, rowIndex) => (
            <tr key={entry.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {entry.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="relative">
                  <input
                    ref={(el) => (inputRefs.current[rowIndex * 2] = el)}
                    type="number"
                    value={entry.length}
                    onChange={(e) => handleDimensionChange(entry.id, 'length', e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, rowIndex, 0)}
                    className={`w-20 px-2 py-1 border ${
                      needsWarning(entry.length) ? 'border-red-500' : 'border-gray-300'
                    } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  />
                  {needsWarning(entry.length) && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 mr-[-25px]">
                      <AlertCircle className="h-4 w-4 text-red-500" />
                    </div>
                  )}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="relative">
                  <input
                    ref={(el) => (inputRefs.current[rowIndex * 2 + 1] = el)}
                    type="number"
                    value={entry.width}
                    onChange={(e) => handleDimensionChange(entry.id, 'width', e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, rowIndex, 1)}
                    className={`w-20 px-2 py-1 border ${
                      needsWarning(entry.width) ? 'border-red-500' : 'border-gray-300'
                    } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  />
                  {needsWarning(entry.width) && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 mr-[-25px]">
                      <AlertCircle className="h-4 w-4 text-red-500" />
                    </div>
                  )}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                {entry.sft ? entry.sft.toFixed(2) : ''}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(entry.category)}`}>
                  {entry.category || '-'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <button
                  onClick={() => deleteEntry(entry.id)}
                  className="text-red-600 hover:text-red-900 focus:outline-none"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Helper function to get category color
function getCategoryColor(category: string): string {
  switch (category) {
    case 'UNDER SIZE':
      return 'bg-blue-100 text-blue-800';
    case 'BELOW SIZE':
      return 'bg-green-100 text-green-800';
    case '90UPS (UNDER SIZE)':
      return 'bg-purple-100 text-purple-800';
    case '90UPS (BELOW SIZE)':
      return 'bg-indigo-100 text-indigo-800';
    case 'PATTILU':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

export default EntriesTable;