$(function() {

    var worker;

    $('#count').click(function startWorker() {

        if (typeof(Worker) !== "undefined") {

            if (typeof(worker) == "undefined") {

                worker = new Worker("worker.js");
            }
            worker.onmessage = function(event) {
                //Affichage du progrès du compte
                document.getElementById("jetons").innerHTML = event.data[0];
                document.getElementById("progress-bar").style.width = event.data[1] + "%";
                document.getElementById("progress-bar").innerHTML = event.data[1] + "%";

                if (event.data[1] == 100) {
                    stopWorker();
                }
            }
        }

        document.getElementById("jetons").innerHTML = "0";
        document.getElementById("progress-bar").style.width = "0%";

        //Activation/Désactivation des composantes selon l'opération en cours
        $('#stop').removeClass('disabled');
        $('#stop').removeAttr("disabled");

        $('#count').addClass('disabled');
        $('#count').attr("disabled", "disabled");

        $('#text-container').attr("disabled", "disabled");

        worker.postMessage($('#text-container').val());

    });

    $('#stop').click(function stopWorker() {

        worker.terminate();
        worker = undefined;
        //Activation/Désactivation des composantes selon l'opération en cours
        $('#count').removeClass('disabled');
        $('#count').removeAttr("disabled");

        $('#stop').addClass('disabled');
        $('#stop').attr("disabled", "disabled");

        $('#text-container').removeAttr("disabled");
    });

    function stopWorker() {

        worker.terminate();
        worker = undefined;
        //Activation/Désactivation des composantes selon l'opération en cours
        $('#count').removeClass('disabled');
        $('#count').removeAttr("disabled");

        $('#stop').addClass('disabled');
        $('#stop').attr("disabled", "disabled");

        $('#text-container').removeAttr("disabled")
    }
});
