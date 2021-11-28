import React, { Fragment} from 'react';
import ModalPowerStats from './ModalPowerStats';

const ContentTeam = ({data, delFromTeam}) => {
        
    return (
        <Fragment>
            <div className="jumbotron">
                <h1 className="text-center">Nuestro Equipo</h1>
                <div className="col-12">
                        <div className="row justify-content-center">
                        {
                            data.map(item => ( 
                                <div key={item.id} className="col-xs-12 col-sm-6 col-lg-3 text-center">
                                    <div className="card mt-2" >
                                        <img src={item.image.url} className="icon-team card-img-top" alt="..." />
                                        <div className="card-body mt-0">
                                            <h5 className="card-title m-0">{item.name}</h5>
                                            { item.biography.alignment==="good"
                                                ?<h6 className="text-primary m-0">{item.biography.alignment}</h6>
                                                :<h6 className="text-danger m-0">{item.biography.alignment}</h6>
                                            }
                                            <button type="button" onClick={()=>delFromTeam(item.id,item.biography.alignment)} className="btn btn-danger m-1" >Quitar</button>
                                            <button type="button" className="btn btn-primary m-1" data-toggle="modal" data-target={`#id${item.id}`} >PowerStats</button>       
                                            
                                            <ModalPowerStats id={`id${item.id}`} name={item.name} data={item.powerstats}/>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
            </div>
        </Fragment>
    );
}
 
export default ContentTeam;