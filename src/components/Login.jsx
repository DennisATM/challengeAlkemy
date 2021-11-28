import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import Axios from 'axios'


const Login = () => {

  const [logueado, setLogueado] = useState(false)
  
  return(
    <>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-xs-12 col-md-4">
                    <Formik
                    
                        initialValues={{
                            email:"",
                            password:""
                        }}
                        
                        validate={values => {
                            const errors = {};
                            if (!values.email) {
                                errors.email = 'Required';
                            } else if (
                                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                            ) {
                                errors.email = 'Invalid email address';
                            }
                            if (!values.password) {
                                errors.password = 'Required';
                            }
                            return errors;
                        }}

                        onSubmit = {(values,{resetForm})=>{
                            console.log("formulario enviado");
                            resetForm();
                            Axios.post('http://challenge-react.alkemy.org/',{
                                email: values.email,
                                password:values.password
                            })
                            .then(response => {
                                if (response.status === 200){
                                    localStorage.setItem("token",response.data.token)
                                    setLogueado(true);
                                    window.location= "/home";
                                }   
                            })
                            .catch(error => {
                                alert("Datos Incorrectos")
                                console.error('There was an error!', error);
                                window.location="/"
                            });
                        }}
                    >
                        {( {errors, touched} ) => (
                            <Form className="form text-center m-4 p-4 bg-dark">
                                <h2 className="text-success">Bienvenido!!</h2>
                                <div className="m-2">
                                    <Field className="form-control" type="email" name="email" placeholder="Ingrese email"/>
                                    <h6 className="text-warning">{errors.email && touched.email && errors.email}</h6>
                                </div>
                                <div className="m-2">
                                    <Field className="form-control" type="password" name="password" placeholder="Ingrese password" />
                                    <h6 className="text-warning">{errors.password && touched.password && errors.password}</h6>
                                </div>
                                <button type="submit" className="btn btn-danger w-100">
                                    Enviar
                                </button>
                                {logueado ? <h5 className="text-danger">Inicio Exitoso</h5> : ""}  
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>

        </div>

    </>   
  )
};

export default Login;