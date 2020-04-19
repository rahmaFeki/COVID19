var i=1
var FGMin=0,FGMaj=0,FPron=0;
var fievre=false,toux=false,douleur=false,diarrhe=false, fatigue=false,diabetique=false,Grespiratoire=false,alimentation=false,Msouffle=false,ansomie=false;
var age=0, poids=0, taille=0,IMC=0,token=0,codePostal=0,priorite=0;
var anosmie=false,qInter=false;
var date=new Date();
var dateAuj= String(date).slice(0, 21);	
var question=""
var db;
function envoyerDonnee(identif,priorite,codePostal,age,dateTest)
{
var data={
ident:identif,
prio:priorite,
codeP:codePostal,
age:age,
dateTes:dateTest
};
$.ajax({
	url:"/time",
	type:'GET',
	data:'identif='+identif+'&prio='+priorite+'&codePos='+codePostal+'&age='+age+'&dateTest='+dateTest,
	
});
}      
 
function calculIMC()
{
	return (poid/(taille*taille))
}
function questionSuivant()
{
	if(i==1)
	{
		var rep= document.querySelector('input[name=optionsRadios]:checked').value;
		if(rep=='oui'||rep=='sais pas')
		{	qInter=true
			fievre=true
			document.getElementById("question").innerHTML='<h3 class=panel-title>Quelle a été votre température la plus élevée ces dernières 48h ? </h3>'
			$('#o').text(' < 35,5°C ');
			document.getElementById("optionsRadios1").value='35'
			$('#n').text(' 35,5°C - 38,9°C ');
			document.getElementById("optionsRadios2").value='35-38'
			$('#sp').text('>= 39°C');
			document.getElementById("optionsRadios3").value='=39'	
			
		}
		else
		{
			if(qInter==true)
			{
			var rep= document.querySelector('input[name=optionsRadios]:checked').value;
			if(rep=='35'||rep=='39') FGMin++
			qInter=false
			$('#o').text('oui');
			document.getElementById("optionsRadios1").value='oui'
			$('#n').text('non');
			document.getElementById("optionsRadios2").value='non'
			
			}
			document.getElementById("optionsRadios3").remove()
			
			document.getElementById("optionsRadios1").checked=true
			
			document.getElementById("question").innerHTML='<h3 class=panel-title>Avez-vous une toux ou une augmentation de votre toux habituelle ces derniers jours ?</h3>'
			$('#sp').remove();
			i++
			document.getElementById("numberQuestion").innerHTML='Question 2/20'
			
		}
		

		
	}
	else
	{
	if(i==2)
	{
	
		var rep= document.querySelector('input[name=optionsRadios]:checked').value;
		if(rep=='oui') toux=true
					
			document.getElementById("optionsRadios1").checked=true
			
			document.getElementById("question").innerHTML='<h3 class=panel-title>Avez-vous noté une forte diminution de votre goût ou de votre odorat ces derniers jours ?</h3>'

			$('#sp').remove();
			i++
			document.getElementById("numberQuestion").innerHTML='Question 3/20'
		
		
	}
	else
	{
	
	if(i==3)
	{
	
		var rep= document.querySelector('input[name=optionsRadios]:checked').value;
		if(rep=='oui') alimentation=true
					
			document.getElementById("optionsRadios1").checked=true
			
			document.getElementById("question").innerHTML='<h3 class=panel-title>Avez-vous un mal de gorge ou des douleurs musculaires ou des courbatures inhabituelles ces derniers jours ?</h3>'

			i++
			document.getElementById("numberQuestion").innerHTML='Question 4/20'
		
		
	}
	else
	{
		if(i==4)
		{
	         var rep= document.querySelector('input[name=optionsRadios]:checked').value;
			if(rep=='oui') douleur=true
					
			document.getElementById("optionsRadios1").checked=true
			
			document.getElementById("question").innerHTML='<h3 class=panel-title>Avez-vous de la diarrhée ces dernières 24 heures (au moins 3 selles molles) ? </h3>'

			i++
			document.getElementById("numberQuestion").innerHTML='Question 5/20'
		}
		else
		{
			if(i==5)
			{
		    var rep= document.querySelector('input[name=optionsRadios]:checked').value;
			if(rep=='oui') diarrhe=true
					
			document.getElementById("optionsRadios1").checked=true
			
			document.getElementById("question").innerHTML='<h3 class=panel-title>Avez-vous une fatigue inhabituelle ces derniers jours ?</h3>'

			i++
			document.getElementById("numberQuestion").innerHTML='Question 6/20'
			
			}
			else{
				if(i==6)
				{ 
					var rep= document.querySelector('input[name=optionsRadios]:checked').value;
					if(rep=='oui'&&qInter==false) 
					{     qInter=true
						fatigue=true					
						document.getElementById("optionsRadios1").checked=true
						document.getElementById("question").innerHTML='<h3 class=panel-title>Cette fatigue vous oblige-t-elle à vous reposer plus de la moitié de la journée ?</h3>'
					}
				
					else
					{
						if(qInter==true)
						{
							var rep= document.querySelector('input[name=optionsRadios]:checked').value;
							if(rep=='oui') FGMin++
							qInter=false
						}
						document.getElementById("optionsRadios1").checked=true
						document.getElementById("question").innerHTML='<h3 class=panel-title>Êtes-vous dans l"impossibilité de vous alimenter ou de boire DEPUIS 24 HEURES OU PLUS ? </h3>'
						i++
						document.getElementById("numberQuestion").innerHTML='Question 7/20'
						
					}
				}
				else
				{
					if(i==7)
					{
						var rep= document.querySelector('input[name=optionsRadios]:checked').value;
						if(rep=='oui') { FGMaj++; alimentation=true;}
						document.getElementById("optionsRadios1").checked=true
						document.getElementById("question").innerHTML='<h3 class=panel-title>Dans les dernières 24 heures, avez-vous noté un manque de souffle INHABITUEL lorsque vous parlez ou faites un petit effort ? </h3>'
						i++
						document.getElementById("numberQuestion").innerHTML='Question 8/20'
						
					}
					else
					{
						if(i==8)
						{
							var rep= document.querySelector('input[name=optionsRadios]:checked').value;
							if(rep=='oui') { FGMaj++; }
							document.getElementById("question").innerHTML='<h3 class=panel-title>Quel est votre âge ? </h3>'
							$(".radio").remove()
							document.getElementById("proposition").innerHTML='<div class="row"><div class="form-group"><label for="age" class="col-lg-1 control-label">Age : </label><div class="col-lg-3"><input type="number" class="form-control" id="age"></div></div></div>'
							i++
						    document.getElementById("numberQuestion").innerHTML='Question 9/20'
						
						}
						else
						{
					
							if(i==9)
							{
							  age=parseInt(document.getElementById("age").value	)
							  if(age>=70)  FPron++
							  document.getElementById("question").innerHTML='<h3 class=panel-title>Quel est votre poids ? Quelle est votre taille ?</h3>'
							  document.getElementById("proposition").innerHTML='<form class="form-inline"><div class="form-group"><label for="poid" class="col-lg-3 control-label">Poids(kg):</label><div class="col-lg-3"><input type="number" class="form-control" id="poid"></div></div> <div class="form-group"><label for="taille" class="col-lg-3 control-label">Taille(m):</label><div class="col-lg-3"><input type="number" class="form-control" id="taille"></div></div></form>'
							  i++
						      document.getElementById("numberQuestion").innerHTML='Question 10/20'
							}
							else
							{
							if(i==10)
							{
								taille=parseFloat(document.getElementById("taille").value	)
								poid=parseFloat(document.getElementById("poid").value	)
								IMC=calculIMC()
								if(IMC>=30.0) FPron++
								document.getElementById("question").innerHTML='<h3 class=panel-title>Avez-vous de l’hypertension artérielle mal équilibrée ? Ou avez-vous une maladie cardiaque ou vasculaire ? Ou prenez-vous un traitement à visée cardiologique ?</h3>'
								document.getElementById("proposition").innerHTML='<div class=radio><label><input type=radio name=optionsRadios id=optionsRadios1 value=oui checked><div id=o>Oui</div></label></div></div><div class=radio><label><input type=radio name=optionsRadios id=optionsRadios2 value=non><div id=n>Non</div></label></div></div><div class=radio><label><input type=radio name=optionsRadios id=optionsRadios3 value="sais pas"><div id=sp>Je ne sais pas</div></label></div></div>'
								i++
								document.getElementById("numberQuestion").innerHTML='Question 11/20'		
							}
							else
							{
								if(i==11)
								{
									var rep= document.querySelector('input[name=optionsRadios]:checked').value;
									if(rep=='oui') {FPron++; ansomie=true;}
									document.getElementById("question").innerHTML='<h3 class=panel-title>Êtes-vous diabétique ?</h3>'
									document.getElementById("optionsRadios3").remove()
									document.getElementById("sp").remove()
									document.getElementById("optionsRadios1").checked=true
									i++
									document.getElementById("numberQuestion").innerHTML='Question 12/20'
								
								}
								else
								{
									if(i==12)
									{
										var rep= document.querySelector('input[name=optionsRadios]:checked').value;
										if(rep=='oui') {FPron++; diabetique=true;}
										document.getElementById("question").innerHTML='<h3 class=panel-title>Avez-vous ou avez-vous eu un cancer dans les 3 dernières années ?</h3>'
										document.getElementById("optionsRadios1").checked=true
										i++
									    document.getElementById("numberQuestion").innerHTML='Question 13/20'
									}
									else
									{
										if(i==13)
										{
											var rep= document.querySelector('input[name=optionsRadios]:checked').value;
											if(rep=='oui') {FPron++; }
											document.getElementById("question").innerHTML='<h3 class=panel-title>Avez-vous une maladie respiratoire ? Ou êtes-vous suivi par un pneumologue ?</h3>'
											document.getElementById("optionsRadios1").checked=true
											i++
											document.getElementById("numberQuestion").innerHTML='Question 14/20'
										}
										else
										{
											if(i==14)
											{
											var rep= document.querySelector('input[name=optionsRadios]:checked').value;
											if(rep=='oui') {FPron++; Grespiratoire=true; }
											document.getElementById("question").innerHTML='<h3 class=panel-title>Avez-vous une insuffisance rénale chronique dialysée ?</h3>'
											document.getElementById("optionsRadios1").checked=true
											i++
											document.getElementById("numberQuestion").innerHTML='Question 15/20'
												
											}
											else
											{
												if(i==15)
												{
												var rep= document.querySelector('input[name=optionsRadios]:checked').value;
												if(rep=='oui') {FPron++;  }
												document.getElementById("question").innerHTML='<h3 class=panel-title>Avez-vous une maladie chronique du foie ?</h3>'
												document.getElementById("optionsRadios1").checked=true
												i++
												document.getElementById("numberQuestion").innerHTML='Question 16/20'
												}
												else
												{
													if(i==16)
													{
													var rep= document.querySelector('input[name=optionsRadios]:checked').value;
													if(rep=='oui') {FPron++;  }
													document.getElementById("question").innerHTML='<h3 class=panel-title>Êtes-vous enceinte ?</h3>'
													document.getElementById("optionsRadios1").checked=true
													i++
													document.getElementById("numberQuestion").innerHTML='Question 17/20'
													}
													else
													{
														if(i==17)
														{
														var rep= document.querySelector('input[name=optionsRadios]:checked').value;
														if(rep=='oui') {FPron++;  }
														document.getElementById("question").innerHTML='<h3 class=panel-title>Avez-vous une maladie connue pour diminuer vos défenses immunitaires?</h3>'
												        document.getElementById("proposition").innerHTML='<div class=radio><label><input type=radio name=optionsRadios id=optionsRadios1 value=oui checked><div id=o>Oui</div></label></div></div><div class=radio><label><input type=radio name=optionsRadios id=optionsRadios2 value=non><div id=n>Non</div></label></div></div><div class=radio><label><input type=radio name=optionsRadios id=optionsRadios3 value="sais pas"><div id=sp>Je ne sais pas</div></label></div></div>'
														i++
														document.getElementById("numberQuestion").innerHTML='Question 18/20'
														}
														else
														{
															if(i==18)
															{
															var rep= document.querySelector('input[name=optionsRadios]:checked').value;
															if(rep=='oui') {FPron++;  }
															document.getElementById("question").innerHTML='<h3 class=panel-title>Prenez-vous un traitement immunosuppresseur ? C’est un traitement qui diminue vos défenses contre les infections. Voici quelques exemples : corticoïdes, méthotrexate, ciclosporine, tacrolimus, azathioprine, cyclophosphamide (liste non exhaustive).</h3>'
															i++
															document.getElementById("numberQuestion").innerHTML='Question 19/20'
														    document.getElementById("but").textContent='Envoyer'
															}
															else
															{
																if(i==19)
																{
				
																document.getElementById("question").innerHTML='<h3 class=panel-title>Quel est votre code postal ?</h3>'
																$(".radio").remove()
																document.getElementById("proposition").innerHTML='<div class="row"><div class="form-group"><label for="codePos" class="col-lg-3 control-label">Code Postal : </label><div class="col-lg-3"><input type="number" class="form-control" id="codePos"></div></div></div>'
																i++
																document.getElementById("numberQuestion").innerHTML='Question 	20/20'
															
																}
										else
										{
											if(i==20)
											{
												codePostal=parseInt(document.getElementById("codePos").value)
											$('.panel panel-primary').remove()
											$('#numberQuestion').remove()
										
											if(age<=15) 
											document.getElementById('QR').innerHTML='<div class="content-bot"><h3>Résultat</h3><div class="inner-top"><div class="services-top">	<div class="col-md-6 grid_1_of_9"><div class="ser-grids"><div class="extra-wrap"><p>Cette application n’est pas faite pour les personnes de moins de 15 ans.Prenez contact avec votre médecin généraliste au moindre doute.En cas d’urgence, appelez le 190.</p></div><div class="clearfix"></div></div></div>'	
											
											else
											{
											if(FGMaj>=1) {token=Math.floor(Math.random()*10000);
												priorite=1;
											document.getElementById('QR').innerHTML='<div class="content-bot"><h3>Résultat</h3><div class="inner-top"><div class="services-top">	<div class="col-md-6 grid_1_of_9"><div class="ser-grids"><div class="extra-wrap"><p>Appelez le 190. Votre numéro d"identification est '+token+'</p></div><div class="clearfix"></div></div></div>'	
											}
											else
											{
												if(toux==true || fievre==true)
												{
												if(FPron==0){token=Math.floor(Math.random()*10000); priorite=2;
												document.getElementById('QR').innerHTML='<div class="content-bot"><h3>Résultat</h3><div class="inner-top"><div class="services-top">	<div class="col-md-6 grid_1_of_9"><div class="ser-grids"><div class="extra-wrap"><p>Votre situation peut relever d’un COVID 19. Demandez une téléconsultation ou un médecin généraliste ou une visite à domicile (SOS médecins, etc.). Votre numéro d"identification est '+token+'</p></div><div class="clearfix"></div></div></div>'	
												}
												else
												{
												if(FGMin==1||FGMin==2){token=Math.floor(Math.random()*10000); priorite=3;
												document.getElementById('QR').innerHTML='<div class="content-bot"><h3>Résultat</h3><div class="inner-top"><div class="services-top">	<div class="col-md-6 grid_1_of_9"><div class="ser-grids"><div class="extra-wrap"><p>Votre situation peut relever d’un COVID 19.Demandez une téléconsultation ou un médecin généraliste ou une visite à domicile (SOS médecins, etc.). Votre numéro d"identification est '+token+'</p></div><div class="clearfix"></div></div></div>'	
												}
												else
													if(FGMin>2){token=Math.floor(Math.random()*10000); priorite=4;
												document.getElementById('QR').innerHTML='<div class="content-bot"><h3>Résultat</h3><div class="inner-top"><div class="services-top">	<div class="col-md-6 grid_1_of_9"><div class="ser-grids"><div class="extra-wrap"><p>Votre situation peut relever d’un COVID 19.Demandez une téléconsultation ou un médecin généraliste ou une visite à domicile.Si vous n"arrivez pas à obtenir de consultation, appelez le 15. Votre numéro d"identification est '+token+'</p></div><div class="clearfix"></div></div></div>'	
													}
												}
													
												}
												else
												{
													if(fievre==true ||(fievre==false&&(diarrhe==true||(toux==true&&douleur==true)||(toux==true&&ansomie==true))))
													{
													if(FPron==0)
													{ 
													if(FGMin==0){token=Math.floor(Math.random()*10000); priorite=5;
													document.getElementById('QR').innerHTML='<div class="content-bot"><h3>Résultat</h3><div class="inner-top"><div class="services-top">	<div class="col-md-6 grid_1_of_9"><div class="ser-grids"><div class="extra-wrap"><p>Votre situation peut relever d’un COVID 19 qu’il faut surveiller.Si de nouveaux symptômes apparaissent, refaites le test ou consultez votre médecin.Nous vous conseillons de rester à votre domicile. Votre numéro d"identification est '+token+'</p></div><div class="clearfix"></div></div></div>'	
													}
													else
													{
														if(age<50){token=Math.floor(Math.random()*10000); priorite=6;
													    document.getElementById('QR').innerHTML='<div class="content-bot"><h3>Résultat</h3><div class="inner-top"><div class="services-top">	<div class="col-md-6 grid_1_of_9"><div class="ser-grids"><div class="extra-wrap"><p>Votre situation peut relever d’un COVID 19 qu’il faut surveiller.Si de nouveaux symptômes apparaissent, refaites le test ou consultez votre médecin.Nous vous conseillons de rester à votre domicile. Votre numéro d"identification est '+token+'</p></div><div class="clearfix"></div></div></div>'	
														}
														else
														{token=Math.floor(Math.random()*10000); priorite=7;
														document.getElementById('QR').innerHTML='<div class="content-bot"><h3>Résultat</h3><div class="inner-top"><div class="services-top">	<div class="col-md-6 grid_1_of_9"><div class="ser-grids"><div class="extra-wrap"><p>Votre situation peut relever d’un COVID 19.Demandez une téléconsultation ou un médecin généraliste ou une visite à domicile.Appelez le 190 si une gêne respiratoire ou des difficultés importantes pour vous alimenter ou boire apparaissent pendant plus de 24 heures. Votre numéro d"identification est '+token+'</p></div><div class="clearfix"></div></div></div>'	
												    	}
														}
													}
													else
													{
														if(FGMin==0||FGMin==1){token=Math.floor(Math.random()*10000); priorite=8;
														document.getElementById('QR').innerHTML='<div class="content-bot"><h3>Résultat</h3><div class="inner-top"><div class="services-top">	<div class="col-md-6 grid_1_of_9"><div class="ser-grids"><div class="extra-wrap"><p>Votre situation peut relever d’un COVID 19.Demandez une téléconsultation ou un médecin généraliste ou une visite à domicile.Appelez le 190 si une gêne respiratoire ou des difficultés importantes pour vous alimenter ou boire apparaissent pendant plus de 24 heures. Votre numéro d"identification est '+token+'</p></div><div class="clearfix"></div></div></div>'	
														}
														else{token=Math.floor(Math.random()*10000); priorite=9;
														document.getElementById('QR').innerHTML='<div class="content-bot"><h3>Résultat</h3><div class="inner-top"><div class="services-top">	<div class="col-md-6 grid_1_of_9"><div class="ser-grids"><div class="extra-wrap"><p>Votre situation peut relever d’un COVID 19.Demandez une téléconsultation ou un médecin généraliste ou une visite à domicile.Si vous n"arrivez pas à obtenir de consultation, appelez le 190. Votre numéro d"identification est '+token+'</p></div><div class="clearfix"></div></div></div>'	
														}
													}
													}
													else
													{
														if(fievre==false&&(toux==true||douleur==true||ansomie==true))
														{
															if(FPron==0){token=Math.floor(Math.random()*10000); priorite=10;
															document.getElementById('QR').innerHTML='<div class="content-bot"><h3>Résultat</h3><div class="inner-top"><div class="services-top">	<div class="col-md-6 grid_1_of_9"><div class="ser-grids"><div class="extra-wrap"><p>Votre situation peut relever d’un COVID 19 qu’il faut surveiller.Si de nouveaux symptômes apparaissent, refaites le test ou consultez votre médecin.Nous vous conseillons de rester à votre domicile.Votre numéro d"identification est '+token+'</p></div><div class="clearfix"></div></div></div>'	
															}
															else{token=Math.floor(Math.random()*10000); priorite=11;
															document.getElementById('QR').innerHTML='<div class="content-bot"><h3>Résultat</h3><div class="inner-top"><div class="services-top">	<div class="col-md-6 grid_1_of_9"><div class="ser-grids"><div class="extra-wrap"><p>Votre situation peut relever d’un COVID 19. Un avis médical est recommandé.Au moindre doute, appelez le 190. Nous vous conseillons de rester à votre domicile.Votre numéro d"identification est '+token+'</p></div><div class="clearfix"></div></div></div>'	
															}
														}
														else
														{
														document.getElementById('QR').innerHTML='<div class="content-bot"><h3>Résultat</h3><div class="inner-top"><div class="services-top">	<div class="col-md-6 grid_1_of_9"><div class="ser-grids"><div class="extra-wrap"><p>Votre situation ne relève probablement pas du COVID 19.N’hésitez pas à contacter votre médecin en cas de doute.Vous pouvez refaire le test en cas de nouveau symptôme pour réévaluer la situation.Pour toute information concernant le COVID 19, composer le 80.101.919.</p></div><div class="clearfix"></div></div></div>'	

														}
													}
													
													}
												}
											}
											}
										}
															}
														}
													}
												}
											}
										}
									}
								}
							}
							}
						
						}

					}
				}
			}
		
		}
	}
	}
	}
	if(token!=0) 
	envoyerDonnee(token,priorite,codePostal,age,dateAuj)
}


