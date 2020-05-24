import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter, } from "mdbreact";


const FooterPage = () => {
  return (

    <MDBFooter tag="div" style={{backgroundColor:"#006064"}} className=" mt-4 bg-danger text-white">
      <MDBContainer fluid className="text-center mt-2 text-md-left bg-dark">
        <MDBRow>
          <MDBCol className="lg-2">
            <h4 className="text-uppercase mb-2 mt-3 font-weight-bold">Remates calamuchita</h4>
            <hr className="accent-1 mb-3 mt-2 d-inline-block mx-auto danger-color" style={{ width: "150px" }}  />
            <p>
            Todos los derechos reservados
            </p>
          </MDBCol>
          <MDBCol md="3">
          <h5 className="text-uppercase mb-2 mt-3 font-weight-bold">
            <strong>Contact</strong>
          </h5>
           <hr className="accent-2 mb-2 mt-0 d-inline-block mx-auto danger-color" style={{ width: "70px" }} />
           <div className="mr-4 ">
             <ul className="list-unstyled list-inline">
               <li className="list-inline-item">
                 <a href="https://www.facebook.com/" className="btn-floating btn-bg btn-fb mx-3 fa-2x">
                   <i className="fab fa-facebook-f" style={{color: "#4267B2"}}> </i>
                 </a>
               </li>
               <li className="list-inline-item">
                 <a href="https://twitter.com/login?lang=es"  className="btn-floating  btn-tw mx-3 fa-2x">
                   <i  className="fab fa-twitter" style={{color: "#1DA1F2"}}> </i>
                 </a>
               </li>
               <li  className="list-inline-item">
                 <a href="https://accounts.google.com/b/0/AddMailService" className=" btn-floating btn-gplus mx-3 fa-2x">
                   <i  className="fab fa-google" style={{color: "#D44638"}} aria-hidden="true"> </i>
                 </a>
               </li>
             </ul>
           </div>
          <p>
            <i className="fa fa-home mr-2 " /> Embalse de Calamuchita,Cordoba
          </p>
          <p>
            <a href={"mailto:info@example.com"} style={{color: "white"}}>
              <i className="fa fa-envelope mr-2" /> info@example.com
            </a>
          </p>
          <p>
            <a href={"tel:+ 54 351-856975"} style={{color: "white"}}>
              <i className="fa fa-phone  mr-2" /> + 54 351-856975
            </a>
          </p>
          <p>
            <a href={"tel:+ 54 351-2475869"} style={{color: "white"}}>
              <i className="fa fa-print  mr-2" /> + 54 351-2475869
            </a>
          </p>
        </MDBCol>
        </MDBRow>
      </MDBContainer>
        <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright <a href="home" style={{color:"black"}} > Remates Calamuchita </a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}

export default FooterPage;