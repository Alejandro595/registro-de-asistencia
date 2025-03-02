const video = document.getElementById("video");
const captureButton = document.getElementById("capture");
const errorMessage = document.getElementById("mensaje");
const cameraIcon = document.getElementById("camera-icon"); // Logo de la cámara
const canvas = document.createElement("canvas");
const photoContainer = document.getElementById("photo-container"); // Contenedor para la foto

// Acceder a la cámara
captureButton.addEventListener("click", async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
        video.srcObject = stream;
        video.style.display = "block"; // Mostrar video
        cameraIcon.style.display = "none"; // Ocultar icono de la cámara
        errorMessage.textContent = ""; // Limpiar mensajes de error
    } catch (error) {
        errorMessage.textContent = "⚠️ No se detectó una cámara. Por favor, revisa los permisos.";
    }
});

// Tomar foto
video.addEventListener("click", () => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Crear imagen y mostrarla
    const photo = document.createElement("img");
    photo.src = canvas.toDataURL("image/png");
    photo.style.width = "100%";
    photo.style.borderRadius = "10px";

    // Reemplazar cualquier imagen anterior
    photoContainer.innerHTML = "";
    photoContainer.appendChild(photo);
});
