import { useEffect, useState } from "react"
import { obtenerInfoContrato } from "../../../actions/entidad/entidad"
import { IInfoContratoEntidad } from "../../../interfaces/entidad.interface"
import Swal from "sweetalert2"
import { Button, TextareaAutosize } from "@mui/material"
import { formatDate } from "../../../utils/formatDate"

export const InfoEntidadContrato = () => {

  const [infoContrato, setInfoContrato] = useState<IInfoContratoEntidad>()
  useEffect(() => {
    getInfoContrato()
  }, [])

  const getInfoContrato = async () => {
    try {
      let response = await obtenerInfoContrato()
      if (response?.error === 0) {
        setInfoContrato(response.info)
      } else if (response?.error === 1) {
        Swal.fire(response?.msg)
      }
    } catch (e) {
      Swal.fire({
        icon: 'error',
        text: 'Error al obtener información de la entidad, comuniquese con el administrador'
      })
    }
  }

  const handleDescargaMasivaBonos = async () => {

  }

  return (
    <div className="my-4 p-4 border border-gray-200">
      <p className="my-3 font-bold text-lg">Nombre: {infoContrato?.nombre}</p>
      <p className="my-3 font-bold text-md">Nit: {infoContrato?.nit}</p>
      <p className="my-3 font-bold text-md">No Contrato: {infoContrato?.no_contrato}</p>

      <hr/>
      <p className="my-3 font-bold text-lg">Fechas contrato</p>
      <div className="flex flex-col justify-start my-1">
        <p className="font-bold w-sm">
        Fecha inicio contrato: 
          <span className="font-normal">{formatDate(infoContrato?.fecha_inicio || '')}</span>
        </p>
        <p className="font-bold w-sm">
        Fecha final contrato:
          <span className="font-normal">{formatDate(infoContrato?.fecha_final || '')}</span>
        </p>


      </div>
      <br/>
      <hr/>

      {
        (!!infoContrato?.gestionada) &&
        <div className="my-4">
          <p><span className="font-bold">Fecha gestion solicitud: </span>{infoContrato.fecha_gestionada}</p>

          <p className="mb-4"><span className="font-bold">Método de entrega de bonos seleccionado por el coordinador: </span>{infoContrato.entrega_bonos}</p>
          {
            (infoContrato.entrega_bonos === 'VIRTUAL') &&
            <Button
              variant="outlined"
              onClick={handleDescargaMasivaBonos}>
              Descargar Bonos
            </Button>
          }

        </div>
      }

      <p className="my-6 font-bold md underline text-gray-500">Información del contrato</p>

      <TextareaAutosize
        disabled
        minRows={2}
        placeholder="Info..."
        value={infoContrato?.info_contrato}
        style={{
          width: '100%',
          padding: '10px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          fontSize: '1rem',
          lineHeight: '1.5',
          color: '#495057',
          backgroundColor: '#fff',
          boxShadow: 'inset 0 1px 1px rgba(0, 0, 0, 0.075)',
          transition: 'border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s',
        }}
      />

    </div>
  )
}
