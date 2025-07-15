import React, { useState, useEffect } from 'react';
import CalculatorForm from '../components/CalculatorForm';
import EntriesTable from '../components/EntriesTable';
import SummaryPanel from '../components/SummaryPanel';
import SessionControls from '../components/SessionControls';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Entry, EntryData, SessionData } from '../types/calculator';

const CalculatorPage: React.FC = () => {
  const [companyName, setCompanyName] = useState('');
  const [graniteType, setGraniteType] = useState('');
  const [unit, setUnit] = useState<'inches' | 'centimeters'>('inches');
  const [rowCount, setRowCount] = useState(5);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [savedSessions, setSavedSessions] = useLocalStorage<Record<string, SessionData>>('granite-sft-sessions', {});

  useEffect(() => {
    if (entries.length < rowCount) {
      const newEntries = [...entries];
      for (let i = entries.length; i < rowCount; i++) {
        newEntries.push({
          id: i + 1,
          length: '',
          width: '',
          sft: 0,
          category: '',
        });
      }
      setEntries(newEntries);
    } else if (entries.length > rowCount) {
      setEntries(entries.slice(0, rowCount));
    }
  }, [rowCount]);

  const updateEntry = (id: number, data: Partial<EntryData>) => {
    setEntries((prevEntries) =>
      prevEntries.map((entry) =>
        entry.id === id ? { ...entry, ...data } : entry
      )
    );
  };

  const deleteEntry = (id: number) => {
    setEntries((prevEntries) => {
      const filtered = prevEntries.filter((entry) => entry.id !== id);
      return filtered.map((entry, index) => ({
        ...entry,
        id: index + 1,
      }));
    });
    setRowCount((prev) => prev - 1);
  };

  const clearAllData = () => {
    setCompanyName('');
    setGraniteType('');
    setUnit('inches');
    setRowCount(5);
    setEntries([]);
    setCurrentSessionId(null);
  };

  const saveSession = () => {
    const sessionId = currentSessionId || new Date().getTime().toString();
    const sessionData: SessionData = {
      companyName,
      graniteType,
      unit,
      entries: entries.filter((entry) => entry.length && entry.width),
      timestamp: new Date().toISOString(),
    };

    setSavedSessions((prev) => ({
      ...prev,
      [sessionId]: sessionData,
    }));

    setCurrentSessionId(sessionId);
    return sessionId;
  };

  const loadSession = (sessionId: string) => {
    const session = savedSessions[sessionId];
    if (session) {
      setCompanyName(session.companyName || '');
      setGraniteType(session.graniteType || '');
      setUnit(session.unit || 'inches');
      setEntries(session.entries || []);
      setRowCount(session.entries.length || 5);
      setCurrentSessionId(sessionId);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800 animate-fadeIn">
        Granite Square Footage Calculator
      </h1>

      <div className="grid gap-8 animate-fadeIn">
        <div className="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:shadow-xl">
          <CalculatorForm
            companyName={companyName}
            setCompanyName={setCompanyName}
            graniteType={graniteType}
            setGraniteType={setGraniteType}
            unit={unit}
            setUnit={setUnit}
            rowCount={rowCount}
            setRowCount={setRowCount}
          />
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:shadow-xl overflow-hidden">
          <EntriesTable
            entries={entries}
            updateEntry={updateEntry}
            deleteEntry={deleteEntry}
            unit={unit}
          />
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:shadow-xl">
          <SummaryPanel entries={entries} />
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:shadow-xl">
          <SessionControls
            onClearData={clearAllData}
            onSaveData={saveSession}
            onLoadSession={loadSession}
            savedSessions={savedSessions}
            currentSessionId={currentSessionId}
            entries={entries}
            companyName={companyName}
          />
        </div>
      </div>
    </div>
  );
};

export default CalculatorPage;