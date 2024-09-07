import { useEffect, useState } from "react";
import { ProductGrid } from "../../../components/products/product-grid/ProductGrid";
import { ICategoriaUsuario, IProductoMostrar } from "../../../interfaces/orden_compra.interface";
import { useUserStore } from "../../../store/user/user";
import { obtenerProductosUsuario } from "../../../actions/orden_compra/orden_compra";
import Swal from "sweetalert2";
import { useCartStore } from "../../../store/cart/cart-store";
import { ControlCategorias } from "../cart/ui/ControlCategorias";

export const OrdenesCompraPage = () => {
    const [productos, setProductos] = useState<IProductoMostrar[]>([])
    const setCategorias = useCartStore( state => state.setCategorias );
    
    const session = useUserStore(state => state.user);

    useEffect(() => {
      if(session?.cod_usuario){
        cargarProductosUSuario()
      }
      
    }, [session])
    
    const cargarProductosUSuario = async  () => {
      try {

        let productosUsuario = await obtenerProductosUsuario(session?.cod_usuario || 0)
        if(productosUsuario && productosUsuario.error === 0){
          setProductos(productosUsuario.productos)
          setCategorias(productosUsuario.categorias)
        }else{
          Swal.fire({
            icon:'error',
            text:'Eror al consultar los productos para este usuario'
          })
        }
      } catch (e) {
        Swal.fire({
          icon:'error',
          text:'Eror al consultar los productos para este usuario'
        })
      }
    } 

    return (
      <>
      <div className="grid grid-cols-[20%_1fr] h-screen">
        <ControlCategorias />
        <ProductGrid productos={productos}/>
        </div>
      </>
    );
  }