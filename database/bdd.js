var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'taller',
    port: 3306
 });


function conectarBdd(connection){
    connection.connect(function(error){
        if(error){
           throw error;
        }else{
           console.log('Conexion correcta.');
        }
     });
 }

function insertData(){
        var query = connection.query(
        'INSERT INTO product values (?,?,?)', [1,'Producto1 prem', 'Producto de primera calidad'], 
        function(error, result){
        if(error){
            throw error;
        }else{
            console.log(result);
        }
    });
}

function getData(){ 

    var query = connection.query(
     'SELECT * FROM smartwatchs', [], 
     function(error, result){
        if(error){
            throw error;
        }else{
            console.log(result);
        }
    });

}

connection.end();