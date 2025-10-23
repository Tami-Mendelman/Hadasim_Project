"use client";
import { useEffect, useState } from "react";
import { fetchCardsClient } from "./services/client/cards";
import Card from "./components/Card/Card";

type CardItem = {
  _id?: string;
  title?: string;
  name?: string;
  description?: string;
  price?: number | string;
  image?: string;
};

export default function HomePage() {
  const [cards, setCards] = useState<CardItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await fetchCardsClient();
        if (!cancelled) setCards(Array.isArray(data) ? data : []);
      } catch (e: any) {
        if (!cancelled) setError(e?.message || "שגיאה בטעינת נתונים");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  if (loading) return <div>טוען…</div>;
  if (error)   return <div>שגיאה: {error}</div>;

  return (
    <main style={{ padding: 16 }}>
      <h1>עמוד הבית</h1>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
        gap: 16
      }}>
        {cards.map((c) => {
          const title = c.title ?? c.name ?? "ללא כותרת";
          const description = c.description ?? "";
          const price = typeof c.price === "string" ? Number(c.price) : (c.price ?? 0);
          const image = c.image ?? "/images/placeholder.png";
          return (
            <Card
              key={String(c._id ?? title)}
              title={title}
              description={description}
              price={price}
              image={image}
            />
          );
        })}
      </div>
    </main>
  );
}







// "use client";

// export const runtime = "nodejs";
// export const dynamic = "force-dynamic";
// import Card from "./components/Card/Card";

// export default async function Home() {
//   // const res = await fetch("http://localhost:3000/api/cards", { cache: "no-store" });
//   const base = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";
// const res = await fetch(`${base}/api/cards`, { cache: "no-store" });
//   if (!res.ok) {
//     return (
//       <div className="home-error">
//         <h2>Failed to load products</h2>
//       </div>
//     );
//   }

//   const cards = await res.json();

//   if (!cards.length) {
//     return (
//       <div className="home-empty">
//         <h2>No products found in MongoDB</h2>
//         <p>Add some items to the 'cards' collection.</p>
//       </div>
//     );
//   }

//   return (
//     <section className="page-content">
//       <h1 className="home-title">Women's T-Shirts</h1>
//       <div className="home-container">
//         {cards.map((p: any) => (
//           <Card
//             key={p._id?.toString?.() ?? p.id ?? p.title}
//             title={p.title ?? "Untitled"}
//             image={p.image ?? "/images/placeholder.webp"}
//             price={p.price ?? 0}
//             description={p.description ?? ""}
//           />
//         ))}
//       </div>
//     </section>
//   );
// }