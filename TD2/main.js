$(function() {

    var worker;

    $('#count').click(function startWorker() {

        if (typeof(Worker) !== "undefined") {

            if (typeof(worker) == "undefined") {

                worker = new Worker("worker.js");
            }
            worker.onmessage = function(event) {

                document.getElementById("jetons").innerHTML = event.data[0];
                document.getElementById("progress-bar").style.width = event.data[1] + "%";

                if (event.data[1] == 100) {

                    stopWorker();
                }
            }
        }

        document.getElementById("jetons").innerHTML = "0";
        document.getElementById("progress-bar").style.width = "0%";

        $('#stop').removeClass('disabled');
        $('#count').addClass('disabled');

        worker.postMessage($('#text-container').val());

    });

    $('#stop').click(function stopWorker() {

        worker.terminate();
        worker = undefined;

        $('#count').removeClass('disabled');
        $('#stop').addClass('disabled');
    });

    function stopWorker() {

        worker.terminate();
        worker = undefined;

        $('#count').removeClass('disabled');
        $('#stop').addClass('disabled');
    }
});