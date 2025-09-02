let dinero = 100;
let apuesta = 0;
let mazo = [];
let jugador = [];
let casa = [];

function mostrarJuego(){
  document.getElementById('portada').classList.remove('activa');
  document.getElementById('juego').classList.add('activa');
  iniciarMazo();
}

function iniciarMazo(){
  const palos = ['♠','♥','♦','♣'];
  const valores = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
  mazo = [];
  for(let p of palos){
    for(let v of valores){
      mazo.push({valor: v, palo: p});
    }
  }
  mazo = mazo.sort(() => Math.random() - 0.5);
}

function valorCarta(c){
  if(['J','Q','K'].includes(c.valor)) return 10;
  if(c.valor==='A') return 11;
  return parseInt(c.valor);
}

function repartirCarta(destino){
  const carta = mazo.pop();
  destino.push(carta);
  mostrarCartas();
}

function mostrarCartas(){
  document.getElementById('jugador').innerHTML = jugador.map(c => `<span class='card'>${c.valor}${c.palo}</span>`).join('');
  document.getElementById('casa').innerHTML = casa.map(c => `<span class='card'>${c.valor}${c.palo}</span>`).join('');
  document.getElementById('dinero').textContent = dinero;
}

function total(mano){
  let suma = mano.reduce((acc,c) => acc + valorCarta(c),0);
  let ases = mano.filter(c => c.valor==='A').length;
  while(suma > 21 && ases>0){
    suma -= 10; ases--;
  }
  return suma;
}

function apostar(){
  apuesta = parseInt(document.getElementById('apuesta').value);
  if(apuesta>dinero || apuesta<=0){
    alert('Apuesta inválida');
    return;
  }
  jugador = [];
  casa = [];
  repartirCarta(jugador);
  repartirCarta(casa);
  repartirCarta(jugador);
  repartirCarta(casa);
}

function pedirCarta(){
  repartirCarta(jugador);
  if(total(jugador) > 21){
    perder();
  }
}

function quedarse(){
  while(total(casa) < 17){
    repartirCarta(casa);
  }
  if(total(casa) > 21 || total(jugador) > total(casa)){
    ganar();
  } else if(total(jugador) === total(casa)){
    alert('Empate');
  } else {
    perder();
  }
}

function ganar(){
  dinero += apuesta * 1.5;
  mostrarCartas();
}

function perder(){
  dinero -= apuesta;
  mostrarCartas();
  if(dinero <= 0){
    document.getElementById('juego').classList.remove('activa');
    document.getElementById('gameover').classList.add('activa');
  }
}

function reiniciar(){
  dinero = 100;
  document.getElementById('gameover').classList.remove('activa');
  document.getElementById('portada').classList.add('activa');
}