// Configuración de la aplicación
module.exports = {
    // Puerto en el que escuchará el servidor
    port: process.env.PORT || 8081,
    
    // Entorno de ejecución
    environment: process.env.NODE_ENV || 'development',
    
    // Configuración de API (para agregar API keys, límites, etc. en el futuro)
    api: {
      // Añadir configuraciones específicas de la API aquí
    },
    
    // Espacio reservado para configuraciones de seguridad futuras
    security: {
      // Estas configuraciones se implementarán en futuros posts
      csrfEnabled: false,
      mtlsEnabled: false,
    }
  };