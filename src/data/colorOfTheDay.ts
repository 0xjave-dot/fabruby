// Curated two-week rotation. Edit this list by hand every couple of
// weeks — that's the entire maintenance cost of this feature.

export interface ColorEntry {
  color: string;
  hex: string;
  productIds: string[];
}

export const colorOfTheDaySchedule: ColorEntry[] = [
  { color: "Blush Pink",      hex: "#ff5790", productIds: ["dr-001", "dr-014", "tp-002", "tp-009", "dr-021", "tp-015"] },
  { color: "Sage Green",      hex: "#7a9b76", productIds: ["dr-003", "tp-004", "dr-010", "tp-011", "dr-018", "tp-020"] },
  { color: "Electric Blue",   hex: "#004cff", productIds: ["dr-005", "tp-006", "dr-012", "tp-013", "dr-019", "tp-022"] },
  { color: "Midnight Black",  hex: "#202020", productIds: ["dr-002", "tp-007", "dr-015", "tp-012", "dr-023", "tp-017"] },
  { color: "Sunflower Yellow",hex: "#ffd54f", productIds: ["dr-004", "tp-003", "dr-011", "tp-014", "dr-022", "tp-019"] },
  { color: "Coral Red",       hex: "#ff5252", productIds: ["dr-006", "tp-008", "dr-013", "tp-016", "dr-025", "tp-021"] },
  { color: "Soft Lilac",      hex: "#ba68c8", productIds: ["dr-007", "tp-001", "dr-016", "tp-010", "dr-024", "tp-018"] },
  { color: "Blush Pink",      hex: "#ff5790", productIds: ["dr-001", "dr-014", "tp-002", "tp-009", "dr-021", "tp-015"] },
  { color: "Sage Green",      hex: "#7a9b76", productIds: ["dr-003", "tp-004", "dr-010", "tp-011", "dr-018", "tp-020"] },
  { color: "Electric Blue",   hex: "#004cff", productIds: ["dr-005", "tp-006", "dr-012", "tp-013", "dr-019", "tp-022"] },
  { color: "Midnight Black",  hex: "#202020", productIds: ["dr-002", "tp-007", "dr-015", "tp-012", "dr-023", "tp-017"] },
  { color: "Sunflower Yellow",hex: "#ffd54f", productIds: ["dr-004", "tp-003", "dr-011", "tp-014", "dr-022", "tp-019"] },
  { color: "Coral Red",       hex: "#ff5252", productIds: ["dr-006", "tp-008", "dr-013", "tp-016", "dr-025", "tp-021"] },
  { color: "Soft Lilac",      hex: "#ba68c8", productIds: ["dr-007", "tp-001", "dr-016", "tp-010", "dr-024", "tp-018"] }
];

// Stable for a given UTC calendar day; loops automatically once the
// schedule is exhausted, no date math to maintain beyond the list itself.
export function getTodaysColorEntry(date = new Date()): ColorEntry {
  const dayNumber = Math.floor(date.getTime() / 86_400_000);
  return colorOfTheDaySchedule[dayNumber % colorOfTheDaySchedule.length];
}
