import React, { Component } from 'react';
import {Button, CardDeck, Row} from 'reactstrap';
import CardItem from "./CardItemComponent";
import Container from "reactstrap/es/Container";
import {MDBCol, MDBRow} from "mdbreact";
import FiltrosForHome from "./FiltrosForHome";
import config from "../config";
import logo from '../img/logosubastas.png'


class CardGallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            loginError: false,
            items_started: [],
            items_future: [],
            visible_started: 6,
            visible_future: 6
        };
        this.category = '';
        let category = window.location.pathname.replace('/home', '').replace('/', '')
        if (category !== '')
            this.category = 'category='+category;
        this.apply_filters = this.apply_filters.bind(this);
        this.get_items = this.get_items.bind(this);
        this.load_more_started = this.load_more_started.bind(this);
        this.load_more_future = this.load_more_future.bind(this)
        //this.handleChange = this.handleChange.bind(this);
        //this.Auth = new AuthService();  TODO:  ver AuthService
        this.get_items();
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log(nextProps)
    //     console.log(this.state.items_started)
    //     return this.state.items_started.length !== nextProps.auctions.started.length
    // }

    // componentDidUpdate(prevProps) {
    //     console.log(prevProps.auctions)
    //     alert()
    //     if ( Object.keys(prevProps.auctions).length !== 0 )
    //         if ( prevProps.auctions.started.length !== 0 )
    //             if ( this.props.items_started.length !== prevProps.auctions.started.length )
    //                 this.setState({
    //                     items_started: prevProps.auctions['started'],
    //                     items_future: prevProps.auctions['future']
    //                 });
    // }

    componentWillReceiveProps(nextProps, nextContent) {
        if ( Object.keys(this.props.auctions).length !== 0 ){
            if (this.props.auctions.started.length !== 0 || this.props.auctions.future.length !== 0)
                this.setState({
                    items_started: nextProps.auctions['started'],
                    items_future: nextProps.auctions['future']
                });
        }
    }

    get_items (filters, price_from, price_until) {
        filters = typeof filters !== 'undefined' ?  filters : '';
        price_from = typeof price_from !== 'undefined' ?  '&price_from='+price_from : '';
        price_until = typeof price_until !== 'undefined' ?  '&price_until='+price_until : '';

        let get_args = '';
        if (filters !== '' || price_from !== '' || price_until !== '' || this.category !== '') {
            get_args = this.category !== '' ? '?'+this.category : '?'
            get_args += filters + price_from + price_until
        }
        get_args = this.props.in_detail ? '' : get_args
        fetch(
            config["api"]['BACKEND_ENDPOINT']+'/api/auction'+get_args,
            {
                mode: 'cors',
                method: 'GET',
            }
        ).then(data => {return data.json()}
        ).then(res => {
                this.setState({
                    items_started: res['data']['auctions']['started'],
                    items_future: this.props.in_detail ? [] : res['data']['auctions']['future'],
                })
            }
        ).catch(e => {
                console.log(e);
                // this.props.history.push('/mi_perfil');
            }
        )
    }

    apply_filters (filters, price_from, price_until) {
        let result = '';
        Object.keys(filters).map((key) => {
            if ( filters[key].length > 0 ) {
                result += '&' + key.toLowerCase() + '='
                for (let i = 0; i < filters[key].length; i++) {
                    result += filters[key][i] + '.'
                }
            }
        })
        // if (result !== '')
            if (price_from >= 0 && price_until > 0)
                this.get_items(undefined, price_from, price_until)
            else
                this.get_items(result.slice(0, -1))
        // else
        //     this.get_items()
    }

    load_more_started(){
        this.setState({
            visible_started : this.state.visible_started + 6
        })
    }
    load_more_future(){
        this.setState({
            visible_future : this.state.visible_future + 6
        })
    }


    render() {
        return (
            <div className='mt-5'>
                {this.props.in_detail ?
                    <div className='mx-md-5 my-3'>
                        <h4 className='ml-3 my-5'> Otras Subastas </h4>
                        <CardDeck className="mx-md-5  col-12 px-md-1">
                            {this.state.items_started.slice(0, this.state.visible_started).map((data, index) =>
                                <div className="col-3 pr-0 pl-0" style={{maxWidth: '576px'}} hidden={data['id']===Number(this.category.replace('category=detail/', ''))}>
                                    <div className="p-2 mr-0 ml-0">
                                        <CardItem title={data['title']}
                                                  subtitle={data['subtitle']}
                                                  footer={' hasta  ' + data['end_date']}
                                                  href={'/detail/' + data['id']}
                                                  url_image={data['url_image']}
                                        />
                                    </div>
                                </div>
                            )}
                            <div hidden={this.state.items_started.length <= this.state.visible_started}
                                 className='col-md-12 mt-5 my-0 text-center'>
                                <Button type='Button'
                                        color="info"
                                        style={{color: '#424242'}}
                                        onClick={this.load_more_started}>
                                    <Row className='mx-3'>
                                        <img src ={logo} style={{width:"30px", height:"25px"}}/>
                                        <h6 className='mr-2 ml-2 my-0 h6-responsive'>Cargar Mas</h6>
                                    </Row>
                                </Button>
                            </div>
                        </CardDeck>
                    </div>
                    :
                    <div>
                        <div className="mt-3 container-fluid">
                            <MDBRow >
                                <MDBCol id={'filtros_for_home'} className='ml-4 m-0 p-0 col-md-2 col-sm-12 mr-sm-2 mt-3 col-md-2'>
                                    <MDBRow  className="mx-md-1 mt-2 col-12 px-md-1 rounded-lg bg-facebook">
                                        <FiltrosForHome
                                            category={this.category.replace('category=', '')}
                                            submit={this.apply_filters}/>
                                    </MDBRow>
                                </MDBCol>
                                {this.state.items_started.length > 0 || this.state.items_future.length > 0 ?
                                    <MDBCol className="mx-md-5 px-md-4">
                                        <Container className="col-12">
                                            <div className=" mt-0">
                                                <div className='mt-4' hidden={this.state.items_started.length === 0}>
                                                    <h3>Subastas Activas</h3>
                                                    <hr/>
                                                    <CardDeck className="mx-md-1 col-12 px-md-1">
                                                        {this.state.items_started.slice(0, this.state.visible_started).map((data, index) =>
                                                            <div className="col-4 pr-0 pl-0"
                                                                 style={{maxWidth: '576px'}}>
                                                                <div className="p-2 mr-0 ml-0">
                                                                    <CardItem title={data['title']}
                                                                              subtitle={data['subtitle']}
                                                                              footer={' hasta  ' + data['end_date']}  //TODO: Dar formato a la fecha
                                                                              href={'/detail/' + data['id']}
                                                                              url_image={data['url_image']}  //TODO: cargar images desde la api
                                                                    />
                                                                </div>
                                                            </div>
                                                        )}

                                                        <div
                                                            hidden={this.state.items_started.length <= this.state.visible_started}
                                                            className='col-md-12 mt-5 my-0 text-center'>
                                                            <Button type='Button'
                                                                    color="info"
                                                                    style={{color: '#424242'}}
                                                                    onClick={this.load_more_started}>
                                                                <Row className='mx-3'>
                                                                    <img src ={logo} style={{width:"30px", height:"25px"}}/>
                                                                    <h6 className='mr-2 ml-2 my-0 h6-responsive'>Cargar Mas</h6>
                                                                </Row>
                                                            </Button>
                                                        </div>
                                                    </CardDeck>
                                                </div>
                                                <div className='my-5' hidden={this.state.items_future.length === 0}>
                                                    <h3>Subastas Futuras</h3>
                                                    <hr/>
                                                    <CardDeck className="mx-md-1 col-12 px-md-1">
                                                        {this.state.items_future.slice(0, this.state.visible_future).map((data, index) =>
                                                            <div className="col-4  pr-2 pl-2"
                                                                 style={{maxWidth: '576px'}}>
                                                                <div className="pt-3 pb-3 mr-0 ml-0">
                                                                    <CardItem title={data['title']}
                                                                              subtitle={data['subtitle']}
                                                                              footer={'desde ' + data['start_date']}  //TODO: Dar formato a la fecha
                                                                              href={'/detail/' + data['id']}
                                                                              url_image={data['url_image']}  //TODO: cargar images desde la api
                                                                    />
                                                                </div>
                                                            </div>
                                                        )}
                                                        <div
                                                            hidden={this.state.items_future.length <= this.state.visible_future}
                                                            className='col-md-12 mt-5 my-0 text-center'>
                                                            <Button type='Button'
                                                                    style={{color: '#424242'}}
                                                                    color="info"
                                                                    onClick={this.load_more_future}>
                                                                <Row className='mx-3'>
                                                                    <img src ={logo} style={{width:"30px", height:"25px"}}/>
                                                                    <h6 className='mr-2 ml-2 my-0 h6-responsive'>Cargar Mas</h6>
                                                                </Row>
                                                            </Button>
                                                        </div>
                                                    </CardDeck>
                                                </div>
                                            </div>
                                        </Container>
                                    </MDBCol>
                                        :
                                        <div className='mx-auto'>
                                            <h1 className="my-5 text-center">No hay items en la categoria</h1>
                                        </div>
                                    }
                                </MDBRow>
                            </div>

                    </div>
                }
            </div>
        );
    }
}

export default CardGallery;
