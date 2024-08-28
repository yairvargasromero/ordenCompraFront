import { Button, FormControlLabel, Input, Switch } from "@mui/material"
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { IoAddCircleOutline, IoCloudUploadSharp } from "react-icons/io5"
import { borrarColorProducto, borrarImagenProducto, crearColorProducto, editarColorProducto, editarProducto, obtenerColoresProducto, obtenerImagenesColoresProducto, subirImagenProducto } from "../../../../actions/producto/producto"
import { IColorProducto, IProductoColorImagen } from "../../../../interfaces/producto.interface"
import { ImagenProductoCargada } from "./ImagenProductoCargada"
import { DialogColorForm } from "./DialogColorForm"
import { ColorAccionCircle } from "./ColorAccionCircle"
import Swal from "sweetalert2"
import LoadingSpinnerScreen from "../../../../components/loadingSpinnerScreen/LoadingSpinnerScreen"

interface Props {
    codProducto: string
}


export const ColorImagenProducto = ({ codProducto }: Props) => {

    const colorVacio = {
        cod_producto_color: 0,
        cod_producto: codProducto ? +codProducto : 0,
        color: '#ffffff',
        color_descripcion: ''
    }

    const [tieneColor, setTieneColor] = useState<boolean>(false)
    const [openLoadingSpinner, setLoadingSpinner] = useState<boolean>(false)
    const [currentColor, setCurrentColor] = useState<IColorProducto>(colorVacio)
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [coloresProducto, setColoresProducto] = useState<IColorProducto[]>([])
    const [imagenesColor, setImagenesColor] = useState<IProductoColorImagen[]>([])

    const [dialogColorOpen, setDialogColorOpen] = useState<boolean>(false);

    useEffect(() => {
        coloresPorProducto()
    }, [codProducto])


    const coloresPorProducto = async () => {
        if (codProducto) {
            setLoadingSpinner(true)
            let response = await obtenerColoresProducto(codProducto)
            setTieneColor(!!response?.tiene_color)
            setLoadingSpinner(false)
            setColoresProducto(response?.colores || [])
        }
    }

    const getImagenesPorColores = async (codProductoColor: number) => {
        setLoadingSpinner(true)
        let response = await obtenerImagenesColoresProducto(codProductoColor)
        setLoadingSpinner(false)
        setImagenesColor(response?.imagenes || [])

    }



    // ACCIONES IMAGENES

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null; // Safely access the file
        setSelectedFile(file);
    };

    const handleSubmitCargarImagen = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!selectedFile) {
            alert("Por favor seleccione una imagen");
            return;
        }

        const formData = new FormData();
        formData.append('imagen', selectedFile);
        formData.append('cod_producto_color', String(currentColor?.cod_producto_color))

        setLoadingSpinner(true)
        let response = await subirImagenProducto(formData)
        setLoadingSpinner(false)

        if (response?.error === 0) {
            getImagenesPorColores(currentColor?.cod_producto_color || 0)
            setSelectedFile(null)
        }
    };




    // ACCIONES COLOR

    const seleccionarColor = (color: IColorProducto) => {
        setCurrentColor(color)
        getImagenesPorColores(color.cod_producto_color)
    }

    const handleDialogColorOpen = () => {
        setCurrentColor(colorVacio);
        setDialogColorOpen(true);
    };

    const handleDialogColorClose = () => {
        setDialogColorOpen(false);
    };

    const handleFormCrearColor = async (data: { color_descripcion: string; color: string, cod_producto_color: number }) => {

        let dataProducto = {
            color_descripcion: data.color_descripcion,
            color: data.color,
            cod_producto: codProducto ? +codProducto : 0
        }

        if (data.cod_producto_color !== 0) {
            setLoadingSpinner(true)
            let response = await editarColorProducto(dataProducto, data.cod_producto_color)
            setLoadingSpinner(false)
            if (response) {

                Swal.fire(response.msg)
                if (response.error === 0) {
                    coloresPorProducto()
                }
            }
        } else {
            setLoadingSpinner(true)
            let response = await crearColorProducto(dataProducto)
            setLoadingSpinner(false)
            if (response) {
                Swal.fire(response.msg)
                if (response.error === 0) {
                    coloresPorProducto()
                }
            }
        }


    };

    const editarColor = (color: IColorProducto) => {
        setCurrentColor(color);
        setDialogColorOpen(true);
    }

    const borrarColor = async (color: IColorProducto) => {
        let result = await Swal.fire({
            title: "Esta seguro que quiere borrar este color?",
            text: "Si borra este color se borraran todas las imagenes asociadas",
            showCancelButton: true,
            confirmButtonText: "Borrar",
            cancelButtonText: `Cancelar`,
            icon: "warning"
        })

        if (result.isConfirmed) {
            setLoadingSpinner(true)
            let response = await borrarColorProducto(color.cod_producto_color);
            setLoadingSpinner(false)
            if (response) {
                Swal.fire(response.msg)
                if (response.error === 0) {
                    coloresPorProducto()
                    setCurrentColor(colorVacio);
                    setImagenesColor([])
                }
            }
        }

    }

    const toogleTieneColor = async (event: React.ChangeEvent<HTMLInputElement>) => {

        setLoadingSpinner(true)
        let response = await editarProducto({tiene_color:event.target.checked}, +codProducto);
        if (response?.error === 0) {
            setTieneColor(!event.target.checked)     
        }
        setLoadingSpinner(false)
       
    }

    // ACCIONES IMAGEN

    const borrarImagen = async (imagenBorrar: { cod_producto_color_imagen: number, url: string }) => {

        setLoadingSpinner(true)
        let response = await borrarImagenProducto(imagenBorrar);
        setLoadingSpinner(false)
        if (response) {

            Swal.fire(response.msg)
            if (response.error === 0) {
                getImagenesPorColores(currentColor?.cod_producto_color || 0)
            }
        }
    }

    return (
        <>

            <div className="mx-4 w-auto my-6">
                <FormControlLabel
                    control={<Switch
                        checked={tieneColor}
                        onChange={toogleTieneColor}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />} label="Tiene Color ?"
                />
            </div>

            {
                tieneColor && (

                    <>
                        <Button variant="outlined" startIcon={<IoAddCircleOutline size={30} />} onClick={handleDialogColorOpen}>
                            Agregar Color
                        </Button>

                        <div className=" mt-4 py-5 flex justify-start row">
                            {coloresProducto.map((colorUnitario, index) => (

                                <ColorAccionCircle
                                    key={colorUnitario.cod_producto_color}
                                    colorUnitario={colorUnitario}
                                    seleccionarColor={seleccionarColor}
                                    editarColor={editarColor}
                                    borrarColor={borrarColor}
                                />
                            ))}
                        </div>

                        {(currentColor?.cod_producto_color !== 0) && (
                            <form onSubmit={handleSubmitCargarImagen}>
                                <label htmlFor="file-upload" className="mx-3">
                                    <Button
                                        variant="outlined"
                                        component="span"
                                    >
                                        Escoger Imagen

                                        <Input
                                            id="file-upload"
                                            type="file"
                                            inputProps={{ accept: 'image/*' }}
                                            onChange={handleFileChange}
                                            style={{ display: 'none' }}
                                        />
                                    </Button>
                                    {selectedFile && (
                                        <span className="mx-1">
                                            {selectedFile.name}
                                        </span>
                                    )}
                                </label>
                                <Button className="mx-3" type="submit" variant="contained" endIcon={<IoCloudUploadSharp />}>
                                    Cargar Imagen
                                </Button>
                            </form>
                        )}

                        <div className="flex justify-start mt-6">
                            {
                                imagenesColor.map((imagen) => (

                                    <ImagenProductoCargada
                                        key={imagen.cod_producto_color_imagen}
                                        url={imagen.url}
                                        cod_producto_color_imagen={imagen.cod_producto_color_imagen}
                                        borrarImagen={borrarImagen}
                                    />

                                ))
                            }
                        </div>
                    </>
                )
            }

            <DialogColorForm
                open={dialogColorOpen}
                onClose={handleDialogColorClose}
                onSubmit={handleFormCrearColor}
                colorInicial={currentColor}
            />

            <LoadingSpinnerScreen open={openLoadingSpinner} />

        </>
    )
}
