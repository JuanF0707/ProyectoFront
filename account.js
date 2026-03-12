
class Account {

    constructor (saldoInicial){
        this.saldo = saldoInicial
        this.transaction = []
    }

    getSaldo(){
        return this.saldo
    }

    getTransactions(){

        return this.transaction
    }

    retirar (monto){

    if(monto <= 0 || monto >= this.saldo){
        return false
    }
    this.saldo = this.saldo - monto
    this.transaction.push(new Transaction("Retiro", monto))
    return true
    }

    consignar (monto){

    if(monto <= 0){

        return false
    }

    this.saldo = this.saldo + monto
    this.transaction.push(new Transaction("Consignacion", monto))
    return true
    }
}





