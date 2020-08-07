import React, {Component} from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import TermsAndConditions from "../TermsAndConditions";
import Developer from "../Developer";


class Footer extends Component {
    constructor(props) {
      super(props);
      this.state = {
        modal2: false,
        modal: false,
      }
      this.toggle = this.toggle.bind(this)
      this.develop = this.develop.bind(this)
    }

  toggle = () => {
    this.setState({
      modal2: !this.state.modal2
    });
  }
  develop = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <MDBFooter tag="div" style={{backgroundColor:"#006064"}} className=" mt-4 bg-danger text-white">
        <MDBContainer fluid className="text-center mt-2 text-md-left bg-dark">
          <MDBRow>
            <MDBCol className="lg-2">
              <h4 className="text-uppercase mb-2 mt-3 font-weight-bold">Subastas en web</h4>
              <hr className="accent-1 mb-3 mt-2 d-inline-block mx-auto info-color-dark" style={{ width: "150px" }}  />
              <p>
              Todos los derechos reservados
              </p>
              <TermsAndConditions toggle={this.toggle} modal={this.state.modal2} />
                  <a style={{textDecorationLine : 'underline'}} onClick={this.toggle}>
                    Términos y condiciones
                  </a>
            </MDBCol>
            <MDBCol md="4" className='mx-auto' >
            <h5 className="text-uppercase mb-2 mt-3 font-weight-bold">
              <strong>Contacto</strong>
            </h5>
             <hr className="accent-2 mb-2 mt-0 d-inline-block mx-auto info-color-dark" style={{ width: "70px" }} />
             <div className="mr-4 ">
               <ul className="list-unstyled list-inline">
                 <li className="list-inline-item">
                   <a href="https://www.facebook.com/subastasenweb" className="btn-floating btn-bg btn-fb mx-3 fa-2x">
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
                 <li  className="list-inline-item">
                   <a href="https://www.instagram.com/subastasenweb" className=" btn-floating btn-gplus mx-3 fa-2x">
                     <i  className="fab fa-instagram" style={{color: "#ba68c8"}} aria-hidden="true"> </i>
                   </a>
                 </li>
               </ul>
             </div>
            <p>
              <i className="fa fa-home mr-2 " /> Embalse de Calamuchita,Cordoba
            </p>
            <p >
              <a href={"subastasenweb.contact@gmail.com"} style={{color: "white"}}>
                <i className="fa fa-envelope mr-2" />subastasenweb.contact@gmail.com
              </a>
            </p>
            <p>
              <a href={"tel:+ 54 351-856975"} style={{color: "white"}}>
                <i className="fa fa-phone  mr-2" /> + 54 3571-573482<br/>
                <i className="fa fa-phone  mr-2" /> + 54 351-6645348
              </a>
            </p>
          </MDBCol>
         </MDBRow>
          <div className='text-left bg-dark '>
            <Developer toggle={this.develop} modal={this.state.modal} />
            <i style={{textDecorationLine : 'underline'}} onClick={this.develop}>
              Desarrolladores
            </i>
          </div>
        </MDBContainer>

          <div className="footer-copyright info-color-dark text-center py-3">
          <MDBContainer  fluid style={{color:'black'}}>
            &copy; {new Date().getFullYear()} Copyright <a href="/home" style={{color:"black"}} > Subastas en web </a>
          </MDBContainer>
        </div>
      </MDBFooter>
    )
   }
  }

export default Footer;
