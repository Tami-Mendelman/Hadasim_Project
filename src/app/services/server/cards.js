import { getDb } from "./mongo";


export async function fetchCards() {
  const db = await getDb();
  return db.collection("shop").find({}).toArray();
}
