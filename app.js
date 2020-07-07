// const argv = require('yargs').argv;

const argv = require('./config/yargs').argv;
const colors = require('colors');
const porHacer = require('./por-hacer');

let command = argv._[0];

switch (command) {
    case "crear":
        let tarea = porHacer.crear(argv.d);
        break;

    case "listar":
        if (argv.c === undefined) {
            var listado = porHacer.getListado();
        } else {
            var listado = porHacer.getListado(JSON.parse(argv.c));
        }
        console.log(`========Listar tareas.========`.magenta);
        for (let tarea of listado) {

            console.log(tarea.descripcion);
            if (tarea.completado === true)
                console.log("Estado: ", colors.bgGreen(tarea.completado));
            else
                console.log("Estado: ", colors.bgRed(tarea.completado));
            console.log("------------------------------".yellow);

        }
        console.log(`==============================`.magenta);
        break;

    case "actualizar":
        let status = porHacer.actualizar(argv.d, argv.c)
        if (status)
            console.log(`Tarea "${ argv.d }" actualizada a "${ argv.c }".`);
        else
            console.log("No se pudo actualizar.");
        break;

    case "borrar":
        if (porHacer.borrar(argv.d))
            console.log(`Tarea "${ argv.d }" eliminada correctamente.`);
        else
            console.log("La tarea no se pudo eliminar.");
        break;

    default:
        console.log(`Comando '${ command }' no reconocido.`);
}