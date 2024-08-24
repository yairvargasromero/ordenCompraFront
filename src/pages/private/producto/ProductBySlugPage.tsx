
import { ProductMobileSlideshow } from '../../../components/product/slideshow/ProductMobileSlideshow';
import { ProductSlideshow } from '../../../components/product/slideshow/ProductSlideshow';
import { StockLabel } from '../../../components/product/stock-label/StockLabel';
import { Product } from '../../../interfaces/cart.interface';
import { AddToCart } from './ui/AddToCart';
import { useParams } from "react-router-dom";



export const  ProductBySlugPage = () => {

  const { codProducto } = useParams<{ codProducto: string }>();

  const product: Product = {
    title: 'TEst',
    description: 'TEs',
    images: [''],
    id: '1',
    inStock: 3,
    price: 123512,
    sizes: ['L'],
    slug: '12654',
    tags: ['Prueba'],
    gender: 'men'

  }
  console.log(product);

  if (!product) {
    // notFound();
  }

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
      {/* Slideshow */}
      <div className="col-span-1 md:col-span-2 ">
        {/* Mobile Slideshow */}
        <ProductMobileSlideshow
          title={product.title}
          images={product.images}
          className="block md:hidden"
        />

        {/* Desktop Slideshow */}
        <ProductSlideshow
          title={product.title}
          images={product.images}
          className="hidden md:block"
        />
      </div>

      {/* Detalles */}
      <div className="col-span-1 px-5">
        <StockLabel slug={product.slug} />

        <h1 className={`antialiased font-bold text-xl`}>
          {product.title}
        </h1>

        <p className="text-lg mb-5">${product.price}</p>

        <AddToCart product={product} />

        {/* Descripción */}
        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}