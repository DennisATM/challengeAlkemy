import React, { useState } from 'react';

import Axios from 'axios';

import {Formik, Form, Field} from 'formik'

import ContentTeam from './ContentTeam';

const Buscador = () => {
    
    //Contendrá el resultado de la busqueda por nombre de los heroes.
    const [hero, setHero] = useState({});
    //Constante Booleana para indicar si se seguira mostrando el resultado de la busqueda.
    const [buscar,setBuscar] = useState(false);
    //Variable contenedora del Equipo.
    let [team, setTeam]= useState([]);
    //contador de buenos
    const [heroGood, setHeroGood] = useState(0);
    //contador de malos
    const [heroBad, setHeroBad] = useState(0);
    
    /*Función para eliminar héroes del equipo y 
    actualizar los contadores de buenos y malos
    recibe el id del héroe y el lado (bueno,malo)*/
    const delFromTeam=(id,side)=>{
         setTeam(team.filter(item => item.id!== id));
         if(side==="good"){
             setHeroGood(heroGood-1);
         }else{
             setHeroBad(heroBad-1);
         };
     }

    const addToTeam=(data)=>{
        //Busca el héroe en el equipo.
        let encontrado =  team.find(item => item.id === data.id); 
        //Si no está..
        if (encontrado === undefined) {
            //Verifica si el equipo esta completo
            if (team.length<6){
                //Verifica si el héroe agregado no sobrepasa lo permitido para héroes buenos.
                if (data.biography.alignment==="good" && heroGood<3){
                    //Agrega el héroe y contabiliza la cantidad.
                    setTeam([...team,data]);
                    setHeroGood(heroGood + 1);
                }else{
                    if (data.biography.alignment==="good" && heroGood===3){
                        alert("Ya cuentas con 3 héroes buenos");
                    }
                    //Verifica si el héroe agregado no sobrepasa lo permitido para héroes malos.
                    if (data.biography.alignment==="bad" && heroBad<3){
                        //Agrega el héroe y contabiliza la cantidad.
                        setTeam([...team,data]);        
                        setHeroBad(heroBad + 1);
                    }else{
                        if(data.biography.alignment==="bad" && heroBad===3){
                            alert("Ya cuentas con 3 héroes malos");
                        }
                    }
                }
            }else{
                alert("El equipo esta completo.")
            }
        }else{
            alert("héroe ya se encuentra en el equipo")
        }
        // setBuscar(false); //Elimina el resultado de la búsqueda por nombre.

        /* Nota: se dejo el setBuscar en true, para mayor comodidad del usuario,
           pues en ocasiones agregará más de un héroe del resultado de la búsqueda.*/
    }

    return (
        <>
        <div className="container">

            {/* llamamos al componente ContentTeam pasandole como propiedad el arreglo del equipo,
                además de la función para eliminar integrantes del equipo. */}
            <ContentTeam data={team} delFromTeam={delFromTeam}/> 
            <hr />

            <div className="row justify-content-center">
                <div className="col-xs-12 col-md-4 text-center">

                    <Formik
                        
                        initialValues={{
                            name:""
                        }}
                        
                        validate={values => {
                            const errors = {};
                            if (!values.name) {
                                errors.name = 'Required';
                            } 
                            return errors;
                        }}

                        onSubmit = {(values,{resetForm})=>{

                            resetForm();
                            //Hacemos el llamado a la Api con el valor ingresado para la búsqueda.
                            Axios.get(`https://www.superheroapi.com/api.php/1687074934830869/search/${values.name}`,{
                            })
                            .then(response => {
                                if (response.status === 200){
                                    //Añadimos el resultado de la búsqueda al arreglo Hero.
                                    setHero(response.data.results)        
                                    //Ponemos el setBuscar en true para mostrar los resultados.
                                    setBuscar(true);
                                }   
                            })
                            .catch(error => {
                                alert("Datos Incorrectos")
                                console.error('There was an error!', error);
                            });
                        }}
                    >
                        {/*Definimos el UI del Formulario de búsqueda*/}
                        {( {errors, touched} ) => (
                            <Form className="form text-center m-4 p-4 bg-dark">
                                <h2 className="text-success">Buscador de heroes</h2>
                                <div className="m-2">
                                    <Field className="form-control" type="text" name="name" placeholder="Nombre de heroe"/>
                                    {/*Mostramos la linea de error en caso suceda*/}
                                    <h6 className="text-warning">{errors.name && touched.name && errors.name}</h6>
                                </div>
                                <button type="submit" className="btn btn-danger w-100">
                                    Buscar
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>

                { buscar ?
                    <div className="col-xs-12 col-md-8">
                        <div className="row justify-content-center">
                        {
                            hero.map(item => ( 
                                <div key={item.id} className="col-xs-12 col-sm-6 col-lg-4 text-center  ">
                                    <div className="card mt-2 " >
                                        <img src={item.image.url} className="icon card-img-top" alt="..." />
                                        <div className="card-body">
                                            <h5 className="card-title">{item.name}</h5>
                                            { item.biography.alignment==="good"
                                                ?<h6 className="text-primary">{item.biography.alignment}</h6>
                                                :<h6 className="text-danger">{item.biography.alignment}</h6>
                                            }
                                            <button type="button" className="btn btn-primary" onClick={()=> addToTeam(item)}>Agregar al equipo</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                : ""}
            </div>
        </div>
        </>
    );
}
 
export default Buscador;