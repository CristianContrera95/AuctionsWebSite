import React from "react";
import { BrowserRouter } from 'react-router-dom';
import { MDBNav, MDBNavItem } from "mdbreact";

export default  (in_detail) => (
    <BrowserRouter >
        <MDBNav  className="md-col-12 justify-center text-center bg-dark"
                 style={{ width:"100%",  "min-height": "54px"}}
                 >
            <MDBNavItem className="col-md-3 mt-2 pt-1">
                <a style={{color:"white"}} href="/home/Mueble">
                    <i className="fas fa-couch" style={{color: "#1DA1F2"}}/> Muebles </a>
            </MDBNavItem>
            <MDBNavItem className="col-md-3 mt-2 pt-1">
                <a style={{color:"white"}} href="/home/Inmueble">
                    <i className="fas fa-home" style={{color: "#1DA1F2"}}/> Inmuebles </a>
            </MDBNavItem>
            <MDBNavItem className="col-md-3 mt-2 pt-1">
                <a style={{color:"white"}} href="/home/Vehiculo">
                    <i className="fas fa-car" style={{color: "#1DA1F2"}}/> Vehiculos </a>
            </MDBNavItem>
            <MDBNavItem className="col-md-3 mt-2 pt-1">
                <a style={{color:"white"}} href="/Otro">
                    <i className="fas fa-gift" style={{color: "#1DA1F2"}}/> Otros </a>
            </MDBNavItem >
        </MDBNav>
    </BrowserRouter>
);