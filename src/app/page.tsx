import Image from "next/image";
import Card from "./components/Card/Card";

export default function Home() {
  return (
    
     <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        <Card
           title="Classic Red Shirt"
               image="https://www.factory54.co.il/dw/image/v2/BFLR_PRD/on/demandware.static/-/Sites-master-catalog/default/dw42d755fe/images/new/870407494/870408704%20870407494_L%20870409143%20870408503%20870409253%20T.JPG?sw=476&sh=714"
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
