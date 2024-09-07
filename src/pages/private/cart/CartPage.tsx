
import { ProductsInCart } from './ui/ProductsInCart';
import { OrderSummary } from './ui/OrderSummary';
import { Link } from 'react-router-dom';
import { Title } from '../../../components/title/Title';
import { ControlCategorias } from './ui/ControlCategorias';
import { Button } from '@mui/material';
import { useCartStore } from '../../../store/cart/cart-store';

export const CartPage = () => {
  const categoriasSeleccionada = useCartStore(state => state.categoriasSeleccionada);

  const verificarCantidad = () => {
    let verificacion = false
    if (categoriasSeleccionada && Object.keys(categoriasSeleccionada).length > 0) {
      console.log(Object.keys(categoriasSeleccionada))
      for (const key of Object.keys(categoriasSeleccionada)) {
        let categoria = categoriasSeleccionada[key]
        if (categoria.cantidadMaxima !== categoria.cantidadSeleccionada) {
          verificacion = true
          break
        }
      }
    }
    return verificacion
  }

  return (

    <div className="grid grid-cols-[20%_1fr]">
      <ControlCategorias />

      <div className="flex justify-center items-center mb-72 px-10 sm:px-0">

        <div className="flex flex-col w-[1000px]">

          <Title title='Carrito' />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

            {/* Carrito */}
            <div className="flex flex-col mt-5">
              <span className="text-xl">Agregar más items</span>
              <Link to="/ordenes-compra" className="underline mb-5">
                Continúa comprando
              </Link>

              {/* Items */}
              <ProductsInCart />

            </div>


            {/* Checkout - Resumen de orden */}
            <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
              <h2 className="text-2xl mb-2">Resumen de orden</h2>

              <OrderSummary />

              <div className="mt-5 mb-2 w-full">
                <Button variant='contained' disabled={verificarCantidad()}>Crear Solicitud de dotación </Button>
              </div>


            </div>



          </div>



        </div>


      </div>
    </div>
  );
}