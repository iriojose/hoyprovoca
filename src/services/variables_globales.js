
const header    = process.env.VUE_APP_HEADER;
const http      = process.env.VUE_APP_SERVE_REQUEST;
const data      = process.env.VUE_APP_SERVICIO_DATA;
const auth      = process.env.VUE_APP_SERVICIO_AUTH;
const image     = process.env.VUE_APP_SERVICIO_IMAGES;
const imagen    = process.env.VUE_APP_SERVICIO_IMAGEN;
const tenant_id = process.env.VUE_APP_TENANT_ID;

export default { image, data, auth, header, imagen, http,tenant_id };