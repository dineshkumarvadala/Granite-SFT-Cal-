/**
 * Calculate Square Footage (SFT) based on length, width, and unit
 */
export function calculateSFT(length: number, width: number, unit: 'inches' | 'centimeters'): number {
  if (unit === 'inches') {
    return (length * width) / 144;
  } else {
    return (length * width) / 929;
  }
}

/**
 * Categorize slab based on dimensions and unit - local implementation
 */
export function categorizeSlabLocally(length: number, width: number, unit: 'inches' | 'centimeters'): string {
  if (unit === 'inches') {
    // Check PATTILU first (override condition)
    if (width < 22) {
      return "PATTILU";
    }
    
    // Check other categories
    if (length >= 45 && width > 22 && width < 34) {
      return "UNDER SIZE";
    } else if (length <= 44 && width > 22 && width < 34) {
      return "BELOW SIZE";
    } else if (length >= 45 && width > 34) {
      return "90UPS (UNDER SIZE)";
    } else if (length <= 44 && width > 34) {
      return "90UPS (BELOW SIZE)";
    }
  } else {  // centimeters
    // Check PATTILU first (override condition)
    if (width < 55) {
      return "PATTILU";
    }
    
    // Check other categories
    if (length >= 114 && width > 55 && width < 86) {
      return "UNDER SIZE";
    } else if (length <= 111 && width > 55 && width < 86) {
      return "BELOW SIZE";
    } else if (length >= 114 && width > 86) {
      return "90UPS (UNDER SIZE)";
    } else if (length <= 111 && width > 86) {
      return "90UPS (BELOW SIZE)";
    }
  }
  
  // Default category if none match
  return "UNCATEGORIZED";
}