import React, { useState } from "react";
import {
	Card,
	CardBody,
	Collapse,
	Button,
	Col
} from 'reactstrap';


const faq_list = [
	{
		'number': '+',
		'title' : '¿Puedo subastar?.',
		'answer': 'La subasta es pública a personas físicas mayores de 18(dieciocho) años y a personas jurídicas, ' +
			'desde que acepten y cumplan las reglas establecidas en el Contrato de Adhesión del Usuario y en las' +
			' condiciones de venta y pago de la subasta'
	},
	{
		'number': '+',
		'title' : 'Precio base o de inicio',
		'answer': 'El precio BASE O DE INICIO es el precio de partida de la subasta. Nadie podrá pujar por debajo de él.'
	},
	{
		'number': '+',
		'title' : '¿Como pagar por los productos adquiridos?',
		'answer': 'El pago de los productos comprados puede realizarse por transferencia bancaria. Los pagos realizados' +
			' a través de transferencia bancaria deben enviar el comprobante por email o WhatsApp.'
	},
	{
		'number': '+',
		'title' : '¿Puedo verificar los productos subastados?',
		'answer': 'Todos los productos subastados pueden verificarse por los interesados. Para visitar el lote, auto ' +
			'o producto que te interesa, debes contactarte con nuestro representante de Atención al Cliente de lunes a ' +
			'viernes, de las 08:30 a la 17:30 hs al 3571-573482 o por email a  subastasenweb.contact@gmail.com indicando' +
			' que subasta es de tu interés y horario disponible para la visita.'
	},
	{
		'number': '+',
		'title' : '¿Como me registro?',
		'answer': 'Para participar en los eventos de la web, es necesario que primero te registres y crees tu usuario. ' +
			'Para hacerlo, dirígete a la sección Registrarte en la parte superior de la pantalla principal y llena los ' +
			'datos solicitados. Una vez concluido, vas a recibir un mail para verificar tu cuenta: hacé click sobre el' +
			' link enviado para la confirmación para asi comenzar a operar.'
	},
	{
		'number': '+',
		'title' : '¿Cómo ofertar?',
		'answer': 'El participante debe registrarse y así estará habilitado a participar en la subasta. Hay reglas y ' +
			'condiciones específicas para participar de las subastas. Estas condiciones pueden ser específicas para' +
			' todas las subastas o a grupos de ofertas en una misma subasta. De cualquier manera, durante la ' +
			'habilitación de participación, el interesado deberá leer y aceptar en tales reglas o condiciones de venta.'
	},
	{
		'number': '+',
		'title' : 'Qué garantias ofrece SUBASTAS EN WEB en todo el proceso.',
		'answer': 'SUBASTAS EN WEB interviene y supervisa toda la operativa de la Subasta, la promoción de la misma, su procedimiento y culminación con la firma de los instrumentos públicos y/o privados correspondientes' +
			', con el debido asesoramiento legal y jurídico.'
	},

];

const Faqs = () => {
	const [isOpen1, setIsOpen1] = useState(false);
	const [isOpen2, setIsOpen2] = useState(false);
	const [isOpen3, setIsOpen3] = useState(false);
	const [isOpen4, setIsOpen4] = useState(false);
	const [isOpen5, setIsOpen5] = useState(false);
	const [isOpen6, setIsOpen6] = useState(false);
	const [isOpen7, setIsOpen7] = useState(false);
  	const toggle1 = (e) =>{
			faq_list[e.target.id]['number'] = !isOpen1 ? '-' : '+'
			setIsOpen1(!isOpen1)
	};
  	const toggle2 = (e) =>{
		faq_list[e.target.id]['number'] = !isOpen2 ? '-': '+'
  		setIsOpen2(!isOpen2)
	};
  	const toggle3 = (e) => {
		faq_list[e.target.id]['number'] = !isOpen3 ? '-': '+'
  		setIsOpen3(!isOpen3)
	};
	const toggle4 = (e) => {
		faq_list[e.target.id]['number'] = !isOpen4 ? '-': '+'
		setIsOpen4(!isOpen4)
	};
	const toggle5 = (e) => {
		faq_list[e.target.id]['number'] = !isOpen5 ? '-': '+'
		setIsOpen5(!isOpen5)
	};
	const toggle6 = (e) => {
		faq_list[e.target.id]['number'] = !isOpen6 ? '-': '+'
		setIsOpen6(!isOpen6)
	};
	const toggle7 = (e) => {
		faq_list[e.target.id]['number'] = !isOpen7 ? '-': '+'
		setIsOpen7(!isOpen7)
	};
  	const toggle_list = [toggle1, toggle2, toggle3, toggle4, toggle5, toggle6, toggle7]
	const isOpen_list = [isOpen1, isOpen2, isOpen3, isOpen4, isOpen5, isOpen6, isOpen7]
	return (
	    <div className='my-5'>
		  {/*<Card>*/}
	      {/*   <CardImg  src="https://segurosypensionesparatodos.fundacionmapfre.org/syp/es/images/preguntas-892x350_tcm558-548340.png" alt="Card image cap" />*/}
			{/* <div class="card-img-overlay mt-5">*/}
			{/*	<h1 class="text-center mt-5">Preguntas Frecuentes</h1>*/}
			{/* </div>*/}
	      {/*</Card>*/}
			<h1 className="text-left ml-4 mt-5">Preguntas Frecuentes</h1>
	      <hr className="d-inline-block info-color-dark" style={{ width: "100%" }}/>
	      <div className=" justify-content-center text-center py-5">
			  <Col className="text-left" >
				{faq_list.map((faqs, idx) =>
					<div className="mt-4">
						<Button color='link' id={idx} style={{color: 'black', fontSize:'20px', textDecoration: 'none'}} onClick={toggle_list[idx]} >
							{faqs['number']} {faqs['title']}
						</Button>
						<Collapse isOpen={isOpen_list[idx]}>
							<Card>
								<CardBody>
									{faqs['answer']}
								</CardBody>
							</Card>
						</Collapse>
						<br/>
					</div>
				)}
			  </Col>
		  </div>
	    </div>
	);
}

export default Faqs;
