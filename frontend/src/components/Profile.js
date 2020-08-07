import React, {Component} from 'react';
import {
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCardTitle,
    MDBCol,
    MDBListGroupItem,
    MDBTable, MDBIcon,
} from 'mdbreact';
import { ofertas } from "../data/ofertasenvivo";
import AuthService from "../utils/AuthService";
import config from "../config";


class Profile extends Component {

    constructor (props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            dni_type:'',
            dni:'',
            province: '',
            city: '',
            sex: '',
            bdate:'',
            phone :'',
            mStatus :'',
            address : '',
            email: '',
            offer_started: [],
            offer_finished: [],
        };
        this.Auth = new AuthService();
        this.username = this.Auth.getUsername();
        this.submitHandler = this.submitHandler.bind(this);
        this.get_tables = this.get_tables.bind(this);
        this.get_tables();
    }

    get_tables () {
        fetch(
            config["api"]['BACKEND_ENDPOINT']+'/api/offer/user?username='+this.username,
            {
                headers: {
                    'Content-Type': 'text/json',
                },
                method: 'GET',
            }
        ).then(data => {return data.json()}
        ).then(res => {
                this.setState({
                    offer_started: res['data']['offers']['started'],
                    offer_finished: res['data']['offers']['finished'],
                })
            }
        ).catch(e => {
                this.props.history.push('/mi_perfil');
            }
        )
    }


    submitHandler = () => {
        // recibimos los datos del backend
        fetch(
            config["api"]['BACKEND_ENDPOINT']+'/api/mi_perfil?username='+this.username,
            {
                headers: {
                    'Content-Type': 'text/json',
                },
                mode: 'cors',
                method: 'GET',
                }
        ).then(data => {return data.json()}
        ).then(res => {
            this.setState({...res['data']['user']})
            // Object.keys(res['data']['user'])
        }
        ).catch(e => {
                this.props.history.push('/mi_perfil');
            }
        )
    };


render() {
    if (this.state.firstname === '') {
        this.submitHandler()
    }
    return (
<div>
   <MDBRow className="mt-4 col-12 " style={{height:'400%'}}>
      <MDBCol style={{ maxWidth: "20rem"}} className="form-control-plaintext">
          <MDBCard>
             <MDBCardImage className="img-fluid ml-3" src="https://www.rasoyasociados.com/se/wp-content/uploads/2018/01/sin-imagen-2.png" />
             <MDBCardBody className="col-12">
                <MDBRow>
                    <MDBCol><MDBCardTitle>
                        <MDBIcon className='mt-1' icon={'id-card'} style={{color: '#000000'}}/> Perfil
                    </MDBCardTitle></MDBCol>
                    <MDBCol className='text-right'>
                        <a href='/mi_perfil' style={{color: 'black'}}><i className="far fa-edit" /></a>
                    </MDBCol>
                </MDBRow>
                <MDBListGroupItem><i className="text-muted" /><b>{this.state.firstname}</b></MDBListGroupItem>
                <MDBListGroupItem><i className="text-muted" /><b>{this.state.lastname}</b></MDBListGroupItem>
                <MDBListGroupItem><i className="text-muted" /><b>{this.state.email}</b></MDBListGroupItem>
                <MDBListGroupItem><i className="text-muted" >Direccion: </i>{this.state.address}</MDBListGroupItem>
                <MDBListGroupItem><i className="text-muted" >Provinica: </i>{this.state.province}</MDBListGroupItem>
                <MDBListGroupItem><i className="text-muted" >Telefono: </i>{this.state.phone}</MDBListGroupItem>
                 <div className='ml-2 mt-3'>
                     <a style={{color:'black'}} href='/change_password' >
                        * Cambiar contraseña
                     </a>
                 </div>
             </MDBCardBody>

          </MDBCard>
     </MDBCol>
   <MDBCol className=" mt-2 col-9 " >
       <MDBCard>
         <MDBCardBody className="" style={{ width: '100%' }} >
             <h5>Ofertas activas</h5>
             <hr />
           <MDBTable hover responsive={true} className="table-striped">
               <thead className="thead-dark text-center">
                   <tr className="">
                       <th><b>#</b></th>
                       <th><b>Oferta</b></th>
                       <th><b>Subasta</b></th>
                       <th><b>Hora</b></th>
                       <th><b>Fecha oferta</b></th>
                       <th><b>Fin de subasta</b></th>
                   </tr>
               </thead>
               <tbody className="text-center ">
               {this.state.offer_started.map((offer, index) => {
                   return (
                   <tr className="ml-5 bg-light" style={{ color: "#000000" }}>
                       <th className="ml-5">{index+1}</th>
                       <td className="ml-5 "><b>$ {offer['offer'].toLocaleString()}</b></td>
                       <td className="ml-5">
                           <a href={'/detail/'+offer['auction_id']}><b>{offer['auction']}</b></a>
                       </td>
                       <td className="ml-5">{offer['date']}</td>
                       <td className="ml-5">{offer['time']}</td>
                       <td className="ml-5">{offer['end_date']}</td>
                   </tr>
                   )
               })}
               </tbody>
            </MDBTable>
             </MDBCardBody>
         </MDBCard>
       <hr />
       <MDBCard>
           <MDBCardBody className="" style={{ width: '100%' }} >
               <h5>Ofertas finalizadas</h5>
               <hr />
               <MDBTable hover responsive={true}  className="table-striped table-dark">
                   <thead  className="thead-dark text-center">
                   <tr className="">
                       <th ><b>#</b></th>
                       <th ><b>Oferta</b></th>
                       <th><b>Terreno</b></th>
                       <th><b>Precio final</b></th>
                       <th><b>Hora</b></th>
                       <th><b>Fin de subasta</b></th>
                   </tr>
                   </thead >
                   <tbody className="text-center text-dark" style={{ backgroundColor: "#7BEC5D" }}>
                   { this.state.offer_finished.map((offer, index) => {
                       return (
                           <tr className="ml-5">
                               <th className="ml-5">{index+1}</th>
                               <td className="ml-5 ">{offer['offer'].toLocaleString()}</td>
                               <td className="ml-5">
                                   <a href={'/detail/'+offer['auction_id']}><b>{offer['auction']}</b></a>
                               </td>
                               <td className="ml-5">{offer['date']}</td>
                               <td className="ml-5">{offer['time']}</td>
                               <td className="ml-5">{offer['end_date']}</td>
                           </tr>
                       )
                   })}

                   </tbody>
               </MDBTable>
           </MDBCardBody>
       </MDBCard>
     </MDBCol>

   </MDBRow>
</div>

  )
}
}

export default Profile;
