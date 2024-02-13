async function iniciarwebcamcondeteccion(URL) {
    let model, webcam, ctx, labelContainer, maxPredictions;

    boton = document.getElementById("iniciar");
    boton.addEventListener("click", () => init());

    async function init() {
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";

        // Configurar la cámara predeterminada
        const cameras = await navigator.mediaDevices.enumerateDevices();
        const defaultCamera = cameras.find(device => device.kind === 'videoinput');
        const constraints = {
            video: {
                deviceId: { exact: defaultCamera.deviceId }
            }
        };

        // Agregar cámaras al desplegable
        camerasDropdown = document.getElementById("cameras");
        cameras.forEach(camera => {
            const option = document.createElement("option");
            option.value = camera.deviceId;
            option.text = camera.label || `Camera ${camerasDropdown.options.length + 1}`;
            camerasDropdown.appendChild(option);
        });

        // load the model and metadata
        model = await tmPose.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        // Configurar la webcam sin restricciones iniciales
        const size = 200;
        const flip = true; // whether to flip the webcam
        webcam = new tmPose.Webcam(size, size, flip); // width, height, flip
        await webcam.setup(); // request access to the webcam without constraints
        await webcam.play();
        window.requestAnimationFrame(loop);

        // append/get elements to the DOM
        const canvas = document.getElementById("canvas");
        canvas.width = size; canvas.height = size;
        ctx = canvas.getContext("2d");
        labelContainer = document.getElementById("label-container");
        for (let i = 0; i < maxPredictions; i++) {
            // and class labels
            labelContainer.appendChild(document.createElement("div"));
        }

        // Escuchar cambios en el desplegable
        camerasDropdown.addEventListener("change", onCameraChange);
    }

    async function onCameraChange() {
        const selectedCameraId = camerasDropdown.value;
        const constraints = {
            video: {
                deviceId: { exact: selectedCameraId }
            }
        };

        // Detener la corriente actual (sin usar webcam.stop())
        webcam.pause();

        // Configurar la nueva webcam con las restricciones
        await webcam.setup(constraints);

        // Reiniciar la corriente
        webcam.play();
    }


    async function loop(timestamp) {
        webcam.update(); // update the webcam frame
        await predict();
        window.requestAnimationFrame(loop);
    }

    async function predict() {
        // Prediction #1: run input through posenet
        // estimatePose can take in an image, video or canvas html element
        const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
        // Prediction 2: run input through teachable machine classification model
        const prediction = await model.predict(posenetOutput);

        for (let i = 0; i < maxPredictions; i++) {
            const classPrediction =
                prediction[i].className + ": " + prediction[i].probability.toFixed(2);
            labelContainer.childNodes[i].innerHTML = classPrediction;
        }

        // finally draw the poses
        drawPose(pose);
    }

    function drawPose(pose) {
        if (webcam.canvas) {
            ctx.drawImage(webcam.canvas, 0, 0);
            // draw the keypoints and skeleton
            if (pose) {
                const minPartConfidence = 0.5;
                // Dibujar keypoints con colores personalizados
                tmPose.drawKeypoints(
                    pose.keypoints,
                    minPartConfidence,
                    ctx,
                    4,  // keypointSize
                    "#88dc65",  // fillColor
                    "#88dc65"   // strokeColor
                );
                tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx, 2, "#88dc65");
            }
        }
    }

}

let modelo = "../pruebas/modelojs/";
iniciarwebcamcondeteccion(modelo)