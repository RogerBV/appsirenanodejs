
const dboperations = require('./dboperations');
const configMySql = require('./dbConfigMySql');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require ('cors');
const { request } = require('express');
var app = express();

var router = express.Router();


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());
app.use('/api',router);

router.use((request,response,next)=>{
    next();
});

router.route('/ConsultarValidadorDiferenciasCuentasProveedor').get((request,response)=>{
    dboperations.ConsultarValidadorDiferenciasCuentasProveedor(request.query.Cuenta_Id,request.query.Periodo_Id).then(result=>{
        response.json(result);
    });
});

router.route('/ConsultarEstadoCuentaProveedor').post((request,response)=>{
    const Periodo_Id = request.query.Periodo_Id;
    const Mes_Id = request.query.Mes_Id;
    const Cuenta_Id = request.query.Cuenta_Id;
    dboperations.ConsultarEstadoCuentaProveedor(Periodo_Id,Mes_Id,Cuenta_Id).then(result=>{
        console.log("Reporte");
        response.json(result);
    });
});

router.route('/ConsultarReporteLibroCajaBancos').get((request,response)=>{
    const dFechaInicio = request.query.dFechaInicio;
    const dFechaFin = request.query.dFechaFin;
    const sCtaNombre = request.query.sCtaNombre;
    const sBanNombre = request.query.sBanNombre;
    dboperations.ConsultarReporteLibroCajaBancos(sCtaNombre,sBanNombre,dFechaInicio,dFechaFin).then(result=>{
        response.json(result);
    });
});

router.route('/ConsultarCuentasContables').get((request,response)=>{
    dboperations.getCuentasContables().then(result=>{
        response.json(result);
    });
});

router.route('/getCuentasContablesProveedor').get((request,response)=>{
    dboperations.getCuentasContablesProveedor().then(result=>{
        response.json(result);
    });
});

router.route('/getPeriodos').get((request,response)=>{
    dboperations.getPeriodos().then(result=>{
        response.json(result);
    });
});

router.route('/getTipoGeneral').get((request,response)=>{
    dboperations.getTipoGeneral(request.query.nTGeCodigo).then(result=>{
        response.json(result);
    });
});

router.route('/ConsultarBancos').get((request,response)=>{
    dboperations.ConsultarBancos().then(result=>{
        response.json(result);
    });
});

router.route('/registerPermit').post((request,response)=>{
    try
    {
        var employeeName = request.query.employeeName;
        var employeeSurname = request.query.employeeSurname;

        configMySql.query('INSERT INTO permit SET ?', {EmployeeName: employeeName,EmployeeSurname:employeeSurname}, function(err, result, fields) {
            if (err) throw err;
            console.log(result.insertId);
            configMySql.query("SELECT * FROM Permit where Id = "+result.insertId,function(err,result){
                response.json(result[0]);
            });
          });

    }catch(error)
    {
        console.log(error);
    }
})

router.route('/getPermits').get((request,response)=>{
    try{
        console.log("Permits");
        configMySql.query("SELECT * FROM Permit ",function(err,result){
            response.json(result);
        });
         
    }catch(error){
        console.log(error);
    }
})


router.route('/updatePermit').post((request,response)=>{
    try{
        var idPermit = request.query.idPermit
        var employeeName = request.query.employeeName
        var employeeSurname = request.query.employeeSurname

        var sql = "UPDATE Permit SET EmployeeName = ?, EmployeeSurname = ? WHERE Id = ? "

        configMySql.query(sql, [employeeName, employeeSurname, idPermit], function(err, result){
            if (err) throw err;
            configMySql.query("SELECT * FROM Permit where Id = "+result.insertId,function(err,result){
                console.log(result[0]);
                response.json(result[0]);
            });
        })
    }catch(error){
        console.log(error)
    }
})

router.route('/insertPermit').post((request,response)=>{
    try{
        var employeeName = request.query.employeeName
        var employeeSurname = request.query.employeeSurname
        configMySql.query('INSERT INTO permit SET ?', {EmployeeName: employeeName,EmployeeSurname:employeeSurname}, function(err, result, fields) {
            if (err) throw err;
            console.log(result.insertId);
            configMySql.query("SELECT * FROM Permit where Id = "+result.insertId,function(err,result){
                console.log(result[0]);
                response.json(result[0]);
            });
          });

    }catch(error){
        console.log(error);
    }
})

var port = process.env.PORT || 8090;
app.listen(port);
console.log("Order API is running at "+port);
