import { writeUserData, getData } from '../firebase/utils'
import { uploadIMG } from '../firebase/storage'
import { useUser } from '../context/Context.js'
import Button from './Button'
import FormAddsC from './FormAddsC'
import style from '../styles/Form.module.css'
import { useState } from 'react'
import { getDate, getDayMonthYear, getMonthAndYear } from '../utils/Utils'
import imageCompression from 'browser-image-compression';


export default function Form() {

  const [check, setCheck] = useState('BP1')

  const items = [
    {
      id: 'BI1',
      ruteDB: 'BannerIzquierdo1',
      ruteSTG: 'Banners',
      title: 'Banner Izquierdo 1'
    },
    {
      id: 'BI2',
      ruteDB: 'BannerIzquierdo2',
      ruteSTG: 'Banners',
      title: 'Banner Izquierdo 2'
    },
    {
      id: 'BI3',
      ruteDB: 'BannerIzquierdo3',
      ruteSTG: 'Banners',
      title: 'Banner Izquierdo 3'
    },
    {
      id: 'BP1',
      ruteDB: 'BannerPortada1',
      ruteSTG: 'Banners',
      title: 'Banner Portada 1'
    },
    {
      id: 'BP2',
      ruteDB: 'BannerPortada2',
      ruteSTG: 'Banners',
      title: 'Banner Portada 2'
    },
    {
      id: 'BP3',
      ruteDB: 'BannerPortada3',
      ruteSTG: 'Banners',
      title: 'Banner Portada 3'
    },
    {
      id: 'BD1',
      ruteDB: 'BannerDerecho1',
      ruteSTG: 'Banners',
      title: 'Banner derecho 1'
    },
    {
      id: 'BD2',
      ruteDB: 'BannerDerecho2',
      ruteSTG: 'Banners',
      title: 'Banner derecho 3'
    },
    {
      id: 'BD3',
      ruteDB: 'BannerDerecho3',
      ruteSTG: 'Banners',
      title: 'Banner derecho 3'
    },
  ]


  function handleCheck(e) {
    const value = e.target.value
    setCheck(value)
  }
  return (
    <div className={style.form}>
      <form className={style.formChecks}>
        {items.map((item, index) =>
          <div key={index}>
            <input
              type="radio"
              onChange={handleCheck}
              value={item.id}
              id={item.id}
              checked={check == item.id ? true : false}
            />
            <label for={item.id}>{item.title}</label>
          </div>
        )}
      </form>
      {items.map((item, index) =>
        <div className={style.formInputs} key={index}>

  
            {check == item.id && <FormAddsC ruteDB={item.ruteDB} ruteSTG={item.ruteSTG} id={item.id} title={item.title} />}
            

        </div>
      )}

    </div>


  )
}




