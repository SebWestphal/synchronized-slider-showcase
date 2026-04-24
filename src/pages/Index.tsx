import { useState } from "react";
import ProductGallery from "@/components/ProductGallery";
import ProductInfo from "@/components/ProductInfo";
import { Button } from "@/components/ui/button";

const IMAGE_SETS: Record<"one" | "two" | "many", string[]> = {
  one: ["https://picsum.photos/seed/prod-a-1/900/900"],
  two: [
    "https://picsum.photos/seed/prod-b-1/900/900",
    "https://picsum.photos/seed/prod-b-2/900/900",
  ],
  many: [
    "https://picsum.photos/seed/prod-c-1/900/900",
    "https://picsum.photos/seed/prod-c-2/900/900",
    "https://picsum.photos/seed/prod-c-3/900/900",
    "https://picsum.photos/seed/prod-c-4/900/900",
    "https://picsum.photos/seed/prod-c-5/900/900",
  ],
};

const Index = () => {
  const [state, setState] = useState<"one" | "two" | "many">("many");

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-10">
        <header className="mb-8 space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">Synchronized Product Gallery</h1>
          <p className="text-sm text-muted-foreground">
            Toggle the demo state to see how the gallery adapts to 1, 2, or many images.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            <Button
              variant={state === "one" ? "default" : "outline"}
              size="sm"
              onClick={() => setState("one")}
            >
              1 image
            </Button>
            <Button
              variant={state === "two" ? "default" : "outline"}
              size="sm"
              onClick={() => setState("two")}
            >
              2 images
            </Button>
            <Button
              variant={state === "many" ? "default" : "outline"}
              size="sm"
              onClick={() => setState("many")}
            >
              5 images
            </Button>
          </div>
        </header>

        <section className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)]">
          <ProductGallery images={IMAGE_SETS[state]} />
          <ProductInfo />
        </section>
      </div>
    </main>
  );
};

export default Index;
