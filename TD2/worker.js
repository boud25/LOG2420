
self.importScripts("CompteurJetons.js");
var compteur = new CompteurJetons();

self.addEventListener('message', function(e) {

    var it = compteur.compterJetons(e.data);

    var val = it.next().value;
    var send;

    while (val <= 100) {

        send = [compteur.getJetons(), compteur.getProgress()];

        postMessage(send);
        val = it.next().value;
    }

}, false);