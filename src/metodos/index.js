import Conceptos from '@/services/Conceptos';
import Pedidos from '@/services/Pedidos';

//metodos para agregar (probando)
//intento de hacer que todos los metodos esten en un archivo asi solo se accede a este metodo
//desde el archivo y no se copia a cada rato los metodos

//Nota: el peo es la reactividad y ver si el return no causa problemas
//Fase de pruebas

let getExistenciaConcepto = (id) => {
    Conceptos().get(`${id}/depositos`).then((response) => {
        return response.data.data;
    }).catch(e => {
        return e;
    });
};

let postPedidos = (data,data1) => {
    Pedidos().post("/",{data,data1}).then((response) => {
        return response.data.data;
    }).catch(e => {
        return e;
    });
};

let postDetallePedidos = (data,id) => {
    Pedidos().post(`/${id}/detalles`,{data}).then((response) => {
        return response.data.data;
    }).cathc(e => {
        return e;
    })
};

export default {
    getExistenciaConcepto,
    postPedidos,
    postDetallePedidos
}