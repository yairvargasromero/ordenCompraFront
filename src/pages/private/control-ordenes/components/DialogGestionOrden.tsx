import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { editarEntidad } from '../../../../actions/entidad/entidad';
import { generarNumeroAleatorio } from '../../../../utils/randomNumber';
interface Props {
  openDialog: boolean;
  codEntidad:number;
  onClose: ( gestionarOrden:boolean) => void;
}

interface IGestion{
    entrega_bonos:'FISICO' | 'VIRTUAL'
}

export const DialogGestionOrden = ({  openDialog, onClose ,codEntidad }:Props) => {
    const { handleSubmit, reset, control, formState: { isValid } } = useForm<IGestion>({
        defaultValues: {entrega_bonos:'VIRTUAL'}
      });
      
      useEffect(() => {
        reset({entrega_bonos:'VIRTUAL'})
        
      }, [ openDialog])
    
      const onSubmit: SubmitHandler<IGestion> = async (data) => { 
        actualizarEntidad(data)
      }
    
     
    
      const actualizarEntidad = async (data:IGestion) => {
        try {

          const currentDate = new Date();
          const colombiaOffset = -5; // Colombia es UTC-5
          const offsetInMillis = colombiaOffset * 60 * 60 * 1000; // Offset en milisegundos

          // Obtener la fecha en UTC
          const utcDate = currentDate.toISOString();
          // Convertir a la fecha en Colombia
          const colombiaDate = new Date(currentDate.getTime() + offsetInMillis);
          // Obtener la fecha en formato ISO 8601 en la zona horaria de Colombia
          const colombiaDateISOString = colombiaDate.toISOString();

            let aux = {
              gestionada: true,
              fecha_gestionada: colombiaDateISOString,
              no_orden: generarNumeroAleatorio(7),
              ...data
            }
            let res = await editarEntidad( aux , codEntidad )
            if(res){
              Swal.fire(res.msg)
              if(res?.error == 0){
                onClose(true)
              }
            }
            onClose(false)
           
        } catch (e) {
          Swal.fire({
              icon: "error",
              text: "Comuniquese con el administrador"
          })
        }
      }
    
    
      return (
        <Dialog
          open={openDialog}
          onClose={()=>onClose(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Gestion de orden
          </DialogTitle>
          <form onSubmit={handleSubmit(onSubmit)} >
            <DialogContent>
              <div className="flex flex-col">
               
    
                <Controller
                  name="entrega_bonos"
                  control={control}
                  render={({ field }) => (
                    <>
                      <InputLabel id="entrega_bonos" className='my-1'>Seleccione el tipo de entrega de los bonos</InputLabel>
                      <Select
                        labelId="entrega_bonos"
                        {...field}
                        label="Tipo de entrega"
                      >
                        <MenuItem value={'FISICO'}>Físico</MenuItem>
                        <MenuItem value={'VIRTUAL'}>Virtual</MenuItem>
                      </Select>
                    </>
                  )}
                />
              </div>
    
            </DialogContent>
    
            <DialogActions>
              <Button onClick={()=>onClose(false)}>Cancelar</Button>
              <Button disabled={!isValid} type='submit'>
                Gestionar Orden de compra
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      )
}
