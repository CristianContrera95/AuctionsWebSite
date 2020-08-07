import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';

class MLawMinute extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MDBContainer>
                <MDBModal isOpen={this.props.modal} toggle={this.props.toggle}>
                    <MDBModalHeader  style={{backgroundColor:'#0099CC',color: 'black'}} toggle={this.props.toggle}>
                        ¿Qué es el minuto ley?
                    </MDBModalHeader>
                    <MDBModalBody className='text-left' style={{color: 'black'}}>

                    El minuto de ley prevé que, una vez realizada la última oferta, habrá un minuto excedente para
                    posibles nuevas ofertas. El minuto de ley se activa cuantas veces haya una última oferta y hasta que
                    no haya más ofertas por un minuto.<br/>
                    <strong>Ejemplo : </strong><br/>
                    <strong>Cierre : </strong> 11:00hs <br/>
                    <strong>Oferta A:</strong> 10:59:45hs se extiende a 11:00:45hs <br/>
                    Si dentro del minuto comprendido entre 10:59:45hs y 11:00:45hs se realiza una nueva oferta, se
                    extenderá 1 minuto más a partir de dicha oferta.<br/>
                    <strong>Oferta B :</strong>11:00:00hs se extiende a 11:01:00hs <br/>
                    Si dentro del minuto comprendido entre 11:01:00hs y 11:02:00hs no se realizaran nuevas ofertas, la
                    oferta B surgirá ganadora.

                </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="info"  onClick={this.props.toggle} >
                            Ok!
                        </MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
        );
    }
}

export default MLawMinute;