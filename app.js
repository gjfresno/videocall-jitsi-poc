// Configurar el dominio y las opciones de la videollamada
const domain = 'meet.jit.si';
const roomName = 'SalaPOC123';  // Nombre de la sala compartido
const options = {
    roomName: roomName,
    width: '100%',
    height: 600,
    parentNode: document.querySelector('#meet'),
    configOverwrite: {
        prejoinPageEnabled: false,  // Saltar la pantalla de preunión
        disableInviteFunctions: true // Desactiva la opción de invitar a otros
    },
    interfaceConfigOverwrite: {
        SHOW_JITSI_WATERMARK: false, // Desactivar marca de agua
        SHOW_BRAND_WATERMARK: false, // Desactivar marca
        TOOLBAR_BUTTONS: [           // Personalizar botones
            'microphone', 'camera', 'hangup', 'chat'
        ]
    },
    userInfo: {
        displayName: 'Usuario POC' // Nombre del usuario predeterminado
    }
};

// Inicializar Jitsi Meet API
const api = new JitsiMeetExternalAPI(domain, options);

// Listener para cuando el usuario se une a la videollamada
api.addEventListener('videoConferenceJoined', () => {
    console.log('Usuario se ha unido a la videollamada en la sala ' + roomName);
});
