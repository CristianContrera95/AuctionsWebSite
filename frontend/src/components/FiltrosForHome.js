import React, { Component } from 'react';
import {MDBInput, MDBCol, MDBRow, MDBBtn,MDBIcon} from "mdbreact";
import config from "../config";
import Row from "reactstrap/es/Row";
import '../index.css'


class FiltrosForHome extends Component{
    constructor(pros) {
        super(pros);
        this.state = {
            filters: [],
            price_from: 0,
            price_until: 0,
            filters_selected: [],
            icons:{'Vehiculo':'car',
                    'Inmueble':'home',
                    'Mueble':'couch',
                    'Otro': 'gift',
                    'Provincias': 'location-arrow',
                    'Localidades': 'map-marker-alt'}
        }
        this.filters_selected = {};
        this.submit = this.props.submit;
        this.get_filters = this.get_filters.bind(this);
        this.add_filter = this.add_filter.bind(this);
        this.submit_filters =  this.submit_filters.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.get_filters()

    }

    get_filters () {
        fetch(
            config["api"]['BACKEND_ENDPOINT']+'/api/filters',
            {
                mode: 'cors',
                method: 'GET',
            }
        ).then(data => {return data.json()}
        ).then(res => {
                this.setState({
                    'filters': res['data']['filters']
                });
            }
        ).catch(e => {
                console.log('error al obtener filtros');
            }
        )
    }

    add_filter (key, e) {
        if (typeof this.filters_selected[key] === 'undefined')
            this.filters_selected[key] = [];
        if (e.target.className.search('dark') !== -1) {
            e.target.className = e.target.className.replace('dark', 'info');
            this.filters_selected[key] = [...this.filters_selected[key], e.target.name]
        } else {
            e.target.className = e.target.className.replace('info', 'dark');
            let index = this.filters_selected[key].indexOf(e.target.name)
            this.filters_selected[key].splice(index, 1);
        }
    }

    submit_filters () {
        this.submit(this.filters_selected, this.state.price_from, this.state.price_until);
    }

    changeHandler (e) {
        this.setState({ [e.target.name]: e.target.value });
    }


    render() {
        let lugares = Object.keys(this.state.filters).map((key) => {
            return (
                <div  className="mb-5 ml-2">
                    <Row>
                        <MDBCol>
                            <Row>
                                <MDBIcon className='mt-2 pt-1' icon={this.state.icons[key]} style={{color: '#000000'}}/>
                                    {key === 'Localidades' || key === 'Provincias' ?
                                        <h5 className={"ml-2 mt-2 text-dark"}>{key}</h5>
                                        :
                                        <h5 className={"ml-2 mt-2"}>
                                            <a href={'/home/'+key} className={this.props.category === key ? 'text-info':'text-dark'} >{key}</a>
                                        </h5>
                                    }
                            </Row>
                            <Row>
                                <hr className="accent-4 ml-1 mt-0 mr-5 grey lighten-5 text-" style={{ width: "150px", maxWidth: "576px" }} />
                            </Row>
                        </MDBCol>
                    </Row>
                    {Object.values(this.state.filters[key]).map((value) =>
                          <div className="mt-2 ml-2"  >
                            <h6 className='text-dark' >
                              <a className='text-dark'
                                 name={value[0]}
                                 onClick={e => this.add_filter(key, e)}
                              >
                                  {value[0]} <small>({value[1]})</small>
                             {/*TODO: agregar eso  */}

                              </a>
                            </h6>
                          </div>
                      )}
                </div>
            );
        })

        return(
            <div style={{color:'white'}} className="mt-3 mx-auto" >
                {lugares}
                <div >
                    <Row>
                        <MDBIcon className='mt-2 ml-2 pt-1' icon='dollar-sign' style={{color: '#000000'}} />
                        <h5 className="ml-2 mt-2 text-dark">Precios</h5>
                    </Row>
                        <hr className="accent-4  ml-0 mt-0 mr-5 mb-0 grey lighten-5" style={{ width: "150px" }} />
                        <small className='text-dark'>*Rango de precios</small>
                    </div>
                <MDBRow>
                    <MDBCol className='mr-4 mt-0 pt-0 col-sm-9'>
                            <MDBInput className=" uno rounded-pill mx-auto p-0"
                                      // value={this.state.price_from}
                                      background={"black"}
                                      name="price_from"
                                      label='$ Desde'
                                      type='number'
                                      onChange={this.changeHandler}
                                      style={{maxHeight: '39px'}}
                            />
                            <MDBInput className="rounded-pill mx-auto"
                                      // value={this.state.price_until}
                                      background={"white"}
                                      name="price_until"
                                      label='$ Hasta'
                                      type='number'
                                      onChange={this.changeHandler}
                                      style={{maxHeight: '38px'}}
                            />
                    </MDBCol>
                </MDBRow>
                <div className="mx-auto mr-4 ">
                    <MDBBtn color="grey darken-3" style={{color:'white'}} className="my-4" type='submit' onClick={this.submit_filters}>
                        Filtrar
                    </MDBBtn>
                </div>
            </div>
        );
    }
 }


export default FiltrosForHome ;
