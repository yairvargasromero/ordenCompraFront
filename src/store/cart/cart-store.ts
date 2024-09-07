
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartProducto } from "../../interfaces/cart.interface";
import { ICategoriaUsuario } from "../../interfaces/orden_compra.interface";

interface ICategoriaEscogida {
  [key: string]: {
    cantidadSeleccionada: number,
    cantidadMaxima: number
  }
}


interface State {
  cart: CartProducto[];
  categorias: ICategoriaUsuario[],
  categoriasSeleccionada: ICategoriaEscogida,
  getTotalItems: () => number;
  getSummaryInformation: () => {
    itemsInCart: number;
  };

  addProductTocart: (product: CartProducto) => void;
  updateProductQuantity: (product: CartProducto, quantity: number) => void;
  removeProduct: (product: CartProducto) => void;
  clearCart: () => void;
  setCategorias: (categorias: ICategoriaUsuario[]) => void;
  setCantidadSeleccionadaCategoria: (codCategoria: number, cantidad: number) => void
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],
      categorias: [],
      categoriasSeleccionada: {},
      // Methods
      getTotalItems: () => {
        const { cart } = get();
        let total = cart.reduce((total, item) => total + item.cantidad, 0);
        return total
      },

      getSummaryInformation: () => {
        const { cart } = get();
        const itemsInCart = cart.reduce(
          (total, item) => total + item.cantidad,
          0
        );

        return {

          itemsInCart,
        };

      },

      addProductTocart: (product: CartProducto) => {
        const { cart, categoriasSeleccionada } = get();

        // Actualizar cantidad por categoria
        let newCategoriaSeleccionada = { ...categoriasSeleccionada }
        if (newCategoriaSeleccionada[product.cod_categoria]) {
          newCategoriaSeleccionada[product.cod_categoria].cantidadSeleccionada += product.cantidad
        }

        // 1. Revisar si el producto existe en el carrito con la talla y color seleccionada
        const productInCart = cart.some(
          (item) => {
            if (product.tiene_talla && product.tiene_color) {
              return item.cod_producto === product.cod_producto && item.talla === product.talla && item.cod_color_producto === product.cod_color_producto
            } else if (product.tiene_talla) {
              return item.cod_producto === product.cod_producto && item.talla === product.talla
            } else if (product.tiene_color) {
              return item.cod_producto === product.cod_producto && item.cod_color_producto === product.cod_color_producto
            }
            return false;
          }
        );

        if (!productInCart) {
          set({ cart: [...cart, product], categoriasSeleccionada: newCategoriaSeleccionada });
          return;
        }

        // 2. Se que el producto existe por talla y/o color... tengo que incrementar
        const updatedCartProductos = cart.map((item) => {


          if (item.cod_producto === product.cod_producto) {

            if (product.tiene_talla && product.tiene_color) {
              if (item.cod_color_producto === product.cod_color_producto && item.talla === product.talla) {
                return { ...item, cantidad: item.cantidad + product.cantidad };
              }
            } else if (product.tiene_talla) {
              if (item.talla === product.talla) {
                return { ...item, cantidad: item.cantidad + product.cantidad };
              }
            } else if (product.tiene_color) {
              if (item.cod_color_producto === product.cod_color_producto) {
                return { ...item, cantidad: item.cantidad + product.cantidad };
              }
            }
          }

          return item;
        });

        set({ cart: updatedCartProductos, categoriasSeleccionada: newCategoriaSeleccionada });
      },

      updateProductQuantity: (product: CartProducto, quantity: number) => {
        const { cart, categoriasSeleccionada } = get();
        let newCategoriaSeleccionada = { ...categoriasSeleccionada }

        // Actualizamos la cantidad seleccionada en la categoría correspondiente
        cart.forEach((item) => {
          if (item.cod_producto === product.cod_producto) {
            // Si el producto tiene talla y color
            if (product.tiene_talla && product.tiene_color) {
              if (item.cod_color_producto === product.cod_color_producto && item.talla === product.talla) {
                // Restamos la cantidad anterior y sumamos la nueva cantidad
                if (newCategoriaSeleccionada[product.cod_categoria]) {
                  newCategoriaSeleccionada[product.cod_categoria].cantidadSeleccionada -= item.cantidad;
                  newCategoriaSeleccionada[product.cod_categoria].cantidadSeleccionada += quantity;
                }
              }
            }
            // Si el producto solo tiene talla
            else if (product.tiene_talla) {
              if (item.talla === product.talla) {
                if (newCategoriaSeleccionada[product.cod_categoria]) {
                  newCategoriaSeleccionada[product.cod_categoria].cantidadSeleccionada -= item.cantidad;
                  newCategoriaSeleccionada[product.cod_categoria].cantidadSeleccionada += quantity;
                }
              }
            }
            // Si el producto solo tiene color
            else if (product.tiene_color) {
              if (item.cod_color_producto === product.cod_color_producto) {
                if (newCategoriaSeleccionada[product.cod_categoria]) {
                  newCategoriaSeleccionada[product.cod_categoria].cantidadSeleccionada -= item.cantidad;
                  newCategoriaSeleccionada[product.cod_categoria].cantidadSeleccionada += quantity;
                }
              }
            }
          }
        });

        const updatedCartProductos = cart.map((item) => {

          if (item.cod_producto === product.cod_producto) {

            if (product.tiene_talla && product.tiene_color) {
              if (item.cod_color_producto === product.cod_color_producto && item.talla === product.talla) {
                return { ...item, cantidad: quantity };
              }
            } else if (product.tiene_talla) {
              if (item.talla === product.talla) {
                return { ...item, cantidad: quantity };
              }
            } else if (product.tiene_color) {
              if (item.cod_color_producto === product.cod_color_producto) {
                return { ...item, cantidad: quantity };
              }
            }
          }

          return item;
        });

        set({ cart: updatedCartProductos, categoriasSeleccionada: newCategoriaSeleccionada });
      },

      removeProduct: (product: CartProducto) => {
        const { cart, categoriasSeleccionada } = get();

        // Crea una copia de categoriasSeleccionada para evitar mutaciones directas
        const updatedCategoriasSeleccionada = { ...categoriasSeleccionada };

        const updatedCartProductos = cart.filter((item) => {
          // Check if the product matches any of the conditions
          if (item.cod_producto === product.cod_producto) {

            // Resta la cantidad del producto a la categoría correspondiente
            if (updatedCategoriasSeleccionada[product.cod_categoria]) {
              updatedCategoriasSeleccionada[product.cod_categoria].cantidadSeleccionada -= item.cantidad;
            }

            if (product.tiene_talla && product.tiene_color) {
              // Check both talla and color
              return !(item.talla === product.talla && item.cod_color_producto === product.cod_color_producto);
            } else if (product.tiene_talla) {
              // Check talla
              return item.talla !== product.talla;
            } else if (product.tiene_color) {
              // Check color
              return item.cod_color_producto !== product.cod_color_producto;
            }
          }

          // If no conditions match, keep the item
          return true;
        });

        // Actualiza el estado de `cart` y `categoriasSeleccionada`
        set({ cart: updatedCartProductos, categoriasSeleccionada: updatedCategoriasSeleccionada });
        // const { cart,categoriasSeleccionada } = get();
        // let newCategoriaSeleccionada = {...categoriasSeleccionada}
        // const updatedCartProductos = cart.filter((item) => {
        //   // Check if the product matches any of the conditions
        //   if (item.cod_producto === product.cod_producto) {

        //     if (product.tiene_talla && product.tiene_color) {
        //       // If the product has both size and color, check both
        //       if(newCategoriaSeleccionada[product.cod_categoria]){
        //         newCategoriaSeleccionada[product.cod_categoria].cantidadSeleccionada  -= item.cantidad
        //       }
        //       return !(item.talla === product.talla && item.cod_color_producto === product.cod_color_producto);
        //     } else if (product.tiene_talla) {
        //       // If the product has only size, check size
        //       if(newCategoriaSeleccionada[product.cod_categoria]){
        //         newCategoriaSeleccionada[product.cod_categoria].cantidadSeleccionada  -= item.cantidad
        //       }
        //       return item.talla !== product.talla;
        //     } else if (product.tiene_color) {
        //       // If the product has only color, check color
        //       if(newCategoriaSeleccionada[product.cod_categoria]){
        //         newCategoriaSeleccionada[product.cod_categoria].cantidadSeleccionada  -= item.cantidad
        //       }
        //       return item.cod_color_producto !== product.cod_color_producto;
        //     }
        //   }

        //   // If no conditions match, keep the item
        //   return true;
        // });

        // set({ cart: updatedCartProductos ,categoriasSeleccionada:newCategoriaSeleccionada });
      },
      clearCart: () => {
        set({ cart: [], categoriasSeleccionada: {} })
      },

      setCategorias: (categorias: ICategoriaUsuario[]) => {
        const { categoriasSeleccionada } = get();
        let categoriasSeleccionadaAux: ICategoriaEscogida = {}
        categorias.forEach((categoria) => {
          if (!categoriasSeleccionada[categoria.cod_categoria]) {
            categoriasSeleccionadaAux[categoria.cod_categoria] = {
              cantidadMaxima: categoria.cantidad,
              cantidadSeleccionada: 0
            }
          } else {
            categoriasSeleccionadaAux[categoria.cod_categoria] = categoriasSeleccionada[categoria.cod_categoria]
          }
        })
        set({ categoriasSeleccionada: categoriasSeleccionadaAux })
        set({ categorias })
      },

      setCantidadSeleccionadaCategoria: (codCategoria: number, cantidad: number) => {
        const { categoriasSeleccionada } = get();
        if (categoriasSeleccionada[codCategoria]) {
          categoriasSeleccionada[codCategoria].cantidadSeleccionada = cantidad
          set({ categoriasSeleccionada })
        }

      }
    }),


    {
      name: "shopping-cart",
    }
  )
);

