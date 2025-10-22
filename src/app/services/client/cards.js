
export async function fetchCardsClient() {
  const res = await fetch("/api/cards", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch cards");
  return res.json();
}
