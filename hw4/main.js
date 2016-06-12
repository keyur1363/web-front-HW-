

var db = openDatabase('keyurdb', '1.0', 'sqldb', 2 * 1024 * 1024);
db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS CNDATA (color,number)');
});

function clickkaryu() {
      
    if (document.getElementById("myform").checkValidity()) {
       
        var selcolor = document.getElementById('color').value;
        var selnumber = document.getElementById('number').value;
        var queryString = "INSERT INTO CNDATA (color,number) VALUES ('" + selcolor + "','" + selnumber + "')";
        storedata(queryString);
        queryString = "SELECT * FROM CNDATA";        
        getData(queryString);
        
    }
}
function storedata(queryString) {
    db.transaction(function (tx) {
        tx.executeSql(queryString);
    })
};

function getData(queryString) {
  
    db.transaction(function (tx) {
        tx.executeSql(queryString, [], function (tx, results) {
          
            var len = results.rows.length;
            var i;
            for (i = 0; i < len; i++) {
                
                alert("Color:" + results.rows.item(i).color + "   " + "Number: " + results.rows.item(i).number);
            }
        },null);

    });
}


