
# Integración de Jitsi Meet con SDK en una Prueba de Concepto (POC)

Este proyecto es una prueba de concepto para integrar una videollamada utilizando **Jitsi Meet** dentro de una página web, aprovechando su SDK para tener mayor control sobre la videollamada.

## Descripción del Proyecto

El propósito es permitir que dos usuarios se conecten automáticamente a una sala de videollamada al hacer clic en un botón, utilizando el **Jitsi Meet SDK** para embeder la videollamada directamente en la página web. Se ha configurado la llamada para que los usuarios entren en la misma sala de videollamada de manera automática y se ha añadido flexibilidad en la configuración a través de parámetros del SDK.

### Funcionalidades

1. **Botón de videollamada**: Al hacer clic en el botón, la videollamada se carga dentro de la página usando el SDK de Jitsi.
2. **Control mediante el SDK de Jitsi**: Se tiene la capacidad de configurar opciones como el nombre de la sala, el nombre de usuario, si el video/audio debe estar habilitado o no, entre otras funcionalidades.
3. **Embebido en la misma página**: A diferencia de Google Meet, Jitsi permite incrustar la videollamada directamente en la misma página sin la necesidad de abrir nuevas pestañas o ventanas.

### Requisitos

- **Node.js y npm** instalados.
- Servidor local o servidor de desarrollo que sirva los archivos HTML y JavaScript.
- **Acceso a Internet** para cargar Jitsi Meet.

### Instalación y Configuración

1. Clonar este repositorio o copiar el código en tu proyecto.

2. Crear un archivo `index.html` con el siguiente código:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Videollamada con Jitsi</title>
    <style>
        body {
            display: flex;
            height: 100vh;
            margin: 0;
        }

        #video-call {
            width: 50%;
            height: 100%;
            border-right: 2px solid #ccc;
        }

        #extra-info {
            width: 50%;
            padding: 20px;
        }

        #meet {
            width: 100%;
            height: 100%;
        }

        button {
            padding: 10px 20px;
            font-size: 16px;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <div id="video-call">
        <!-- Aquí se cargará Jitsi Meet -->
        <div id="meet"></div>
    </div>

    <div id="extra-info">
        <h1>Información adicional</h1>
        <p>Aquí puedes colocar cualquier información que desees mostrar durante la videollamada.</p>
        <!-- Botón para iniciar la videollamada -->
        <button onclick="startJitsi()">Iniciar Videollamada</button>
    </div>

    <!-- Importar el SDK de Jitsi -->
    <script src="https://meet.jit.si/external_api.js"></script>

    <!-- Archivo JavaScript que controla Jitsi -->
    <script src="script.js"></script>
</body>
</html>
```

3. Crear un archivo `script.js` con el siguiente código:

```javascript
function startJitsi() {
    const domain = "meet.jit.si";
    const options = {
        roomName: "MiSalaDeVideollamada", // Cambiar a un nombre de sala único
        width: "100%",
        height: "100%",
        parentNode: document.getElementById('meet'),
        
        // Configuración personalizada de Jitsi
        configOverwrite: {
            prejoinPageEnabled: false, // Deshabilitar la pantalla de preunión
            disableSimulcast: false, // Permitir la transmisión de video adaptativa
            enableNoAudioDetection: true, // Detectar si el usuario no tiene audio
            enableNoisyMicDetection: true, // Detectar micrófono ruidoso
            defaultLanguage: 'es', // Establecer el idioma de la interfaz en español
            startWithAudioMuted: true, // Comenzar con el micrófono apagado
            startWithVideoMuted: false // Comenzar con el video activado
        },
        
        interfaceConfigOverwrite: {
            SHOW_JITSI_WATERMARK: false, // Ocultar la marca de agua de Jitsi
            HIDE_INVITE_MORE_HEADER: true, // Ocultar opción de invitar más usuarios
            DISABLE_JOIN_LEAVE_NOTIFICATIONS: true, // Deshabilitar notificaciones de entrada/salida
            TOOLBAR_BUTTONS: [ // Personalizar la barra de herramientas
                'microphone', 'camera', 'desktop', 'fullscreen',
                'fodeviceselection', 'hangup', 'chat', 'settings'
            ]
        },

        // Información del usuario
        userInfo: {
            displayName: "Usuario1", // Cambiar nombre de usuario
            email: "usuario1@ejemplo.com" // Correo electrónico del usuario
        }
    };
    
    const api = new JitsiMeetExternalAPI(domain, options);

    // Opciones de control adicionales usando `api`
    api.executeCommand('toggleAudio'); // Silenciar o activar el micrófono
    api.executeCommand('toggleVideo'); // Activar/desactivar el video
}
```

### Parámetros Personalizables del SDK

En esta implementación, hemos añadido múltiples configuraciones del SDK para personalizar la videollamada:

- **`prejoinPageEnabled`**: Habilita o deshabilita la página previa a la reunión.
- **`disableSimulcast`**: Controla la transmisión de video adaptativa (simulcast).
- **`enableNoAudioDetection`**: Habilita la detección de si el usuario no tiene audio.
- **`enableNoisyMicDetection`**: Detecta si el micrófono está capturando mucho ruido.
- **`defaultLanguage`**: Define el idioma de la interfaz (ejemplo: `'es'` para español).
- **`startWithAudioMuted` y `startWithVideoMuted`**: Controlan si el micrófono y la cámara están activados o desactivados al iniciar la llamada.
- **`SHOW_JITSI_WATERMARK`**: Oculta o muestra la marca de agua de Jitsi.
- **`HIDE_INVITE_MORE_HEADER`**: Oculta el encabezado para invitar más usuarios.
- **`TOOLBAR_BUTTONS`**: Personaliza los botones disponibles en la barra de herramientas durante la llamada.

### Cómo Funciona

1. Al cargar la página, se muestra un botón en el lado derecho.
2. Al hacer clic en el botón **Iniciar Videollamada**, se carga la videollamada de Jitsi en la mitad izquierda de la pantalla.
3. La videollamada se personaliza de acuerdo con los parámetros configurados en el archivo `script.js`, como desactivar la página de preunión y comenzar con el micrófono apagado.
4. Jitsi permite controlar aspectos de la videollamada desde el JavaScript, como silenciar el micrófono, activar/desactivar el video y otras funcionalidades.

### Personalización

- **Nombre de la sala**: En el código de `script.js`, puedes cambiar el valor de `roomName` para que los usuarios se unan a diferentes salas.
- **Nombre de usuario y email**: Cambia el valor de `displayName` y `email` para establecer el nombre y el correo electrónico del usuario.
- **Opciones adicionales**: Puedes seguir ajustando los parámetros de `configOverwrite` y `interfaceConfigOverwrite` para cambiar el comportamiento y la apariencia de Jitsi.

### Futuras Mejoras

- **Integración con back-end**: Crear un sistema en el servidor para generar dinámicamente salas y usuarios únicos en función de la lógica del sistema.
- **Más control sobre la interfaz**: Usar más métodos del SDK de Jitsi para controlar la videollamada, como expulsar usuarios, cambiar roles, o gestionar la conferencia.

---