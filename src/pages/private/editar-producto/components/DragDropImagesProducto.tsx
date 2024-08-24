

import React, { useState, useCallback } from "react";
import {useDropzone} from 'react-dropzone'
import { Button } from "@mui/material";

const fileTypes = ["JPG", "PNG", "GIF"];


export const DragDropImagesProducto = () => {
    const onDrop = useCallback((acceptedFiles : any)=> {
        // Do something with the files
        console.log('IMAGENES', acceptedFiles)
      }, [])
      const {getRootProps, getInputProps, isDragActive , acceptedFiles} = useDropzone({onDrop})
    
      return (

        <div>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {
            isDragActive ?
              <p>Drop the files here ...</p> :
              <p>Drag 'n' drop some files here, or click to select files</p>
          }
        </div>
          {acceptedFiles.length > 0 && acceptedFiles.map(image=>(
            <img src={URL.createObjectURL(image)} style={{width:'300px', height:'300px'}} />
          )) 
        }
        </div>
      )
}
