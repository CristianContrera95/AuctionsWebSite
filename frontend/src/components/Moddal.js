import React, { Component } from 'react';
import {
    MDBContainer,
    MDBBtn,
    MDBModal,
    MDBModalBody,
    MDBModalHeader,
    MDBModalFooter,
    MDBRow,
    MDBCol,
} from 'mdbreact';
import logo from "../img/logosubastas.png";

class ModalPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MDBContainer>
                <MDBModal isOpen={this.props.modal} toggle={this.props.toggle}>
                    <MDBModalHeader  style={{backgroundColor:'#0099CC',color: 'black'}} toggle={this.props.toggle}>
                        <img src ={logo} style={{width:"60px",height:"44px"}}/>
                        Subastas en Web
                    </MDBModalHeader>
                    <MDBModalBody className='text-center'>
                        {this.props.body}
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBRow className='w-100'>
                            <MDBCol className='col-6' hidden={!this.props.cancel}>
                                <MDBBtn name='boton_modal_cancel' color="danger" onClick={(e) => this.props.cancel_toggle(e)}>Cancel</MDBBtn>
                            </MDBCol>
                            <MDBCol className={this.props.cancel? 'col-6' : 'col-12'}>
                                <MDBBtn id='button' name='boton modal' color="info" onClick={(e) => this.props.toggle(e)}>Ok!</MDBBtn>
                            </MDBCol>
                        </MDBRow>
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
        );
    }
}

export default ModalPage;