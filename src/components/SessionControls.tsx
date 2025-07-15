import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Download, Save, Trash2, History } from 'lucide-react';
import { exportToExcel } from '../utils/export';
import { Entry, SessionData } from '../types/calculator';

interface SessionControlsProps {
  onClearData: () => void;
  onSaveData: () => string;
  onLoadSession: (sessionId: string) => void;
  savedSessions: Record<string, SessionData>;
  currentSessionId: string | null;
  entries: Entry[];
  companyName: string;
}

const SessionControls: React.FC<SessionControlsProps> = ({
  onClearData,
  onSaveData,
  onLoadSession,
  savedSessions,
  currentSessionId,
  entries,
  companyName,
}) => {
  const [showHistory, setShowHistory] = useState(false);
  
  const handleSave = () => {
    // Only save if there's data to save
    if (entries.some(entry => entry.length && entry.width)) {
      const sessionId = onSaveData();
      toast.success('Data saved successfully!');
    } else {
      toast.error('No data to save. Please enter dimensions first.');
    }
  };
  
  const handleExport = () => {
    // Only export if there's data
    if (entries.some(entry => entry.length && entry.width)) {
      const validEntries = entries.filter(entry => entry.length && entry.width);
      const filename = `${companyName || 'Granite'}_SFT_${new Date().toLocaleDateString().replace(/\//g, '-')}`;
      
      exportToExcel(validEntries, filename);
      toast.success('Data exported to Excel!');
    } else {
      toast.error('No data to export. Please enter dimensions first.');
    }
  };
  
  const confirmClear = () => {
    if (window.confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      onClearData();
      toast.info('All data cleared!');
    }
  };
  
  const handleLoadSession = (sessionId: string) => {
    onLoadSession(sessionId);
    setShowHistory(false);
    toast.success('Session data loaded successfully!');
  };
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Session Controls</h2>
      
      <div className="flex flex-wrap gap-4">
        <button
          onClick={handleSave}
          className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
        >
          <Save className="mr-2 h-5 w-5" />
          Save Data
        </button>
        
        <button
          onClick={handleExport}
          className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
        >
          <Download className="mr-2 h-5 w-5" />
          Download CSV
        </button>
        
        <button
          onClick={confirmClear}
          className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
        >
          <Trash2 className="mr-2 h-5 w-5" />
          Clear All Data
        </button>
        
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors"
        >
          <History className="mr-2 h-5 w-5" />
          {showHistory ? 'Hide History' : 'Show History'}
        </button>
      </div>
      
      {showHistory && (
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="text-lg font-medium mb-3 text-gray-700">Session History</h3>
          
          {Object.keys(savedSessions).length === 0 ? (
            <p className="text-gray-500 italic">No saved sessions found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Company
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Granite Type
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Entries
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {Object.entries(savedSessions)
                    .sort(([, a], [, b]) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                    .map(([sessionId, session]) => (
                      <tr key={sessionId} className={currentSessionId === sessionId ? 'bg-blue-50' : ''}>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                          {new Date(session.timestamp).toLocaleString()}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                          {session.companyName || '-'}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                          {session.graniteType || '-'}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                          {session.entries.length}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                          <button
                            onClick={() => handleLoadSession(sessionId)}
                            className="text-blue-600 hover:text-blue-900"
                            disabled={currentSessionId === sessionId}
                          >
                            {currentSessionId === sessionId ? 'Current' : 'Load'}
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SessionControls;