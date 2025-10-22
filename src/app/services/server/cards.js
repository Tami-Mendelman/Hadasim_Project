// src/app/services/server/cards.js
import { getDb } from "./mongo";

export async function fetchCards() {
  const db = await getDb();
  // לפי המבנה אצלך: collection נקרא 'shop'
  return db.collection("shop").find({}).toArray();
}
