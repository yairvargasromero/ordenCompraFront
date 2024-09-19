import React, { useEffect, useState } from 'react'
import { Swiper as SwiperObject } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { LazyLoadImage } from 'react-lazy-load-image-component';

interface Props { usuario: boolean, className?: string }

export const GuiaUsoSlide = ({ usuario, className }: Props) => {

    const imagenesUsuario = [
        '1.jpg',
        '2.jpg',
        '3.jpg',
        '4.jpg',
    ]

    const imagenesCoordinador = [
        '1.jpg',
        '2.jpg',
        '3.jpg',
        '4.jpg',
    ]

    const [imagenesMostrar, setImagenesMostrar] = useState<string[]>([])

    useEffect(() => {
        if (usuario) {
            const images = imagenesUsuario.map(name => `/guia_uso/usuario/${name}`);
            setImagenesMostrar(images)
        } else {
            const images = imagenesCoordinador.map(name => `/guia_uso/coordinador/${name}`);
            setImagenesMostrar(images)
        }
    }, [usuario])


    return (
        <div className='w-[800px] flex items-center'>
            <Swiper
                style={{
                    '--swiper-navigation-color': '#111',
                    '--swiper-pagination-color': '#111',
                } as React.CSSProperties
                }
                spaceBetween={10}
                navigation={true}
                autoplay={false}
                modules={[FreeMode, Navigation, Thumbs, Autoplay]}
                className="mySwiper2"
            >

                {
                    imagenesMostrar.map(image => (
                        <SwiperSlide key={image}>
                            <LazyLoadImage
                                className="w-full object-cover rounded"
                                width={300}
                                src={`${image}`}
                                alt='Guia uso'
                            />
                        </SwiperSlide>
                    ))
                }
            </Swiper>

        </div>
    );
}
