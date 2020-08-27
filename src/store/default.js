let pedido = 
	[
		{
			id: 1,
			adm_clientes_id: 7,
			rest_mesas_id: 0,
			rest_estatus_id: 1,
			estado: "0",
			cant_personas: 1,
			empresa: {
				nombre_comercial: "",
			},
			imagen: "default.png",
			adm_empresa_id: 2,
			detalles: [
				{
				id: 1,
				rest_pedidos_id: 1,
				adm_conceptos_id: 2,
				cantidad: "1",
				empresa: { nombre_comercial: "" },
				nombre: "0",
				precio: "0",
				imagen: "default.png",
				rest_estatus_id: 1,
				stock: 3,
				estado: "0",
				},
			],
		},
	];

let checkdata = 
	{
		emisor: "",
		receptor: "Jesus Bellorin",
		adm_pedidos_id: "",
		adm_tipo_pago_id: "",
		adm_status_id: "",
		monto: "",
		codigo_referencia: "",
		imagen: "",
		adm_clientes_id: "",
	};

let pedidoSelect = 
	{
		id: 1,
		rest_pedidos_id: 1,
		adm_conceptos_id: 2,
		cantidad: "1",
		empresa: { nombre_comercial: "" },
		nombre: "0",
		detalles: [],
		precio: "0",
		imagen: "default.png",
		rest_estatus_id: 1,
		stock: 3,
		estado: "0",
	};

let state = 
	{
		stepper: 1,
		total: 0,
		view: 1,
		stock: null,
		diferentes: null,
		restante: null,
		pedidoSelect: null,
		montos: ["0", "0"],
		pago: {},
		pedidos: null,
		data: null,
		pagoId: {},
	};

export default {
	state,
	pedidoSelect,
	checkdata,
	pedido
}
