import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <div className="flex w-full justify-center text-xs mb-10">

      <Link
        to='/'
      >
        <span className={`antialiased font-bold `}>BRT</span>
        <span>| shop </span>
        <span>© { new Date().getFullYear() }</span>
      </Link>

      <div className="flex flex-col mx-4">
        <p>Direccion de la empresa</p>
        <p>Calle 10</p>
      </div>

      <div className="flex flex-col mx-4">
      <p>INVERSIONES BRT SAS</p>
      <p>901.474.311 - 8</p>
      

      <p>En caso de tener alguna novedad se puede comunicar al número 3164371825</p>
      </div>


    </div>
  )
}