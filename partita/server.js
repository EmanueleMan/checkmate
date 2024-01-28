const app = require("express")();
app.get("/partita", (re, res) => res.sendFile(__dirname + "/partita.php"));
app.listen(3000, () => console.log("Listening partita on 3000"));
console.log(__dirname)

const { Console } = require("console");
const http = require("http");
const httpServer = http.createServer();
httpServer.listen(3001, () => console.log("Listening server on 3001"));

const websocketServer = require("websocket").server;
const wsServer = new websocketServer({
    "httpServer": httpServer
})

clients = {};
games = {};
giocatori = {};
match = {};
wsServer.on("request", request => {
    //connesso
    const connection = request.accept(null, request.origin);
    
    //__________GESTIONE CONNESSIONE_______________
    //gestione apertura connessione
    connection.on("open", () => {
        console.log("Connessione aperta!")
    });
    
    //gestione chiusura connessione
    connection.on("close", () => {
        for (const e in giocatori) {
            if (giocatori[e].connection == connection)
                delete giocatori[e];
        }
        console.log("Connessione chiusa!")
    });
    //gestione arrivo messaggio
    connection.on("message", message => {
        //prova a ricevere anche il client id
        const mex = JSON.parse(message.utf8Data);
        if (mex.mod === "crea") {
            if (games[mex.partita] == undefined) {
                games[mex.partita] = [{
                    "clientId": mex.clientId,
                    "utente": mex.username,
                    "colore": mex.color,
                    "partita": mex.partita
                }];
            } else {
                games[mex.partita].push({
                    "clientId": mex.clientId,
                    "utente": mex.username,
                    "colore": mex.color,
                    "partita": mex.partita
                });
            }
            if (games[mex.partita].length == 2){
                json = {
                    "mod": "start",
                    "game": games[mex.partita]
                }
                for (const c in clients) {
                    clients[c].connection.send(JSON.stringify(json));
                }
                for (const e in clients) {
                    if (giocatori[e] === undefined)
                        giocatori[e] = clients[e];    
                }
                for (const e in games) {
                    if (match[e] === undefined)
                        match[e] = games[e];    
                }
                clients = {}
                games = {}
                console.log(giocatori);
                console.log(match);
            }    
        }

        if (mex.mod === "sposta") {
            console.log("----------------------");
            console.log(mex);
            const json = {
                "mod": "spostaAvv",
                "pezzo": mex.pezzo,
                "posizione": mex.posizione,
                //"colore": mex.colore,
                //"immagini": mex.immagini
                "pezScac": mex.pezScac,
                "info": mex.info
            }
            if (mex.enPassant !== undefined){
                json["enPassant"] = mex.enPassant;
            }
            if (mex.arrocco !== undefined){
                json["arrocco"] = mex.arrocco;
                json["posTorre"] = mex.posTorre;
            }
            giocatori[mex.opponent].connection.send(JSON.stringify(json));
        }

        if (mex.mod === "mangia") {
            console.log("----------------------");
            console.log(mex);
            const json = {
                "mod": "mangiaAvv",
                "pezzoMangiante": mex.pezzoMangiante,
                "posizioneMangiante": mex.posizioneMangiante,
                "pezzoMangiato": mex.pezzoMangiato,
                "pezScac": mex.pezScac,
                "info": mex.info
            }
            giocatori[mex.opponent].connection.send(JSON.stringify(json));
        }

        if (mex.mod === "matto") {
            const json = {
                "mod": "mattoAvv",
            }
            giocatori[mex.opponent].connection.send(JSON.stringify(json));
        }

        if (mex.mod === "promozione"){
            const json = {
                "mod": "promAvv",
                "pezzoId"  : mex.pezzoId,
                "casellaId": mex.casellaId,
                "pedone": mex.pedone,
                "pezScac": mex.pezScac,
                "info": mex.info
            }
            giocatori[mex.opponent].connection.send(JSON.stringify(json));
        }

        if (mex.mod === "abbandona"){
            const json = {
                "mod": "abbandonaAvv",
            }
            giocatori[mex.opponent].connection.send(JSON.stringify(json));
        }
        if (mex.mod === "pareggio"){
            const json = {
                "mod": "pareggioAvv",
            }
            giocatori[mex.opponent].connection.send(JSON.stringify(json));
        }
        if (mex.mod === "pareggioAccettato"){
            const json = {
                "mod": "pareggioAccAvv",
            }
            giocatori[mex.opponent].connection.send(JSON.stringify(json));
        }
        if (mex.mod === "pareggioRifiutato"){
            const json = {
                "mod": "pareggioRifAvv",
            }
            giocatori[mex.opponent].connection.send(JSON.stringify(json));
        }
        if (mex.mod === "attendi"){
            const json = {
                "mod": "attendiAvv",
            }
            giocatori[mex.opponent].connection.send(JSON.stringify(json));
        }
    });

    //nuovo client id associato alla connessione
    const clientId = guid();
    clients[clientId] = {
        "connection": connection
    };
    
    const payLoad = {
        "method": "connect",
        "clientId": clientId
    };
    //invia indietro la connessione del client
    console.log(clients, "matrice di clientId");
    connection.send(JSON.stringify(payLoad));
});
function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}

const guid = () => ( s4() + s4() + "-" + s4() + "-4" + s4() )