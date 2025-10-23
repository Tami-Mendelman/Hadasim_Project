// src/app/components/CardsList.tsx
"use client";

import { useEffect, useState } from "react";
import { fetchCardsClient } from "../services/client/cards";
import Card from "./Card/Card";

type CardItem = {
  _id?: { toString?: () => string } | string;
  id?: string | number;
  title?: string;
  image?: string;
  price?: number;
  description?: string;
};

export default function CardsList() {
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
        if (!cancelled) setError(e?.message || "Failed to load products");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  if (loading) {
    return (
      <div className="home-empty">
        <h2>Loading…</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home-error">
        <h2>Failed to load products</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!cards.length) {
    return (
      <div className="home-empty">
        <h2>No products found in MongoDB</h2>
        <p>Add some items to the 'cards' collection.</p>
      </div>
    );
  }

  return (
    <div className="home-container">
      {cards.map((p) => (
        <Card
          key={
            (typeof p._id === "object" && p._id?.toString?.()) ||
            (typeof p._id === "string" ? p._id : undefined) ||
            p.id ||
            p.title ||
            Math.random().toString(36)
          }
          title={p.title ?? "Untitled"}
          image={p.image ?? "/images/placeholder.webp"}
          price={p.price ?? 0}
          description={p.description ?? ""}
        />
      ))}
    </div>
  );
}
