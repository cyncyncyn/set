/**
 *  Author: @cynpy
 *  https://github.com/cyncyncyn
 *  License: GPL v3
 *  2009
 *  
 **/

var navegador = window.navigator.userAgent;
var ffox = (navegador.indexOf('MSIE') == -1)?true:false;
window.onload = function(){
//FUNCION PARA EVALUAR SI ES SET
	function evaluoSet( a, b, c){ //recibo 3 valores
		if(a == b && b == c){return true;}
		else if(a != b && b != c && a != c){return true;}
		else{return false;}
	}

//VARIABLES PARA LA FUNCION DE IMAGEN SET
	var divContenedor = document.getElementById('contenedor');
	var imgSet = document.createElement('img');
	var imgPerd = document.createElement('img');
	var divArriba = document.createElement('div');
	divArriba.id='arriba';
	var subirP = 0;
	var bajarP = 9;
	var tamanoInicialP = 100;
	
//VARIABLES PARA EL DIV DE STATUS
	var divStatus = document.getElementById('status');
	var pStatus = divStatus.getElementsByTagName('p')[0];

//FUNCION QUE CHEQUEA EL PUNTAJE Y EN CASO DE QUE SEA MENOR A 5 DISPARA EL EFECTO "PERDISTE"
	var perder = setInterval(perdiste,10); 
	function perdiste(){
		if(puntos<=-5){
			var efectoPerdiste = setInterval(imgPerdiste,30);
			pStatus.innerHTML='PERDISTE!!'
			clearInterval(perder);
			clearInterval(temporizador);
		}
	
	//FUNCION DE LA IMAGEN PERDISTE
		function imgPerdiste(){
			if(imgSet.parentNode!=null){divArriba.removeChild(imgSet)}
			divContenedor.appendChild(divArriba);
			imgPerd.src='img/perdiste.png';
			divArriba.appendChild(imgPerd);
			imgPerd.width = tamanoInicialP;
			if(subirP<10){
				tamanoInicialP+=50;
				if(ffox){imgPerd.style.opacity="0."+subirP;}
				else{imgPerd.style.filter='alpha(opacity='+subirP+'0)';}
			}else{
				if(ffox){imgPerd.style.opacity=1;}
				else{imgPerd.style.filter='alpha(opacity=100)';}
				clearInterval(efectoPerdiste);
			}
			subirP++;
		}
	}//cierra funcion perdiste
	
//FUNCION PARA RESTAR PUNTOS	
	function restar(){
		if(puntos >-5){
			puntos--;
			divPuntos.innerHTML = 'Puntos: '+ puntos;
		}
	}
//FUNCION QUE AGREGA CARTAS
	function agregarCartas(cuantas){
		if(maxTiempo>0 && puntos>-5){
			//cuantas tiene que ser igual a la cant de img con display +3,
			for(var x=0; x<lasCartas.length;x++){//recorro las imagenes para saber cuantas hasta esa altura se muestran			
				if(lasCartas[x].style.display==''){ 
				cuantas++;
				}else{
				break;
				}
			}//CIERRA EL FOR DE CARTAS
			for(var x=0;x<cuantas;x++){
				if(lasCartas[x]!=undefined  && lasCartas[x].style.display=='none' ){
					lasCartas[x].style.display="";
				}
			}
		}
	}

//ME GUARDARÁ LAS IMÁGENES
	var lasCartas; 

/*PUNTOS*/
	var puntos = 0;
	var divPuntos = document.getElementById('puntos');
	divPuntos.innerHTML = 'Puntos: '+puntos;

	/*BOTON REPARTIR MAS*/
	var	btn = document.getElementById('agregar');
	btn.onclick = function(){ agregarCartas(3);
		if(maxTiempo>0){restar();}
	}

/*TEMPORIZADOR*/
	var divTiempo = document.getElementById('tiempo');
	var parr = document.createElement('p')
	parr.innerHTML='3:00';
	divTiempo.appendChild(parr);
	var maxTiempo = 179;
	function cuentaAbajo(){
		function tiempoReal ( segundos ) {
					var cantidadMinutos = Math.floor( segundos / 60 );
					var diferenciaSegundos = segundos - ( cantidadMinutos * 60 ) ;
					if( diferenciaSegundos < 10 ) diferenciaSegundos = '0'+diferenciaSegundos ;
					return cantidadMinutos+':'+diferenciaSegundos;
				}
		parr.innerHTML = tiempoReal(maxTiempo);
		if(maxTiempo==0){detener()}
		maxTiempo--;
	}
	var temporizador = setInterval(cuentaAbajo , 1000);
	
/*FUNCIÓN  QUE SE DISPARA AL TERMINARSE EL TIEMPO*/
	function detener(){
		clearInterval(temporizador);
		if(puntos>=10){pStatus.innerHTML='Sos un SET-MASTER!!'}
		else if(puntos>=5){pStatus.innerHTML='Sos un SET-EXPERT!'}
		else if(puntos>=0){pStatus.innerHTML='Sos un SET-Beginner'}
		else{pStatus.innerHTML='Te falta práctica...'}	
	}

/*FUNCIÓN QUE SACA NÚMEROS AL AZAR PARA USAR EN CARTAS*/
	 function azar(){ 
		return Math.round(Math.random() * 2)+ 1;
	}

/*REPARTIR*/
	var divCartas = document.getElementById('cartas');

/*FUNCIÓN PARA REPARTIR CARTAS*/
	function repartir(cuantas){
		var cantidad; //1 2 o 3
		var forma; //1 = pildora 2 = diamante 3 = virgulilla
		var color;  //1 = verde 2 = Rojo 3 = Violeta
		var relleno; //1 = lleno 2= rayado 3 = vacio
		var carta;
		var cartasSalidas =[];
		var error;//PARA REPETIR SI YA SALIÓ LA CARTA

		for(var i=0;i<cuantas;i++){
			var img = document.createElement('img');
			do{
				error=false
				//saco los 4 numeros
				cantidad = azar(); 
				forma = azar();
				color = azar(); 
				relleno =azar();
				//asigno a carta
				carta = cantidad+''+forma+''+color+''+relleno;
				//ME FIJO SI SALIERON RECORRIENDO UN ARRAY QUE GUARDE LAS CARTAS SALIDAS
				for(var x in cartasSalidas){//recorro las cartas salidas
					if(cartasSalidas[x] == carta){ //(si coincide al recorrer)
						error=true;	
						break;//si la encontró ya no tiene por que recorrer más
					}
				}
			}while(error)
			cartasSalidas.push(carta);//AGREGO LA CARTA QUE SALIÓ A MI ARRAY DE CARTAS SALIDAS
			img.src ='cartas/'+carta+'.png'
			img.alt=carta;
			divCartas.appendChild(img);
		}
		lasCartas = divCartas.getElementsByTagName('img');//levanto las imágenes
		for(var x=0; x<lasCartas.length;x++){//recorro las imagenes para que al hacer click guarde su numero
			if(x >= 12){			
			lasCartas[x].style.display="none";
			}
		}
	}
	repartir(81 );
/*FIN REPARTIR*/
	
	var evalNumero = [] //array para guardar los numerosque corresponden a cantidad
	var dividir;
	var set=[];//guardo los numeros clickeados
	for(var x=0; x<lasCartas.length;x++){//recorro las imagenes para que al hacer click guarde su numero
		var cartaElegida =[];//creo un array para guardar los numeros de cada carta
		var setFormado = []; //array para probar si puedoe liminar las img seleccionadas
	

		lasCartas[x].onclick= function(){
			if(maxTiempo>0 && puntos>-5){//El onclick sirve solo por el tiempo determinado
				if(set.length<3){ //para seleccionar solo 3
					if(ffox){this.style.opacity='0.5';}
					else{this.style.filter='alpha(opacity=50)';}
					
					if(set.length==0){//para la primer carta, hago el push de la primer carta seleccionada
						set.push(this.alt);
						setFormado.push(this);//hago un push de la imagen para luego borrar
					 }//CIERRA EL IF PARA LA PRIMER CARTA
					 else{//si no es la primer carta...
						if(this.alt!= set[0] && this.alt!=set[1]){ //si el alt de la carta que clickee primero es distinto al alt de la siguiente que clickee
							set.push(this.alt)
							setFormado.push(this)//hago un push de la imagen para luego poder borrarlo	
						}
					}//CIERRA EL ELSE DE LA PRIMERA CARTA
						
					switch(set.length){ //CADA VEZ QUE HAGO CLICK ME FIJO SI ES LA 1, 2 O 3 CARTA Y DIVIDO SU ALT PARA LUEGO EVALUAR LOS NÚMEROS UNO A UNO (EMPATE)
						case 1:	cartaElegida[0] = set[0].split(''); 
								break;
						case 2: cartaElegida[1] = set[1].split('');
								break;
						case 3: cartaElegida[2] = set[2].split('');
								break;
					}
					if(set.length==3){//cuando ya tengo mis 3 cartas empiezo a evaluar
						/*SI DOS CARTAS SON Y UNA NO ES ENTONCES NO ES SET.	TENGO QUE CHEQUEAR PROPIEDAD POR PROPIEDAD. TOMO CARACTER POR CARACTER DE CADA CARTA */
						var setCant = evaluoSet(cartaElegida[0][0], cartaElegida[1][0], cartaElegida[2][0] )//evaluo cantidad
						var setForma = evaluoSet(cartaElegida[0][1], cartaElegida[1][1], cartaElegida[2][1] )//evaluo forma
						var setColor = evaluoSet(cartaElegida[0][2], cartaElegida[1][2], cartaElegida[2][2] )//evaluo color
						var setRelleno = evaluoSet(cartaElegida[0][3], cartaElegida[1][3], cartaElegida[2][3] )//evaluo relleno
						if(setCant && setForma && setColor && setRelleno){ //ES SET!!!!!!!!
							maxTiempo+=10;
							var subir = 0;
							var bajar = 9;
							var tamanoInicial = 100;					
							function esSet(){
								divArriba.appendChild(imgSet);
								divContenedor.appendChild(divArriba);
								imgSet.src='img/set.png';
								imgSet.width = tamanoInicial;
								subir++;
								if(subir<10){
									tamanoInicial+=50;
									if(ffox){imgSet.style.opacity="0."+subir;}
									else{imgSet.style.filter='alpha(opacity='+subir+'0)';}
								}
								if(subir>=20 && bajar>=0){
									if(ffox){imgSet.style.opacity="0."+bajar;}
									else{imgSet.style.filter='alpha(opacity='+bajar+'0)';}
									if(subir%2==0){
										bajar--;
									}//para que baje más lento...
								}
								if(subir==40){
									divContenedor.removeChild(divArriba)
									clearInterval(efecto);
								}
							}
							//EFECTO SET
							var efecto = setInterval (esSet, 30);
							
							puntos++;
							//SACO LAS CARTAS DEL SET ENCONTRADO
							divCartas.removeChild(setFormado[0]);
							divCartas.removeChild(setFormado[1]);
							divCartas.removeChild(setFormado[2]);
							for (var x =0;x<12;x++){
								if(lasCartas[x].style.display=="none"){
									lasCartas[x].style.display="";
								}
							}
							
							divPuntos.innerHTML='Puntos: '+ puntos;
						}else{//SI NO ES SET
							if(ffox){
								setFormado[0].style.opacity='1';
								setFormado[1].style.opacity='1';
								setFormado[2].style.opacity='1';
							}else{
								setFormado[0].style.filter='alpha(opacity=100)';
								setFormado[1].style.filter='alpha(opacity=100)';
								setFormado[2].style.filter='alpha(opacity=100)';
							}
							restar();//resto punto si no es set
						}
							
						set.length=0; //limpio para volver a seleciconar
						setFormado.length=0;//limpio para volver a poder seleccionar
							
					}//CIERRA if(set.length==3)
							
				}//CIERRA EL IF PARA SELECCIONAR SÓLO 3
					
			}//CIERRA EL IF DE TIEMPO Y PUNTOS
			
		}//CIERRA EL ONCLICK
		
	}//CIERRA EL FOR
	
}//CIERRA EL ONLOAD
