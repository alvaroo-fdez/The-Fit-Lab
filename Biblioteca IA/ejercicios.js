var modal = document.getElementById('miModal');
var modalTitle = document.getElementById('ModalLabel');
var modalBody = document.querySelector('.modal-body');
var canvas = document.getElementById("canvas");

let model, webcam, ctx, labelContainer, maxPredictions;

async function init(contenido) {

    $('#miModal').modal('show');
    modalTitle.innerHTML = contenido;

    // Cargar el modelo al cargar la página
    var URL = "../modelos/" + contenido + "/";

    var modelURL = URL + "model.json";
    var metadataURL = URL + "metadata.json";

    model = await tmPose.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    var size = $('#modal-body-content').width();
    var flip = false;
    webcam = new tmPose.Webcam(size, size, flip);
    await webcam.setup();
    await webcam.play();
    window.requestAnimationFrame(loop);

    canvas.width = size; canvas.height = size;
    ctx = canvas.getContext("2d");
    labelContainer = document.getElementById("resultado");
    for (let i = 0; i < maxPredictions; i++) { // and class labels
        labelContainer.appendChild(document.createElement("div"));
    }
}

async function loop(timestamp) {
    webcam.update(); // update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);
}

const classNames = ["Err", "0%", "50%", "100%"];

async function predict() {
    const { pose, posenetOutput } = await model.estimatePose(webcam.canvas, false);
    const prediction = await model.predict(posenetOutput);



    // Encuentra la clase con la probabilidad más alta
    let maxProbability = -1;
    let classNameWithMaxProbability = null;

    // Recorremos el array
    for (let i = 0; i < prediction.length; i++) {
        let currentProbability = prediction[i].probability;

        // Comparamos la probabilidad actual con la máxima probabilidad encontrada hasta ahora
        if (currentProbability > maxProbability) {
            maxProbability = currentProbability;
            classNameWithMaxProbability = prediction[i].className;
        }
    }

    console.log(prediction);
    // Actualiza la interfaz gráfica mostrando solo la clase con la probabilidad más alta
    labelContainer.innerHTML = `${classNameWithMaxProbability}: ${Math.round(maxProbability * 100)}% (Más alta)`;
    drawPose(pose)
}

function drawPose(pose) {
    if (webcam.canvas) {
        ctx.drawImage(webcam.canvas, 0, 0);

        // draw the keypoints and skeleton
        if (pose) {
            var minPartConfidence = 0.5;
            tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx, 4, '#7ED956', '#7ED956');
            tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx, 4, '#7ED956');
        }
    }
}

function cerrarModal() {
    // Detener la transmisión de la cámara al cerrar el modal
    if (stream) {
        var tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
    }
    // Ocultar el modal utilizando jQuery
    $('#miModal').modal('hide');
}

// Cerrar el modal haciendo clic fuera de él
window.onclick = function (event) {
    if (event.target == modal) {
        cerrarModal();
    }
}