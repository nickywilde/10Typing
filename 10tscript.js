var ListeDeMots = ["bonjour","heure","temps","pomme","colonne","content","coupe","ballon","courir","sport","monde","champion"];
//document.getElementById("MotDeJour").innerHTML
// genère au début de la partie un mot au hasard
var compteur = 0;
var temps;
var chronometre = false;
var signal = 1;
var disqualifie = false;
var points = 0;
var pos = 617;
var athlete = document.getElementById("athlete");


$("#saisirMot").hide();
$("#reessayer").hide();

function debuterPartie(){
	$("#menu").hide();
	AVosMarques();
}

function recommencerPartie(){
	$("#reessayer").hide();
	points = 0;
	compteur = 0;
	chronometre = false;
	disqualifie = false;
	athlete.src = "Image/athletedepart.png";
  	athlete.style.maxWidth = "90px";
  	athlete.style.left = "600px";
  	athlete.style.top = "350px";
  	pos = 617;
	document.getElementById("temps").innerHTML = "00:00:00";
	AVosMarques();
}

$(document).ready(function(){
	$("body").keypress(function(){
		if(!signal){
			disqualifie = true;
			document.getElementById("signal").innerHTML = "Faux départ !";
		}
	});
});

function PretEtPause(){
	if(!chronometre){
		chronometre = true;
		incrementation();
	}
	else{
		chronometre = false;
	}
}

function reinitialiseTemps(){
	chronometre = false;
	compteur = 0;
	document.getElementById("temps").innerHTML = "00:00:00";
}

function incrementation(){
	if(chronometre){
		setTimeout(function(){
			compteur++;
			var minute = Math.floor(compteur/10/60);
			var seconde = Math.floor(compteur/10%60);
			var centieme = Math.round(compteur%10);
		
		if(minute < 10){
			 minute = "0"+ minute;
		}
		if(seconde < 10){
			 seconde = "0"+ seconde;
		}
		document.getElementById("temps").innerHTML = minute+":"+seconde+":"+centieme;
		incrementation();
		},100)
	}
}

function demarreChrono(){
	setTimeout(function(){PretEtPause();},1000);
}

function AVosMarques() {
   document.getElementById("signal").innerHTML = "A vos marques !";
   setTimeout(function(){
  		document.getElementById("signal").innerHTML = "Prêt !";
  		signal = false;
  		setTimeout(function(){
  			signal = true;
  			if(!disqualifie){
  				document.getElementById("signal").innerHTML = "Go !";
  				athlete.src = "Image/athleteneutre.png";
  				athlete.style.maxWidth = "50px";
  				athlete.style.left = "617px";
  				athlete.style.top = "300px";
  				setTimeout(function(){
  					$("#signal").hide();
  					$("#saisirMot").show();
  				},1000);
  			  	demarreChrono();
  			}
  			else{
  				$("#reessayer").show();
  			}
  		}, 3000);
  	}
  	, 3000);
}

function GenereMot(){
	document.getElementById("MotASaisir").innerHTML = ListeDeMots[Math.floor(Math.random() * ListeDeMots.length)];
}

GenereMot();

function ReinitieSaisie(){
	document.getElementById("saisie").value = '';
}


function courir(){
  pos = pos + 50;
  athlete.style.left = pos + "px";
}

function VerifMot() {
    // la variable MotaSaisir permet de générer un mot au hasard au début de la partie
  var MotASaisir = document.getElementById("MotASaisir").innerHTML;
  // la variable Mot Saisi permet de récupérer
  // la valeur de l'ID saisie dont le mot saisi sur le formulaire
  var MotSaisi = document.getElementById("saisie").value;
	if (MotSaisi != ""){
		if(MotSaisi == MotASaisir){
			if(points == 9)
			{
				courir();
				chronometre = false;
				ReinitieSaisie();
				document.getElementById("signal").innerHTML = "Terminé !";
				$("#signal").show();
				$("#saisirMot").hide();
				$("#reessayer").show();
			}
			else {
				points++;
				courir();
				GenereMot();
				ReinitieSaisie();
			}
		}
		else{
			GenereMot();
			ReinitieSaisie();
		}
	}
	else{
		GenereMot();
		ReinitieSaisie();
	}

}
