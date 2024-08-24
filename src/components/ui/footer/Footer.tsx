import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <div className="flex w-full justify-center text-xs mb-10">

      <Link
        to='/'
      >
        <span className={`antialiased font-bold `}>Teslo </span>
        <span>| shop </span>
        <span>© { new Date().getFullYear() }</span>
      </Link>

      <Link
        to='/'
        className="mx-3"
      >
        Privacidad & Legal
      </Link>

      <Link
        to='/'
        className="mx-3"
      >
        Ubicaciones
      </Link>


    </div>
  )
}