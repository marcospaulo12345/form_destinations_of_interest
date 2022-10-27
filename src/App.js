import React, { useEffect, useState } from "react";
import axios from 'axios';

import InputSelect from "./components/inputSelect";

import './App.css'

function App() {
  const [listCountries, setListCountries] = useState([]);
  const [listCities, setListCities] = useState([]);

  const [listCitiesSelected, setListCitiesSelected] = useState([]);
  const [listCountriesSelected, setListCountriesSelected] = useState([]);

  let getCountries = async () => {
    const countries = await axios.get('https://amazon-api.sellead.com/country');

    setListCountries(countries.data);
  }

  useEffect(() => {
      getCountries();
  }, []);


  let getCities = async (listCountriesSelected) => {
    const cities = await axios.get('https://amazon-api.sellead.com/city');

    const myArrayFiltered = cities.data.filter((el) => {
      return listCountriesSelected.some((f) => {
        return f.code === el.country_code;
      });
    });
    
    console.log(myArrayFiltered)
    setListCities(myArrayFiltered);
  }

  useEffect(() => {
      getCities(listCountriesSelected);
  }, [listCountriesSelected]);

  return (
    <div className="App">
      <h1>Destinos de Interesse</h1>

      <form>
        <fieldset>
          <legend>
            <h2>Dados Pessoais</h2>
          </legend>

          <div className='field'>
            <label htmlFor='name'>Nome</label>
            <input 
              type="text"
              name='name'
              id='name'
              required
            />
          </div>

          <div className='field'>
            <label htmlFor='email'>Email</label>
            <input 
              type="email"
              name='email'
              id='email'
            />
          </div>

          <div className='field'>
            <label htmlFor='phone'>Telefone</label>
            <input 
              type="text"
              name='phone'
              id='phone'
            />
          </div>

          <div className='field'>
            <label htmlFor='cpf'>CPF</label>
            <input 
              type="text"
              name='cpf'
              id='cpf'
            />
          </div>

        </fieldset>

        <fieldset>
          <legend>
            <h2>Destino de Interesse</h2>
          </legend>

          <InputSelect label="Países" listOptions={listCountries} listSelected={listCountriesSelected} setListSelected={setListCountriesSelected}/>
          <InputSelect disable={listCountriesSelected.length > 0 ? false : true} label="Cidades" listOptions={listCities} listSelected={listCitiesSelected} setListSelected={setListCitiesSelected}/>

        </fieldset>
        <button>Enviar</button>
      </form>
    </div>
  );
}

export default App;
