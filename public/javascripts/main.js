var items = [];

var addhtml = function(item){
        var style = item.style;
        var color = item.color;
        var qty   = item.qty;
        $('#inputItem').append("<li style='margin: 10px'><div style='display:inline-block; width:33%'><h3 style='display:inline'>Style No:</h3>" + style + "</div><div style='display:inline-block; width:33%'><h3 style='display:inline'>Color: </h3>" + color + "</div><div style='display:inline-block; width:33%'><h3 style='display:inline'>Qty: </h3>" + qty + "</div></li>");
}


$(document).ready(function(){
    
    
    
    $('#addItem').click(function(){
        var item = {
            style : $('#inputItemStyle').val(),
            color : $('#inputItemColor').val(),
            qty   : $('#inputItemQty').val()
        }
        console.log(item);
        items.push(item);
        addhtml(item);
        $('#inputItemStyle').val("")
        $('#inputItemColor').val("")
        $('#inputItemQty').val("")
        })
    $('#itemSubmit').click(function(){
       $.ajax({
        url:'/additem',
        type:'POST',
        data:{ items : items,
               customer: $('#inputItemCustomer').val(),
               email: $('#inputItemEmail').val(),
               tel: $('#inputItemTel').val(),
               html: $('#inputItem').html()
             },
        success:function(data){
           console.log('post success');
           console.log(data);
           alert("Order Placed");
        },
        error:function(err){
           console.log(err);
        }
}); 
    });
    
});