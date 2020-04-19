var result=new Array();

var i=0;
var rows,n=1,nbp;
var table = document.getElementById('myTable');

                var tr = '<tr ><th>Identifiant</th><th>Priorite</th><th>Code postal</th><th>Age</th><th>Date Test</th></tr>';
				if(result.length<8)
				{
					    $.ajax({
							type: "GET",
							url: "/records",
							dataType: "json",
    
							contentType: "application/json",
							success: function(data) {
							result=data;
				for (var i = 0; i < result.length; i++) {
                    tr += '<tr>';

                tr += '<td>' + result[i].identifiant + '</td>';
                    tr += '<td>' + result[i].priorite + '</td>';
                    tr += '<td>' + result[i].codePostal+ '</td>';
					 tr += '<td>' + result[i].age+ '</td>';
					 tr += '<td>' + result[i].dateTest+ '</td>';
                    tr += '</tr>';
                }
                document.getElementById('myTable').innerHTML = tr;
				     },
        error: function(xhr, status, error) {
           
        }
    });
				}
				else{
							$.ajax({
							type: "GET",
							url: "/records",
							dataType: "json",
    
							contentType: "application/json",
							success: function(data) {
							result=data;
                for (var i = 0; i <8 ; i++) {
                    tr += '<tr>';

                tr += '<td>' + result[i].identifiant + '</td>';
                    tr += '<td>' + result[i].priorite + '</td>';
                    tr += '<td>' + result[i].codePostal+ '</td>';
					 tr += '<td>' + result[i].age+ '</td>';
					 tr += '<td>' + result[i].dateTest+ '</td>';
                    tr += '</tr>';

                }
								     },
        error: function(xhr, status, error) {
         
        }
    });
				}
							$.ajax({
							type: "GET",
							url: "/records",
							dataType: "json",
    
							contentType: "application/json",
							success: function(data) {
							result=data;
				 nbp=2/8;
if(nbp%8!=0)nbp++;
//if(nbp>=2){ document.getElementById('pg').append='  <a href="#" class="active">2</a>';


for(var i=0;i<Math.floor(nbp);i++)
{

document.getElementById('pg').innerHTML=document.getElementById('pg').innerHTML+'<a id='+(i+1)+' href="#"onclick=charge1('+(i+1)+') ><div class="dropcap">'+(i+1)+'</div></a>';
}
				     },
        error: function(xhr, status, error) {
          
        }
    });


function charge1(nb){

    $.ajax({
       type: "GET",
       url: "/records",
       dataType: "json",
    
       contentType: "application/json",
       success: function(data) {
      result=data;
       console.log('data'+data[1].codePostal);
       console.log('data'+data.length);
	   n=nb;
// document.getElementById("1").style.backgroundColor = "#4CAF50";
 for (i=1;i<=nbp ; i++) 
  {
    if (i==nb)
	{
	  document.getElementById(i).style.backgroundColor= "yellow";
	    document.getElementById(i).style.Color="black";
         document.getElementById(i).style.borderRadius= "5px";
	 }
	  else
	  {
	  document.getElementById(i).style.backgroundColor= "yellow";
	  }
  }

                var tr = '<tr ><th>Identifiant</th><th>Priorite</th><th>Code postal</th><th>Age</th><th>Date Test</th></tr>';
				if(result.length<8)
				{
				for (var i = 0; i <result.length;  i++) {
				//alert(i);
                    tr += '<tr>';
                            tr += '<td>' + result[i].identifiant + '</td>';
                    tr += '<td>' + result[i].priorite + '</td>';
                    tr += '<td>' + result[i].codePostal+ '</td>';
					 tr += '<td>' + result[i].age+ '</td>';
					 tr += '<td>' + result[i].dateTest+ '</td>';
                    tr += '</tr>';

                }
                document.getElementById('myTable').innerHTML = tr;
				}
				else{
				
				if((nb*8>result.length))
					{
				for (var  i=(nb-1)*8; i <result.length;  i++) {
                    tr += '<tr>';
                  console.log('1'+result[i].identifiant);
                     tr += '<td>' + result[i].identifiant + '</td>';
                    tr += '<td>' + result[i].priorite + '</td>';
                    tr += '<td>' + result[i].codePostal+ '</td>';
					 tr += '<td>' + result[i].age+ '</td>';
					 tr += '<td>' + result[i].dateTest+ '</td>';
                    tr += '</tr>';
                }
                document.getElementById('myTable').innerHTML = tr;
				}
				else{
                for (var i = (nb-1)*8; i <(nb-1)*8+8; i++) {
				//alert(i);
				console.log(result[i].identifiant);
                    tr += '<tr>';
					tr += '<td>' + result[i].identifiant + '</td>';
                    tr += '<td>' + result[i].priorite + '</td>';
                    tr += '<td>' + result[i].codePostal+ '</td>';
					 tr += '<td>' + result[i].age+ '</td>';
					 tr += '<td>' + result[i].dateTest+ '</td>';
                    tr += '</tr>';
                }
                document.getElementById('myTable').innerHTML = tr;
                  }
				}
			

      },
        error: function(xhr, status, error) {
         
        }
    });
alert("res"+result.length)


}
function precedent(){
if(n!=1)
{
n--;
charge1(n);
}
}
function suivant(){
if(n!=Math.floor(nbp))
{
n++;
charge1(n);
}
}


function chercher() {
  var input, filter, table, tr, td, i,min,max;

  var iden=document.getElementById("numIdentif").value;
  
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
for (i = 0; i < tr.length; i++) {
   td = tr[i].getElementsByTagName("td")[0];
    if (td) {
	 if (td.innerHTML==iden){
	
        tr[i].style.display = "";
		}
      
	  else {
        tr[i].style.display = "none";
      }
	  } 
}
}





