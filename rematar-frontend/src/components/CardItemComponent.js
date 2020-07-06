import React, { Component } from 'react';
import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    CardText,
    CardSubtitle,
    CardFooter,
    Button } from 'reactstrap';
import logo from '../img/logosubastas.png'
import './CardItemComponent.css';
import {MDBCarousel, MDBCarouselInner, MDBIcon, MDBCarouselItem} from "mdbreact";



const no_img = 'https://www.capiovi.misiones.gov.ar/wp-content/uploads/2019/10/noimageavailable.png';


class CardItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            loginError: false,
        };
        this.url_image = this.props.url_image || no_img;
        this.title = this.props.title;
        this.subtitle = this.props.subtitle;
        this.footer = this.props.footer;
        this.href = this.props.href;
        //this.handleChange = this.handleChange.bind(this);
        //this.Auth = new AuthService();  TODO:  ver AuthService
    }

    componentWillReceiveProps(nextProps, nextContent) {
        if ( this.props.title !== nextProps.title ) {
            this.url_image = nextProps.url_image || no_img;
            this.title = nextProps.title;
            this.subtitle = nextProps.subtitle;
            this.footer = nextProps.footer;
            this.href = nextProps.href;
        }
    }

    render(){

        // TODO: setear fijo el tamaño de la imagen
        return (
                <Card className="imagen-fluid btn m-0 p-0" > {/*style={{maxHeight: '450px'}}>*/}
                    <CardHeader className="m-0 p-0" >
                        <MDBCarousel activeItem={1} length={0} showControls={false} showIndicators={false} thumbnails
                                     className="w-100 ">
                            <MDBCarouselInner style={{backgroundColor:'white'}}>
                                    <MDBCarouselItem itemId={1} className='justify-content-center'>
                                        <Row className='justify-content-center m-auto w-100'
                                             style={{'height': '230px'}}
                                         >
                                            <div className='mt-auto mb-auto mx-sm-auto shadow-sm'>
                                            <img className="w-100 my-auto img-hover-effect"
                                                 src={this.url_image || no_img}
                                                 alt="slide"
                                                 style={{
                                                     maxHeight: '230px',
                                                     'min-width': '250px',
                                                     'min-height': '230px',
                                                 }}
                                            />
                                        </div>
                                        </Row>

                                    </MDBCarouselItem>
                                {/*    TODO:  Agregar Caption con descripcion de la foto    */}
                            </MDBCarouselInner>
                        </MDBCarousel>
                    </CardHeader>
                    <CardBody className='mb-0 pb-0'>
                        <CardTitle className='titulo mx-auto' > {/*style={{height: '40px'}}*/}
                            <a href={this.href || '#'} className="text-dark" type=""><h5 className='h5-responsive'><b >{ this.title || '' }</b></h5></a>
                        </CardTitle>
                        <CardSubtitle className=" justify-content-center mx-auto h6-responsive subtitulo" > {/* style={{height: '40px'}} */}
                            <b className='w-responsive d-inline'>{ this.subtitle.toLowerCase() || '...' }</b>
                        </CardSubtitle>
                        <CardText className="text-justify-center my-2 mt-2">
                            <MDBIcon far icon="calendar-alt" />
                            <small className=""
                                   hidden={this.footer === ''}
                                   style={{fontSize: "11px"}}
                            >{ this.footer.toLowerCase() }</small>
                        </CardText>
                    </CardBody>
                    <CardFooter className="mb-0 pb-0 pl-2 bg-white" >
                        <div className="text-center">
                            <Col>
                                <a href={this.href || '#'}>
                                    <Button className="btn-md"
                                            color={'info'}
                                            style={{color:'#424 242'}}
                                    >
                                        <Row className='my-0 p-0 '>
                                            <img src ={logo} style={{width:"30px", height:"23px"}}/>
                                            {/*<img src ={logos} style={{width:"40px",height:"29px"}}></img>*/}
                                            <b><h5 className='mt-1 mb-0 h5-responsive' unselectable={true} style={{'font-family': 'Lucida Console'}}>Detalles</h5></b>
                                        </Row>
                                    </Button>
                                </a>
                            </Col>
                        </div>
                    </CardFooter>
                </Card>
        );
    }
}

export default CardItem;
