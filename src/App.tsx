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

interface FormValueProps {
  orgao_expedidor: String;
  date: String | undefined;
  orgao_emissor: String;
  sexo: String;
}

function App() {
  const [formValues, setFormValues] = React.useState({} as FormValueProps);

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormValues({...formValues, [name]: value})
  }

  const handleDateChange = (event: Dayjs | null) => {
    const value  = event?.format('DD/MM/YYYY');
    setFormValues({...formValues, ['date']: value});
    setDateValue(event);
  }

  const handleOrgaoChange = (event: any) => {
    const { value } = orgaos.find(org => org.label === event.target.innerText) as OrgaoEmissorProps ;
    setFormValues({...formValues, ['orgao_emissor']: value});
  }
  
  const [dateInput, setDateValue] = React.useState<Dayjs | null>(null);
  const [orgaos, setOrgaosList] = React.useState<readonly OrgaoEmissorProps[]>([]);
  
  const handleSubmit = (e: any) => {
    e.preventDefaoult();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
  }

  React.useEffect(() => {
    fetch('https://632374adbb2321cba91a441a.mockapi.io/api-teste/orgaos')
      .then(result => result.json())
      .then(({orgao_emissor}) => {
        setOrgaosList(orgao_emissor)
      });
  }, []);
  
  console.log('Form Value', formValues)

  // FALTA FAZER VERIFICAÇÃO DO FORMULÁRIO

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
          <FormControl sx={{ m: 1, width: '40ch' }} variant="outlined">
            <TextField 
              className="my-12" 
              id="numero-rg" 
              label="Número do RG" 
              variant="outlined"
              name="numero-rg" 
              onChange={handleInputChange} 
              required
             />
          </FormControl>

          <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Data de emissão"
                value={dateInput}
                onChange={(newDate) => {
                  handleDateChange(newDate)
                }}
                renderInput={(params) =>
                  <TextField {...params} required/>
                }
              />
            </LocalizationProvider>
          </FormControl>

          <FormControl sx={{ m: 1, width: '50ch' }} variant="outlined">
            <Autocomplete
              options={orgaos}
              onChange={(newValue) => handleOrgaoChange(newValue)}
              renderInput={(params) => <TextField required onChange={handleInputChange} {...params} label="Órgão expedidor" />}
            />
          </FormControl>   

          <FormControl fullWidth sx={{ m: 1, alignItems: 'center'}}>
            <FormLabel id="demo-row-radio-buttons-group-label">Gênero</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="sexo"
              onChange={handleInputChange}
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
