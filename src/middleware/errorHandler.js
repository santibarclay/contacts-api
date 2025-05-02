/**
 * Middleware para manejar errores de manera consistente
 */
module.exports = (err, req, res, next) => {
    // Obtener la marca de tiempo actual
    const timestamp = new Date().toISOString();
    
    // Registrar el error de forma segura
    console.error('[%s] Error:', timestamp);
    console.error(err);
    
    // Determinar el código de estado apropiado
    let statusCode = 500;
    if (err.name === 'ValidationError' || (err.message && err.message.includes('inválido'))) {
      statusCode = 400;
    }
    
    // Enviar respuesta de error
    res.status(statusCode).json({
      error: err.message || 'Error interno del servidor',
      // En desarrollo podríamos incluir más detalles
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
  };