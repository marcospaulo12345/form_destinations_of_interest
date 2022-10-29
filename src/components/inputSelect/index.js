import React, { useState } from "react";

import close from '../../assets/images/Clear.png'

import './styles.css'

export default function InputSelect({disable, label, listOptions, listSelected, setListSelected}) {
    const [value, setValue] = useState('');

    const handleChange = (event) => {
        setValue(event.target.value);

        const teste = listOptions.find(e => (e?.name_ptbr || e.name) === event.target.value)

        if (teste){
            if(!listSelected.filter(e => (e?.name_ptbr || e.name) === event.target.value).length > 0){
                setListSelected(listSelected => [...listSelected, teste]);
                setValue('');
            } else{
                setValue('')
            }
        }
    }

    function ListRemove(index) {
        setListSelected([
            ...listSelected.slice(0, index),
            ...listSelected.slice(index + 1, listSelected.length)
        ]);
    }

    return(
        <div className='field-select'>
            <label htmlFor='selectOption'>{label}</label>
            <div className="group-selected">
                {listSelected.map((value, index) => (
                    <div key={index}>
                        <span>{value?.name_ptbr || value.name}</span>
                        <img src={close} onClick={() => ListRemove(index)} width="22" height="22"/>
                    </div>
                ))}
                <input 
                    list={`inputList${label}`}
                    name='selectOption'
                    id='selectOption'
                    onInput={handleChange}
                    value={value}
                    placeholder="Selecione as opções"
                    disabled={disable}
                />

                <datalist
                    name={`inputList${label}`}
                    id={`inputList${label}`}
                >
                    {listOptions.map((value, index) => (
                        <option key={index} value={value?.name_ptbr || value.name}/>
                    ))}
                </datalist>
            </div>
        </div>
    );

}