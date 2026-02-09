let notas = JSON.parse(localStorage.getItem("notas")) || [];
mostrarNotas();

document.getElementById("btn").onclick = function() {
    let t = document.getElementById("titulo").value.trim();
    let txt = document.getElementById("texto").value.trim();

    if (!t && !txt) return;

    notas.unshift({
        id: Date.now(),
        titulo: t || "Sin título",
        texto: txt,
        importante: false
    });

    localStorage.setItem("notas", JSON.stringify(notas));
    mostrarNotas();

    document.getElementById("titulo").value = "";
    document.getElementById("texto").value = "";
};

function mostrarNotas() {
    let lista = document.getElementById("lista");
    lista.innerHTML = "";

    // importantes primero
    let ordenadas = [...notas].sort((a,b) => b.importante - a.importante);

    ordenadas.forEach(nota => {
        let div = document.createElement("div");
        div.className = "nota" + (nota.importante ? " importante" : "");

        div.innerHTML = `
            <h2 class="titulo-nota">${nota.titulo}</h2>
            <p class="texto-nota">${nota.texto}</p>
            <div class="botones">
                <button class="estrella ${nota.importante ? 'activo' : ''}" data-id="${nota.id}">★</button>
                <button class="borrar" data-id="${nota.id}">🗑</button>
            </div>
        `;

        lista.appendChild(div);
    });
    lista.onclick = function(e) {
        let btn = e.target;
        if (btn.tagName !== "BUTTON") return;

        let id = Number(btn.dataset.id);

        if (btn.classList.contains("estrella")) {
            let nota = notas.find(n => n.id === id);
            if (nota) {
                nota.importante = !nota.importante;
                localStorage.setItem("notas", JSON.stringify(notas));
                mostrarNotas();
            }
        }
        else if (btn.classList.contains("borrar")) {
            if (confirm("¿Eliminar?")) {
                notas = notas.filter(n => n.id !== id);
                localStorage.setItem("notas", JSON.stringify(notas));
                mostrarNotas();
            }
        }
    };
}