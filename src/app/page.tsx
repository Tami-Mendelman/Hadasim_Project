export const runtime = "nodejs";
import Card from "./components/Card/Card";
export default async function Home() {
  const res = await fetch("http://localhost:3000/api/cards", { cache: "no-store" });
  if (!res.ok) {
    return (
      <div className="home-error">
        <h2>Failed to load products</h2>
      </div>
    );
  }

  const cards = await res.json();

  if (!cards.length) {
    return (
      <div className="home-empty">
        <h2>No products found in MongoDB</h2>
        <p>Add some items to the 'cards' collection.</p>
      </div>
    );
  }

  return (
    <section className="page-content">
      <h1 className="home-title">Women's T-Shirts</h1>
      <div className="home-container">
        {cards.map((p: any) => (
          <Card
            key={p._id?.toString?.() ?? p.id ?? p.title}
            title={p.title ?? "Untitled"}
            image={p.image ?? "/images/placeholder.webp"}
            price={p.price ?? 0}
            description={p.description ?? ""}
          />
        ))}
      </div>
    </section>
  );
}
