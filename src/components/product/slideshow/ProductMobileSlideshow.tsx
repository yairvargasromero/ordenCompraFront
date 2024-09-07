
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Navigation, Pagination } from 'swiper/modules';


import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import './slideshow.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useEffect, useState } from 'react';



interface Props {
  images: string[];
  title: string;
  className?: string;
}



export const ProductMobileSlideshow = ( { images, title, className }: Props ) => {
  const [imagenesMostrar, setImagenesMostrar] = useState<string[]>([])

  useEffect(() => {
    setImagenesMostrar(images)
  }, [images])


  return (
    <div className={ className }>

      <Swiper
        style={{
          width: '100vw',
          height: '500px'
        }}
        pagination
        autoplay={{
          delay: 2500
        }}
        modules={ [ FreeMode, Autoplay, Pagination ] }
        className="mySwiper2"
      >

        {
          imagenesMostrar.map( image => (
            <SwiperSlide key={ image }>
              <LazyLoadImage
                width={ 600 }
                height={ 500 }
                src={ `${ image }` }
                alt={ title }
                className="object-fill"
              />
            </SwiperSlide>

          ) )
        }
      </Swiper>
    </div>
  );
};