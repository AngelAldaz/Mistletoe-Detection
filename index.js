const imageInput = document.getElementById("imageInput");
const uploadZone = document.getElementById("upload-zone");
const previewImage = document.getElementById("previewImage");
const uploadButton = document.getElementById("uploadButton");
const statusMessage = document.getElementById("statusMessage");

let image = null;

uploadZone.addEventListener("click", () => imageInput.click());

imageInput.addEventListener("change", (e) => {
  if (e.target.files && e.target.files[0]) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      image = event.target.result;
      previewImage.src = image;
      previewImage.style.display = "block";
    };

    reader.readAsDataURL(file);
  }
});

uploadButton.addEventListener("click", async (e) => {
  e.preventDefault();
  if (!image) {
    displayMessage("Por favor selecciona una imagen", "status-fail");
    return;
  }

  // Deshabilitar la carga de nuevas imágenes y el botón
  imageInput.disabled = true;
  uploadZone.style.pointerEvents = "none"; // Desactiva la zona de carga
  uploadButton.disabled = true; // Desactiva el botón

  // Cambiar el texto del botón para indicar que está procesando
  uploadButton.innerHTML = '<div class="loading-spinner"></div> Procesando...';

  const formData = new FormData();
  formData.append("file", dataURItoBlob(image));

  try {
    const data = await uploadImage(formData);
    const prediction = data.class_predicted;
    displayMessage(
      prediction === 1 ? "¡Es muérdago!" : "No es muérdago",
      prediction === 1 ? "status-success" : "status-fail"
    );
  } catch (error) {
    displayMessage("Error en la solicitud", "status-fail");
    console.error("Error en la solicitud:", error);
  } finally {
    // Volver a habilitar la carga de nuevas imágenes y el botón
    imageInput.disabled = false;
    uploadZone.style.pointerEvents = "auto"; // Activa la zona de carga
    uploadButton.disabled = false; // Vuelve a habilitar el botón

    // Cambiar el texto del botón de nuevo a su estado original
    uploadButton.innerHTML = "Analizar Imagen";
  }
});

function displayMessage(message, statusClass) {
  statusMessage.textContent = message;
  statusMessage.className = `status ${statusClass}`;
  statusMessage.style.display = "block";
}

function dataURItoBlob(dataURI) {
  const byteString = atob(dataURI.split(",")[1]);
  const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
}

async function uploadImage(formData, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(
        "https://struthanthus-api.onrender.com/upload-image/",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Error en la respuesta");
      }

      return await response.json(); // Retorna los datos si la respuesta es exitosa
    } catch (error) {
      console.error(`Intento ${i + 1} fallido: ${error}`);
      if (i === retries - 1) throw error; // Si es el último intento, lanza el error
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Espera 2 segundos antes del siguiente intento
    }
  }
}
