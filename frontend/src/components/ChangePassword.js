import React from 'react';
import { AppNavbarBrand } from '@coreui/react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import {Col, Form, Row} from 'reactstrap';
import logo from '../img/logofull.png';
import logos from '../img/logosubastas.png';
import config from "../config";
import TermsAndConditions from "./TermsAndConditions";
import ModalPage from "./Moddal";
import AuthService from "../utils/AuthService";

class ChangePassword extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            password: '',
            email: '',
            repeat_pass:'',
            modal2: false,
            modal: false,
            modal_ok: true,
            modal_msg: '',
            new_user: false
        };
        this.validate_pass = this.validate_pass.bind(this);
        this.Auth = new AuthService();
        this.username = this.Auth.getUsername();
        this.toggle = this.toggle.bind(this)
        this.toggle2 = this.toggle2.bind(this)
    }

    validate_pass () {
        if (this.state.password.length > 0 && this.state.repeat_pass.length > 0) {
            if (this.state.password !== this.state.repeat_pass) {
                return true
            }
        }
        return false
    }
    toggle = (e) => {
        this.setState({
            modal: !this.state.modal,
        });
        if (typeof e !== 'undefined')
            if (e.target.name === 'boton modal'  && this.state.modal_ok)
                return this.props.history.push('/login');
    }

    toggle2 = () => {
        this.setState({
            modal2: !this.state.modal2
        });
    }

    submitHandler = event => {

        event.target.className += ' was-validated';
        event.preventDefault();  //No se que hace por eso lo comente
        // enviamos los datos al backend
        fetch(
            config["api"]['BACKEND_ENDPOINT']+'/api/register',
            {
                headers: {
                    Accept: 'application/json',
                    authorization: this.Auth.getToken(),
                },
                method: 'PUT',
                body: JSON.stringify({
                    ...this.state,
                    username: this.username
                })
            }
        ).then(data =>{return data.json()}
        ).then(data => {
                if (data.code === 200){
                    this.setState({modal_ok: true})
                } else {
                    this.setState({modal_ok: false})
                }
            this.toggle()
            }
        ).catch(error => {console.log("Fail" + error);
            }
        )
    };

    changeHandler = event => {
        this.setState({ [event.target.name]: event.target.value });
    };


    render() {
        return (
            <div className="app flex-row align-items-center mt-5 mb-5">
                <ModalPage
                    toggle={this.toggle}
                    modal={this.state.modal}
                    body={this.state.modal_ok ?
                        'Su contraseña ha sido cambiada'
                        :
                        'No se pudo cambiar la contraseña'+this.state.modal_msg}/>
                <MDBContainer>
                    <div>
                        <MDBRow className="justify-content-center">
                            <MDBCol md="8" className="rounded shadow" style={{backgroundColor:"white"}}>
                                <div >
                                    <MDBContainer className="text-center">
                                        <MDBRow>
                                            <MDBCol>
                                                <AppNavbarBrand
                                                    full={{ src: logo,
                                                        width: 400,
                                                        alt: 'Remates Calamuchita Logo' }}
                                                />
                                            </MDBCol>
                                        </MDBRow>
                                        <h2 className="mt-2 ">
                                          Cambiar contraseña
                                        </h2>
                                    </MDBContainer>
                                    <MDBContainer className="col-md-11">
                                        <Form className='needs-validation' onSubmit={this.submitHandler}>
                                            <MDBInput
                                                icon='unlock'
                                                value={this.state.password}
                                                onChange={this.changeHandler}
                                                type='password'
                                                id='materialFormRegisterPasswordEx4'
                                                name='password'
                                                label='Nueva Contraseña'
                                                outline
                                                required

                                            >
                                            </MDBInput>
                                            <MDBInput
                                                icon='unlock'
                                                value={this.state.repeat_pass}
                                                onChange={this.changeHandler}
                                                placeholder="Confirm Password"
                                                type='password'
                                                id='materialFormRegisterPasswordEx9'
                                                name='repeat_pass'
                                                label='Ingrese su Contraseña nuevamente'
                                                outline
                                            >
                                                {this.validate_pass() ? (
                                                    <Row>
                                                        <Col xs="12">
                                                            <p className="text-danger">
                                                                Error, verificar contraseña
                                                            </p>
                                                        </Col>
                                                    </Row>
                                                ) : null}
                                            </MDBInput>
                                            <div className='custom-control custom-checkbox pl-3'>
                                                <input
                                                    className='custom-control-input'
                                                    type='checkbox'
                                                    value=''
                                                    id='invalidCheck'
                                                    required
                                                />
                                                <label className='custom-control-label ml-2' htmlFor='invalidCheck'>
                                                    <TermsAndConditions toggle={this.toggle2} modal={this.state.modal2} />
                                                    <a style={{textDecorationLine : 'underline'}} onClick={this.toggle2}>
                                                        Terminos y condiciones
                                                    </a>
                                                </label>
                                                <div className='invalid-feedback'>
                                                    Debe aceptar antes de enviar.
                                                </div>
                                            </div>
                                            <div className="text-center my-4">
                                                <MDBBtn className="ml-4 " color='info' type='submit' disabled={this.validate_pass()}>
                                                    <Row>
                                                        <img src ={logos} style={{width:"50px",height:"37px"}}></img>
                                                        <b><h5 className='mt-2 mr-4'>Enviar</h5></b>
                                                    </Row>
                                                </MDBBtn>
                                            </div>
                                        </Form>
                                    </MDBContainer>
                                </div>
                            </MDBCol>
                        </MDBRow>
                    </div>
                </MDBContainer>
            </div>
        );
    }
}

export default ChangePassword;