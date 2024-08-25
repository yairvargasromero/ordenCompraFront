

import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { SyntheticEvent, useState } from 'react';
import { Card } from '@mui/material';
import { InformacionBasicaProducto } from './components/InformacionBasicaProducto';
import { ColorImagenProducto } from './components/ColorImagenProducto';
import { TallajeProducto } from './components/TallajeProducto';

export const EditarProducto = () => {
  const { codProducto } = useParams<{ codProducto: string }>();

  const [value, setValue] = useState("1");

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <Card className='my-6' sx={{ minWidth: 480 }}>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Información básica" value="1" />
              <Tab label="Color / Imagenes" value="2" disabled = {!codProducto || +codProducto === 0 } />
              <Tab label="Tallaje" value="3" disabled = {!codProducto || +codProducto === 0}/>
            
            </TabList>
          </Box>

          
           <TabPanel value="1">
            <InformacionBasicaProducto codProducto={codProducto}/>
          </TabPanel>

          
          <TabPanel value="2"> 
            { (codProducto && +codProducto !== 0) && (
             <ColorImagenProducto codProducto={codProducto}/> 
            )}
          </TabPanel>
          <TabPanel value="3">
          { (codProducto && +codProducto !== 0) && (
            <TallajeProducto codProducto={codProducto} />
          )}

          </TabPanel>
        </TabContext>
      </Box>
    </Card>
  );
}

export default EditarProducto