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
        '5.jpg',
        '6.jpg',
        '7.jpg',
        '8.jpg',
        '9.jpg',
        '10.jpg',
        '11.jpg',
        '12.jpg',
        '13.jpg',
    ]

    const imagenesCoordinador = [
        '1.jpg',
        '2.jpg',
        '3.jpg',
        '5.jpg',
        '6.jpg',
        '7.jpg',
        '8.jpg',
        '9.jpg',
        '10.jpg',
        '11.jpg',
        '12.jpg',
        '13.jpg',
        '14.jpg',
        '15.jpg',
        '16.jpg',
        '17.jpg',
        '18.jpg',
        '19.jpg',
        '20.jpg',
        '21.jpg',
        '22.jpg',
    ]

    const [imagenesMostrar, setImagenesMostrar] = useState<string[]>([])

    useEffect(() => {
        if (usuario) {
            const images = imagenesUsuario.map(name => `${process.env.PUBLIC_URL}/guia_uso/usuario/${name}`);
            setImagenesMostrar(images)
        } else {
            const images = imagenesCoordinador.map(name => `${process.env.PUBLIC_URL}/guia_uso/coordinador/${name}`);
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
