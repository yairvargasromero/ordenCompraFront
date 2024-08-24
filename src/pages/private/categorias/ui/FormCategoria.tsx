
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, Checkbox, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { actualizarCategoria, crearCategoria, obtenerCategoriaDetalle } from '../../../../actions/categorias/categorias';
import { ICategories } from '../../../../interfaces/categoria.interface';


interface IFormCategoria {
  openDialog: boolean;
  onClose: ( actualizarCategorias:boolean) => void;
  codCategoria: number;
}

const defaulValueInfoCategoria: ICategories = {
  nombre: '',
  activo: 1,
  sexo: []
}

export const FormCategoria: React.FC<IFormCategoria> = ({ codCategoria, openDialog, onClose }) => {

  const { register, handleSubmit, reset, control, formState: { isValid } } = useForm<ICategories>({
    defaultValues: defaulValueInfoCategoria
  });
  
  useEffect(() => {
    if (codCategoria != 0) {
      obtenerDetalle()
    } else {
      reset(defaulValueInfoCategoria)
    }
  }, [codCategoria, openDialog])



  const obtenerDetalle = async () => {
    let categoriaDetalle = await obtenerCategoriaDetalle(codCategoria )
    if (categoriaDetalle?.error == 0) {
      delete categoriaDetalle.categoria.cod_categoria
      reset(categoriaDetalle.categoria)
    }
  }


  const onSubmit: SubmitHandler<ICategories> = async (data) => { 

    if(codCategoria){
      updateCategoria(data)
    }else{
      createCategoria(data)
    }
  }

  const createCategoria = async (data:ICategories) => {
    try {
        let res = await crearCategoria(data )
        if(res){
          Swal.fire(res.msg)
          if(res?.error == 0){
            onClose(true)
          }
        }
       
    } catch (e) {
      Swal.fire({
          icon: "error",
          text: "Comuniquese con el administrador"
      })
    }
  }

  const updateCategoria = async (data:ICategories) => {
    try {
        let res = await actualizarCategoria(codCategoria, data )
        if(res){
          Swal.fire(res.msg)
          if(res?.error == 0){
            onClose(true)
          }
        }
       
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
        {codCategoria ? 'Editar categoria' : 'Crear Categoria'}
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)} >
        <DialogContent>
          <div className="flex flex-col mt-4">
            <TextField
              label="Nombre"
              variant="outlined"
              {...register('nombre', { required: true })}
            />

            <Controller
              name="sexo"
              control={control}
              rules={{ required: 'Sexo es obligatorio' }}
              render={({ field }) => (
                <>
                  <InputLabel id="sexo" className='mt-4'>Sexo</InputLabel>

                  <Select
                    {...field}
                    label="Sexo"
                    labelId="sexo"
                    multiple
                  >
                    <MenuItem value={'M'}>
                      <Checkbox checked={field.value.indexOf('M') > -1} />
                      Másculino
                    </MenuItem>
                    <MenuItem value={'F'}>
                      <Checkbox checked={field.value.indexOf('F') > -1} />
                      Femenino
                    </MenuItem>
                  </Select>
                </>
              )}
            />

            <Controller
              name="activo"
              control={control}
              render={({ field }) => (
                <>
                  <InputLabel id="activo" className='mt-4'>Activo</InputLabel>
                  <Select
                    labelId="activo"
                    {...field}
                    label="Activo"
                  >
                    <MenuItem value={1}>Activo</MenuItem>
                    <MenuItem value={0}>Inactivo</MenuItem>
                  </Select>
                </>
              )}
            />
          </div>

        </DialogContent>

        <DialogActions>
          <Button onClick={()=>onClose(false)}>Cancelar</Button>
          <Button disabled={!isValid} type='submit'>
            {codCategoria ? 'Editar Categoria' : 'Crear Categoria'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
