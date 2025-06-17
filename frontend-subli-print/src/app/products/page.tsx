import Grid from "@/components/grid";
import { GridTileImage } from "@/components/grid/tile";
import { products } from "@/lib/images";
import Link from "next/link";

const ProductsShop = () => {
  return (
    <>
      {products.length > 0 ? (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Grid.Item key={product.image} className="animate-fadeIn">
              <Link className="relative inline-block h-full w-full" href="#">
                <GridTileImage
                  alt={product.description}
                  label={{
                    title: product.description,
                    amount: product.price,
                    currencyCode: "UYU",
                  }}
                  src={product.image}
                  fill
                  sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
              </Link>
            </Grid.Item>
          ))}
        </Grid>
      ) : null}
    </>
  );
};

export default ProductsShop;
