class User {
    constructor (nombre, clave, saldoInicial){
        this.nombre = nombre
        this.clave = clave
        this.cuenta = new Account(saldoInicial)
        this.intentos = 0;
        this.bloqueada = false
    }

    getNombre (){
        return this.nombre
    }

    getClave () { 
        return this.clave
    }

    getCuenta (){
        return this.cuenta
    }

    getIntentos (){
        return this.intentos
    }

    getBloqueada (){
        return this.bloqueada
    }

    agregarIntentos (){
        this.intentos ++ 
        if(this.intentos >= 3){
            this.bloqueada = true
        }
    }

    reiniciarIntentos (){

        this.intentos = 0;
    }
}


