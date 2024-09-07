import React, { useState } from 'react'
import { IColoresMostrar } from '../../../interfaces/orden_compra.interface'
import { ColorCircle } from '../color-circle/ColorCircle'
import clsx from 'clsx'

interface Props {
    colorSeleccionado?: number,
    colores?: IColoresMostrar[],
    seleccionarColor: (colorSeleccionado: number) => void
}
export const ColorSelector = ({ colorSeleccionado, colores, seleccionarColor }: Props) => {

    return (
        <>
            <div className="my-5">
                <h3 className="font-bold mb-4">Colores disponibles</h3>

                <div className='flex'>
                    {colores && colores.map(color => (
                        <div key={color.cod_producto_color} onClick={() => seleccionarColor(color.cod_producto_color)}
                            className={
                                clsx(
                                    {
                                        'bg-gray-300 rounded-sm': colorSeleccionado === color.cod_producto_color
                                    }
                                )
                            }
                        >
                            <ColorCircle
                                color={color.color}
                                description={color.color_descripcion}
                                size='2'
                            />
                        </div>

                    ))}
                </div>
            </div>
        </>
    )
}
