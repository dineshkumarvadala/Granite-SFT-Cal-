import * as XLSX from 'xlsx';
import { Entry } from '../types/calculator';

/**
 * Export entries to Excel/CSV file
 */
export function exportToExcel(entries: Entry[], filename: string = 'granite_sft_data'): void {
  // Create worksheet
  const worksheet = XLSX.utils.json_to_sheet(
    entries.map((entry) => ({
      'S.No': entry.id,
      'Length': entry.length,
      'Width': entry.width,
      'SFT': entry.sft,
      'Category': entry.category,
    }))
  );
  
  // Create workbook
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'SFT Data');
  
  // Generate Excel file
  XLSX.writeFile(workbook, `${filename}.xlsx`);
}