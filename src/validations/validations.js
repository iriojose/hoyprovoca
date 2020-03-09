let required = (properType) => {
    return v => v && v.length > 0 || `debe ingresar un ${properType}`
}

let minLength = (properType,minLength) => {
    return v => v && v.length >= minLength || `${properType} debe tener al menos ${minLength}`
}

let maxLength = (properType,maxLength) => {
    return v => v && v.length <= maxLength || `${properType} debe ser menor que ${maxLength}`
}

let emailFormat = () => {
    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/ 

    return v => v && regex.test(v) || `debe ingresar un Correo Electrónico válido`;
}

let number = (properType) => {
    let regex =  /^[1-9]\d$/ 
    return v => v && regex.test(v) || `${properType} debe ser solo numerico`;
}

let cedula = (properType) => {
    let regex = /^[V|E|J|P][0-9]{5,9}$/ 
    return v => v && regex.test(v) || `${properType} incorrecta`
}

//incompleto, falta expresion regular para los 4 primeros numeros del telefono
let telefonoFormat = () => {
    let regex= aa;
    return v => v && regex.test(v) || `debe ser un telefono válido`;
}

export default{
    required,
    minLength,
    maxLength,
    emailFormat,
    number,
    cedula
}