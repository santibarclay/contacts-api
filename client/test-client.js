const http = require('http');

// Obtener opciones de línea de comandos
const endpoint = process.argv[2] || '/contacts';
const method = (process.argv[3] || 'GET').toUpperCase();

// Datos para métodos POST/PUT
let data = null;
if (method === 'POST' && endpoint === '/contacts') {
  data = JSON.stringify({
    firstName: 'Juan',
    lastName: 'Pérez',
    email: 'juan.perez@ejemplo.com',
    phone: '+5491145678901'
  });
} else if (method === 'POST' && endpoint === '/contacts/search') {
// Datos para búsqueda segura
  data = JSON.stringify({
    lastName: 'Jhon'
  });
} else if (method === 'PUT' && endpoint.includes('/contacts/')) {
  data = JSON.stringify({
    firstName: 'Juan Carlos',
    email: 'juancarlos.perez@ejemplo.com'
  });
}

// Opciones de la solicitud
const options = {
  hostname: 'localhost',
  port: 8081,
  path: endpoint,
  method: method,
  headers: {
    'Content-Type': 'application/json'
  }
};

if (data) {
  options.headers['Content-Length'] = Buffer.byteLength(data);
}

console.log('Realizando solicitud %s a http://localhost:8081%s', method, endpoint);
if (data) {
  console.log('Datos: %j', JSON.parse(data));
}

const req = http.request(options, (res) => {
  console.log('Estado: %d', res.statusCode);
  console.log('Encabezados: %j', res.headers);

  let responseData = '';
  res.on('data', (chunk) => {
    responseData += chunk;
  });

  res.on('end', () => {
    try {
      if (responseData) {
        const parsedData = JSON.parse(responseData);
        console.log('Respuesta: %j', parsedData);
      } else {
        console.log('Respuesta vacía (OK)');
      }
    } catch (e) {
      console.log('Respuesta (texto plano): %s', responseData);
    }
  });
});

req.on('error', (e) => {
  console.error('Error: %s', e.message);
});

if (data) {
  req.write(data);
}

req.end();