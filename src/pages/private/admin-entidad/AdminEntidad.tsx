import React, { SyntheticEvent, useState } from 'react'
import { BreadCrumbsEntidad } from './components/BreadCrumbsEntidad';
import { Box, Card, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useParams } from 'react-router-dom';
import { InformacionBasicaEntidad } from './components/InformacionBasicaEntidad';
import { UsuariosEntidad } from './components/UsuariosEntidad';
import { FormCordinadorEntidad } from './components/FormCordinadorEntidad';
import { CargosEntidad } from './components/CargosEntidad';

export const AdminEntidad = () => {
  const { codEntidad } = useParams<{ codEntidad: string }>();

  const [value, setValue] = useState("1");

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <>
      <br></br>
      <BreadCrumbsEntidad />

      <Card className='my-6' sx={{ minWidth: 480 }}>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Información básica" value="1" />
                <Tab label="Cargos usuario" value="2" disabled={!codEntidad || +codEntidad === 0} />
                <Tab label="Usuarios" value="3" disabled={!codEntidad || +codEntidad === 0} />
                <Tab label="Coordinador" value="4" disabled={!codEntidad || +codEntidad === 0} />

              </TabList>
            </Box>


            <TabPanel value="1">
              <InformacionBasicaEntidad codEntidad={codEntidad} />
            </TabPanel>

            <TabPanel value="2">
              {(codEntidad && +codEntidad !== 0) && (
                <CargosEntidad codEntidad={+codEntidad} />
              )}
            </TabPanel>


            <TabPanel value="3">
              {(codEntidad && +codEntidad !== 0) && (
                <UsuariosEntidad codEntidad={codEntidad} />
              )}
            </TabPanel>
            <TabPanel value="4">
              {(codEntidad && +codEntidad !== 0) && (
                <FormCordinadorEntidad codEntidad={+codEntidad} />
              )}

            </TabPanel>
          </TabContext>
        </Box>
      </Card>
    </>
  );
}
