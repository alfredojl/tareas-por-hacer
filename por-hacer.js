const fs = require('fs');
const colors = require('colors');
const { rejects } = require('assert');
const { resolve } = require('path');
const { isUndefined } = require('util');

let listado = [];

const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    listado.push(porHacer);

    guardar();

    return porHacer;
}

const cargarDB = () => {

    try {

        listado = require('./Tareas/tareas.json');

    } catch (error) {

        listado = [];
    }


}

const guardar = () => {

    let data = JSON.stringify(listado);

    fs.writeFile('./Tareas/tareas.json', data, (e) => {
        if (e) throw new Error("No se pudo guardar la información.");
    });
}

let getListado = (c = undefined) => {
    cargarDB();

    if (c !== undefined) {

        let nuevo = listado.filter(newdata => newdata.completado === c);
        return nuevo;

    } else {
        return listado;
    }
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();

    let index = listado.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        listado[index].completado = completado;
        guardar();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {
    cargarDB();

    let nuevo = listado.filter(newdata => newdata.descripcion !== descripcion);

    if (nuevo.length === listado.length)
        return false
    else {
        listado = nuevo;
        guardar();
        return true;
    }
}

module.exports = {
    crear,
    guardar,
    getListado,
    actualizar,
    borrar
}