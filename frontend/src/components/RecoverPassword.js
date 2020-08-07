import React from 'react';
import { AppNavbarBrand } from '@coreui/react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import {Form, Row} from 'reactstrap';
import logo from '../img/logofull.png';
import logos from '../img/logosubastas.png';
import config from "../config";
import TermsAndConditions from "./TermsAndConditions";
import ModalPage from "./Moddal";
import AuthService from "../utils/AuthService";

class RecoverPassword extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            email: '',
            modal_tyc: false,
            modal: false,
            modal_ok: false,
            modal_msg: ''
        };
        this.toggle = this.toggle.bind(this)
        this.toggle_tyc = this.toggle_tyc.bind(this)
        this.Auth = new AuthService();
    }

    submitHandler = event => {
        document.getElementById("button").disabled = true;
        setTimeout((e) =>{
            document.getElementById("button").disabled = false;
        }, 5000)

        event.target.className += ' was-validated';
        event.preventDefault();

        fetch(
            config["api"]['BACKEND_ENDPOINT']+'/api/register',
            {
                headers: {
                    Accept: 'application/json',
                },
                method: 'PATCH',
                body: JSON.stringify({email: this.state.email})
            }
        ).then(res => {return res.json()}
        ).then(data => {
                if (data.code === 200)
                    this.setState({modal_ok: true})
                else
                    this.setState({modal_ok: false})
                this.toggle()
            }
        ).catch(error => {
                console.log("Fail" + error);
            }
        )
    };

    toggle = (e) => {
        this.setState({
            modal: !this.state.modal,
        });
        if (typeof e !== 'undefined')
            if (e.target.name === 'boton modal'  && this.state.modal_ok)
                return this.props.history.push('/login');
    }

    toggle_tyc = () => {
        this.setState({
            modal_tyc: !this.state.modal_tyc
        });
    }

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
                        'Su contraseña ha sido enviada a su mail'
                        :
                        'No se pudo encontrar el mail indicado'+this.state.modal_msg}/>
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
                                        <h2 className="mt-4 ">
                                            Recuperar contraseña
                                        </h2>
                                    </MDBContainer>
                                    <MDBContainer className="col-md-11">
                                        <Form className='needs-validation' onSubmit={this.submitHandler}>
                                            <MDBInput
                                                icon='envelope-open'
                                                value={this.state.email}
                                                onChange={this.changeHandler}
                                                type='email'
                                                id='materialFormRegisterConfirmEx3'
                                                name='email'
                                                label='Email'
                                                outline
                                                required
                                            />
                                            <div className='custom-control custom-checkbox pl-3'>
                                                <input
                                                    className='custom-control-input'
                                                    type='checkbox'
                                                    value=''
                                                    id='invalidCheck'
                                                    required
                                                />
                                                <label className='ml-4 custom-control-label' htmlFor='invalidCheck' >
                                                    <TermsAndConditions toggle={this.toggle_tyc} modal={this.state.modal_tyc} />
                                                    <a style={{textDecorationLine : 'underline'}} onClick={this.toggle_tyc}>
                                                        Terminos y condiciones
                                                    </a>
                                                </label>
                                                <div className='invalid-feedback'>
                                                    Debe aceptar antes de enviar.
                                                </div>
                                            </div>
                                            <div className="text-center my-4">
                                                <MDBBtn id='button' className="ml-4 " color='info' type='submit' disabled={this.state.email === ''}>
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

export default RecoverPassword;