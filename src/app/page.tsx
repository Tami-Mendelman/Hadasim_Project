import Image from "next/image";
import Card from "./components/Card/Card";

export default function Home() {
  return (
    
     <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        <Card
           title="Classic Red Shirt"
          image="/Images/shirt1.webp"
          price={45}
            description="A stylish red button-up shirt made from soft cotton. Perfect for both casual and office wear."
        />
        <Card
        title="Soft Gray Tee"
          image="/images/shirt2.webp"
          price={90}
                    description="A comfortable gray t-shirt with a modern cut and soft fabric for everyday comfort."
        />
        <Card
          title="Sporty Blue Tank"
          image="/images/shirt3.webp"
          price={100}
            description="A breathable blue tank top for workouts or hot summer days. Lightweight and flexible."
        />
      </div>
  );
}
