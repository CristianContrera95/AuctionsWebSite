import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AppNavbarBrand } from '@coreui/react';
import { Redirect } from 'react-router-dom';
import { Button, Form, Row, Col, Card, CardBody, CardGroup, Container } from 'reactstrap'
import InputField from "./InputFieldComponent";
import AuthService from '../utils/AuthService';
import logo from '../img/logofull.png'
import logos from "../img/logosubastas.png";


class Login extends Component {
    constructor(props) {
        super(props);
        this.Auth = new AuthService();
        if (this.Auth.loggedIn()) {
            this.props.history.push('/profile')
        }
        this.state = {
            email: '',
            password: '',
            isLoading: false,
            loginError: 0,
            isAuthenticated: this.Auth.loggedIn()
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({ isLoading: true });

        try {
            this.Auth.login(this.state.email, this.state.password)
            .then((res) => {

                if (res.code !== 200) {
                    if (res.code === 402) {
                        this.setState({loginError: 2})
                    } else {
                        this.setState({loginError: 1})
                    }
                    return
                }
                else {
                    if (!res['data']['has_user']) {
                        return this.props.history.push('/mi_perfil');
                    } else {
                        return this.props.history.push('/home');
                        // this.setState({
                        //     isAuthenticated: true,
                        //     loginError: 0
                        // })
                    }
                }
            })
            .catch((e) => {
                this.setState((prevState) => {
                    return {
                        ...prevState,
                        loginError: true,
                    };
                });
            });
        } catch (e) {
            this.setState({ loginError: true });
        }
        this.setState({ isLoading: false });
    };

	validateForm() {
	    // function to enable form button
		return this.state.email.length > 0 && this.state.password.length > 0;
	}

    render() {
        return (
            <div className="app flex-row align-items-center mt-4">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="8">
                            <CardGroup >
                                <Card className="p-4">
                                    <CardBody className="text-center">
                                        <Form onSubmit={this.handleSubmit}>
                                            <Row>
                                                <Col>
                                                    <AppNavbarBrand
                                                    full={{ src: logo,
                                                            width: 300,
                                                            alt: 'Remates Calamuchita Logo' }}
                                                    />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <InputField label={'Email'}
                                                                type={"user"}
                                                                ph ={'Ejemplo@hotmail.com'}
                                                                name={"email"}
                                                                i={'y'}
                                                                change={(e) => {
                                                                    //this.validateEmail(e)
                                                                    this.handleChange(e);
                                                                }}
                                                     />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <InputField label={'Contraseña'}  // TODO: las pass se ve en la url
                                                                type={"password"}
                                                                name={"password"}
                                                                ph ={'**********'}
                                                                i={'y'}
                                                                change={(e) => {
                                                                    //this.validateEmail(e)
                                                                    this.handleChange(e);
                                                                }}
                                                     />
                                                </Col>
                                            </Row>
                                            <Row hidden={this.state.loginError !== 1}>
                                                <Col xs="12">
                                                    <p className="text-danger">
                                                        Error al hacer login, verificar email y contraseña
                                                    </p>
                                                </Col>
                                            </Row>
                                            <Row hidden={this.state.loginError !== 2}>
                                                <Col xs="12">
                                                    <p className="text-danger">
                                                        Email no registrado.
                                                    </p>
                                                </Col>
                                            </Row>
                                            <Col>
                                                <Row className='ml-2'>
                                                    <a style={{color:'black'}} href='/recover_password'>
                                                        Olvidé mi contraseña
                                                    </a>
                                                </Row>
                                                <Col>
                                                    <Button color="info" disabled={!this.validateForm()}>
                                                        <Row>
                                                            <img src ={logos} style={{width:"50px",height:"37px"}}></img>
                                                            <b><h5 className='mt-2 mr-4'>Entrar</h5></b>
                                                        </Row>
                                                    </Button>
                                                </Col>
                                            </Col>
                                        </Form>
                                    </CardBody>
                                </Card>
                            </CardGroup>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

Login.propTypes = {
    userHasAuthenticated: PropTypes.func,
    history: PropTypes.object,
    isAuthenticated: PropTypes.bool,
    location: PropTypes.object,
    saveAgentName: PropTypes.func,
};

export default Login;
