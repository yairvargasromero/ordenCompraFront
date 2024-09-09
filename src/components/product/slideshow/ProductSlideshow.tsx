import { useEffect, useState } from 'react';

import { Swiper as SwiperObject } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules';


import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import './slideshow.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';

interface Props {
  images: string[];
  title: string;
  className?: string;
}



export const ProductSlideshow = ( { images, title, className }: Props ) => {

  const [ thumbsSwiper, setThumbsSwiper ] = useState<SwiperObject>();
  const [imagenesMostrar, setImagenesMostrar] = useState<string[]>([])

  useEffect(() => {
    setImagenesMostrar(images)
  }, [images])
  

  return (
    <div className={ className }>

      <Swiper
        style={ {
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        } as React.CSSProperties
        }
        spaceBetween={ 10 }
        navigation={ true }
        autoplay={{
          delay: 2500
        }}
        thumbs={ {
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null
        } }
        modules={ [ FreeMode, Navigation, Thumbs, Autoplay ] }
        className="mySwiper2"
      >

        {
          imagenesMostrar.map( image => (
            <SwiperSlide key={ image }>
              
                <LazyLoadImage
                  className="w-full object-cover rounded"
                  width={400}
                  src={ `${ image }` }
                  alt={ title }
                  // className="rounded-lg object-fill"
                />
              
            </SwiperSlide>

          ) )
        }
      </Swiper>


      <Swiper
        onSwiper={ setThumbsSwiper }
        spaceBetween={ 10 }
        slidesPerView={ 4 }
        freeMode={ true }
        watchSlidesProgress={ true }
        modules={ [ FreeMode, Navigation, Thumbs ] }
        className="mySwiper"
      >
        {
          imagenesMostrar.map( image => (
            <SwiperSlide key={ image }>
              <LazyLoadImage
                width={ 200 }
                height={ 200 }
                src={ `${ image }` }
                alt={ title }
                className="rounded-lg object-fill"
              />
            </SwiperSlide>

          ) )
        }
      </Swiper>

    </div>
  );
};