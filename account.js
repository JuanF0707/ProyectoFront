
class Account {

    constructor (saldoInicial){
        this.saldo = saldoInicial
        this.transactions = []
    }

    getSaldo(){
        return this.saldo
    }

    getTransactions(){

        return this.transactions
    }

    retirar (monto){

    if(monto <= 0 || monto >= this.saldo){
        return false
    }
    this.saldo = this.saldo - monto
    this.transactions.push(new Transaction("Retiro", monto))
    return true
    }

    consignar (monto){

    if(monto <= 0){

        return false
    }

    this.saldo = this.saldo + monto
    this.transactions.push(new Transaction("Consignacion", monto))
    return true
    }
}





