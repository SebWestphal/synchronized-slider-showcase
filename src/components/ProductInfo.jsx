import { Button } from "@/components/ui/button";







const ProductInfo = ({
  title = "Premium Product Name",
  description = "A short, compelling description of the product. Highlights the main benefits and key features so customers understand the value at a glance.",
  price = "$129.00"
}) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">{title}</h1>
        <p className="text-2xl font-medium text-primary">{price}</p>
      </div>

      <p className="text-base leading-relaxed text-muted-foreground">{description}</p>

      <ul className="space-y-2 text-sm text-muted-foreground">
        <li>• Free shipping on orders over $50</li>
        <li>• 30-day return policy</li>
        <li>• 2-year warranty included</li>
      </ul>

      <Button size="lg" className="w-full sm:w-auto">
        Add to cart
      </Button>
    </div>);

};

export default ProductInfo;