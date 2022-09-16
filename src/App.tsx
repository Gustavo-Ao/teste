import * as React from 'react';
import { Dayjs } from 'dayjs';
import './App.css'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker  } from '@mui/x-date-pickers/DatePicker';

interface OrgaoEmissorProps {
  value: String;
  label: String;
}

// async function getOrgao() {
//   const orgaos: OrgaoEmissorProps[] = await fetch('https://632374adbb2321cba91a441a.mockapi.io/api-teste/orgaos')
//   .then(result => result.json())
//   .then(({orgao_emissor}) => orgao_emissor as OrgaoEmissorProps[]);

//   return orgaos;
// }

function App() {
  const [orgaos, setOrgaos] = React.useState([]);
  const [orgao, setOrgao] = React.useState('');
  const [inputOrgao, setInputOrgao] = React.useState('');

  const [dataEmissao, setDate] = React.useState<Dayjs | null>();

  const handleSubmit = (e: any) => {
    e.preventDefaoult();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
  }

  fetch('https://632374adbb2321cba91a441a.mockapi.io/api-teste/orgaos')
    .then(result => result.json())
    .then(({orgao_emissor}) => {
      setOrgaos(orgao_emissor)
    });

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
          <FormControl sx={{ m: 1, width: '40ch' }} variant="outlined">
            <TextField className="my-12" id="numero-rg" label="Número do RG" variant="outlined" required/>
          </FormControl>

          <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                className="formComponent"
                label="Data de emissão"
                value={dataEmissao}
                onChange={(newDate) => {
                  setDate(newDate);
                }}
                renderInput={(params) => <TextField {...params} required/>}
              />
            </LocalizationProvider>
          </FormControl>

          <FormControl sx={{ m: 1, width: '50ch' }} variant="outlined">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              value={orgao}
              inputValue={inputOrgao}
              options={orgaos}
              // onChange={(newValue: number | null) => {
              //   setOrgao(newValue)
              // }}
              onInputChange={(event, newInputValue) => {
                setInputOrgao(newInputValue);
              }}
              renderInput={(params) => <TextField {...params} label="Órgão expedidor" />}
            />
          </FormControl>   

          <FormControl fullWidth sx={{ m: 1, alignItems: 'center'}}>
            <FormLabel id="demo-row-radio-buttons-group-label">Gênero</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel value="female" control={<Radio />} label="Feminino" />
              <FormControlLabel value="male" control={<Radio />} label="Masculino" />
            </RadioGroup>
          </FormControl>

          <FormControl fullWidth sx={{ m: 1, alignItems: 'center'}}>
            <Button variant="outlined" type="submit">Salvar</Button>
          </FormControl>
      </Box>
    </form>
  )
}

export default App
