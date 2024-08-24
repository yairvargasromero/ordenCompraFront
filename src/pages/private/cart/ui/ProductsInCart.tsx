import { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import { useCartStore } from '../../../../store/cart/cart-store';
import { QuantitySelector } from '../../../../components/product/quantity-selector/QuantitySelector';



export const ProductsInCart = () => {

  const updateProductQuantity = useCartStore( state => state.updateProductQuantity );
  const removeProduct = useCartStore( state => state.removeProduct );

  const [loaded, setLoaded] = useState(false);
  const productsInCart = useCartStore( state => state.cart );


  useEffect(() => {
    setLoaded(true) ;
  });




  if( !loaded ) {
    return <p>Loading...</p>
  }

  return (
    <>
      {productsInCart.map((product) => (
        <div key={ `${ product.slug }-${ product.size }`  } className="flex mb-5">
          <LazyLoadImage
            src={`/products/${product.image }`}
            width={100}
            height={100}
            style={{
              width: "100px",
              height: "100px",
            }}
            alt={product.title}
            className="mr-5 rounded"
          />

          <div>
            <Link 
              className="hover:underline cursor-pointer"
              to={ `/product/${ product.slug } ` }>
              { product.size } - {product.title}
            </Link>
            
            <p>${product.price}</p>
            <QuantitySelector 
              quantity={ product.quantity } 
              onQuantityChanged={ quantity => updateProductQuantity(product, quantity) }
            />

            <button 
              onClick={ () => removeProduct(product) }
              className="underline mt-3">Remover</button>
          </div>
        </div>
      ))}
    </>
  );
};