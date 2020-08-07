import React, { Component } from 'react';
import {
    MDBContainer,
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBCardFooter,
    MDBRow,
    MDBCol,
} from 'mdbreact';
import logo from "../img/logosubastas.png";
import config from "../config";

class ValidateEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            modal_ok: false,
            username: '',
        }
        this.toggle = this.toggle.bind(this);
        this.validate_email = this.validate_email.bind(this);
        this.validate_email()
    }

    validate_email () {
        fetch(
            config["api"]['BACKEND_ENDPOINT']+'/api/register?'+window.location.href.split('?')[1],
            {
                mode: 'cors',
                method: 'GET',
            }
        ).then(data => {return data.json()}
        ).then(res => {
                console.log("Accaaa", res.code, res['data']['username']);
                if (res.code === 200) {
                    this.setState({
                        modal_ok: true,
                        username: res['data']['username'],
                    })
                } else {
                    this.setState({modal_ok: false})
                }
            }
        ).catch(e => {
                console.log("No user:", e);
                this.setState({modal_ok: false})
            }
        )
        this.toggle()
    }

    toggle (e) {
        this.setState({modal: !this.state.modal})
        if (typeof e !== 'undefined')
            if (e.target.name === 'boton modal')
                this.props.history.push('/login')
    }

    render() {
        let body = this.state.modal_ok ?
            <h4>Felicitaciones <b>{this.state.username}</b> su mail ha sido validado. Puede iniciar session en Subastas en Web!.</h4>
            :
            <h4>No pudimos validar su mail. Intente ingresar en el enlace enviado a su email de nuevo.</h4>
        return (
            <MDBContainer className='mt-5 pt-5' style={{height: '600px'}} hidden={!this.state.modal_ok}>
                <MDBCard isOpen={this.state.modal} toggle={this.toggle}>
                    <MDBCardHeader  style={{backgroundColor:'#0099CC',color: 'black'}} toggle={this.toggle}>
                        <img src ={logo} style={{width:"60px",height:"44px"}}/>
                        Subastas en Web
                    </MDBCardHeader>
                    <MDBCardBody className='text-center'>
                        {body}
                    </MDBCardBody>
                    <MDBCardFooter>
                        <MDBRow className='w-100'>
                            <MDBCol className={'col-12'}>
                                <MDBBtn name='boton modal' color="info" onClick={(e) => this.toggle(e)}>Ok!</MDBBtn>
                            </MDBCol>
                        </MDBRow>
                    </MDBCardFooter>
                </MDBCard>
            </MDBContainer>
        );
    }
}

export default ValidateEmail;