
import { IProductoMostrar } from '../../../interfaces/orden_compra.interface';
import { ProductGridItem } from './ProductGridItem';

interface Props {
  productos: IProductoMostrar[];
}


export const ProductGrid = ( { productos }: Props ) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 mb-10 mt-10 px-10 h-full">
      {
        productos.map( product => (
          <ProductGridItem
            key={ product.cod_producto }
            producto={ product }
          />
        ) )
      }

    </div>
  );
};