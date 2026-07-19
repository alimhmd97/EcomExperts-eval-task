import db from "../../../data/db.json";
import type { CartSelection } from "~/types/catalog";

/**
 * Initial cart that makes the app load matching the design (two cameras plus
 * the pre-populated sensors, accessory, and plan in the review panel). Used
 * only on the very first visit, before anything is saved to localStorage.
 */
export const seedSelections = db.seedSelections as unknown as CartSelection[];
