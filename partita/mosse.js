var scacchiera = new Array();
var pezScac = {};
var info = {};
const color = getCookie(document.cookie.split("; "), "color");
const user = getCookie(document.cookie.split("; "), "username");
const partita = getCookie(document.cookie.split("; "), "partita");
var clientId = null;
var clientIdAvv = null;
var game = null;

let ws = new WebSocket("ws://localhost:3001");
ws.onmessage = (message) => {
  const response = JSON.parse(message.data);
  //connect
  if (response.method === "connect") {
    clientId = response.clientId;
    console.log("Il client id è stato configurato correttamente: " + clientId);

    const json = {
      mod: "crea",
      clientId: clientId,
      color: color,
      username: user,
      partita: partita,
    };

    ws.send(JSON.stringify(json));
  }
  if (response.mod === "start") {
    game = response.game;
    console.log("start");
    console.log(partita);
    console.log(game);
    let indice;
    for (let i = 0; i < game.length; i++) {
      if (game[i].utente == user) {
        if (i == 0) {
          indice = 1;
        } else {
          indice = 0;
        }
      }
    }
    clientIdAvv = game[indice].clientId;
  }
  if (response.mod === "spostaAvv") {
    //info["immagini"] = response.immagini;
    if (response.arrocco !== undefined) {
      document
        .getElementById(response.posTorre[0])
        .appendChild(document.getElementById(response.arrocco));
    }
    if (response.enPassant !== undefined) {
      console.log(response.enPassant);
      if (response.enPassant[1] == "n")
        document
          .getElementById("mangiati-neri")
          .append(document.getElementById(response.enPassant));
      else
        document
          .getElementById("mangiati-bianchi")
          .append(document.getElementById(response.enPassant));
      document.getElementById(response.enPassant).removeAttribute("onclick");
    }
    var precol = info["giocatore"];
    pezScac = response.pezScac;
    info = response.info;
    $("#" + response.posizione[0]).append($("#" + response.pezzo)[0]);

    if (precol == "B") {
      var div = document.createElement("div");
      div.innerHTML = info["numMosse"] + ". ";
      div.setAttribute("class", "mossa");
      div.setAttribute("id", "mossa-" + info["numMosse"]);
      var divPezzo = document.createElement("div");
      divPezzo.innerHTML = response.pezzo + "-" + response.posizione[0] + ";";
      divPezzo.setAttribute("style", "display: inline; color: white;");
      div.appendChild(divPezzo);
      document.getElementById("cronologia-mosse").appendChild(div);
    } else if (precol == "N") {
      var divPezzo = document.createElement("div");
      divPezzo.innerHTML = response.pezzo + "-" + response.posizione[0] + ";";
      divPezzo.setAttribute("style", "display: inline; color: black;");
      document
        .getElementById("mossa-" + info["numMosse"])
        .appendChild(divPezzo);
    }
  }
  if (response.mod === "mangiaAvv") {
    var precol = info["giocatore"];
    pezScac = response.pezScac;
    info = response.info;
    $("#" + response.posizioneMangiante[0]).append(
      $("#" + response.pezzoMangiante)[0]
    );
    pezScac[response.pezzoMangiante]["posizione"][0] =
      response.posizioneMangiante[0];
    pezScac[response.pezzoMangiante]["posizione"][1] = parseInt(
      response.posizioneMangiante[1]
    );
    pezScac[response.pezzoMangiante]["posizione"][2] = parseInt(
      response.posizioneMangiante[2]
    );

    if (precol == "B") {
      var div = document.createElement("div");
      div.innerHTML = info["numMosse"] + ". ";
      div.setAttribute("class", "mossa");
      div.setAttribute("id", "mossa-" + info["numMosse"]);
      var divPezzo = document.createElement("div");
      divPezzo.innerHTML =
        response.pezzoMangiante + "-" + response.posizioneMangiante[0] + ";";
      divPezzo.setAttribute("style", "display: inline; color: white;");
      div.appendChild(divPezzo);
      document.getElementById("cronologia-mosse").appendChild(div);
    } else if (precol == "N") {
      var divPezzo = document.createElement("div");
      divPezzo.innerHTML =
        response.pezzoMangiante + "-" + response.posizioneMangiante[0] + ";";
      divPezzo.setAttribute("style", "display: inline; color: black;");
      document
        .getElementById("mossa-" + info["numMosse"])
        .appendChild(divPezzo);
    }
    document
      .getElementById(response.pezzoMangiato)
      .setAttribute("width", "50px");
    document.getElementById(response.pezzoMangiato).removeAttribute("onclick");
    if (response.pezzoMangiato[1] == "w") {
      document
        .getElementById("mangiati-bianchi")
        .append(document.getElementById(response.pezzoMangiato));
    } else {
      document
        .getElementById("mangiati-neri")
        .append(document.getElementById(response.pezzoMangiato));
    }
  }
  if (response.mod === "mattoAvv") {
    $("#modale-perdita").css("display", "block");
  }
  if (response.mod === "promAvv") {
    pezScac = response.pezScac;
    info = response.info;
    document
      .getElementById(response.casellaId)
      .removeChild(document.getElementById(response.pedone));
    var nuovo = document.createElement("img");
    if (response.pezzoId[1] == "w") {
      var src;
      nuovo.setAttribute("class", "pezzo-bianco");
      switch (response.pezzoId[0]) {
        case "c":
          src = "../Immagini/Pezzi/Bianchi/Cavallo bianco.png";
          break;
        case "a":
          src = "../Immagini/Pezzi/Bianchi/Alfiere Bianco.png";
          break;
        case "t":
          src = "../Immagini/Pezzi/Bianchi/Torre bianca.png";
          break;
        case "q":
          src = "../Immagini/Pezzi/Bianchi/Regina bianca.png";
          break;
        default:
          break;
      }
    } else {
      nuovo.setAttribute("class", "pezzo-nero");
      switch (response.pezzoId[0]) {
        case "c":
          src = "../Immagini/Pezzi/Neri/Cavallo nero.png";
          break;
        case "a":
          src = "../Immagini/Pezzi/Neri/Alfiere nero.png";
          break;
        case "t":
          src = "../Immagini/Pezzi/Neri/Torre nera.png";
          break;
        case "q":
          src = "../Immagini/Pezzi/Neri/Regina nera.png";
          break;
        default:
          break;
      }
    }
    nuovo.setAttribute("src", src);
    //trovare l'immagine giusta
    nuovo.setAttribute("onclick", "move(this.id)");
    nuovo.setAttribute("id", response.pezzoId);
    document.getElementById(response.casellaId).appendChild(nuovo);
    $("#modale-promozione").css("display", "none");
  }
  if (response.mod === "abbandonaAvv") {
    $("#modale-vinta-per-abbandono").css("display", "block");
  }
  if (response.mod === "pareggioAvv") {
    $("#modale-proponi-pareggio").css("display", "block");
  }
  if (response.mod === "pareggioAccAvv") {
    $("#modale-attesa-pareggio").css("display", "none");
    $("#modale-pareggio-si").css("display", "block");
  }
  if (response.mod === "pareggioRifAvv") {
    $("#modale-attesa-pareggio").css("display", "none");
    $("#modale-pareggio-no").css("display", "block");
  }
  if (response.mod === "attendiAvv") {
    $("#modale-promozione").css("display", "block");
  }
};
//_____________GESTORE EVENTI BOTTONI______________________
$("#yes").click(function () {
  json = {
    mod: "abbandona",
    opponent: clientIdAvv,
  };
  ws.send(JSON.stringify(json));
  var avv = game[0].utente == user ? game[1].utente : game[0].utente;
  $.ajax({
    url: "leave.php",
    type: "POST",
    data: { user: user, avv: avv },
    success: function () {
      console.log("Successo");
      window.location = "http://localhost:3000/logged/index.php";
    },
    error: function () {
      console.log("Errore");
    },
  });
});
$("#no").click(() => {
  $("#modale-abbandona").css("display", "none");
});
$("#leave").click(() => {
  $("#modale-abbandona").css("display", "block");
});
$("#goHome").click(() => {
  window.location = "http://localhost:3000/logged/index.php";
});
$("#abbandono").click(() => {
  window.location = "http://localhost:3000/logged/index.php";
});
$("#continua").click(() => {
  $("#modale-pareggio-no").css("display", "none");
});
$("#pareggioSi").click(() => {
  var json = {
    mod: "pareggioAccettato",
    opponent: clientIdAvv,
  };
  ws.send(JSON.stringify(json));
  var avv = game[0].utente == user ? game[1].utente : game[0].utente;
  $.ajax({
    url: "tie.php",
    type: "POST",
    data: { user: user, avv: avv },
    success: function () {
      window.location = "http://localhost:3000/logged/index.php";
    },
    error: function () {
      console.log("Errore");
    },
  });
});
$("#pareggioNo").click(() => {
  $("#modale-proponi-pareggio").css("display", "none");
  var json = {
    mod: "pareggioRifiutato",
    opponent: clientIdAvv,
  };
  ws.send(JSON.stringify(json));
});
$("#tie").click(() => {
  $("#modale-attesa-pareggio").css("display", "block");
  var json = {
    mod: "pareggio",
    opponent: clientIdAvv,
  };
  ws.send(JSON.stringify(json));
});
//_____________INIZIO MOSSE SCACCHIERA_____________________
function creaScacchiera() {
  let lettere = new Array("a", "b", "c", "d", "e", "f", "g", "h");
  let numeri = new Array("1", "2", "3", "4", "5", "6", "7", "8");
  let appoggio = new Array();
  for (let i = 0; i < 8; i++) {
    for (let index = 0; index < 8; index++) {
      appoggio.push(lettere[index] + numeri[numeri.length - (i + 1)]);
    }
    scacchiera.push(appoggio);
    appoggio = new Array();
  }
}
function infoPezzi() {
  let celle = $(".scacchiera").children();
  let idPezzi = new Array();
  for (let index = 0; index < celle.length; index++) {
    const element = celle[index];

    if (getChildren(element).length != 0)
      idPezzi.push(getChildren(element)[0].id);
  }

  celle = {};
  for (let i = 0; i < scacchiera.length; i++) {
    for (let j = 0; j < scacchiera[0].length; j++) {
      celle[scacchiera[i][j]] = [i, j];
    }
  }

  for (let index = 0; index < idPezzi.length; index++) {
    let cella = document.getElementById(idPezzi[index]).parentElement.id;
    pezScac[idPezzi[index]] = {
      mosse: new Array(),
      mossePossibili: {},
      posizione: [cella, celle[cella][0], celle[cella][1]],
      daMangiare: {},
      mosseFuture: [],
      inchiodato: [false, "", [], []],
    };
    if (idPezzi[index][0] == "k" || idPezzi[index][0] == "t") {
      pezScac[idPezzi[index]]["mosso"] = false;
    }
    if (idPezzi[index][0] == "p") {
      pezScac[idPezzi[index]]["mosso"] = false;
      pezScac[idPezzi[index]]["enPassant"] = false;
    }
  }

  info["immagini"] = {
    pedone: 1,
    torre: 1,
    alfiere: 1,
    cavallo: 1,
    re: 1,
    regina: 1,
  };
  info["ultimoPezzo"] = "";
  info["giocatore"] = "B";
  info["scacco"] = false;
  info["scaccoMatto"] = false;
  info["evadiScacco"] = {};
  info["minacciaScacco"] = [];
  info["aggiornaPezzi"] = [9, "", ""];
  info["arrocco"] = false;
  info["numMosse"] = 0;

}

function getChildren(n) {
  var node = n.firstChild;
  var l = [];
  var s = n.childNodes;
  if (node) {
    do {
      if (node.nodeType === 1) {
        l.push(node);
      }
    } while ((node = node.nextSibling));
  }
  return l;
}

function removeCerchi(id) {
  for (let key in pezScac[id]["mossePossibili"]) {
    document
      .getElementById(key)
      .parentElement.removeChild(document.getElementById(key));
  }
  pezScac[id]["mossePossibili"] = {};
  pezScac[id]["daMangiare"] = {};
}

function sostituisciPezzo(idPezzo) {
  var idPedone = info["aggiornaPezzi"][1];
  var cella = info["aggiornaPezzi"][2];
  document.getElementById(cella).removeChild(document.getElementById(idPedone));
  var nuovo = document.getElementById(idPezzo);
  var copia = nuovo.cloneNode(true);
  if (idPezzo[1] == "w") {
    document.getElementById("modale-bianco").style.display = "none";
    copia.setAttribute("class", "pezzo-bianco");
  } else {
    document.getElementById("modale-nero").style.display = "none";
    copia.setAttribute("class", "pezzo-nero");
  }
  copia.setAttribute("onclick", "move(this.id)");
  copia.setAttribute("id", copia.id + info["aggiornaPezzi"][0]);
  document.getElementById(cella).appendChild(copia);
  info["aggiornaPezzi"][0] += 1;
  pezScac[copia.id] = {
    mosse: new Array(),
    mossePossibili: {},
    posizione: pezScac[idPedone]["posizione"],
    daMangiare: {},
    mosseFuture: [],
    inchiodato: [false, "", [], []],
  };
  delete pezScac[idPedone];
  info["ultimoPezzo"] = "";
  calcolaMosseFuture();
  var json = {
    mod: "promozione",
    opponent: clientIdAvv,
    pezzoId: copia.id,
    casellaId: cella,
    pedone: idPedone,
    pezScac: pezScac,
    info: info,
  };
  ws.send(JSON.stringify(json));
}

function prendiPezzo(colore) {
  document.getElementById("modale-" + colore).style.display = "block";
  var json = {
    mod: "attendi",
    opponent: clientIdAvv
  };
  ws.send(JSON.stringify(json));
}

function matto() {
  if (info["scaccoMatto"]) {
    $("#modale-vincita").css("display", "block");
    var avv = game[0].utente == user ? game[1].utente : game[0].utente;
    $.ajax({
      url: "win.php",
      type: "POST",
      data: { user: user, avv: avv },
      success: function () {
        console.log("Successo");
      },
      error: function () {
        console.log("Errore");
      },
    });
    var json = {
      mod: "matto",
      opponent: clientIdAvv,
    };
    ws.send(JSON.stringify(json));
  }
}

function mangia(idImg) {
  if (info["scacco"]) {
    info["scacco"] = false;
    info["minacciaScacco"] = [];
    info["evadiScacco"] = {};
  }
  var e = info["ultimoPezzo"];
  if (e[0] == "p") {
    pezScac[e]["mosso"] = true;
  }
  if ( (e[0] == "k" && !pezScac[e]["mosso"]) || (e[0] == "t" && !pezScac[e]["mosso"])) {
    pezScac[e]["mosso"] = true;
  }
  var mangiato = document.getElementById(pezScac[e]["daMangiare"][idImg]);
  mangiato.setAttribute("width", "50px");
  document
    .getElementById(pezScac[e]["daMangiare"][idImg])
    .removeAttribute("onclick");
  if (pezScac[e]["daMangiare"][idImg][1] == "w") {
    document
      .getElementById("mangiati-bianchi")
      .append(document.getElementById(pezScac[e]["daMangiare"][idImg]));
  } else {
    document
      .getElementById("mangiati-neri")
      .append(document.getElementById(pezScac[e]["daMangiare"][idImg]));
  }
  document
    .getElementById(pezScac[e]["mossePossibili"][idImg])
    .appendChild(document.getElementById(e));
  cambiaInfoPezzo(idImg, e);
  var f = pezScac[e]["mossePossibili"][idImg];
  //salva in cronologia mosse
  if (info["giocatore"] == "B") {
    info["numMosse"] += 1;
    var div = document.createElement("div");
    div.innerHTML = info["numMosse"] + ". ";
    div.setAttribute("class", "mossa");
    div.setAttribute("id", "mossa-" + info["numMosse"]);
    var divPezzo = document.createElement("div");
    divPezzo.innerHTML = e + "-" + pezScac[e]["mossePossibili"][idImg] + ";";
    divPezzo.setAttribute("style", "display: inline; color: white;");
    div.appendChild(divPezzo);
    document.getElementById("cronologia-mosse").appendChild(div);
  } else if (info["giocatore"] == "N") {
    var divPezzo = document.createElement("div");
    divPezzo.innerHTML = e + "-" + pezScac[e]["mossePossibili"][idImg] + ";";
    divPezzo.setAttribute("style", "display: inline; color: black;");
    document.getElementById("mossa-" + info["numMosse"]).appendChild(divPezzo);
  }
  removeCerchi(e);
  if (
    e[0] == "p" &&
    (pezScac[e]["posizione"][0][1] == "8" ||
      pezScac[e]["posizione"][0][1] == "1")
  ) {
    info["aggiornaPezzi"][1] = e;
    info["aggiornaPezzi"][2] = f;
    if (e[1] == "w") prendiPezzo("bianco");
    else prendiPezzo("nero");
  }
  delete pezScac[mangiato.id];
  //setTimeout(() => calcolaMosseFuture(), 100);
  calcolaMosseFuture();
  if (info["giocatore"] == "B") {
    //if (id[1] == 'w'){
    info["giocatore"] = "N";
  } else if (info["giocatore"] == "N") {
    //else if (id[1] == 'n'){
    info["giocatore"] = "B";
  }
  setTimeout(() => matto(), 100);
  var json = {
    mod: "mangia",
    opponent: clientIdAvv,
    pezzoMangiante: e,
    posizioneMangiante: pezScac[e]["posizione"],
    pezzoMangiato: mangiato.id,
    pezScac: pezScac,
    info: info,
  };
  ws.send(JSON.stringify(json));
}

function sposta(idImg) {
  var json = {};
  if (info["scacco"]) {
    info["scacco"] = false;
    info["minacciaScacco"] = [];
    info["evadiScacco"] = {};
  }
  var e = info["ultimoPezzo"];
  if (e[0] == "p") {
    pezScac[e]["mosso"] = true;
    //per en passant
    var oldPositionPed = [];
    pezScac[e]["posizione"].forEach((element) => {
      oldPositionPed.push(element);
    });
  }
  cambiaInfoPezzo(idImg, e);
  //gestisci arrocco
  if (info["arrocco"] && e[0] == "k") {
    //gestire arrocco
    var casella = document.getElementById(pezScac[e]["mossePossibili"][idImg]);
    var posRe = pezScac[e]["posizione"];
    //se casella.id[0] == 'b'
    if (casella.id[0] == "g") {
      if (casella.id[1] == "8") {
        //arrocca re bianco con torre1
        document
          .getElementById(scacchiera[posRe[1]][posRe[2] - 1])
          .appendChild(document.getElementById("tn2"));
        pezScac[e]["mosso"] = true;
        pezScac["tn2"]["mosso"] = true;
        info["arrocco"] = false;
        pezScac["tn2"]["posizione"] = ["f8", 0, 5];
        json["arrocco"] = "tn2";
        json["posTorre"] = ["f8", 0, 5];
      } else if (casella.id[1] == "1") {
        //arrocca re nero con torre1
        document
          .getElementById(scacchiera[posRe[1]][posRe[2] - 1])
          .appendChild(document.getElementById("tw2"));
        pezScac[e]["mosso"] = true;
        pezScac["tn1"]["mosso"] = true;
        info["arrocco"] = false;
        pezScac["tw2"]["posizione"] = ["f1", 7, 5];
        json["arrocco"] = "tw2";
        json["posTorre"] = ["f1", 7, 5];
      }
    } else if (casella.id[0] == "c") {
      if (casella.id[1] == "8") {
        //arrocca re bianco con torre2
        document
          .getElementById(scacchiera[posRe[1]][posRe[2] + 1])
          .appendChild(document.getElementById("tn1"));
        pezScac[e]["mosso"] = true;
        pezScac["tw2"]["mosso"] = true;
        info["arrocco"] = false;
        pezScac["tn1"]["posizione"] = ["d8", 0, 3];
        json["arrocco"] = "tn1";
        json["posTorre"] = ["d8", 0, 3];
      } else if (casella.id[1] == "1") {
        //arrocca re nero con torre2
        document
          .getElementById(scacchiera[posRe[1]][posRe[2] + 1])
          .appendChild(document.getElementById("tw1"));
        pezScac[e]["mosso"] = true;
        pezScac["tn2"]["mosso"] = true;
        info["arrocco"] = false;
        pezScac["tw1"]["posizione"] = ["d1", 7, 3];
        json["arrocco"] = "tw1";
        json["posTorre"] = ["d1", 7, 3];
      }
    }
  }
  if (
    (e[0] == "k" && !pezScac[e]["mosso"]) ||
    (e[0] == "t" && !pezScac[e]["mosso"])
  ) {
    pezScac[e]["mosso"] = true;
  }
  //gestisci premio prezzo pedone
  var f = pezScac[e]["mossePossibili"][idImg];
  if (
    e[0] == "p" &&
    (pezScac[e]["posizione"][0][1] == "8" ||
      pezScac[e]["posizione"][0][1] == "1")
  ) {
    info["aggiornaPezzi"][1] = e;
    info["aggiornaPezzi"][2] = f;
    if (e[1] == "w") prendiPezzo("bianco");
    else prendiPezzo("nero");
  }

  //attivazione flag en passant
  if (e[0] == "p") {
    if (
      oldPositionPed[0][1] == "7" &&
      pezScac[e]["posizione"][0][1] == "5" &&
      e[1] == "n"
    ) {
      pezScac[e]["enPassant"] = true;
    } else if (
      oldPositionPed[0][1] == "2" &&
      pezScac[e]["posizione"][0][1] == "4" &&
      e[1] == "w"
    ) {
      pezScac[e]["enPassant"] = true;
    } else if (
      (oldPositionPed[0][1] != 7 && e[1] == "n") ||
      (oldPositionPed[0][1] != 2 && e[1] == "w")
    ) {
      pezScac[e]["enPassant"] = false;
    }
  }

  //rimuovi pedone mangiato con en passant
  if (e[0] == "p") {
    var cella = pezScac[e]["posizione"][0];
    if (e[1] == "n") {
      var cellaObiettivo = cella[0] + (parseInt(cella[1]) + 1).toString();
    } else {
      var cellaObiettivo = cella[0] + (parseInt(cella[1]) - 1).toString();
    }
    var idObiettivo = document.getElementById(cellaObiettivo);
    var figli = getChildren(idObiettivo);
    if (e[1] == "n") {
      document.getElementById("mangiati-bianchi").append(figli[0]);
    } else {
      document.getElementById("mangiati-neri").append(figli[0]);
    }
    if (info["numMosse"] != 0) {
      var idPezzo = document
        .getElementById("mossa-" + info["numMosse"])
        .lastChild.innerHTML.split("-")[0];
    }
    if (figli.length != 0 && figli[0].id == idPezzo) {
      figli[0].setAttribute("width", "50px");
      figli[0].removeAttribute("onclick");
      delete pezScac[idPezzo];
      json["enPassant"] = figli[0].id;
    }
    document
      .getElementById(pezScac[e]["mossePossibili"][idImg])
      .appendChild(document.getElementById(e));
  } else {
    document
      .getElementById(pezScac[e]["mossePossibili"][idImg])
      .appendChild(document.getElementById(e));
  }

  //salva in cronologia mosse
  if (info["giocatore"] == "B") {
    info["numMosse"] += 1;
    var div = document.createElement("div");
    div.innerHTML = info["numMosse"] + ". ";
    div.setAttribute("class", "mossa");
    div.setAttribute("id", "mossa-" + info["numMosse"]);
    var divPezzo = document.createElement("div");
    divPezzo.innerHTML = e + "-" + pezScac[e]["mossePossibili"][idImg] + ";";
    divPezzo.setAttribute("style", "display: inline; color: white;");
    div.appendChild(divPezzo);
    document.getElementById("cronologia-mosse").appendChild(div);
  } else if (info["giocatore"] == "N") {
    var divPezzo = document.createElement("div");
    divPezzo.innerHTML = e + "-" + pezScac[e]["mossePossibili"][idImg] + ";";
    divPezzo.setAttribute("style", "display: inline; color: black;");
    document.getElementById("mossa-" + info["numMosse"]).appendChild(divPezzo);
  }

  removeCerchi(e);
  calcolaMosseFuture();
  if (info["giocatore"] == "B") {
    info["giocatore"] = "N";
  } else if (info["giocatore"] == "N") {
    info["giocatore"] = "B";
  }
  setTimeout(() => matto(), 100);
  json["mod"] = "sposta";
  json["opponent"] = clientIdAvv;
  json["pezzo"] = e;
  json["posizione"] = pezScac[e]["posizione"];
  json["pezScac"] = pezScac;
  json["info"] = info;
  ws.send(JSON.stringify(json));
}

function cambiaInfoPezzo(idImg, idPezzo) {
  pezScac[idPezzo]["mosse"].push(
    document.getElementById(idImg).parentElement.id
  );
  pezScac[idPezzo]["posizione"][0] =
    document.getElementById(idImg).parentElement.id;
  for (let i = 0; i < 8; i++) {
    for (let index = 0; index < 8; index++) {
      if (scacchiera[index][i] == pezScac[idPezzo]["posizione"][0]) {
        pezScac[idPezzo]["posizione"][1] = index;
        pezScac[idPezzo]["posizione"][2] = i;
      }
    }
  }
}

//Calcola nuove posizioni pezzi
function calcolaRette(posizione, colore) {
  let y = posizione[1];
  let x = posizione[2];
  var id = $("#" + posizione[0]).children()[0].id;
  var mosse = new Array();
  //retta sx
  while (x > 0) {
    x -= 1;
    if (x >= 0 && y >= 0) {
      if (getChildren(document.getElementById(scacchiera[y][x])).length != 0) {
        if (
          getChildren(document.getElementById(scacchiera[y][x]))[0].id[1] ==
          colore
        ) {
          if (pezScac[id]["inchiodato"][0]) {
            if (pezScac[id]["inchiodato"][3].includes(scacchiera[y][x])) {
              mosse.push(scacchiera[y][x]);
              break;
            }
          } else {
            mosse.push(scacchiera[y][x]);
            break;
          }
        }
        break;
      } else {
        if (pezScac[id]["inchiodato"][0]) {
          var lista = calcolaTraiettoriaScacco(
            pezScac[id]["inchiodato"][1],
            pezScac["k" + id[1] + "1"]["posizione"]
          );
          if (lista.includes(scacchiera[y][x])) {
            mosse.push(scacchiera[y][x]);
          }
        } else {
          mosse.push(scacchiera[y][x]);
        }
      }
    }
  }
  y = posizione[1];
  x = posizione[2];
  //retta giu
  while (y < 7) {
    y += 1;
    if (x >= 0 && y <= 7) {
      if (getChildren(document.getElementById(scacchiera[y][x])).length != 0) {
        if (
          getChildren(document.getElementById(scacchiera[y][x]))[0].id[1] ==
          colore
        ) {
          if (pezScac[id]["inchiodato"][0]) {
            if (pezScac[id]["inchiodato"][3].includes(scacchiera[y][x])) {
              mosse.push(scacchiera[y][x]);
              break;
            }
          } else {
            mosse.push(scacchiera[y][x]);
            break;
          }
        }
        break;
      } else {
        if (pezScac[id]["inchiodato"][0]) {
          var lista = calcolaTraiettoriaScacco(
            pezScac[id]["inchiodato"][1],
            pezScac["k" + id[1] + "1"]["posizione"]
          );
          if (lista.includes(scacchiera[y][x])) {
            mosse.push(scacchiera[y][x]);
          }
        } else {
          mosse.push(scacchiera[y][x]);
        }
      }
    }
  }
  y = posizione[1];
  x = posizione[2];
  //retta dx
  while (x < 7) {
    x += 1;
    if (x <= 7 && y <= 7) {
      if (getChildren(document.getElementById(scacchiera[y][x])).length != 0) {
        if (
          getChildren(document.getElementById(scacchiera[y][x]))[0].id[1] ==
          colore
        ) {
          if (pezScac[id]["inchiodato"][0]) {
            if (pezScac[id]["inchiodato"][3].includes(scacchiera[y][x])) {
              mosse.push(scacchiera[y][x]);
              break;
            }
          } else {
            mosse.push(scacchiera[y][x]);
            break;
          }
        }
        break;
      } else {
        if (pezScac[id]["inchiodato"][0]) {
          var lista = calcolaTraiettoriaScacco(
            pezScac[id]["inchiodato"][1],
            pezScac["k" + id[1] + "1"]["posizione"]
          );
          if (lista.includes(scacchiera[y][x])) {
            mosse.push(scacchiera[y][x]);
          }
        } else {
          mosse.push(scacchiera[y][x]);
        }
      }
    }
  }
  y = posizione[1];
  x = posizione[2];
  //retta su
  while (y > 0) {
    y -= 1;
    if (x <= 7 && y >= 0) {
      if (getChildren(document.getElementById(scacchiera[y][x])).length != 0) {
        if (
          getChildren(document.getElementById(scacchiera[y][x]))[0].id[1] ==
          colore
        ) {
          if (pezScac[id]["inchiodato"][0]) {
            if (pezScac[id]["inchiodato"][3].includes(scacchiera[y][x])) {
              mosse.push(scacchiera[y][x]);
              break;
            }
          } else {
            mosse.push(scacchiera[y][x]);
            break;
          }
        }
        break;
      } else {
        if (pezScac[id]["inchiodato"][0]) {
          var lista = calcolaTraiettoriaScacco(
            pezScac[id]["inchiodato"][1],
            pezScac["k" + id[1] + "1"]["posizione"]
          );
          if (lista.includes(scacchiera[y][x])) {
            mosse.push(scacchiera[y][x]);
          }
        } else {
          mosse.push(scacchiera[y][x]);
        }
      }
    }
  }
  return mosse;
}

function vicinanzaRe(posizione) {
  let y = posizione[1];
  let x = posizione[2];
  var mosseNo = new Array();
  //vedi se il re è nelle vicinanze
  //su su
  if (y - 2 >= 0) {
    if (
      getChildren(document.getElementById(scacchiera[y - 2][x])).length != 0 &&
      getChildren(document.getElementById(scacchiera[y - 2][x]))[0].id[0] == "k"
    ) {
      if (x - 1 >= 0) {
        mosseNo.push(scacchiera[y - 1][x - 1]);
      }
      if (x + 1 <= 7) {
        mosseNo.push(scacchiera[y - 1][x + 1]);
      }
      mosseNo.push(scacchiera[y - 1][x]);
    }
  }
  //su su dx
  if (x + 1 <= 7 && y - 2 >= 0) {
    if (
      getChildren(document.getElementById(scacchiera[y - 2][x + 1])).length !=
        0 &&
      getChildren(document.getElementById(scacchiera[y - 2][x + 1]))[0].id[0] ==
        "k"
    ) {
      mosseNo.push(scacchiera[y - 1][x + 1]);
      mosseNo.push(scacchiera[y - 1][x]);
    }
  }
  //su su dx dx
  if (x + 2 <= 7 && y - 2 >= 0) {
    if (
      getChildren(document.getElementById(scacchiera[y - 2][x + 2])).length !=
        0 &&
      getChildren(document.getElementById(scacchiera[y - 2][x + 2]))[0].id[0] ==
        "k"
    ) {
      mosseNo.push(scacchiera[y - 1][x + 1]);
    }
  }
  //su dx dx
  if (y - 1 >= 0 && x + 2 <= 7) {
    if (
      getChildren(document.getElementById(scacchiera[y - 1][x + 2])).length !=
        0 &&
      getChildren(document.getElementById(scacchiera[y - 1][x + 2]))[0].id[0] ==
        "k"
    ) {
      mosseNo.push(scacchiera[y - 1][x + 1]);
      mosseNo.push(scacchiera[y][x + 1]);
    }
  }
  //dx dx
  if (x + 2 <= 7) {
    if (
      getChildren(document.getElementById(scacchiera[y][x + 2])).length != 0 &&
      getChildren(document.getElementById(scacchiera[y][x + 2]))[0].id[0] == "k"
    ) {
      if (y - 1 >= 0) {
        mosseNo.push(scacchiera[y - 1][x + 1]);
      }
      if (y + 1 <= 7) {
        mosseNo.push(scacchiera[y + 1][x + 1]);
      }
      mosseNo.push(scacchiera[y][x + 1]);
    }
  }
  //giu dx dx
  if (y + 1 <= 7 && x + 2 <= 7) {
    if (
      getChildren(document.getElementById(scacchiera[y + 1][x + 2])).length !=
        0 &&
      getChildren(document.getElementById(scacchiera[y + 1][x + 2]))[0].id[0] ==
        "k"
    ) {
      mosseNo.push(scacchiera[y + 1][x + 1]);
      mosseNo.push(scacchiera[y][x + 1]);
    }
  }
  //giu giu dx dx
  if (x + 2 <= 7 && y + 2 <= 7) {
    if (
      getChildren(document.getElementById(scacchiera[y + 2][x + 2])).length !=
        0 &&
      getChildren(document.getElementById(scacchiera[y + 2][x + 2]))[0].id[0] ==
        "k"
    ) {
      mosseNo.push(scacchiera[y + 1][x + 1]);
    }
  }
  //giu giu dx
  if (y + 2 <= 7 && x + 1 <= 7) {
    if (
      getChildren(document.getElementById(scacchiera[y + 2][x + 1])).length !=
        0 &&
      getChildren(document.getElementById(scacchiera[y + 2][x + 1]))[0].id[0] ==
        "k"
    ) {
      mosseNo.push(scacchiera[y + 1][x]);
      mosseNo.push(scacchiera[y + 1][x + 1]);
    }
  }
  //giu giu
  if (y + 2 <= 7) {
    if (
      getChildren(document.getElementById(scacchiera[y + 2][x])).length != 0 &&
      getChildren(document.getElementById(scacchiera[y + 2][x]))[0].id[0] == "k"
    ) {
      if (x - 1 >= 0) {
        mosseNo.push(scacchiera[y + 1][x - 1]);
      }
      if (x + 1 <= 7) {
        mosseNo.push(scacchiera[y + 1][x + 1]);
      }
      mosseNo.push(scacchiera[y + 1][x]);
    }
  }
  //giu giu sx
  if (y + 2 <= 7 && x - 1 >= 0) {
    if (
      getChildren(document.getElementById(scacchiera[y + 2][x - 1])).length !=
        0 &&
      getChildren(document.getElementById(scacchiera[y + 2][x - 1]))[0].id[0] ==
        "k"
    ) {
      mosseNo.push(scacchiera[y + 1][x]);
      mosseNo.push(scacchiera[y + 1][x - 1]);
    }
  }
  //giu giu sx sx
  if (x - 2 >= 0 && y + 2 <= 7) {
    if (
      getChildren(document.getElementById(scacchiera[y + 2][x - 2])).length !=
        0 &&
      getChildren(document.getElementById(scacchiera[y + 2][x - 2]))[0].id[0] ==
        "k"
    ) {
      mosseNo.push(scacchiera[y + 1][x - 1]);
    }
  }
  //giu sx sx
  if (y + 1 <= 7 && x - 2 >= 0) {
    if (
      getChildren(document.getElementById(scacchiera[y + 1][x - 2])).length !=
        0 &&
      getChildren(document.getElementById(scacchiera[y + 1][x - 2]))[0].id[0] ==
        "k"
    ) {
      mosseNo.push(scacchiera[y][x - 1]);
      mosseNo.push(scacchiera[y + 1][x - 1]);
    }
  }
  //sx sx
  if (x - 2 >= 0) {
    if (
      getChildren(document.getElementById(scacchiera[y][x - 2])).length != 0 &&
      getChildren(document.getElementById(scacchiera[y][x - 2]))[0].id[0] == "k"
    ) {
      if (y - 1 >= 0) {
        mosseNo.push(scacchiera[y - 1][x - 1]);
      }
      if (y + 1 <= 7) {
        mosseNo.push(scacchiera[y + 1][x - 1]);
      }
      mosseNo.push(scacchiera[y][x - 1]);
    }
  }
  //su sx sx
  if (y - 1 >= 0 && x - 2 >= 0) {
    if (
      getChildren(document.getElementById(scacchiera[y - 1][x - 2])).length !=
        0 &&
      getChildren(document.getElementById(scacchiera[y - 1][x - 2]))[0].id[0] ==
        "k"
    ) {
      mosseNo.push(scacchiera[y][x - 1]);
      mosseNo.push(scacchiera[y - 1][x - 1]);
    }
  }
  //su su sx sx
  if (x - 2 >= 0 && y - 2 >= 0) {
    if (
      getChildren(document.getElementById(scacchiera[y - 2][x - 2])).length !=
        0 &&
      getChildren(document.getElementById(scacchiera[y - 2][x - 2]))[0].id[0] ==
        "k"
    ) {
      mosseNo.push(scacchiera[y - 1][x - 1]);
    }
  }
  //su su sx
  if (y - 2 >= 0 && x - 1 >= 0) {
    if (
      getChildren(document.getElementById(scacchiera[y - 2][x - 1])).length !=
        0 &&
      getChildren(document.getElementById(scacchiera[y - 2][x - 1]))[0].id[0] ==
        "k"
    ) {
      mosseNo.push(scacchiera[y - 1][x]);
      mosseNo.push(scacchiera[y - 1][x - 1]);
    }
  }
  return mosseNo;
}

function calcolaPosRe(id, colore) {
  var posizione = pezScac[id]["posizione"];
  let y = posizione[1];
  let x = posizione[2];
  var mosseNo = new Array();
  var mosseScaccoNo = new Array();
  var mosseSi = new Array();
  for (const key in pezScac) {
    if (key[1] == colore) {
      if (key[0] == "p") {
        var mossePed = calcolaMangiaPedone(key, pezScac[key]["posizione"]);
        for (let i = 0; i < mossePed.length; i++) {
          mosseNo.push(mossePed[i]);
        }
      } else {
        for (
          let index = 0;
          index < pezScac[key]["mosseFuture"].length;
          index++
        ) {
          const mossa = pezScac[key]["mosseFuture"][index];
          mosseNo.push(mossa);
        }
        //gestisci posizione re se è sotto scacco
        if (info["scacco"] && info["minacciaScacco"].includes(key)) {
          //gestisci posizione re se una torre da scacco
          if (key[0] == "t" || key[0] == "q") {
            //se si trovano sulla stessa retta orizzontale
            if (posizione[1] == pezScac[key]["posizione"][1]) {
              //non può andare sx
              if (
                posizione[2] - 1 >= 0 &&
                scacchiera[posizione[1]][posizione[2] - 1] !=
                  pezScac[key]["posizione"][0]
              ) {
                mosseScaccoNo.push(scacchiera[posizione[1]][posizione[2] - 1]);
              }
              //non può andare dx
              if (
                posizione[2] + 1 <= 7 &&
                scacchiera[posizione[1]][posizione[2] + 1] !=
                  pezScac[key]["posizione"][0]
              ) {
                mosseScaccoNo.push(scacchiera[posizione[1]][posizione[2] + 1]);
              }
            } //altrimenti se si trovano sulla stessa retta verticale
            else if (posizione[2] == pezScac[key]["posizione"][2]) {
              //vedi se può andare su
              if (
                posizione[1] - 1 >= 0 &&
                scacchiera[posizione[1] - 1][posizione[2]] !=
                  pezScac[key]["posizione"][0]
              ) {
                mosseScaccoNo.push(scacchiera[posizione[1] - 1][posizione[2]]);
              }
              //vedi se può andare giu
              if (
                posizione[1] + 1 <= 7 &&
                scacchiera[posizione[1] + 1][posizione[2]] !=
                  pezScac[key]["posizione"][0]
              ) {
                mosseScaccoNo.push(scacchiera[posizione[1] + 1][posizione[2]]);
              }
            }
          } //gestisci posizione re se un alfiere da scacco
          if (key[0] == "a" || key[0] == "q") {
            //se il pezzo si trova sotto
            if (posizione[1] < pezScac[key]["posizione"][1]) {
              //se il pezzo si trova in basso a sx
              if (posizione[2] > pezScac[key]["posizione"][2]) {
                if (posizione[1] - 1 >= 0 && posizione[2] + 1 <= 7) {
                  mosseScaccoNo.push(
                    scacchiera[posizione[1] - 1][posizione[2] + 1]
                  );
                  continue;
                }
              } //se il pezzo si trova in basso a dx
              else if (posizione[2] < pezScac[key]["posizione"][2]) {
                if (posizione[1] - 1 >= 0 && posizione[2] - 1 >= 0) {
                  mosseScaccoNo.push(
                    scacchiera[posizione[1] - 1][posizione[2] - 1]
                  );
                  continue;
                }
              }
            } //altrimenti se il pezzo si trova sopra
            else if (posizione[1] > pezScac[key]["posizione"][1]) {
              //se il pezzo si trova in alto a sx
              if (posizione[2] > pezScac[key]["posizione"][2]) {
                if (posizione[1] + 1 <= 7 && posizione[2] + 1 <= 7) {
                  mosseScaccoNo.push(
                    scacchiera[posizione[1] + 1][posizione[2] + 1]
                  );
                  continue;
                }
              } //se il pezzo si trova in alto a dx
              else if (posizione[2] < pezScac[key]["posizione"][2]) {
                if (posizione[1] + 1 <= 7 && posizione[2] - 1 >= 0) {0
                  mosseScaccoNo.push(
                    scacchiera[posizione[1] + 1][posizione[2] - 1]
                  );
                  continue;
                }
              }
            }
          }
        }
      }
    }
  }
  var caselleRe = vicinanzaRe(posizione);
  for (let i = 0; i < caselleRe.length; i++) mosseNo.push(caselleRe[i]);
  for (let i = 0; i < mosseScaccoNo.length; i++) mosseNo.push(mosseScaccoNo[i]);

  //mosse effettive che puo fare il re
  //su
  if (y - 1 >= 0) {
    if (!mosseNo.includes(scacchiera[y - 1][x])) {
      if (
        getChildren(document.getElementById(scacchiera[y - 1][x])).length == 0
      ) {
        mosseSi.push(scacchiera[y - 1][x]);
      } else {
        if (
          getChildren(document.getElementById(scacchiera[y - 1][x]))[0].id[1] ==
          colore
        ) {
          //vedere se il re può mangiare il pezzo
          var pezzo = getChildren(
            document.getElementById(scacchiera[y - 1][x])
          )[0];

          if (kCanE(pezzo, colore)) {
            mosseSi.push(scacchiera[y - 1][x]);
          }
        }
      }
    }
  }
  //su dx
  if (x + 1 <= 7 && y - 1 >= 0) {
    if (!mosseNo.includes(scacchiera[y - 1][x + 1])) {
      if (
        getChildren(document.getElementById(scacchiera[y - 1][x + 1])).length ==
        0
      ) {
        mosseSi.push(scacchiera[y - 1][x + 1]);
      } else {
        if (
          getChildren(document.getElementById(scacchiera[y - 1][x + 1]))[0]
            .id[1] == colore
        ) {
          var pezzo = getChildren(
            document.getElementById(scacchiera[y - 1][x + 1])
          )[0];

          if (kCanE(pezzo, colore)) {
            mosseSi.push(scacchiera[y - 1][x + 1]);
          }
        }
      }
    }
  }
  //dx
  if (x + 1 <= 7) {
    if (!mosseNo.includes(scacchiera[y][x + 1])) {
      if (
        getChildren(document.getElementById(scacchiera[y][x + 1])).length == 0
      ) {
        mosseSi.push(scacchiera[y][x + 1]);
      } else {
        if (
          getChildren(document.getElementById(scacchiera[y][x + 1]))[0].id[1] ==
          colore
        ) {
          var pezzo = getChildren(
            document.getElementById(scacchiera[y][x + 1])
          )[0];

          if (kCanE(pezzo, colore)) {
            mosseSi.push(scacchiera[y][x + 1]);
          }
        }
      }
    }
  }
  //giu dx
  if (x + 1 <= 7 && y + 1 <= 7) {
    if (!mosseNo.includes(scacchiera[y + 1][x + 1])) {
      if (
        getChildren(document.getElementById(scacchiera[y + 1][x + 1])).length ==
        0
      ) {
        mosseSi.push(scacchiera[y + 1][x + 1]);
      } else {
        if (
          getChildren(document.getElementById(scacchiera[y + 1][x + 1]))[0]
            .id[1] == colore
        ) {
          var pezzo = getChildren(
            document.getElementById(scacchiera[y + 1][x + 1])
          )[0];

          if (kCanE(pezzo, colore)) {
            mosseSi.push(scacchiera[y + 1][x + 1]);
          }
        }
      }
    }
  }
  //giu
  if (y + 1 <= 7) {
    if (!mosseNo.includes(scacchiera[y + 1][x])) {
      if (
        getChildren(document.getElementById(scacchiera[y + 1][x])).length == 0
      ) {
        mosseSi.push(scacchiera[y + 1][x]);
      } else {
        if (
          getChildren(document.getElementById(scacchiera[y + 1][x]))[0].id[1] ==
          colore
        ) {
          var pezzo = getChildren(
            document.getElementById(scacchiera[y + 1][x])
          )[0];

          if (kCanE(pezzo, colore)) {
            mosseSi.push(scacchiera[y + 1][x]);
          }
        }
      }
    }
  }
  //giu sx
  if (x - 1 >= 0 && y + 1 <= 7) {
    if (!mosseNo.includes(scacchiera[y + 1][x - 1])) {
      if (
        getChildren(document.getElementById(scacchiera[y + 1][x - 1])).length ==
        0
      ) {
        mosseSi.push(scacchiera[y + 1][x - 1]);
      } else {
        if (
          getChildren(document.getElementById(scacchiera[y + 1][x - 1]))[0]
            .id[1] == colore
        ) {
          var pezzo = getChildren(
            document.getElementById(scacchiera[y + 1][x - 1])
          )[0];

          if (kCanE(pezzo, colore)) {
            mosseSi.push(scacchiera[y + 1][x - 1]);
          }
        }
      }
    }
  }
  //sx
  if (x - 1 >= 0) {
    if (!mosseNo.includes(scacchiera[y][x - 1])) {
      if (
        getChildren(document.getElementById(scacchiera[y][x - 1])).length == 0
      ) {
        mosseSi.push(scacchiera[y][x - 1]);
      } else {
        if (
          getChildren(document.getElementById(scacchiera[y][x - 1]))[0].id[1] ==
          colore
        ) {
          var pezzo = getChildren(
            document.getElementById(scacchiera[y][x - 1])
          )[0];

          if (kCanE(pezzo, colore)) {
            mosseSi.push(scacchiera[y][x - 1]);
          }
        }
      }
    }
  }
  //su sx
  if (x - 1 >= 0 && y - 1 >= 0) {
    if (!mosseNo.includes(scacchiera[y - 1][x - 1])) {
      if (
        getChildren(document.getElementById(scacchiera[y - 1][x - 1])).length ==
        0
      ) {
        mosseSi.push(scacchiera[y - 1][x - 1]);
      } else {
        if (
          getChildren(document.getElementById(scacchiera[y - 1][x - 1]))[0]
            .id[1] == colore
        ) {
          var pezzo = getChildren(
            document.getElementById(scacchiera[y - 1][x - 1])
          )[0];

          if (kCanE(pezzo, colore)) {
            mosseSi.push(scacchiera[y - 1][x - 1]);
          }
        }
      }
    }
  }
  //valuta arrocco
  if (!pezScac[id]["mosso"]) {
    if ("t" + id[1] + "1" in pezScac && !pezScac["t" + id[1] + "1"]["mosso"]) {
      //vedi arrocco di sx
      if (
        getChildren(
          document.getElementById(scacchiera[posizione[1]][posizione[2] - 1])
        ).length == 0 &&
        getChildren(
          document.getElementById(scacchiera[posizione[1]][posizione[2] - 2])
        ).length == 0 &&
        !mosseNo.includes(scacchiera[posizione[1]][posizione[2] - 1]) &&
        !mosseNo.includes(scacchiera[posizione[1]][posizione[2] - 2])
      ) {
        mosseSi.push(scacchiera[posizione[1]][posizione[2] - 2]);
        info["arrocco"] = true;
      }
    }
    if ("t" + id[1] + "2" in pezScac && !pezScac["t" + id[1] + "2"]["mosso"]) {
      //vedi arrocco di dx
      if (
        getChildren(
          document.getElementById(scacchiera[posizione[1]][posizione[2] + 1])
        ).length == 0 &&
        getChildren(
          document.getElementById(scacchiera[posizione[1]][posizione[2] + 2])
        ).length == 0 &&
        !mosseNo.includes(scacchiera[posizione[1]][posizione[2] + 1]) &&
        !mosseNo.includes(scacchiera[posizione[1]][posizione[2] + 2])
      ) {
        mosseSi.push(scacchiera[posizione[1]][posizione[2] + 2]);
        info["arrocco"] = true;
      }
    }
  }

  return mosseSi;
}

function calcolaPosCavallo(posizione, colore) {
  let y = posizione[1];
  let x = posizione[2];
  var id = $("#" + posizione[0]).children()[0].id;
  var mosse = new Array();
  if (y - 2 >= 0 && x - 1 >= 0) {
    if (
      getChildren(document.getElementById(scacchiera[y - 2][x - 1])).length == 0
    ) {
      if (!pezScac[id]["inchiodato"][0]) {
        mosse.push(scacchiera[y - 2][x - 1]);
      }
    } else {
      if (
        getChildren(document.getElementById(scacchiera[y - 2][x - 1]))[0]
          .id[1] == colore
      ) {
        if (!pezScac[id]["inchiodato"][0]) {
          mosse.push(scacchiera[y - 2][x - 1]);
        }
      }
    }
  }
  if (y - 1 >= 0 && x - 2 >= 0) {
    if (
      getChildren(document.getElementById(scacchiera[y - 1][x - 2])).length == 0
    ) {
      if (!pezScac[id]["inchiodato"][0]) {
        mosse.push(scacchiera[y - 1][x - 2]);
      }
    } else {
      if (
        getChildren(document.getElementById(scacchiera[y - 1][x - 2]))[0]
          .id[1] == colore
      ) {
        if (!pezScac[id]["inchiodato"][0]) {
          mosse.push(scacchiera[y - 1][x - 2]);
        }
      }
    }
  }
  if (y + 1 <= 7 && x - 2 >= 0) {
    if (
      getChildren(document.getElementById(scacchiera[y + 1][x - 2])).length == 0
    ) {
      if (!pezScac[id]["inchiodato"][0]) {
        mosse.push(scacchiera[y + 1][x - 2]);
      }
    } else {
      if (
        getChildren(document.getElementById(scacchiera[y + 1][x - 2]))[0]
          .id[1] == colore
      ) {
        if (!pezScac[id]["inchiodato"][0]) {
          mosse.push(scacchiera[y + 1][x - 2]);
        }
      }
    }
  }
  if (y + 2 <= 7 && x - 1 >= 0) {
    if (
      getChildren(document.getElementById(scacchiera[y + 2][x - 1])).length == 0
    ) {
      if (!pezScac[id]["inchiodato"][0]) {
        mosse.push(scacchiera[y + 2][x - 1]);
      }
    } else {
      if (
        getChildren(document.getElementById(scacchiera[y + 2][x - 1]))[0]
          .id[1] == colore
      ) {
        if (!pezScac[id]["inchiodato"][0]) {
          mosse.push(scacchiera[y + 2][x - 1]);
        }
      }
    }
  }
  if (y + 2 <= 7 && x + 1 <= 7) {
    if (
      getChildren(document.getElementById(scacchiera[y + 2][x + 1])).length == 0
    ) {
      if (!pezScac[id]["inchiodato"][0]) {
        mosse.push(scacchiera[y + 2][x + 1]);
      }
    } else {
      if (
        getChildren(document.getElementById(scacchiera[y + 2][x + 1]))[0]
          .id[1] == colore
      ) {
        if (!pezScac[id]["inchiodato"][0]) {
          mosse.push(scacchiera[y + 2][x + 1]);
        }
      }
    }
  }
  if (y + 1 <= 7 && x + 2 <= 7) {
    if (
      getChildren(document.getElementById(scacchiera[y + 1][x + 2])).length == 0
    ) {
      if (!pezScac[id]["inchiodato"][0]) {
        mosse.push(scacchiera[y + 1][x + 2]);
      }
    } else {
      if (
        getChildren(document.getElementById(scacchiera[y + 1][x + 2]))[0]
          .id[1] == colore
      ) {
        if (!pezScac[id]["inchiodato"][0]) {
          mosse.push(scacchiera[y + 1][x + 2]);
        }
      }
    }
  }
  if (y - 1 >= 0 && x + 2 <= 7) {
    if (
      getChildren(document.getElementById(scacchiera[y - 1][x + 2])).length == 0
    ) {
      if (!pezScac[id]["inchiodato"][0]) {
        mosse.push(scacchiera[y - 1][x + 2]);
      }
    } else {
      if (
        getChildren(document.getElementById(scacchiera[y - 1][x + 2]))[0]
          .id[1] == colore
      ) {
        if (!pezScac[id]["inchiodato"][0]) {
          mosse.push(scacchiera[y - 1][x + 2]);
        }
      }
    }
  }
  if (y - 2 >= 0 && x + 1 <= 7) {
    if (
      getChildren(document.getElementById(scacchiera[y - 2][x + 1])).length == 0
    ) {
      if (!pezScac[id]["inchiodato"][0]) {
        mosse.push(scacchiera[y - 2][x + 1]);
      }
    } else {
      if (
        getChildren(document.getElementById(scacchiera[y - 2][x + 1]))[0]
          .id[1] == colore
      ) {
        if (!pezScac[id]["inchiodato"][0]) {
          mosse.push(scacchiera[y - 2][x + 1]);
        }
      }
    }
  }
  return mosse;
}

function calcolaDiagonali(posizione, colore) {
  //diagonale suSX
  let y = posizione[1];
  let x = posizione[2];
  var mosse = new Array();
  var id = $("#" + posizione[0]).children()[0].id;
  //diagonale altosx
  while (x > 0 && y > 0) {
    x -= 1;
    y -= 1;
    if (x >= 0 && y >= 0) {
      if (getChildren(document.getElementById(scacchiera[y][x])).length != 0) {
        if (
          getChildren(document.getElementById(scacchiera[y][x]))[0].id[1] ==
          colore
        ) {
          if (pezScac[id]["inchiodato"][0]) {
            if (pezScac[id]["inchiodato"][3].includes(scacchiera[y][x])) {
              mosse.push(scacchiera[y][x]);
              break;
            }
          } else {
            mosse.push(scacchiera[y][x]);
            break;
          }
        }
        break;
      } else {
        if (pezScac[id]["inchiodato"][0]) {
          var lista = calcolaTraiettoriaScacco(
            pezScac[id]["inchiodato"][1],
            pezScac["k" + id[1] + "1"]["posizione"]
          );
          if (lista.includes(scacchiera[y][x])) {
            mosse.push(scacchiera[y][x]);
          }
        } else {
          mosse.push(scacchiera[y][x]);
        }
      }
    }
  }
  y = posizione[1];
  x = posizione[2];
  //diagonale giuSx
  while (x > 0 && y < 7) {
    x -= 1;
    y += 1;
    if (x >= 0 && y <= 7) {
      if (getChildren(document.getElementById(scacchiera[y][x])).length != 0) {
        if (
          getChildren(document.getElementById(scacchiera[y][x]))[0].id[1] ==
          colore
        ) {
          if (pezScac[id]["inchiodato"][0]) {
            if (pezScac[id]["inchiodato"][3].includes(scacchiera[y][x])) {
              mosse.push(scacchiera[y][x]);
              break;
            }
          } else {
            mosse.push(scacchiera[y][x]);
            break;
          }
        }
        break;
      } else {
        if (pezScac[id]["inchiodato"][0]) {
          var lista = calcolaTraiettoriaScacco(
            pezScac[id]["inchiodato"][1],
            pezScac["k" + id[1] + "1"]["posizione"]
          );
          if (lista.includes(scacchiera[y][x])) {
            mosse.push(scacchiera[y][x]);
          }
        } else {
          mosse.push(scacchiera[y][x]);
        }
      }
    }
  }
  y = posizione[1];
  x = posizione[2];
  //diagonale giuDx
  while (x < 7 && y < 7) {
    x += 1;
    y += 1;
    if (x <= 7 && y <= 7) {
      if (getChildren(document.getElementById(scacchiera[y][x])).length != 0) {
        if (
          getChildren(document.getElementById(scacchiera[y][x]))[0].id[1] ==
          colore
        ) {
          if (pezScac[id]["inchiodato"][0]) {
            if (pezScac[id]["inchiodato"][3].includes(scacchiera[y][x])) {
              mosse.push(scacchiera[y][x]);
              break;
            }
          } else {
            mosse.push(scacchiera[y][x]);
            break;
          }
        }
        break;
      } else {
        if (pezScac[id]["inchiodato"][0]) {
          var lista = calcolaTraiettoriaScacco(
            pezScac[id]["inchiodato"][1],
            pezScac["k" + id[1] + "1"]["posizione"]
          );
          if (lista.includes(scacchiera[y][x])) {
            mosse.push(scacchiera[y][x]);
          }
        } else {
          mosse.push(scacchiera[y][x]);
        }
      }
    }
  }
  y = posizione[1];
  x = posizione[2];
  //diagonale suDx
  while (x < 7 && y > 0) {
    x += 1;
    y -= 1;
    if (x <= 7 && y >= 0) {
      if (getChildren(document.getElementById(scacchiera[y][x])).length != 0) {
        if (
          getChildren(document.getElementById(scacchiera[y][x]))[0].id[1] ==
          colore
        ) {
          if (pezScac[id]["inchiodato"][0]) {
            if (pezScac[id]["inchiodato"][3].includes(scacchiera[y][x])) {
              mosse.push(scacchiera[y][x]);
              break;
            }
          } else {
            mosse.push(scacchiera[y][x]);
            break;
          }
        }
        break;
      } else {
        if (pezScac[id]["inchiodato"][0]) {
          var lista = calcolaTraiettoriaScacco(
            pezScac[id]["inchiodato"][1],
            pezScac["k" + id[1] + "1"]["posizione"]
          );
          if (lista.includes(scacchiera[y][x])) {
            mosse.push(scacchiera[y][x]);
          }
        } else {
          mosse.push(scacchiera[y][x]);
        }
      }
    }
  }
  return mosse;
}

function calcolaMangiaPedone(id, posizione) {
  //cella a sx
  var x = posizione[2];
  var y = posizione[1];
  var mosse = new Array();
  if (posizione[0][0] == "a") {
    if (id[1] == "n" && y + 1 <= 7) {
      mosse.push(scacchiera[y + 1][x + 1]);
    } else if (id[1] == "w" && y - 1 >= 0) {
      mosse.push(scacchiera[y - 1][x + 1]);
    }
  } else if (posizione[0][0] == "h") {
    if (id[1] == "n" && y + 1 <= 7) {
      mosse.push(scacchiera[y + 1][x - 1]);
    } else if (id[1] == "w" && y - 1 >= 0) {
      mosse.push(scacchiera[y - 1][x - 1]);
    }
  } else if (posizione[0][0] != "a" && posizione[0][0] != "h") {
    if (id[1] == "n" && y + 1 <= 7) {
      mosse.push(scacchiera[y + 1][x - 1]);
      mosse.push(scacchiera[y + 1][x + 1]);
    } else if (id[1] == "w" && y - 1 >= 0) {
      mosse.push(scacchiera[y - 1][x - 1]);
      mosse.push(scacchiera[y - 1][x + 1]);
    }
  }
  return mosse;
}

function calcolaPosPedone(id, posizione) {
  let x = posizione[2];
  let y = posizione[1];
  var mosse = new Array();
  //pedone nero
  if (id[1] == "n") {
    if (y + 1 <= 7) {
      y += 1;
      //se nella casella avanti non c'è un pezzo
      if (pezScac[id]["inchiodato"][0]) {
        if (pezScac[id]["inchiodato"][3].includes(scacchiera[y][x])) {
          if (
            getChildren(document.getElementById(scacchiera[y][x])).length == 0
          ) {
            mosse.push(scacchiera[y][x]);
            //due caselle avanti
            if (!pezScac[id]["mosso"]) {
              y += 1;
              //se nella second casella avanti non c'è un pezzo
              if (
                getChildren(document.getElementById(scacchiera[y][x])).length ==
                0
              ) {
                mosse.push(scacchiera[y][x]);
                //pezScac[id]["enPassant"] = true;
              }
            }
          }
        }
      } else {
        if (
          getChildren(document.getElementById(scacchiera[y][x])).length == 0
        ) {
          mosse.push(scacchiera[y][x]);
          //due caselle avanti
          if (!pezScac[id]["mosso"]) {
            y += 1;
            //se nella second casella avanti non c'è un pezzo
            if (
              getChildren(document.getElementById(scacchiera[y][x])).length == 0
            ) {
              mosse.push(scacchiera[y][x]);
              //pezScac[id]["enPassant"] = true;
            }
          }
        }
      }
    }
    y = posizione[1];
    if (x + 1 <= 7 && y + 1 <= 7) {
      x += 1;
      if (!pezScac[id]["inchiodato"][0]) {
        if (
          getChildren(document.getElementById(scacchiera[y][x])).length != 0 &&
          getChildren(document.getElementById(scacchiera[y][x]))[0].id[1] == "w"
        ) {
          if (info["numMosse"] != 0) {
            var elemento = document.getElementById("mossa-" + info["numMosse"]);
            var lastChild = elemento.lastChild.innerHTML;
            var idPed = lastChild.split("-")[0];
            if (
              idPed ==
                getChildren(document.getElementById(scacchiera[y][x]))[0].id &&
              pezScac[idPed]["enPassant"]
            ) {
              mosse.push(scacchiera[y + 1][x]);
            }
          }
        }
      }
      y += 1;
      //se può mangiare
      if (!pezScac[id]["inchiodato"][0]) {
        if (
          getChildren(document.getElementById(scacchiera[y][x])).length != 0 &&
          getChildren(document.getElementById(scacchiera[y][x]))[0].id[1] == "w"
        ) {
          mosse.push(scacchiera[y][x]);
        }
      } else {
        if (pezScac[id]["inchiodato"][3].includes(scacchiera[y][x])) {
          if (
            getChildren(document.getElementById(scacchiera[y][x])).length !=
              0 &&
            getChildren(document.getElementById(scacchiera[y][x]))[0].id[1] ==
              "w"
          ) {
            mosse.push(scacchiera[y][x]);
          }
        }
      }
    }
    y = posizione[1];
    x = posizione[2];
    if (x - 1 >= 0 && y + 1 <= 7) {
      x -= 1;
      if (!pezScac[id]["inchiodato"][0]) {
        if (
          getChildren(document.getElementById(scacchiera[y][x])).length != 0 &&
          getChildren(document.getElementById(scacchiera[y][x]))[0].id[1] == "w"
        ) {
          if (info["numMosse"] != 0) {
            var elemento = document.getElementById("mossa-" + info["numMosse"]);
            var lastChild = elemento.lastChild.innerHTML;
            var idPed = lastChild.split("-")[0];
            if (
              idPed ==
                getChildren(document.getElementById(scacchiera[y][x]))[0].id &&
              pezScac[idPed]["enPassant"]
            ) {
              mosse.push(scacchiera[y + 1][x]);
            }
          }
        }
      }
      y += 1;
      //se può mangiare
      if (!pezScac[id]["inchiodato"][0]) {
        if (
          getChildren(document.getElementById(scacchiera[y][x])).length != 0 &&
          getChildren(document.getElementById(scacchiera[y][x]))[0].id[1] == "w"
        ) {
          mosse.push(scacchiera[y][x]);
        }
      } else {
        if (pezScac[id]["inchiodato"][3].includes(scacchiera[y][x])) {
          if (
            getChildren(document.getElementById(scacchiera[y][x])).length !=
              0 &&
            getChildren(document.getElementById(scacchiera[y][x]))[0].id[1] ==
              "w"
          ) {
            mosse.push(scacchiera[y][x]);
          }
        }
      }
    }
    y = posizione[1];
    x = posizione[2];
  }
  //pedone bianco
  if (id[1] == "w") {
    //casella di partenza
    if (y - 1 >= 0) {
      //una casella avanti
      y -= 1;
      //se nella casella avanti non c'è un pezzo
      if (pezScac[id]["inchiodato"][0]) {
        if (pezScac[id]["inchiodato"][3].includes(scacchiera[y][x])) {
          if (
            getChildren(document.getElementById(scacchiera[y][x])).length == 0
          ) {
            mosse.push(scacchiera[y][x]);
            //due caselle avanti
            if (!pezScac[id]["mosso"]) {
              y -= 1;
              //se nella second casella avanti non c'è un pezzo
              if (
                getChildren(document.getElementById(scacchiera[y][x])).length ==
                0
              ) {
                mosse.push(scacchiera[y][x]);
                //pezScac[id]["enPassant"] = true;
              }
            }
          }
        }
      } else {
        if (
          getChildren(document.getElementById(scacchiera[y][x])).length == 0
        ) {
          mosse.push(scacchiera[y][x]);
          //due caselle avanti
          if (!pezScac[id]["mosso"]) {
            y -= 1;
            //se nella second casella avanti non c'è un pezzo
            if (
              getChildren(document.getElementById(scacchiera[y][x])).length == 0
            ) {
              mosse.push(scacchiera[y][x]);
              //pezScac[id]["enPassant"] = true;
            }
          }
        }
      }
    }
    y = posizione[1];
    if (x + 1 <= 7 && y - 1 >= 0) {
      x += 1;
      if (!pezScac[id]["inchiodato"][0]) {
        if (
          getChildren(document.getElementById(scacchiera[y][x])).length != 0 &&
          getChildren(document.getElementById(scacchiera[y][x]))[0].id[1] == "n"
        ) {
          if (info["numMosse"] != 0) {
            var elemento = document.getElementById("mossa-" + info["numMosse"]);
            var lastChild = elemento.lastChild.innerHTML;
            var idPed = lastChild.split("-")[0];
            if (
              idPed ==
                getChildren(document.getElementById(scacchiera[y][x]))[0].id &&
              pezScac[idPed]["enPassant"]
            ) {
              mosse.push(scacchiera[y - 1][x]);
            }
          }
        }
      }
      y -= 1;
      //se può mangiare
      if (!pezScac[id]["inchiodato"][0]) {
        if (
          getChildren(document.getElementById(scacchiera[y][x])).length != 0 &&
          getChildren(document.getElementById(scacchiera[y][x]))[0].id[1] == "n"
        ) {
          mosse.push(scacchiera[y][x]);
        }
      } else {
        if (pezScac[id]["inchiodato"][3].includes(scacchiera[y][x])) {
          if (
            getChildren(document.getElementById(scacchiera[y][x])).length !=
              0 &&
            getChildren(document.getElementById(scacchiera[y][x]))[0].id[1] ==
              "n"
          ) {
            mosse.push(scacchiera[y][x]);
          }
        }
      }
    }
    y = posizione[1];
    x = posizione[2];
    if (x - 1 >= 0 && y - 1 >= 0) {
      x -= 1;
      if (!pezScac[id]["inchiodato"][0]) {
        if (
          getChildren(document.getElementById(scacchiera[y][x])).length != 0 &&
          getChildren(document.getElementById(scacchiera[y][x]))[0].id[1] == "n"
        ) {
          if (info["numMosse"] != 0) {
            var elemento = document.getElementById("mossa-" + info["numMosse"]);
            var lastChild = elemento.lastChild.innerHTML;
            var idPed = lastChild.split("-")[0];
            if (
              idPed ==
                getChildren(document.getElementById(scacchiera[y][x]))[0].id &&
              pezScac[idPed]["enPassant"]
            ) {
              mosse.push(scacchiera[y - 1][x]);
            }
          }
        }
      }
      y -= 1;
      //se può mangiare
      if (!pezScac[id]["inchiodato"][0]) {
        if (
          getChildren(document.getElementById(scacchiera[y][x])).length != 0 &&
          getChildren(document.getElementById(scacchiera[y][x]))[0].id[1] == "n"
        ) {
          mosse.push(scacchiera[y][x]);
        }
      } else {
        if (pezScac[id]["inchiodato"][3].includes(scacchiera[y][x])) {
          if (
            getChildren(document.getElementById(scacchiera[y][x])).length !=
              0 &&
            getChildren(document.getElementById(scacchiera[y][x]))[0].id[1] ==
              "n"
          ) {
            mosse.push(scacchiera[y][x]);
          }
        }
      }
    }
    y = posizione[1];
    x = posizione[2];
  }
  return mosse;
}

function calcolaMosse(id, mossa, nImg, color) {
  var im = document.createElement("img");
  if (getChildren(document.getElementById(mossa)).length == 0) {
    im.setAttribute("class", "possibile-mossa");
    im.setAttribute("src", "../Immagini/cerchio.png");
    im.setAttribute("id", "im" + nImg);
    im.setAttribute("onclick", "sposta(this.id);");
    document.getElementById(mossa).appendChild(im);
    pezScac[id]["mossePossibili"]["im" + nImg] = mossa;
  } else {
    if (getChildren(document.getElementById(mossa))[0].id[1] == color) {
      im.setAttribute("class", "mangio-pezzo");
      im.setAttribute("src", "../Immagini/cerchio.png");
      im.setAttribute("id", "im" + nImg);
      im.setAttribute("onclick", "mangia(this.id);");
      document.getElementById(mossa).appendChild(im);
      pezScac[id]["mossePossibili"]["im" + nImg] = mossa;
      pezScac[id]["daMangiare"][im.getAttribute("id")] = getChildren(
        document.getElementById(mossa)
      )[0].id;
    }
  }
}

function calcolaMosseFuture() {
  var colore;
  var array = new Array();
  for (const key in pezScac) {
    key[1] == "w" ? (colore = "n") : (colore = "w");
    pezScac[key]["mosseFuture"] = new Array();
    switch (key[0]) {
      case "p":
        array = calcolaPosPedone(key, pezScac[key]["posizione"]);
        break;
      case "t":
        array = calcolaRette(pezScac[key]["posizione"], colore);
        break;
      case "a":
        array = calcolaDiagonali(pezScac[key]["posizione"], colore);
        break;
      case "c":
        array = calcolaPosCavallo(pezScac[key]["posizione"], colore);
        break;
      case "q":
        array = calcolaDiagonali(pezScac[key]["posizione"], colore).concat(
          calcolaRette(pezScac[key]["posizione"], colore)
        );
        break;
      case "k":
        array = calcolaPosRe(key, colore);
        break;
      default:
        break;
    }
    for (const i in array) {
      pezScac[key]["mosseFuture"].push(array[i]);
    }
  }
  valutaScacco();
}

//controlla se in ogni "mosseFuture" c'è la casella del re
function valutaScacco() {
  var colore = "";
  for (const key in pezScac) {
    //NB -> non è gestito lo scacco no pedone.
    if (key[0] == "p") {
      const arr = calcolaMangiaPedone(key, pezScac[key]["posizione"]);
      if (arr.length != 0) {
        for (let i = 0; i < arr.length; i++) {
          if (key[1] == "n") {
            if (arr[i] == pezScac["kw1"]["posizione"][0]) {
              info["scacco"] = true;
              var traiettoria = calcolaTraiettoriaScacco(
                key,
                pezScac["kw1"]["posizione"]
              );
              colore = "w";
              info["minacciaScacco"].push(key);
            }
          } else {
            if (arr[i] == pezScac["kn1"]["posizione"][0]) {
              info["scacco"] = true;
              var traiettoria = calcolaTraiettoriaScacco(
                key,
                pezScac["kn1"]["posizione"]
              );
              colore = "n";
              info["minacciaScacco"].push(key);
            }
          }
        }
      }
    } else {
      const mosseFuture = pezScac[key]["mosseFuture"];
      for (let i = 0; i < mosseFuture.length; i++) {
        if (key[1] == "n") {
          if (mosseFuture[i] == pezScac["kw1"]["posizione"][0]) {
            info["scacco"] = true;
            var traiettoria = calcolaTraiettoriaScacco(
              key,
              pezScac["kw1"]["posizione"]
            );
            colore = "w";
            info["minacciaScacco"].push(key);
          } else {
            var pezzo = getChildren(document.getElementById(mosseFuture[i]));
            if (pezzo.length != 0 && pezzo[0].id[1] == "w") {
              //key -> id del pezzo minaccia
              //pezzo[0].id -> id del possibile pezzo inchiodato
              if (valutaInchiodatura(key, pezzo[0].id)) {
                pezScac[pezzo[0].id]["inchiodato"][0] = true;
                pezScac[pezzo[0].id]["inchiodato"][1] = key;
                pezScac[pezzo[0].id]["inchiodato"][2] = [
                  pezScac[key]["posizione"][1],
                  pezScac[key]["posizione"][2],
                ];
                //pezScac[pezzo[0].id]["inchiodato"][3] = calcolaTraiettoriaScacco(key, pezScac['kw1']["posizione"]);
                pezScac[pezzo[0].id]["inchiodato"][3] =
                  calcolaTraiettoriaScacco(
                    key,
                    pezScac[pezzo[0].id]["posizione"]
                  );
              }
            }
          }
        } else if (key[1] == "w") {
          if (mosseFuture[i] == pezScac["kn1"]["posizione"][0]) {
            info["scacco"] = true;
            var traiettoria = calcolaTraiettoriaScacco(
              key,
              pezScac["kn1"]["posizione"]
            );
            colore = "n";
            info["minacciaScacco"].push(key);
          } else {
            var pezzo = getChildren(document.getElementById(mosseFuture[i]));
            if (pezzo.length != 0 && pezzo[0].id[1] == "n") {
              if (valutaInchiodatura(key, pezzo[0].id)) {
                pezScac[pezzo[0].id]["inchiodato"][0] = true;
                pezScac[pezzo[0].id]["inchiodato"][1] = key;
                pezScac[pezzo[0].id]["inchiodato"][2] = [
                  pezScac[key]["posizione"][1],
                  pezScac[key]["posizione"][2],
                ];
                //pezScac[pezzo[0].id]["inchiodato"][3] = calcolaTraiettoriaScacco(key, pezScac['kn1']["posizione"]);
                pezScac[pezzo[0].id]["inchiodato"][3] =
                  calcolaTraiettoriaScacco(
                    key,
                    pezScac[pezzo[0].id]["posizione"]
                  );
              }
            }
          }
        }
      }
    }
  }
  if (info["minacciaScacco"].length == 1) {
    evadiScacco(traiettoria, colore, true);
  } else if (info["minacciaScacco"].length > 1) {
    evadiScacco(traiettoria, colore, false);
  }
}

function valutaInchiodatura(idMinaccia, idInchiodato) {
  var posInchiodato = pezScac[idInchiodato]["posizione"];
  var posMinaccia = pezScac[idMinaccia]["posizione"];
  var y = posInchiodato[1];
  var x = posInchiodato[2];
  if (idMinaccia[0] == "a" || idMinaccia[0] == "q") {
    //se il pezzo si trova sopra (il numero della minaccia è maggiore di quello dell'inchiodato)
    if (posMinaccia[0][1] > posInchiodato[0][1]) {
      //se il pezzo si trova in alto a dx (la lettera della minaccia è maggiore di quella dell'inchiodato)
      if (posMinaccia[0][0] > posInchiodato[0][0]) {
        while (y + 1 <= 7 && x - 1 >= 0) {
          y += 1;
          x -= 1;
          if ($("#" + scacchiera[y][x]).children().length != 0) {
            if (
              $("#" + scacchiera[y][x]).children()[0].id ==
              "k" + idInchiodato[1] + "1"
            ) {
              return true;
            } else {
              return false;
            }
          }
        }
      } //se il pezzo si trova in alto a sx (la lettera della minaccia è minore di quella dell'inchiodato)
      else if (posMinaccia[0][0] < posInchiodato[0][0]) {
        while (y + 1 <= 7 && x + 1 <= 7) {
          y += 1;
          x += 1;
          if ($("#" + scacchiera[y][x]).children().length != 0) {
            if (
              $("#" + scacchiera[y][x]).children()[0].id ==
              "k" + idInchiodato[1] + "1"
            ) {
              return true;
            } else {
              return false;
            }
          }
        }
      }
    } //altrimenti se il pezzo si trova sotto (il numero della minaccia è minore di quello dell'inchiodato)
    else if (posMinaccia[0][1] < posInchiodato[0][1]) {
      //se il pezzo si trova in basso a dx (la lettera della minaccia è maggiore di quella dell'inchiodato)
      if (posMinaccia[0][0] > posInchiodato[0][0]) {
        while (y - 1 >= 0 && x - 1 >= 0) {
          y -= 1;
          x -= 1;
          if ($("#" + scacchiera[y][x]).children().length != 0) {
            if (
              $("#" + scacchiera[y][x]).children()[0].id ==
              "k" + idInchiodato[1] + "1"
            ) {
              return true;
            } else {
              return false;
            }
          }
        }
      } //se il pezzo si trova in basso a sx (la lettera della minaccia è minore di quella dell'inchiodato)
      else if (posMinaccia[0][0] < posInchiodato[0][0]) {
        while (y - 1 >= 0 && x + 1 <= 7) {
          y -= 1;
          x += 1;
          if ($("#" + scacchiera[y][x]).children().length != 0) {
            if (
              $("#" + scacchiera[y][x]).children()[0].id ==
              "k" + idInchiodato[1] + "1"
            ) {
              return true;
            } else {
              return false;
            }
          }
        }
      }
    }
  }
  y = posInchiodato[1];
  x = posInchiodato[2];
  if (idMinaccia[0] == "t" || idMinaccia[0] == "q") {
    //se si trovano nella stessa retta verticale (lettere uguali)
    if (posMinaccia[0][0] == posInchiodato[0][0]) {
      //se si trova in alto (numero minaccia > numero inchiodato)
      if (posMinaccia[0][1] > posInchiodato[0][1]) {
        while (y + 1 <= 7) {
          y += 1;
          if ($("#" + scacchiera[y][x]).children().length != 0) {
            if (
              $("#" + scacchiera[y][x]).children()[0].id ==
              "k" + idInchiodato[1] + "1"
            ) {
              return true;
            } else {
              return false;
            }
          }
        }
      } //altrimenti se si trova in basso (numero minaccia < numero inchiodato)
      else if (posMinaccia[0][1] < posInchiodato[0][1]) {
        while (y - 1 >= 0) {
          y -= 1;
          if ($("#" + scacchiera[y][x]).children().length != 0) {
            if (
              $("#" + scacchiera[y][x]).children()[0].id ==
              "k" + idInchiodato[1] + "1"
            ) {
              return true;
            } else {
              return false;
            }
          }
        }
      }
    } //altrimenti se si trovano nella stessa retta orizzontale (numeri uguali)
    else if (posMinaccia[0][1] == posInchiodato[0][1]) {
      //se si trova a dx (lettera minaccia > lettera inchiodato)
      if (posMinaccia[0][0] > posInchiodato[0][0]) {
        while (x - 1 >= 0) {
          x -= 1;
          if ($("#" + scacchiera[y][x]).children().length != 0) {
            if (
              $("#" + scacchiera[y][x]).children()[0].id ==
              "k" + idInchiodato[1] + "1"
            ) {
              return true;
            } else {
              return false;
            }
          }
        }
      } //altrimenti se si trova a sx (lettera minaccia < lettera inchiodato)
      else if (posMinaccia[0][0] < posInchiodato[0][0]) {
        while (x + 1 <= 7) {
          x += 1;
          if ($("#" + scacchiera[y][x]).children().length != 0) {
            if (
              $("#" + scacchiera[y][x]).children()[0].id ==
              "k" + idInchiodato[1] + "1"
            ) {
              return true;
            } else {
              return false;
            }
          }
        }
      }
    }
  }
  return false;
}

function evadiScacco(traiettoria, colore, flag) {
  //oggetto con {idPezzoAntiScacco: mosseStoppaScacco}
  if (flag) {
    for (const key in pezScac) {
      if (key[1] == colore && key[0] != "k") {
        for (let i = 0; i < traiettoria.length; i++) {
          if (key[0] == "p") {
            //var mossePedone = calcolaMangiaPedone(key, pezScac[key]["posizione"]);
            var mossePedone = calcolaPosPedone(key, pezScac[key]["posizione"]);
            for (let j = 0; j < mossePedone.length; j++) {
              const element = mossePedone[j];
              if (element == traiettoria[i]) {
                if (key in info["evadiScacco"])
                  info["evadiScacco"][key].push(element);
                else info["evadiScacco"][key] = [element];
              }
            }
          } else {
            for (let j = 0; j < pezScac[key]["mosseFuture"].length; j++) {
              const element = pezScac[key]["mosseFuture"][j];
              if (element == traiettoria[i]) {
                if (key in info["evadiScacco"])
                  info["evadiScacco"][key].push(element);
                else info["evadiScacco"][key] = [element];
              }
            }
          }
        }
      }
    }
  }
  var scappaRe;
  if (colore == "n") scappaRe = calcolaPosRe("k" + colore + "1", "w");
  else scappaRe = calcolaPosRe("k" + colore + "1", "n");

  if (scappaRe.length != 0) info["evadiScacco"]["k" + colore + "1"] = scappaRe;

  //vedi se c'è scacco matto
  if (info["scacco"] && isEmpty(info["evadiScacco"])) {
    info["scaccoMatto"] = true;
  }
}

//king can eat
function kCanE(pezzo, colore) {
  //vedi se il re può mangiare il pezzo-minaccia
  var idPezzo = pezScac[pezzo.id];
  var pos = idPezzo["posizione"];
  var diagonali = calcolaDiagonali(pos, pezzo.id[1]);
  for (let j = 0; j < diagonali.length; j++) {
    if (getChildren(document.getElementById(diagonali[j])) != 0) {
      var minaccia = getChildren(document.getElementById(diagonali[j]))[0];
      if (
        (minaccia.id[0] == "q" || minaccia.id[0] == "a") &&
        minaccia.id[1] == colore &&
        minaccia.id != pezzo.id
      ) {
        return false;
      }
    }
  }
  //NB -> togliere 'p' dal controllo sopra e crearne uno a parte:
  //          Questo perche in questo modo considera tutte le diagonali nel pedone.
  //          Quindi creare un array con "calcolaMangiaPedone" e controllare con la 'p'
  var pedone = calcolaMangiaPedone(pezzo.id, pos);
  for (let j = 0; j < pedone.length; j++) {
    if (getChildren(document.getElementById(pedone[j])) != 0) {
      var minaccia = getChildren(document.getElementById(pedone[j]))[0];
      if (
        minaccia.id[0] == "p" &&
        minaccia.id[1] == colore &&
        minaccia.id != pezzo.id
      ) {
        return false;
      }
    }
  }
  var rette = calcolaRette(pos, pezzo.id[1]);
  for (let j = 0; j < rette.length; j++) {
    if (getChildren(document.getElementById(rette[j])) != 0) {
      var minaccia = getChildren(document.getElementById(rette[j]))[0];
      if (
        (minaccia.id[0] == "q" || minaccia.id[0] == "t") &&
        minaccia.id[1] == colore &&
        minaccia.id != pezzo.id
      ) {
        return false;
      }
    }
  }
  var cavallo = calcolaPosCavallo(pos, pezzo.id[1]);
  for (let j = 0; j < cavallo.length; j++) {
    if (getChildren(document.getElementById(cavallo[j])) != 0) {
      var minaccia = getChildren(document.getElementById(cavallo[j]))[0];
      if (
        minaccia.id[0] == "c" &&
        minaccia.id[1] == colore &&
        minaccia.id != pezzo.id
      ) {
        return false;
      }
    }
  }
  return true;
}

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}

function calcolaTraiettoriaScacco(idPezzo, posizioneRe) {
  var traiettoria = new Array();
  var posizionePezzo = pezScac[idPezzo]["posizione"];
  switch (idPezzo[0]) {
    case "p":
      if (idPezzo[1] == "n") {
        if (posizionePezzo[1] + 1 <= 7 && posizionePezzo[2] + 1 <= 7) {
          if (
            posizionePezzo[1] + 1 == posizioneRe[1] &&
            posizionePezzo[2] + 1 == posizioneRe[2]
          ) {
            traiettoria.push(scacchiera[posizionePezzo[1]][posizionePezzo[2]]);
            traiettoria.push(scacchiera[posizioneRe[1]][posizioneRe[2]]);
          }
        }
        if (posizionePezzo[1] + 1 <= 7 && posizionePezzo[2] - 1 >= 0) {
          if (
            posizionePezzo[1] + 1 == posizioneRe[1] &&
            posizionePezzo[2] - 1 == posizioneRe[2]
          ) {
            traiettoria.push(scacchiera[posizionePezzo[1]][posizionePezzo[2]]);
            traiettoria.push(scacchiera[posizioneRe[1]][posizioneRe[2]]);
          }
        }
      } else {
        if (posizionePezzo[1] - 1 >= 0 && posizionePezzo[2] + 1 <= 7) {
          if (
            posizionePezzo[1] - 1 == posizioneRe[1] &&
            posizionePezzo[2] + 1 == posizioneRe[2]
          ) {
            traiettoria.push(scacchiera[posizionePezzo[1]][posizionePezzo[2]]);
            traiettoria.push(scacchiera[posizioneRe[1]][posizioneRe[2]]);
          }
        }
        if (posizionePezzo[1] - 1 >= 0 && posizionePezzo[2] - 1 >= 0) {
          if (
            posizionePezzo[1] - 1 == posizioneRe[1] &&
            posizionePezzo[2] - 1 == posizioneRe[2]
          ) {
            traiettoria.push(scacchiera[posizionePezzo[1]][posizionePezzo[2]]);
            traiettoria.push(scacchiera[posizioneRe[1]][posizioneRe[2]]);
          }
        }
      }
      break;
    case "t":
      var y = posizionePezzo[1];
      var x = posizionePezzo[2];
      traiettoria.push(scacchiera[posizionePezzo[1]][posizionePezzo[2]]);
      //se mi trovo nella retta orizzontale
      if (posizionePezzo[1] == posizioneRe[1]) {
        //se il re si trova a dx
        if (posizioneRe[1] > x) {
          while (x < posizioneRe[2]) {
            x += 1;
            traiettoria.push(scacchiera[posizionePezzo[1]][x]);
          }
        }
        //altrimenti se il re si trova a sx
        else {
          while (x > posizioneRe[2]) {
            x -= 1;
            traiettoria.push(scacchiera[posizionePezzo[1]][x]);
          }
        }
      }
      //altrimenti se mi trovo nella retta verticale
      else if (posizionePezzo[2] == posizioneRe[2]) {
        //se il re si trova sopra
        if (posizioneRe[1] < y) {
          while (y > posizioneRe[1]) {
            y -= 1;
            traiettoria.push(scacchiera[y][posizionePezzo[2]]);
          }
        } //altrimenti se il re si trova in basso
        else {
          while (y < posizioneRe[1]) {
            y += 1;
            traiettoria.push(scacchiera[y][posizionePezzo[2]]);
          }
        }
      }
      break;
    case "c":
      traiettoria.push(scacchiera[posizionePezzo[1]][posizionePezzo[2]]);
      traiettoria.push(scacchiera[posizioneRe[1]][posizioneRe[2]]);
      break;
    case "a":
      traiettoria.push(scacchiera[posizionePezzo[1]][posizionePezzo[2]]);
      var y = posizionePezzo[1];
      var x = posizionePezzo[2];
      //diagonale basso sx
      if (
        posizioneRe[1] > posizionePezzo[1] &&
        posizioneRe[2] < posizionePezzo[2]
      ) {
        while (y < posizioneRe[1] && x > posizioneRe[2]) {
          y += 1;
          x -= 1;
          traiettoria.push(scacchiera[y][x]);
        }
      }
      //diagonale alto sx
      else if (
        posizioneRe[1] < posizionePezzo[1] &&
        posizioneRe[2] < posizionePezzo[2]
      ) {
        while (y > posizioneRe[1] && x > posizioneRe[2]) {
          y -= 1;
          x -= 1;
          traiettoria.push(scacchiera[y][x]);
        }
      }
      //diagonale alto dx
      else if (
        posizioneRe[1] < posizionePezzo[1] &&
        posizioneRe[2] > posizionePezzo[2]
      ) {
        while (y > posizioneRe[1] && x < posizioneRe[2]) {
          y -= 1;
          x += 1;
          traiettoria.push(scacchiera[y][x]);
        }
      }
      //diagonale basso dx
      else if (
        posizioneRe[1] > posizionePezzo[1] &&
        posizioneRe[2] > posizionePezzo[2]
      ) {
        while (y < posizioneRe[1] && x < posizioneRe[2]) {
          y += 1;
          x += 1;
          traiettoria.push(scacchiera[y][x]);
        }
      }
      break;
    case "q":
      var y = posizionePezzo[1];
      var x = posizionePezzo[2];
      traiettoria.push(scacchiera[y][x]);
      //se si trovano nella stessa retta orizzontale
      if (posizionePezzo[1] == posizioneRe[1]) {
        //se il re si trova a dx
        if (posizioneRe[1] > x) {
          while (x < posizioneRe[2]) {
            x += 1;
            traiettoria.push(scacchiera[posizionePezzo[1]][x]);
          }
        } //altrimenti se il re si trova a sx
        else {
          while (x > posizioneRe[2]) {
            x -= 1;
            traiettoria.push(scacchiera[posizionePezzo[1]][x]);
          }
        }
      }
      //se si trovano nella stessa retta verticale
      else if (posizionePezzo[2] == posizioneRe[2]) {
        //se il re si trova sopra
        if (posizioneRe[1] < y) {
          while (y > posizioneRe[1]) {
            y -= 1;
            traiettoria.push(scacchiera[y][posizionePezzo[2]]);
          }
        } //altrimenti se il re si trova in basso
        else {
          while (y < posizioneRe[1]) {
            y += 1;
            traiettoria.push(scacchiera[y][posizionePezzo[2]]);
          }
        }
      }
      //si trovano in diagonale
      else {
        //diagonale basso sx
        if (
          posizioneRe[1] > posizionePezzo[1] &&
          posizioneRe[2] < posizionePezzo[2]
        ) {
          while (y < posizioneRe[1] && x > posizioneRe[2]) {
            y += 1;
            x -= 1;
            traiettoria.push(scacchiera[y][x]);
          }
        }
        //diagonale alto sx
        else if (
          posizioneRe[1] < posizionePezzo[1] &&
          posizioneRe[2] < posizionePezzo[2]
        ) {
          while (y > posizioneRe[1] && x > posizioneRe[2]) {
            y -= 1;
            x -= 1;
            traiettoria.push(scacchiera[y][x]);
          }
        }
        //diagonale alto dx
        else if (
          posizioneRe[1] < posizionePezzo[1] &&
          posizioneRe[2] > posizionePezzo[2]
        ) {
          while (y > posizioneRe[1] && x < posizioneRe[2]) {
            y -= 1;
            x += 1;
            traiettoria.push(scacchiera[y][x]);
          }
        }
        //diagonale basso dx
        else if (
          posizioneRe[1] > posizionePezzo[1] &&
          posizioneRe[2] > posizionePezzo[2]
        ) {
          while (y < posizioneRe[1] && x < posizioneRe[2]) {
            y += 1;
            x += 1;
            traiettoria.push(scacchiera[y][x]);
          }
        }
      }
      break;

    default:
      break;
  }
  return traiettoria;
}

/*
    pezScac[id]["inchiodato"]
    [0] -> booleano
    [1] -> idPezzoMinaccia
    [2] -> posizionePezzoMinaccia
    [3] -> traiettoria 
*/
//___________________________________________________________________________
//MOVIMENTO PEZZI
function move(id) {
  if (color == info["giocatore"]) {
    //ricalcola inchiodatura
    if (pezScac[id]["inchiodato"][0]) {
      var cella = scacchiera[pezScac[id]["inchiodato"][2][0]][pezScac[id]["inchiodato"][2][1]];
      if (getChildren(document.getElementById(cella)).length == 0) {
        for (const key in pezScac) {
          if (pezScac[key][1] != id[1]) {
            if (valutaInchiodatura(key, id)) {
              pezScac[id]["inchiodato"][0] = true;
              pezScac[id]["inchiodato"][1] = key;
              pezScac[id]["inchiodato"][2] = [ pezScac[key]["posizione"][1], pezScac[key]["posizione"][2], ];
              pezScac[id]["inchiodato"][3] = calcolaTraiettoriaScacco( key, pezScac[id]["posizione"]);
            } else {
              pezScac[id]["inchiodato"][0] = false;
              pezScac[id]["inchiodato"][1] = "";
              pezScac[id]["inchiodato"][2] = [];
              pezScac[id]["inchiodato"][3] = [];
            }
          }
        }
      } else {
        if (getChildren(document.getElementById(cella))[0].id[1] == id[1]) {
          //c'è un pezzo dello stesso colore dell'ex pezzo inchiodato
          pezScac[id]["inchiodato"][0] = false;
          pezScac[id]["inchiodato"][1] = "";
          pezScac[id]["inchiodato"][2] = [];
          pezScac[id]["inchiodato"][3] = [];
        } else {
          for (let i = 0; i < pezScac[id]["inchiodato"][3].length; i++) {
            const element = pezScac[id]["inchiodato"][3][i];
            if (i != 0 && i != pezScac[id]["inchiodato"][3].length - 1) {
              if ($("#" + element).children().length != 0) {
                pezScac[id]["inchiodato"][0] = false;
                pezScac[id]["inchiodato"][1] = "";
                pezScac[id]["inchiodato"][2] = [];
                pezScac[id]["inchiodato"][3] = [];
                break;
              }
            }
          }
        }
      }
    }

    if (info["ultimoPezzo"] != "") {
      removeCerchi(info["ultimoPezzo"]);
    }

    info["ultimoPezzo"] = id;
    var immagine;
    let posizione = pezScac[id]["posizione"];
    var mosse = new Array();
    var colore;
    id[1] == "w" ? (colore = "n") : (colore = "w");
    switch (id[0]) {
      case "p":
        immagine = "pedone";
        mosse = calcolaPosPedone(id, posizione);
        break;
      case "t":
        immagine = "torre";
        mosse = calcolaRette(posizione, colore);
        break;
      case "a":
        immagine = "alfiere";
        mosse = calcolaDiagonali(posizione, colore);
        break;
      case "c":
        immagine = "cavallo";
        mosse = calcolaPosCavallo(posizione, colore);
        break;
      case "q":
        immagine = "regina";
        mosse = calcolaDiagonali(posizione, colore).concat(
          calcolaRette(posizione, colore)
        );
        break;
      case "k":
        immagine = "re";
        mosse = calcolaPosRe(id, colore);
        break;
      default:
        break;
    }
    if (!info["scacco"]) {
      for (let index = 0; index < mosse.length; index++) {
        if (
          (info["giocatore"] == "B" && id[1] == "w") ||
          (info["giocatore"] == "N" && id[1] == "n")
        ) {
          calcolaMosse(id, mosse[index], info["immagini"][immagine], colore);
          info["immagini"][immagine] += 1;
        }
      }
    } else {
      if (id in info["evadiScacco"]) {
        mosse = info["evadiScacco"][id];
        for (let index = 0; index < mosse.length; index++) {
          calcolaMosse(id, mosse[index], info["immagini"][immagine], colore);
          info["immagini"][immagine] += 1;
        }
      } else {
        console.log("Non puoi muovere questo pezzo");
      }
    }
  }
}
