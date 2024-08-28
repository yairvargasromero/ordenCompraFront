
import { Link, useNavigate } from "react-router-dom";
import clsx from "clsx";
import {
  IoCloseOutline,
  IoLogOutOutline,

  IoTicketOutline,
  IoBarcode,
  IoBagCheck,
  IoCreateSharp,
  IoBusinessSharp,
  IoLibraryOutline 

} from "react-icons/io5";
import { IconType } from "react-icons";
import { useUIStore } from "../../../store/ui/ui-store";
import { useUserStore } from "../../../store/user/user";

// import { useRouter } from "next/navigation";

// Add more icons as needed
const iconMapping:{[key:string]:IconType} = {
  
  categorias:IoBarcode,
  "ordenes-compra":IoTicketOutline,
  productos:IoBagCheck,
  tallajes:IoCreateSharp,
  entidades:IoBusinessSharp,
  reportes:IoLibraryOutline 
  // Add other mappings here
};


export const Sidebar = () => {
  const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);
  const closeMenu = useUIStore((state) => state.closeSideMenu);
  const logOut = useUserStore((state)=>state.logOut)
  const session = useUserStore(state => state.user);
  

  const navigate = useNavigate();
  let sidebarArray = useUserStore((state)=>state.sidebarMenu)
  const handleLogOut  = () =>{

    logOut()
    navigate('/auth/login');

  } 
  return (
    <div>
      {/* Background black */}
      {isSideMenuOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30" />
      )}

      {/* Blur */}
      {isSideMenuOpen && (
        <div
          onClick={closeMenu}
          className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
        />
      )}

      {/* Sidemenu */}
      <nav
        className={clsx(
          "fixed p-5 left-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300",
          {
            "-translate-x-full": !isSideMenuOpen,
          }
        )}
      >
        <IoCloseOutline
          size={50}
          className="absolute top-1 left-5 cursor-pointer"
          onClick={() => closeMenu()}
        />



        {/* Menú */}

        {
          session && (
            sidebarArray.map((menuItem , key) => {
              const IconComponent = iconMapping[menuItem.route];
              return (
                  <Link
                    key={key}
                    to={menuItem.route}
                    className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                    onClick={() => closeMenu()}
                  >
                     {IconComponent && <IconComponent size={30} />}
                    <span className="ml-3 text-xl">{menuItem.label}</span>
                  </Link>
                
              )
            })
          )
        }

      
        {/* Line Separator */}
        <div className="w-full h-px bg-gray-200 my-10" />

        <button
          className="flex w-full items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
          onClick={handleLogOut}
        >
          <IoLogOutOutline size={30} />
          <span className="ml-3 text-xl">Salir</span>
        </button>


      </nav>
    </div>
  );
};