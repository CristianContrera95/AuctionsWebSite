import React from 'react';
import { AppNavbarBrand } from '@coreui/react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import {Col, Form, Row} from 'reactstrap';
import logo from '../img/logofull.png';
import logos from '../img/logosubastas.png';
import config from "../config";
import TermsAndConditions from "./TermsAndConditions";
import ModalPage from "./Moddal";
import AuthService from '../utils/AuthService';


class ToRegister extends React.Component {
  constructor (props) {
      super(props);
      this.Auth = new AuthService();
      if (this.Auth.loggedIn()) {
          this.props.history.push('/profile')
      }
          this.state = {
              username: '',
              email: '',
              password: '',
              repeat_pass:'',
              modal2: false,
              modal: false,
              modal_ok: true,
              modal_msg: ''
          };
      this.validate_pass = this.validate_pass.bind(this);
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

      document.getElementById("button").disabled = true;
      setTimeout((e) =>{
          document.getElementById("button").disabled = false;
      }, 3000)

        event.target.className += ' was-validated';
        event.preventDefault();  //No se que hace por eso lo comente
        // enviamos los datos al backend
        fetch(
        config["api"]['BACKEND_ENDPOINT']+'/api/register',
        {
              headers: {
                  Accept: 'application/json',
              },
              method: 'POST',
              body: JSON.stringify({
                  ...this.state
              })
            }
        ).then(data => {return data.json()}
        ).then(data => {
            if (data.code === 200){
                this.setState({modal_ok: true})
                this.toggle()
            } else {
                this.setState({modal_ok: false})
                this.toggle()
            }
        }
        ).catch(error => {
            console.log("Fail" + error);
            this.setState({modal_ok: false})
            this.toggle()
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
               'Gracias por su registro!. Revise su casilla de correo para validar su identidad.'

               :
               'No se pudo registrar. Intente con otro email o username'+this.state.modal_msg}/>
         <MDBContainer>
             <div>
                 <MDBRow className="justify-content-center">
                 <MDBCol md="8" className="rounded shadow" style={{backgroundColor:"white"}}>
                    <div >
                       <MDBContainer className="text-center">
                          <MDBRow>
                             <MDBCol className='mt-4'>
                                <AppNavbarBrand
                                   full={{ src: logo,
                                      width: 300,
                                      alt: 'Remates Calamuchita Logo' }}
                                />
                             </MDBCol>
                          </MDBRow>
                       </MDBContainer>
                       <MDBContainer className="col-md-11">
                          <Form className='needs-validation' onSubmit={this.submitHandler}>
                              <MDBInput
                                  icon='user'
                                  value={this.state.fname}
                                  onChange={this.changeHandler}
                                  type='user'
                                  id='materialFormRegisterNameEx1'
                                  name='username'
                                  label='Nombre de usuario'
                                  outline
                                  required
                              >
                              </MDBInput>
                             <MDBInput
                                 icon='unlock'
                                 value={this.state.password}
                                 onChange={this.changeHandler}
                                 type='password'
                                 id='materialFormRegisterPasswordEx4'
                                 name='password'
                                 label='Contraseña'
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
                              >
                                  <small id='emailHelp' className='form-text text-muted'>
                                      Nunca compartiremos su correo electrónico con nadie más.
                                  </small>
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
                                        Términos y condiciones
                                    </a>
                                </label>
                                <div className='invalid-feedback'>
                                   Debe aceptar antes de enviar.
                                </div>
                             </div>
                              <div className="text-center my-4">
                                <MDBBtn className="ml-4 " color='info' type='submit'  id='button' disabled={this.validate_pass()}>
                                    <Row>
                                        <img src ={logos} style={{width:"50px",height:"37px"}}/>
                                        <b><h5 className='mt-2 mr-4'>Registrarse</h5></b>
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

export default ToRegister;
