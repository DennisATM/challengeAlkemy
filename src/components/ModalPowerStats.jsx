import React from 'react';

const ModalPowerStats = ({id, name, data}) => {
    return (
        <div>
           <div className="modal fade" id={id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title text-success" id="exampleModalLabel">Power Stats of {name}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="false">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body text-start">
                        <h5 className="text-primary"> Combat: <span className="text-danger">{data.combat}</span></h5>
                        <h5 className="text-primary"> Durability: <span className="text-danger">{data.durability}</span></h5>
                        <h5 className="text-primary"> Intelligence: <span className="text-danger">{data.intelligence}</span></h5>
                        <h5 className="text-primary"> Power: <span className="text-danger">{data.power}</span></h5>
                        <h5 className="text-primary"> Speed: <span className="text-danger">{data.speed}</span></h5>
                        <h5 className="text-primary"> Strength: <span className="text-danger">{data.strength}</span></h5>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default ModalPowerStats;