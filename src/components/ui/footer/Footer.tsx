import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <div className="flex w-full justify-center text-sm mb-10">

      <Link
        to='/'
      >
        <span className={`antialiased font-bold `}>BRT</span>
        <span> Ordenes </span>
        <span>© {new Date().getFullYear()}</span>
      </Link>

      <div className="flex flex-col mx-4">
        <p>Direccion de la empresa</p>
        <p>Calle 10</p>
      </div>

      <div className="flex flex-col mx-4 max-w-sm">
        <p>En caso de presentarse alguna dificultad relacionada con la operación de la plataforma o la ejecución de la orden de entrega, puede comunicarse con nuestro equipo de soporte a través de los siguientes datos de contacto. Este servicio está disponible de lunes a sábado, de 08:00 a.m. a 04:00 p.m.</p>
        <p>Número de contacto: <span className="font-bold">323 219 4970</span> y <span className="font-bold"> 601 455 9328 </span></p>
        <p>Estamos a su disposición para brindarle la asistencia necesaria</p>
      </div>

      


    </div>
  )
}