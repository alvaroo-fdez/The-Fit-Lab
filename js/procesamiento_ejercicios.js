
// Obtener el contenedor donde se agregarán las tarjetas
const contenedor = document.getElementById('contenedor');

// Recorrer el objeto grupos
for (const grupoMuscular in ejercicios) {
    // Crear elemento div para el grupo muscular
    const grupoDiv = document.createElement('div');
    grupoDiv.classList.add('container-fluid', 'py-2');

    // Crear elemento h5 con el nombre del grupo muscular
    const h5 = document.createElement('h5');
    h5.textContent = grupoMuscular;
    grupoDiv.appendChild(h5);

    // Crear hr
    const hr = document.createElement('hr');
    grupoDiv.appendChild(hr);

    // Crear div para la card-deck-scrollable
    const cardDeckDiv = document.createElement('div');
    cardDeckDiv.classList.add('card-deck-scrollable', 'flex-nowrap', 'overflow-auto', 'd-flex', 'flex-row');
    
    // Recorrer los ejercicios dentro del grupo muscular
    for (const ejercicio in ejercicios[grupoMuscular]) {
        // Crear elemento div para cada tarjeta
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card', 'mx-2');

        // Crear elemento video
        const video = document.createElement('video');
        video.setAttribute('autoplay', '');
        video.setAttribute('muted', '');
        video.setAttribute('playsinline', '');
        video.setAttribute('name', 'media');
        video.setAttribute('loop', '');
        video.setAttribute('controls', '');
        const source = document.createElement('source');
        source.setAttribute('src', `http://localhost/p3/the-fit-lab/assets/videos/exercises/${ejercicios[grupoMuscular][ejercicio]}.mp4`);
        source.setAttribute('type', 'video/mp4');
        video.appendChild(source);

        // Crear elemento card-body
        const cardBodyDiv = document.createElement('div');
        cardBodyDiv.classList.add('card-body');

        // Crear elemento h5 para el título del ejercicio
        const cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = ejercicio;
        cardBodyDiv.appendChild(cardTitle);

        // Crear elemento p para la descripción del ejercicio
        const cardText = document.createElement('p');
        cardText.classList.add('card-text');
        cardText.textContent = `Ejercicio que trabaja ${grupoMuscular.toLowerCase()} y ${ejercicio.toLowerCase()}`;
        cardBodyDiv.appendChild(cardText);

        // Crear elemento card-footer
        const cardFooterDiv = document.createElement('div');
        cardFooterDiv.classList.add('card-footer');

        // Crear botón con evento onclick
        const btn = document.createElement('button');
        btn.setAttribute('type', 'button');
        btn.classList.add('btn', 'btn-primary');
        btn.textContent = 'Probar contador';
        btn.onclick = function() {
            init(ejercicios[grupoMuscular][ejercicio]);
        };

        // Agregar elementos al card-footer
        cardFooterDiv.appendChild(btn);

        // Agregar elementos a la tarjeta
        cardDiv.appendChild(video);
        cardDiv.appendChild(cardBodyDiv);
        cardDiv.appendChild(cardFooterDiv);

        // Agregar tarjeta al contenedor de tarjetas
        cardDeckDiv.appendChild(cardDiv);
    }

    // Agregar la card-deck-scrollable al grupo muscular
    grupoDiv.appendChild(cardDeckDiv);

    // Agregar el grupo muscular al contenedor principal
    contenedor.appendChild(grupoDiv);
}