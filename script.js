const video = document.getElementById("video");
const captureButton = document.getElementById("capture");
const errorMessage = document.getElementById("mensaje");
const cameraIcon = document.getElementById("camera-icon"); // Icono de la cámara
const photoContainer = document.getElementById("photo-container"); // Contenedor de la foto
const canvas = document.createElement("canvas");

// Activar la cámara
captureButton.addEventListener("click", async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { facingMode: "user" } // Usa la cámara frontal
        });

        video.srcObject = stream;
        video.style.display = "block"; // Mostrar la cámara
        cameraIcon.style.display = "none"; // Ocultar icono de la cámara
        errorMessage.textContent = ""; // Limpiar el mensaje de error

    } catch (error) {
        errorMessage.textContent = "⚠️ No se detectó una cámara. Por favor, revisa los permisos.";
    }
});

// Tomar foto al hacer clic en el video
video.addEventListener("click", () => {
    if (!video.srcObject) return; // No hacer nada si no hay cámara activa

    // Configurar el tamaño del canvas
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    
    // Capturar la imagen del video
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convertir la imagen a base64 y mostrarla en pantalla
    const photo = document.createElement("img");
    photo.src = canvas.toDataURL("image/png");
    photo.style.width = "100%";
    photo.style.borderRadius = "10px";

    // Reemplazar la imagen anterior si ya existe
    photoContainer.innerHTML = "";
    photoContainer.appendChild(photo);
});
