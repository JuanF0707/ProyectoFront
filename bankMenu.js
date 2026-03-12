class BankMenu{

    constructor(banco){

        this.banco = banco
    }

    Iniciar(){

        console.log("Bienvenido al banco " + this.banco.getNombreBank() )

        let activo = true

        while(activo){

            let opcion = prompt(
                "=== BANCO " + this.banco.getNombreBank() + " ===\n" +
                "1. Iniciar sesión\n" +
                "2. Registrarse\n" +
                "3. Salir"
            )

            if (opcion == 1){
                this.flujoIniciarSesion()
            }else if(opcion == 2){
                this.flujoRegistro()
            }else if(opcion == 3){
                activo = false
                console.log ("Gracias por usar " + this.banco.getNombreBank())
            }else{
                console.log("opcion no valida")
            }

        }

    }

    flujoRegistro(){
        console.log ("--- Registro de usuario ---")

        let nombre = prompt("Ingrese su nombre de usuario").trim()

        if(nombre === ""){
            console.log("El nombre no puede estar vacio")
            return
        }

        if(this.banco.existeUsuario(nombre)){

            console.log("Ese usuario ya existe")
            return
        }

        let clave = prompt("Ingrese su clave ").trim()

        if(clave === ""){
            console.log("La clave no puede estar vacia")
            return
        }

        let saldoInicial = Number(prompt("ingrese saldo Inicial"))

        if(saldoInicial < 0 ){

            console.log("El saldo inicial no puede ser negativo")
            return
        }

        this.banco.registrarUsuario(nombre, clave, saldoInicial)

        console.log("Usuario registrado correctamente")
    }

    flujoIniciarSesion(){

        console.log("--- Inicio de sesión ---")

        let nombre = prompt("Ingrese su usuario").trim()

        let usuario = this.banco.buscarUsuario(nombre)

        if(usuario == null){
            console.log("El usuario no existe")
            return
        }

        let clave = prompt("Ingrese su clave")

        if(usuario.clave !== clave){

            usuario.agregarIntentos();
            let intentosRestantes = 3 - usuario.intentos;
            if (usuario.bloqueada) {
                console.log("Cuenta bloqueada por demasiados intentos fallidos");
            } else {
                console.log("Clave incorrecta. Intentos restantes: " + intentosRestantes);
            }
            this.banco.guardarDatos();
            return;
        }
        
        usuario.reiniciarIntentos();

        console.log("Bienvenido " + usuario.nombre)

        this.menuTransacciones(usuario)

    }

    menuTransacciones(usuario){

        let enSesion = true

        while(enSesion){

            let opcion = prompt(
                "=== MENU DE TRANSACCIONES ===\n" +
                "Usuario: " + usuario.nombre + "\n" +
                "Saldo: $" + usuario.cuenta.saldo + "\n\n" +
                "1. Retirar\n" +
                "2. Consultar saldo\n" +
                "3. Consignar\n" +
                "4. Ver historial de transacciones\n" +
                "5. Salir"
            )

            if(opcion == 1){
                this.flujoRetiro(usuario)
            }
            else if(opcion == 2){
                console.log("Saldo actual: $" + usuario.cuenta.saldo)
            }
            else if(opcion == 3){
                this.flujoConsignacion(usuario)
            }
            else if(opcion == 4){
                this.flujoHistorial(usuario);
            }
            else if(opcion == 5){
                enSesion = false
                console.log("Sesión cerrada")
            }
            else{
                console.log("Opción no válida")
            }

        }

    }

    flujoRetiro(usuario){

        let monto = Number(prompt("¿Cuánto desea retirar?"))

        let exito = usuario.cuenta.retirar(monto)

        if(exito){
            console.log("Retiro exitoso")
            console.log("Nuevo saldo: $" + usuario.cuenta.saldo)
            this.banco.guardarDatos()
        }
        else{
            console.log("Saldo insuficiente")
        }

    }

    flujoConsignacion(usuario){

        let monto = Number(prompt("¿Cuánto desea consignar?"))

        let exito = usuario.cuenta.consignar(monto)

        if(exito){
            console.log("Consignación exitosa")
            console.log("Nuevo saldo: $" + usuario.cuenta.saldo)
            this.banco.guardarDatos()
        }
        else{
            console.log("Monto inválido")
        }

    }
    flujoHistorial(usuario) {

        let transacciones = usuario.cuenta.getTransactions();

        if (transacciones.length === 0) {
            console.log("No hay transacciones registradas");
        } else {
            console.log("=== HISTORIAL ===");
            transacciones.forEach(t => console.log(t.Mostrar()));
        }
    }

}


