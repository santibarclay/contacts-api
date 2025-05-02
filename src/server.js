const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const config = require('./config');
const contactsRoutes = require('./routes/contacts');
const errorHandler = require('./middleware/errorHandler');

// Crear la aplicación Express
const app = express();

// Middleware básico
app.use(express.json());
app.use(morgan('combined'));
app.use(cors());

// NOTA DE SEGURIDAD: Esta aplicación carece de protección CSRF// En una aplicación de producción, se debería implementar un middleware como 'csurf'// o una solución personalizada para proteger contra ataques CSRF// Ruta de información
app.get('/', (req, res) => {
  res.json({
    message: 'API de Contactos',
    apiVersion: '1.0',
    serverTime: new Date().toISOString(),
    endpoints: {
      getAllContacts: 'GET /contacts',
      searchContacts: 'POST /contacts/search',
      getContact: 'GET /contacts/:id',
      createContact: 'POST /contacts',
      updateContact: 'PUT /contacts/:id',
      deleteContact: 'DELETE /contacts/:id'
    }
  });
});

// Rutas de la API
app.use('/contacts', contactsRoutes);

// Middleware para manejar rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Middleware para manejar errores
app.use(errorHandler);

// Iniciar el servidor
const PORT = config.port;
app.listen(PORT, () => {
  console.log('✅ API de Contactos ejecutándose en http://localhost:%d', PORT);
  console.log('   Entorno: %s', config.environment);
  console.log('   ⚠️ Advertencia: Esta API no incluye protección CSRF');
});

module.exports = app;// Exportar para pruebas