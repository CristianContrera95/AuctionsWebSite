import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';

class TermsAndConditions extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MDBContainer>
                <MDBModal isOpen={this.props.modal} toggle={this.props.toggle}>
                    <MDBModalHeader toggle={this.props.toggle} style={{backgroundColor:'#0099CC',color: 'black'}}>
                        Términos y Condiciones
                    </MDBModalHeader>
                    <MDBModalBody  style={{color: 'black'}}>

                        <h2 style={{color:'#065fb1'}}>Términos y condiciones</h2>
                            Este documento describe los términos y condiciones generales
                            (en adelante los "Términos y Condiciones") y las políticas de privacidad
                            (en adelante las “Políticas de Privacidad”) aplicables al acceso y uso de los servicios
                            (en adelante los “Servicios") ofrecidos dentro del sitio www.subastasenweb.com.
                            Cualquier persona que desee acceder y/o usar el sitio o los servicios podrá hacerlo,
                            entendiéndose que al hacerlo está sujetándose a estos Términos y Condiciones,
                            junto con todas las demás políticas y principios que rigen www.subastasenweb.com y
                            que son incorporados al presente por referencia directa o indirecta.
                            En consecuencia, todas las visitas que se realicen a este sitio, como asimismo sus
                            efectos jurídicos, quedarán regidos por estas reglas y sometidos a la legislación aplicable
                            en la República Argentina.<br/><br/>

                        <h2 style={{color:'#065fb1'}}>Objeto</h2>
                            www.subastasenweb.com es un sitio web que facilita a los Usuarios el acceso y la utilización
                            de diversos servicios y contenidos relacionados con la búsqueda de bienes y servicios
                            (nuevos y/o usados), propios, de terceros y/o compartidos exhibiendo el detalle de los
                            mismos y fotografías digitales, la realización de subastas privadas y/o ventas privadas
                            efectuadas por particulares, siendo el presente portal de www.subastasenweb.com como
                            a los fines de facilitar la oferta pública de bienes y servicios para su venta y adjudicación
                            por cualquier oferente. El portal www.subastasenweb.com se exime de cualquier tipo de
                            responsabilidad y/o consecuencia jurídica que pudiera derivarse del resultado de una subasta
                            producida, ya que el portal www.subastasenweb.com simplemente es un intermediario de tal
                            operación, acercando y dando a conocer tanto al propietario del bien como a los oferentes y
                            teniendo como único fin de producir una unión de partes a los fines de consolidar la
                            adjudicación y posterior pago de la misma.
                            Los términos y condiciones contenidos en este instrumento se aplicarán y se entenderán como
                            formando parte de todos los actos que se ejecuten en este sitio web.<br/><br/>

                            <h2 style={{color:'#065fb1'}}>Capacidad</h2>
                            Los Servicios ofrecidos por www.subastasenweb.com sólo están disponibles para personas que
                            tengan capacidad legal para contratar. No podrán utilizar los servicios las personas que no
                            tengan esa capacidad y los menores de edad. Los actos que éstos realicen en este sitio serán
                            responsabilidad de sus padres, tutores, encargados o curadores, y por tanto se considerarán
                            realizados por éstos en ejercicio de la representación legal con la que cuentan.
                            CUALQUIER PERSONA QUE NO ACEPTE ESTOS TÉRMINOS Y CONDICIONES, LOS CUALES TIENEN UN CARÁCTER
                            OBLIGATORIO Y VINCULANTE, DEBERÁ ABSTENERSE DE UTILIZAR EL SITIO Y/O LOS SERVICIOS.
                            El Usuario debe actuar con total discernimiento, intensión y libertar a los fines de leer,
                            entender y aceptar todas las condiciones establecidas en los Términos y Condiciones Generales
                            y en las Políticas de Privacidad de www.subastasenweb.com así como en los demás documentos
                            incorporados a los mismos por referencia, previo a su entrega de cualquier dato con cualquier
                            fin y/o uso de cualquier Servicio. Si utiliza este Sitio significa que ha aceptado plenamente
                            las condiciones establecidas en los Términos y Condiciones y en las Políticas de Privacidad
                            de www.subastasenweb.com, y por ello, queda obligado a cumplir expresamente con las mismas.<br/><br/>

                        <h2 style={{color:'#065fb1'}}>Condiciones de acceso</h2>
                        El acceso al sitio atribuye al ingresante la condición de “Usuario” del mismo. Es
                        responsabilidad exclusiva del Usuario la veracidad, exactitud, vigencia y actualización de los
                        Datos Personales ingresados.
                        El Usuario que complete el formulario de contacto es considerado como Usuario Registrado.
                        www.subastasenweb.com se reserva el derecho de modificar los formularios de contacto, debiendo
                        los usuarios adecuar la información proporcionada por ellos a todo momento que le sea requerido.
                        Asimismo, www.subastasenweb.com podrá solicitar comprobantes y/o información adicional a los
                        efectos de corroborar la veracidad, exactitud, vigencia y actualización de los Datos Personales,
                        pudiendo suspender, temporal o definitivamente, aquellos Usuarios cuyos datos no hayan podido
                        ser comprobados. El Usuario que no completa el formulario de contacto y accede al sitio, será
                        considerado como Usuario Libre.
                        UTILIZACION: El Usuario, registrado o libre, será responsable por todos los usos que le dé al
                        sitio. El Usuario reconoce que los elementos, utilidades y materiales integrados dentro del sitio
                        de www.subastasenweb.com están protegidos por la legislación sobre derechos de autor. En
                        consecuencia, el Usuario se compromete a respetar estos Términos y Condiciones, siendo el único
                        responsable de su incumplimiento frente a Terceros, haciéndose en consecuencia penal, civil y
                        administrativamente responsable por dicha acción antijurídica.
                        El Usuario reconoce que la reproducción, copia, modificación, distribución, comercialización,
                        descompilación, desensamblado, utilización de técnicas de ingeniería inversa o de cualquier otro
                        medio para obtener el código fuente, transformación o publicación de cualquier resultado de
                        pruebas de referencias no autorizadas de cualquiera de los elementos, utilidades y productos
                        integrados y ofrecidos dentro del sitio de www.subastasenweb.com constituye una infracción de
                        los derechos de propiedad intelectual, obligándose, en consecuencia, a no realizar ninguna de
                        las acciones mencionadas o cualquier otra que de cualquier manera pudiera infringir los derechos
                        de propiedad intelectual de www.subastasenweb.com.
                        El Usuario entiende que www.subastasenweb.com puede publicar y ofrecer bienes, servicios
                        (nuevos y/o usados), propios, de terceros y/o compartidos exhibiendo el detalle de los mismos y
                        fotografías digitales, la realización de subastas público-privadas y/o ventas privadas
                        efectuadas, inmuebles propios y/o compartidos, acercando ofertas de venta previamente concedidas
                        por sus respectivos propietarios y/o autorizados, quienes, a su vez, facultan, directamente a
                        www.subastasenweb.com a publicar sus ofertas.a
                        Por lo tanto, el Usuario entiende que www.subastasenweb.com no será responsable por ninguna
                        oferta y/o aviso que pudiera aparecer como resultado del uso del sitio. El Usuario se obliga a
                        no utilizar el sitio de www.subastasenweb.com para realizar o sugerir actividades prohibidas por
                        la ley, contrarias a la moral o a las buenas costumbres.
                        El Usuario se abstendrá de llevar a cabo cualquier conducta en el uso del sitio de
                        www.subastasenweb.com que atente contra los derechos de propiedad intelectual o industrial de
                        www.subastasenweb.com y/o de terceros, o que vulnere o transgreda el honor, la intimidad
                        personal o familiar o la imagen de terceros, o que sean ilícitos o atenten a la moralidad, y
                        dejará en todo caso indemne a www.subastasenweb.com frente a cualquier reclamo, judicial o
                        extrajudicial que se presente frente a estos como consecuencia de dicho uso.
                        El Usuario se abstendrá de llevar a cabo por medio del uso del sitio cualquier destrucción,
                        , inutilización o daños de los datos, programas o documentos electrónicos pertenecientes a
                        www.subastasenweb.com y/o a terceros, así como de introducir o difundir en la Red “programas”,
                        “virus”, “applets”, “controles Active X” o cualquier instrumento o dispositivo físico o
                        electrónico que causen o sean susceptibles de causar cualquier tipo de alteración en la Red,
                        en el sistema, o en los equipos de terceros. Igualmente, queda expresamente prohibida cualquier
                        tipo de actividad o práctica que transgreda los principios de buena conducta aceptados
                        generalmente entre los Usuarios de Internet. Así mismo, quien realice actividades prohibidas
                        por los presentes Términos y Condiciones será penal y económicamente responsable por los daños producidos.
                        <br/><br/>

                        <h2 style={{color:'#065fb1'}}>Protección de datos personales</h2>
                        Al registrarse y/o navegar el Sitio, el Usuario Registrado y/o Libre brinda información
                        personal, prestando su consentimiento libre, expreso e informado para que la misma sea recogida
                        y almacenada directamente en nuestra base de datos, encontrándose protegida electrónicamente,
                        utilizando los mecanismos de seguridad informática de protección de la información más completos
                        y eficaces para mantenerla en total confidencialidad, conforme a la Ley Nº 25.326 de Hábeas Data,
                        no obstante lo cual, El titular de los Datos Personales tiene la facultad de ejercer el derecho
                        de acceso a los mismos en forma gratuita a intervalos no inferiores a seis meses, salvo que se
                        acredite un interés legítimo al efecto conforme lo establecido en el artículo 14, inciso 3 de la
                        ley 25.326; asimismo, toda persona tiene derecho a que sean rectificados, actualizados y, cuando
                        corresponda suprimidos o sometidos a confidencialidad los Datos Personales de los que sea
                        titular, que estén incluidos en un banco de datos (artículo 16 de la ley25.326); siendo la
                        DIRECCION NACIONAL DE PROTECCION DE DATOS PERSONALES, el Órgano de Control de la Ley N° 25.326,
                        tiene la atribución de atender las denuncias y reclamos que se interpongan con relación al
                        incumplimiento de las normas sobre protección de datos personales (Artículo 2 de la Disposición
                        10/08 de la Dirección Nacional de Protección de Datos Personales).
                        <br/><br/>

                        <h2 style={{color:'#065fb1'}}>Declaraciones</h2>
                        Los Usuarios expresamente comprenden, aceptan y están de acuerdo en que: El sitio puede contener errores.
                        www.subastasenweb.com no será responsable por ningún daño o perjuicio, directo o indirecto,
                        incluyendo, sin ningún tipo de limitación, daños producidos por la pérdida y/o deterioro de la
                        información y/o por el uso del sitio.
                        La utilización del sitio y de Internet en general implica la asunción de riesgos de potenciales
                        daños al software y/o hardware del Usuario. Por tal motivo, el equipo Terminal desde el cual
                        acceda al sitio el Usuario estaría en condiciones de ser atacado y dañado por la acción de
                        hackers quienes podrían incluso acceder a la información contenida en el equipo Terminal del
                        Usuario, extraerla, sustraerla y/o dañarla. Los Usuarios renuncian expresamente a efectuar reclamos
                        por estos motivos.
                        El intercambio de información a través de Internet tiene el riesgo de que tal información pueda
                        ser captada por terceros. El sitio no se hace responsable de las consecuencias que pudiera
                        acarrear al Usuario tal hipótesis. www.subastasenweb.com no guarda obligación alguna de
                        conservar información que haya hecho disponible a los Usuarios ni que le haya sido enviada por
                        éstos últimos.
                        <br/><br/>

                        <h2 style={{color:'#065fb1'}}>Marcas registradas</h2>
                        www.subastasenweb.com es marca registrada. Se prohíbe su uso sin autorización previa de sus
                        titulares.
                        <br/><br/>

                        <h2 style={{color:'#065fb1'}}>Ley aplicable y jurisdicción</h2>
                        Los presentes Términos y Condiciones y las normas que lo complementan se regirán por las leyes
                        de la República Argentina, siendo competentes para cualquier controversia que pudiere llegar a
                        suscitarse, los Tribunales Ordinarios Civil y Comercial de la Ciudad de Rio Tercero.
                        Cualquier persona que no acepte estos términos y condiciones generales, los cuales tienen un
                        carácter obligatorio y vinculante, deberá abstenerse de utilizar el sitio y/o los servicios.
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="info" onClick={this.props.toggle} className=''>
                            Ok!
                        </MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
        );
    }
}

export default TermsAndConditions;