import React, { Component } from 'react';
import { Card, CardBody, CardGroup, Col, Container, Row, Table } from "reactstrap";
import AuthService from "../utils/AuthService";
import config from "../config";

class OffersLive extends Component {
    constructor(pros) {
        super(pros);
        this.state = {
            offers: [],
        }
        this.update_price = this.props.update_price;
        this.Auth = new AuthService();
        this.get_table_data = this.get_table_data.bind(this);
        this.get_table_data();
        if (this.state.offers.length > 0)
            this.update_price(this.state['offers'][0]['amount'])

    }

    get_table_data() {
        // recibimos los datos del backend

        fetch(
            config["api"]['BACKEND_ENDPOINT']+'/api/offer'+window.location.pathname,
            {
                mode: 'cors',
                method: 'GET',
            }
        ).then(data => {return data.json()}
        ).then(res => {
            console.log(res['data'])

                this.setState({...res['data']})
                // if (res['data']['offers'].length > 0)
                //     this.update_price(res['data']['offers'][0]['amount'])
            }
        ).catch(e => {
            console.log("Fail:", e);
            }
        )
    };

    render() {
        let data_table = this.state.offers.map((offer, index) => {
            return (
                <tbody>
                    { index === 0 ?
                        <tr className="ml-5 info-color-dark">
                            <th className="ml-5">{index+1}</th>
                            <td className="ml-5 "><b>{offer['username']}</b></td>
                            <td className="ml-5"><b>{offer['date']}</b></td>
                            <td className="ml-5"><b>{offer['hour']}</b></td>
                            <td className="ml-5"><b>$ {offer['amount'].toLocaleString()}</b></td>
                            <td className="ml-5"><b>$ {(offer['amount']*1.15).toLocaleString()}</b></td>
                        </tr>
                    :
                        <tr className="ml-5">
                            <th className="ml-5">{index+1}</th>
                            <td className="ml-5"><b>{offer['username']}</b></td>
                            <td className="ml-5">{offer['date']}</td>
                            <td className="ml-5">{offer['hour']}</td>
                            <td className="ml-5"><b>$ {offer['amount'].toLocaleString()}</b></td>
                            <td className="ml-5"><b>$ {(offer['amount']*1.15).toLocaleString()}</b></td>
                        </tr>
                    }
                </tbody>
            )
        });
        // let data_table = null

        if (this.state.offers.length === 0)
            data_table = (<tbody>
            <div className={this.state.offers} hidden={true}/>
            <tr className="ml-5">
                <th className="ml-5">{'-'}</th>
                <td className="ml-5">{'-'}</td>
                <td className="ml-5">{'-'}</td>
                <td className="ml-5">{'-'}</td>
                <td className="ml-5"><b>{'-'}</b></td>
                <td className="ml-5"><b>{'-'}</b></td>
            </tr>
            </tbody>)

        return (
            <div className="app flex-row align-items-center col-12 px-0 mx-0">
                <Container className="px-0 pl-md-4 pl-lg-4 col-12">
                    <CardGroup>
                        <Card className="p-0 shadow">
                            <CardBody className="text-center px-sm-0 px-md-4">
                                <Row>
                                    <Col>
                                        <h3  style={{fontSize:'60px',color:'#424242'}}><b>Ofertas</b></h3>
                                        {/*<hr className="d-inline-block mt-0 info-color-dark" style={{ width: "200px" }} />*/}
                                    </Col>
                                </Row>
                                <Row className="border-default">
                                    <Col>
                                        <Table hover responsive={true}  className="mr-5 table-striped">
                                            <thead className="thead-dark text-center">
                                                <tr className="">
                                                    <th >#</th>
                                                    <th>Usuario</th>
                                                    <th>Fecha</th>
                                                    <th>Hora</th>
                                                    <th>Oferta</th>
                                                    <th>Precio final</th>
                                                </tr>
                                            </thead>
                                              { data_table }
                                        </Table>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </CardGroup>
                </Container>
            </div>
        )
    }
}

export default OffersLive;
