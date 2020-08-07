import React, { Component } from "react";
import {
    CardGroup,
    Container,
    Row,
    Col,
    Card,
    Table,
    CardBody,
    CardFooter,
    Button } from 'reactstrap';

class DataAuction extends Component {
    constructor(props) {
        super(props);
        this.data = this.props.data;  // Array con pares (nombre: valor). Ej: [('lat/lon', '12.123/60.213'), ('luz', 'si'), ..]
        this.title = this.props.title;
        this.subtitle = this.props.subtitle;
        this.precio = this.props.precio;
        this.Ofertar = this.Ofertar.bind(this);
    }

    Ofertar = (e) => {
        alert('Comprar la version pro.');
    }
    render() {
        let data_table = this.data.map((dato) => {
            return (
                <tr className="ml-5">
                    <th className="ml-5">{ dato[0] }</th>
                    <th className="ml-5">{ dato[1] }</th>
                </tr>
            )
        });

        /*
        let next_ofert = () => {
            return (
                <p>{ this.precio * 1.05 }</p>
                )
        }
         */
        return (
            <div className="app flex-row align-items-center">
                <Container className="px-md-0 pl-md-4 pl-lg-4">
                    <CardGroup>
                        <Card className="p-0 shadow">
                            <br/>
                            <CardBody className="text-center">
                                <Row>
                                    <Col>
                                        <h3><b>Precio Actual</b></h3>
                                        <h1 className="rounded-pill text-center border border-success bg-success">
                                            $ { this.precio }
                                        </h1>
                                    </Col>
                                </Row>
                                <br/>
                                <Row>
                                    <Col>
                                        <h5>Tabla de información</h5>
                                        <Table  responsive={true} className="text-left table-striped">
                                            <tbody>
                                                { data_table }
                                            </tbody>
                                        </Table>
                                    </Col>
                                </Row>
                            </CardBody>
                            <CardFooter className="justify-content-center align-content-center text-center">
                                <Row>
                                    <Col>
                                        <Button className="btn btn-red btn-lg" onClick={this.Ofertar}>
                                            <b><h5>Ofertar con ${ this.precio }</h5></b>
                                        </Button>
                                    </Col>
                                </Row>
                            </CardFooter>
                        </Card>
                    </CardGroup>
                </Container>
            </div>
        );
    }
}

export default DataAuction;


/*
<CardHeader className="text-uppercase">
                                <h6><small className="text-muted text-sm-left">{ this.pretitle }</small></h6>
                                <Row>
                                    <Col>
                                        <CardTitle><h4>{ this.title }  </h4></CardTitle>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <CardSubtitle><small>{ this.subtitle }</small></CardSubtitle>
                                    </Col>
                                </Row>
                            </CardHeader>
 */
