// Types for calculator functionality

export interface EntryData {
  length: string | number;
  width: string | number;
  sft: number;
  category: string;
}

export interface Entry extends EntryData {
  id: number;
}

export interface SessionData {
  companyName: string;
  graniteType: string;
  unit: 'inches' | 'centimeters';
  entries: Entry[];
  timestamp: string;
}

export interface CalculationResult {
  sft: number;
  category: string;
}