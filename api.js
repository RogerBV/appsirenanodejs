
const dboperations = require('./dboperations');

var express = require('express');
var bodyParser = require('body-parser');
var cors = require ('cors');
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
    const banco = request.query.banco;
    dboperations.ConsultarReporteLibroCajaBancos(banco,dFechaInicio,dFechaFin).then(result=>{
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

var port = process.env.PORT || 8090;
app.listen(port);
console.log("Order API is running at "+port);
