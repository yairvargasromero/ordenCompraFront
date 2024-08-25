import React, { useEffect, useState } from 'react'

import { TextField, Button, IconButton, Box, FormControlLabel, Switch } from '@mui/material';
import { IoAddCircleOutline, IoClose, IoCloudUploadSharp } from 'react-icons/io5';
import LoadingSpinnerScreen from '../../../../components/loadingSpinnerScreen/LoadingSpinnerScreen';
import { editarProducto, obtenerTallasProducto } from '../../../../actions/producto/producto';
import Swal from 'sweetalert2';


interface Props {
    codProducto: string
}

export const TallajeProducto = ({ codProducto }: Props) => {


    const [tallas, setTallas] = useState<string[]>(['']);
    const [tieneTalla, setTieneTalla] = useState<boolean>(false)
    const [openLoadingSpinner, setLoadingSpinner] = useState<boolean>(false)

    useEffect(() => {
        coloresPorProducto()
    }, [codProducto])


    const coloresPorProducto = async () => {
        if (codProducto) {
            setLoadingSpinner(true)
            let response = await obtenerTallasProducto(codProducto)
            setTieneTalla(!!response?.tiene_talla)
            setLoadingSpinner(false)
            setTallas(response?.tallas || [])
        }
    }

    const handleTallaChange = (index: number, value: string) => {
        const newInputs = [...tallas];
        newInputs[index] = value;
        setTallas(newInputs);
    };

    const handleAgregarTalla = () => {
        setTallas([...tallas, '']);
    };

    const handleRemoverTalla = (index: number) => {
        const newInputs = tallas.filter((_, i) => i !== index);
        setTallas(newInputs);
    };

    
    // Check if all inputs are filled
    const allInputsFilled = tallas.every(input => input.length > 0);

    const toogleTieneTalla = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setLoadingSpinner(true)
        let response = await editarProducto({ tiene_talla: event.target.checked }, +codProducto);
        if (response?.error === 0) {
            setTieneTalla(!event.target.checked)
        }
        setLoadingSpinner(false)
    }

    const handleGuardarTallasProducto = async () =>{
        setLoadingSpinner(true)
        let response = await editarProducto({ talla:  tallas}, +codProducto);
        if (response?.error === 0) {
            if (response) {
                Swal.fire(response.msg)
            }
        }
        setLoadingSpinner(false)
    }

    return (
        <>
            <div className="mx-4 w-auto my-6">
                <FormControlLabel
                    control={<Switch
                        checked={tieneTalla}
                        onChange={toogleTieneTalla}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />} label="Tiene Talla ?"
                />
            </div>

            {
                tieneTalla && (
                    <>


                        <div className='flex justify-start my-5'>
                            {tallas.map((input, index) => (
                                <div key={index} className=" flex row justify-start" >
                                    <TextField
                                        label={`Talla ${index + 1}`}
                                        variant="outlined"
                                        value={input}
                                        onChange={(e) => handleTallaChange(index, e.target.value)}
                                        inputProps={{ maxLength: 2 }} // Limit to 2 characters
                                        style={{ marginRight: '8px', width: '80px' }}
                                    />
                                    <IconButton
                                        onClick={() => handleRemoverTalla(index)}
                                        color="secondary"
                                        aria-label="delete"
                                    >
                                        <IoClose />
                                    </IconButton>
                                </div>
                            ))}

                        </div>
                        <Button variant="contained" color="primary" 
                        
                            type="button" endIcon={<IoAddCircleOutline />}
                            onClick={handleAgregarTalla} disabled={!allInputsFilled}>
                            Agregar Talla
                        </Button>
                        <div className='my-5'>
                        <Button variant="contained" color="secondary" 
                            type="button" endIcon={<IoCloudUploadSharp />}
                            onClick={handleGuardarTallasProducto} disabled={!allInputsFilled}
                        >
                            Guardar tallas
                        </Button>
                        </div>
                    </>
                )
            }

            <LoadingSpinnerScreen open={openLoadingSpinner} />
        </>
    );
}
