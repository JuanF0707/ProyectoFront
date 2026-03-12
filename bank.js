class Bank {

    constructor (nombre){

        this.nombre = nombre
        this.usuarios = []
        this.cargarDatos ()
    }

    getNombreBank (){
        return this.nombre
    }

    registrarUsuario (nombre , clave, saldoInicial){

    if (this.existeUsuario(nombre)){
        return false
    }

    let usuario = new User(nombre, clave, saldoInicial)
    this.usuarios.push(usuario)

    this.guardarDatos ()
    return true

    }
    buscarUsuario (nombre){

    for (let i = 0 ; i < this.usuarios.length; i++){

        if(this.usuarios[i].nombre.toLowerCase() === nombre.toLowerCase()){

            return this.usuarios[i]
        }

    }
    return null

    }
    
    existeUsuario (nombre) {

    return this.buscarUsuario(nombre) !==null
    }

    guardarDatos (){
    localStorage.setItem("Usuarios", JSON.stringify(this.usuarios))
    }

    cargarDatos (){
        let datos = localStorage.getItem("Usuarios") || "[]";
        let datosParseados = JSON.parse(datos)
        this.usuarios = datosParseados.map(u => {
            
            let saldo = 0;
            let transacciones = [];
        
            if (u.cuenta) {
                saldo = u.cuenta.saldo || 0;
                transacciones = u.cuenta.transactions || [];
            }

            
            let user = new User(u.nombre, u.clave, saldo);

            
            user.cuenta.transactions = transacciones;

            user.intentos = u.intentos || 0;
            user.bloqueada = u.bloqueada || false;

            return user;
        });
    }
}








