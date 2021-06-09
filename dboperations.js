var config = require('./dbconfig');
const sql = require('mssql');

async function ConsultarValidadorDiferenciasCuentasProveedor(Cuenta_Id,Periodo_Id){
    try{
        let pool = await sql.connect(config);
        let vouchers = await pool.request().query("EXEC [CTB].[pa_ConsultarValidadorDiferenciasCuentasProveedor] "+ Periodo_Id+",5,"+Cuenta_Id);;
        return vouchers.recordset;
    }catch(error){
        console.log(error);
    }
}

async function ConsultarEstadoCuentaProveedor(Periodo_Id,Mes_Id,Cuenta_Id){
    try{
        let pool = await sql.connect(config);
        let vouchers = await pool.request().query("EXEC [FIN].[pa_ConsultarReporteMaestroEstadoCuentaProveedor] 1, "+ Periodo_Id+","+Mes_Id+","+Cuenta_Id);
        return vouchers.recordset;
    }catch(error){
        console.log(error);
    }
}

async function ConsultarReporteLibroCajaBancos(sCtaNombre,sBanNombre,dFechaInicio,dFechaFin){
    try{
        let pool = await sql.connect(config);
        let vouchers = await pool.request().query("EXEC [RPT].[pa_ConsultarLibroCajaBancos] '"+dFechaInicio+"','"+ dFechaFin +"','"+sCtaNombre+"','"+sBanNombre+"',1,1,1,2 ");
        return vouchers.recordset;
    }catch(error){
        console.log(error);
    }
}

async function getCuentasContables(){
    try{
        let pool = await sql.connect(config);
        let cuentasc = await pool.request().query("SELECT Cuenta_Id,sCtaCodigo FROM CTB.Cuenta WHERE nCtaEstado = 1");;
        return cuentasc.recordset;
    }catch(error){
        console.log(error);
    }
}
async function getCuentasContablesProveedor(){
    try{
        let pool = await sql.connect(config);
        let cuentasc = await pool.request().query("SELECT Cuenta_Id,sCtaCodigo FROM CTB.Cuenta WHERE nCtaEstado = 1 AND nCtaTipo = 1 AND (sCtaCodigo LIKE '42%' OR sCtaCodigo LIKE '43.%' OR sCtaCodigo LIKE '45%')  ");;
        return cuentasc.recordset;
    }catch(error){
        console.log(error);
    }
}

async function getPeriodos(){
    try{
        let pool = await sql.connect(config);
        let periodos = await pool.request().query("SELECT Periodo_Id, nPerNombre FROM CMN.Periodo ");;
        return periodos.recordset;
    }catch(error){
        console.log(error);
    }
}

async function getTipoGeneral(nTGeCodigo){
    try{
        let pool = await sql.connect(config);
        let meses = await pool.request().query("SELECT * FROM CMN.TipoGeneral WHERE nTGeCodigo = "+nTGeCodigo+" AND nTGeEstado = 1 AND sTGeValor2<>'#' ")
        return meses.recordset;
    }catch(error){
        console.log(error);
    }
}
async function ConsultarBancos(Empresa_Id,Estado)
{
    try
    {
        let pool = await sql.connect(config);
        let meses = await pool.request().query("EXEC [RPT].[pa_ConsultarLibroCajaBancos] @Empresa = 1,@Estado = 1")
        return meses.recordset;
    }catch(error){
        console.log(error);
    }
}

module.exports = {
    ConsultarValidadorDiferenciasCuentasProveedor:ConsultarValidadorDiferenciasCuentasProveedor,
    getCuentasContables:getCuentasContables,
    getCuentasContablesProveedor:getCuentasContablesProveedor,
    getPeriodos:getPeriodos,
    ConsultarEstadoCuentaProveedor:ConsultarEstadoCuentaProveedor,
    ConsultarReporteLibroCajaBancos:ConsultarReporteLibroCajaBancos,
    getTipoGeneral:getTipoGeneral,
    ConsultarBancos:ConsultarBancos
}