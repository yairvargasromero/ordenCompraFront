import React, { useEffect, useState } from 'react'
import { GuiaUsoSlide } from '../../../components/product/slideshow/GuiaUsoSlide'
import { useUserStore } from '../../../store/user/user';
import { Title } from '../../../components/title/Title';

export const GuiaUso = () => {

  const session = useUserStore(state => state.user);
  const [usuario, setUsuario] = useState(false)

  useEffect(() => {
    setUsuario(session?.cod_perfil === 3)
  }, [session])
  
  return (
    

    <div>
      <Title title='Guia de uso' />
      <div className='flex justify-center my-4'>
        
      <GuiaUsoSlide usuario={usuario} />
      </div>
    </div>
  )
}
