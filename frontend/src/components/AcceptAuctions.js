import React, {Component} from 'react';
import {
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCardTitle,
    MDBCol,
    MDBListGroupItem,
    MDBTable,
} from 'mdbreact';
import { ofertas } from "../data/ofertasenvivo";
import AuthService from "../utils/AuthService";
import config from "../config";


class AcceptAuctions extends Component {

    constructor (props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            dni_type:'',
            dni:'',
            province: '',
            city: '',
            bdate:'',
            phone :'',
            email: '',
            offer_id:'',
            offer_finished: [],
        };
        this.Auth = new AuthService();
        this.username = this.Auth.getUsername();
        this.submitHandler = this.submitHandler.bind(this);
        this.submitHandlerDelete = this.submitHandlerDelete.bind(this);
        this.acceptArgs = this.acceptArgs.bind(this);
        this.get_tables = this.get_tables.bind(this);
        this.get_tables();
    }

    get_tables () {
        fetch(
            config["api"]['BACKEND_ENDPOINT']+'/api/offer_finished',
            {
                headers: {
                    'Content-Type': 'text/json',
                },
                method: 'GET',
            }
        ).then(data => {return data.json()}
        ).then(res => {
                this.setState({ offer_finished : res['data']['offers'] })
            console.log(res)
            }
        ).catch(e => {
            console.log("Fail");
            }
        )
    }

    submitHandler = (event, index) => {
        event.target.className += ' was-validated';
        // enviamos los datos al backend
        event.preventDefault()
        let offer_id = this.state.offer_finished[index]['offer_id']
        fetch(
            config["api"]['BACKEND_ENDPOINT']+'/api/offer_finished',
            {
                headers: {
                    Accept: 'application/json',
                    authorization: this.Auth.getToken(),
                },
                method:  'POST' ,
                body: JSON.stringify({
                    offer_id: offer_id
                })
            }
        ).then(data => {return data.json()}
        ).then(res => {
            if(res.code === 200){
                window.location.reload();
            }
        }).catch(error => {
            console.log("Fail", error);
        });
    };


    submitHandlerDelete = (event, index) => {
        event.target.className += ' was-validated';
        // enviamos los datos al backend
        event.preventDefault()
        let offer_id = this.state.offer_finished[index]['offer_id']
        fetch(
            config["api"]['BACKEND_ENDPOINT']+'/api/offer_finished',
            {
                headers: {
                    Accept: 'application/json',
                    authorization: this.Auth.getToken(),
                },
                method:  'PUT' ,
                body: JSON.stringify({
                    offer_id: offer_id
                })
            }
        ).then(data => {return data.json()}
        ).then(res => {
            if(res.code === 200){
                window.location.reload();
            }
        }).catch(error => {
            console.log("Fail", error);
        });
    };


    deletArgs(index, name){
        var new_list = this.state[name]
        new_list.pop(index)
        this.setState({
            name: new_list,
        })
    }

    acceptArgs(index, name){
        var new_list = this.state[name]
        new_list.push(index)
        this.setState({
            name: new_list,
        })
    }


    render() {
        return (
            <MDBCol >
                <MDBRow className="mt-4 ml-2 col-12 " style={{height:'400%'}}>
                    <MDBCol className=" mt-2 col-12 " >
                        <MDBCard >
                            <MDBCardBody className="" style={{ width: '100%' }} >
                                <h5>Ofertas para Aceptar</h5>
                                <hr />
                                <MDBTable hover responsive={true} className="table-striped">
                                    <thead className="thead-dark text-center">
                                    <tr className="">
                                        <th><b>#</b></th>
                                        <th><b>Nombre</b></th>
                                        <th><b>Oferta</b></th>
                                        <th><b>Subasta</b></th>
                                        <th><b>Hora</b></th>
                                        <th><b>Fecha oferta</b></th>
                                        <th><b>Opciones</b></th>
                                    </tr>
                                    </thead>
                                    <tbody className="text-center ">
                                    {this.state.offer_finished.map((offer, index) => {
                                        return (
                                            <tr className="ml-5 bg-light" style={{ color: "#000000" }}>
                                                <th className="ml-5">{index+1}</th>
                                                <td className="ml-5">{offer['username']}</td>
                                                <td className="ml-5 "><b>$ {offer['amount'].toLocaleString()}</b></td>
                                                <td className="ml-5">
                                                    <a href={'/detail/'+offer['auction_id']}>
                                                        <b>{offer['auction']}</b></a>
                                                </td>
                                                <td className="ml-5">{offer['date']}</td>
                                                <td className="ml-5">{offer['time']}</td>
                                                <MDBCol className='mt-2 text-center'>
                                                    <a className='btn green' style={{color:'black'}}
                                                       onClick={(e) => this.submitHandler(e, index)}>Aceptar</a>

                                                    <a className='btn danger-color-dark ml-2 ' style={{color:'black'}}
                                                       onClick={(e) => this.submitHandlerDelete(e, index)} >Denegar</a>
                                                </MDBCol>
                                            </tr>
                                        )
                                    })}
                                    </tbody>
                                </MDBTable>
                            </MDBCardBody>
                        </MDBCard>
                        <hr />
                    </MDBCol>
                </MDBRow>
            </MDBCol>
        )
    }
}
export default AcceptAuctions;