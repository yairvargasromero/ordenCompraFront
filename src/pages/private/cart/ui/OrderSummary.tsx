

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../../../../store/cart/cart-store";
import { currencyFormat } from "../../../../utils/currencyFormat";

export const OrderSummary = () => {

  const navigate = useNavigate();

  const [loaded, setLoaded] = useState(false);
  const { itemsInCart } = useCartStore((state) =>
    state.getSummaryInformation()
  );

  useEffect(() => {
    setLoaded(true);
  }, []);


  useEffect(() => {

    if ( itemsInCart === 0 && loaded === true )   {
      navigate('/empty')
    }


  },[ itemsInCart, loaded ])



  if (!loaded) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-2">
      <span>No. Productos</span>
      <span className="text-right">
        {itemsInCart === 1 ? "1 artículo" : `${itemsInCart} artículos`}
      </span>

    </div>
  );
};