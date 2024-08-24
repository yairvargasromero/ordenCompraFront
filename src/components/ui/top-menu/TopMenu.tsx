
import { useEffect, useState } from 'react';
import { IoCartOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { useUIStore } from '../../../store/ui/ui-store';
import { useCartStore } from '../../../store/cart/cart-store';
import { useUserStore } from '../../../store/user/user';

export const TopMenu = () => {

  const openSideMenu = useUIStore((state) => state.openSideMenu);
  const totalItemsInCart = useCartStore((state) => state.getTotalItems());
  const session = useUserStore(state => state.user);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, [])



  return (
    <>

      <nav className="flex px-5 justify-start items-center w-full bg-slate-500">
        <div>
          <button
            onClick={openSideMenu}
            className="m-2 p-2 rounded-md transition-all hover:bg-gray-100 text-white hover:text-black"
          >
            Menú
          </button>
        </div>
        <div className="flex px-5 justify-between items-center w-full back">


          {/* Logo */}
          <div >
            <Link to="/">
              <span className={`antialiased font-bold text-white`}>
                BRT
              </span>
              <span className='text-white'> Ordenes</span>
            </Link>
          </div>


          {/* Search, Cart, Menu */}
          <div className="flex items-center">
            <p className='text-white'>{session?.nombre}</p>

            <Link to={(totalItemsInCart === 0) ? '/empty' : "/cart" } className="mx-2">
              <div className="relative">
                {(loaded && totalItemsInCart > 0) && (
                  <span className="absolute text-xs px-1 rounded-full font-bold -top-2 -right-2 bg-blue-700 text-white">
                    {totalItemsInCart}
                  </span>
                )}
                <IoCartOutline className="w-5 h-5 text-white" />
              </div>
            </Link>

          </div>
        </div>
      </nav>
    </>
  );
};