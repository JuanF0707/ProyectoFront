
class Transaction{

    constructor(tipo, monto){
    this.tipo = tipo
    this.monto = monto
    this.fecha = new Date()
    }

    Mostrar (){
    return this.tipo + " | $" + this.monto + " | " + this.fecha.toString()
    }
}

