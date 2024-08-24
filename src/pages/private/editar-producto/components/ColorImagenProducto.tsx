import { Button, Card, IconButton, Input, Tooltip, Typography } from "@mui/material"
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { IoAddCircleOutline, IoCloudUploadSharp } from "react-icons/io5"
import { ColorCircle } from "../../../../components/product/color-circle/ColorCircle"
import { DragDropImagesProducto } from "./DragDropImagesProducto"
import { obtenerColoresProducto, obtenerImagenesColoresProducto, subirImagenProducto } from "../../../../actions/producto/producto"
import { IColorProducto, IProductoColorImagen } from "../../../../interfaces/producto.interface"
import { ImagenProductoCargada } from "./ImagenProductoCargada"

interface Props {
    codProducto?: string
}

interface Color {
    color: string,
    imagenes: string[],
    color_descripcion: string
}



export const ColorImagenProducto = ({ codProducto }: Props) => {
    const [currentColor, setCurrentColor] = useState<IColorProducto>()
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [coloresProducto, setColoresProducto] = useState<IColorProducto[]>([])
    const [imagenesColor, setImagenesColor] = useState<IProductoColorImagen[]>([])

    useEffect(() => {
        coloresPorProducto()
    }, [codProducto])


    const coloresPorProducto = async () => {
        if (codProducto) {
            let response = await obtenerColoresProducto(codProducto)
            setColoresProducto(response?.colores || [])
        }
    }

    const getImagenesPorColores = async (codProductoColor: number) => {

        let response = await obtenerImagenesColoresProducto(codProductoColor)
        setImagenesColor(response?.imagenes || [])

    }

    const seleccionarColor = (color: IColorProducto) => {
        console.log('****')
        console.log(color)
        setCurrentColor(color)
        getImagenesPorColores(color.cod_producto_color)
    }

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null; // Safely access the file
        setSelectedFile(file);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!selectedFile) {
            alert("Please select an image file.");
            return;
        }

        const formData = new FormData();
        formData.append('imagen', selectedFile);
        formData.append('cod_producto_color', String(currentColor?.cod_producto_color))

        let response = await subirImagenProducto(formData)
        if (response?.error === 0) {
            getImagenesPorColores(currentColor?.cod_producto_color || 0)
            setSelectedFile(null)
        }

        console.log('*********')
        console.log(response)
        // fetch('/upload-endpoint', {
        //     method: 'POST',
        //     body: formData,
        // })
        //     .then(response => response.json())
        //     .then(data => {
        //         console.log('Success:', data);
        //     })
        //     .catch(error => {
        //         console.error('Error:', error);
        //     });
    };

    return (
        <>
            <Button variant="outlined" startIcon={<IoAddCircleOutline size={30} />}>
                Agregar Color
            </Button>

            <div className="mt-4 py-5">

                <div className="flex justify-start row">
                    {coloresProducto.map((colorUnitario, index) => (
                        <button className="mx-3 p-2 rounded hover:bg-gray-50" key={index} onClick={() => seleccionarColor(colorUnitario)}>
                            <ColorCircle color={colorUnitario.color} size="3" />
                            <p>{colorUnitario.color_descripcion}</p>
                        </button>
                    ))}
                </div>

            </div>

            {/* <div>
                <DragDropImagesProducto />
            </div> */}

            <form onSubmit={handleSubmit}>
                {/* <input type="file" accept="image/*" onChange={handleFileChange} /> */}
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

            <div className="flex justify-start mt-6">
                {
                    imagenesColor.map((imagen) => (

                        <ImagenProductoCargada
                            key={imagen.cod_producto_color_imagen}
                            url={imagen.url}
                            cod_producto_color_imagen={imagen.cod_producto_color_imagen}
                        />

                    ))
                }
            </div>

        </>
    )
}
