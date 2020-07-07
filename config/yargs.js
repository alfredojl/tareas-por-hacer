const { demand } = require('yargs');

const descripcion = {
    alias: 'd',
    demand: true
};
const completado = {
    alias: 'c',
};

const argv = require('yargs')
    .command('crear', 'Crea una tarea', {
        descripcion
    })
    .command('listar', 'Lista todas las tareas.', {
        completado
    })
    .command('actualizar', 'Actualiza el estado de una tarea', {
        descripcion,
        completado
    })
    .command('borrar', 'Borra una tarea con la descripción dada.', {
        descripcion
    })
    .help()
    .argv;

module.exports = {
    argv
}