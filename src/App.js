import React, { useEffect, useState } from "react";
import axios from 'axios';
import {Form, Formik, useFormik } from 'formik';
import InputMask from 'react-input-mask';
import * as Yup from 'yup';

import warningIcon from "./assets/images/warningIcon.png"

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
    
    setListCities(myArrayFiltered);
  }

  useEffect(() => {
      getCities(listCountriesSelected);
      formik.setFieldValue('listCountriesSelected', listCountriesSelected)
  }, [listCountriesSelected]);

  useEffect(() => {
      formik.setFieldValue('listCitiesSelected', listCitiesSelected)
  }, [listCitiesSelected]);

  const SignUpSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Nome muito curto!")
      .max(50, "Muito !")
      .required("Name is required"),
    phone: Yup.string()
      .required("Phone number is required"),
    email: Yup.string().email().required("Email is required"),
    cpf: Yup.string()
        .required('cpf is required'),
    listCountriesSelected: Yup.array()
        .min(1, "At least one option is required")
        .required(),
    listCitiesSelected: Yup.array()
        .min(1, "At least one option is required")
        .required(),

  });

  const formik = useFormik({
    initialValues: {name:'', email: '', phone: '', cpf: '', listCountriesSelected: [], listCitiesSelected: []},
    validationSchema: SignUpSchema,
    onSubmit: values => {      
        alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className="App">
      <header>
        <h1>Destinos de Interesse</h1>
      </header>

        <form onSubmit={formik.handleSubmit}>
          <fieldset className="input-group-personal">
            <legend>
              <h2>Dados Pessoais</h2>
            </legend>

            <div className='field'>
              <label htmlFor='name'>Nome</label>
              <input 
                type="text"
                name='name'
                id='name'
                placeholder="Nome"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
              />
              {formik.errors.name && formik.touched.name && formik.errors.name}
            </div>

            <div className='field'>
              <label htmlFor='email'>Email</label>
              <input 
                type="email"
                name='email'
                id='email'
                placeholder="example@gmail.com"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.errors.email && formik.touched.email && formik.errors.email}
            </div>

            <div className='field'>
              <label htmlFor='phone'>Telefone</label>
              <InputMask 
                mask="(99) 99999-9999" 
                maskChar={null}  
                placeholder="Número do telefone"
                onChange={e => {
                  formik.setFieldValue('phone',e.target.value)
                }}
              />
              {formik.errors.phone && formik.touched.phone && formik.errors.phone}
            </div>

            <div className='field'>
              <label htmlFor='cpf'>CPF</label>
              <InputMask 
                mask="999.999.999-99" 
                maskChar={null}
                placeholder="Informe o CPF"
                onChange={e => {
                  formik.setFieldValue('cpf',e.target.value)
                }}
              />
              {formik.errors.cpf && formik.touched.cpf && formik.errors.cpf}
            </div>

          </fieldset>

          <fieldset className="input-group-destinations">
            <legend>
              <h2>Destino de Interesse</h2>
            </legend>

            <InputSelect label="Países" listOptions={listCountries} listSelected={listCountriesSelected} setListSelected={setListCountriesSelected}/>
            {formik.errors.listCountriesSelected && formik.touched.listCountriesSelected && formik.errors.listCountriesSelected}
            
            <InputSelect disable={listCountriesSelected.length > 0 ? false : true} label="Cidades" listOptions={listCities} listSelected={listCitiesSelected} setListSelected={setListCitiesSelected}/>
            {formik.errors.listCitiesSelected && formik.touched.listCitiesSelected && formik.errors.listCitiesSelected}

          </fieldset>
          <footer className="footer">
            <div>
              <img src={warningIcon} alt="Aviso imoportante"/>
              <div>
                <h3>Importante!</h3>
                <p>Preencha todos os dados</p>
                
              </div>
            </div>
            <button type="submit">Enviar</button>
          </footer>
        </form>


      
    </div>
  );
}

export default App;
