import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, FormGroup } from '@mui/material';
import React from 'react'

export interface Props {
    open: boolean;
    onClose: (crearOrden?:boolean) => void;
}

export const DialogPoliticas = ({ onClose, open }: Props) => {


    const handleClose = () => {
        onClose();
    };

    
    const [checkedPoliticas, setCheckedPoliticas] = React.useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCheckedPoliticas(event.target.checked);
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Política de devolución</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat placeat quod mollitia. Temporibus, provident voluptatem. Recusandae ea, exercitationem maiores doloribus reiciendis dolor, repudiandae aliquam fugiat, pariatur natus voluptates eaque commodi?
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod doloremque perferendis totam tempora aliquid distinctio iure, blanditiis corrupti voluptatum voluptate necessitatibus repellat repudiandae inventore numquam reiciendis pariatur cupiditate obcaecati! Tenetur.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam unde voluptas eos labore impedit, consequuntur fuga, quas perspiciatis doloribus ut officiis excepturi! Dolorem aliquid nisi perferendis adipisci natus, corrupti atque.
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus recusandae possimus ducimus incidunt minus asperiores reprehenderit officiis quaerat mollitia, iusto esse ex illum natus aliquam, voluptas accusantium dignissimos quod sapiente.
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab tenetur, dolorum voluptatibus ipsam blanditiis omnis veniam. Ullam, nam voluptates quia eaque officia suscipit incidunt aliquid dolorum nostrum non vitae delectus?
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed commodi debitis necessitatibus, est ullam exercitationem incidunt eligendi delectus ipsam quas omnis dolorum ducimus deserunt veniam dolores provident itaque vero. Tempora?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <div>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox 
                            checked={checkedPoliticas}
                            onChange={handleChange}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />} label="Acepto política de devolución" />
                    </FormGroup>
                    <div>
                        <Button onClick={handleClose}>Cancelar</Button>
                        <Button onClick={()=>onClose(true)} disabled={!checkedPoliticas} autoFocus>
                            Crear Orden
                        </Button>
                    </div>
                </div>
            </DialogActions>
        </Dialog>
    );
}
