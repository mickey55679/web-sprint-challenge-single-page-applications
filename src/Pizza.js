import { useState } from "react"
import * as Yup from 'yup';
import axios from 'axios'

const initialFormValues = {
    name: '',
    size: '',
    hasPepperoni: false,
    hasMushroom: false,
    hasOnion: false,
    hasPineapple: false,
    specialText: ''
}
const initialErrorValues = {
    name: ''

}
const schema = Yup.object().shape({
    name: Yup.string()
    .min(2, "name must be at least 2 characters"),
   
})

export const Pizza = () => {
    const [formValues, setFormValues] = useState(initialFormValues)
    const [errors, setErrors ] = useState(initialErrorValues)

    const onFormChange = (e) => {
        if (e.target.type === 'checkbox') {
            setFormValues({...formValues, [e.target.name]: !formValues[e.target.name]})

        } else {
             setFormValues({ ...formValues, [e.target.name]: e.target.value }); 
        }
       
        if (e.target.name === 'name') {
            Yup.reach(schema, e.target.name)
            .validate(e.target.value)
            .then(() => setErrors({...errors, [e.target.name]: ''}))
            .catch((err) => setErrors({...errors, [e.target.name]: err.errors[0]}))

        }
    }
    const onFormSubmit = (e) => {
        e.preventDefault();
        console.log(formValues)
        axios.post("https://reqres.in/api/orders", formValues).then(res => console.log(res))

    }
    return (
      <form id="pizza-form" onSubmit={onFormSubmit}>
        <input
          id="name-input"
          onChange={onFormChange}
          name="name"
          value={formValues.name}
        />
        {errors.name && (<p>{errors.name}</p>)}
       
        <select name="size" onChange={onFormChange} id="size-dropdown">
          <option value=""></option>
          <option value="small">small</option>
          <option value="medium">medium</option>
          <option value="large">large</option>
        </select>
        <input
          name="hasPepperoni"
          type="checkbox"
          checked={formValues.hasPepperoni}
          onChange={onFormChange}
        />
        Pepperoni
        <input
          name="hasMushroom"
          type="checkbox"
          checked={formValues.hasMushroom}
          onChange={onFormChange}
        />
        Mushroom
        <input
          name="hasOnion"
          type="checkbox"
          checked={formValues.hasOnion}
          onChange={onFormChange}
        />
        Onion
        <input
          name="hasPineapple"
          type="checkbox"
          checked={formValues.hasPineapple}
          onChange={onFormChange}
        />
        Pineapple
        <input name='specialText' id='special-text' value={formValues.specialText} onChange={onFormChange} />
        <button id='order-button'>Submit</button>
      </form>
    );
}