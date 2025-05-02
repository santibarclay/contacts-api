const express = require('express');
const router = express.Router();
const contactsModel = require('../db/contacts');

// Obtener todos los contactos
router.get('/', (req, res, next) => {
  try {
    const result = contactsModel.getAll();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// Endpoint de búsqueda segura usando POST
router.post('/search', (req, res, next) => {
  try {
// Extraer criterios de búsqueda del cuerpo de la solicitud
    const { firstName, lastName, email, phone } = req.body;

// Realizar la búsqueda
    const result = contactsModel.searchContacts({ firstName, lastName, email, phone });

    res.json(result);
  } catch (error) {
    next(error);
  }
});

// Obtener un contacto específico por ID
router.get('/:id', (req, res, next) => {
  try {
    const contact = contactsModel.getById(req.params.id);
    if (!contact) {
      return res.status(404).json({ error: 'Contacto no encontrado' });
    }

    res.json(contact);
  } catch (error) {
    next(error);
  }
});

// Crear un nuevo contacto
router.post('/', (req, res, next) => {
  try {
    const newContact = contactsModel.create(req.body);

// Registrar la operación de forma segura
    console.log('[%s] Contacto creado: %s', new Date().toISOString(), newContact.id);

    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

// Actualizar un contacto existente
router.put('/:id', (req, res, next) => {
  try {
    const updatedContact = contactsModel.update(req.params.id, req.body);
    if (!updatedContact) {
      return res.status(404).json({ error: 'Contacto no encontrado' });
    }

// Registrar la operación de forma segura
    console.log('[%s] Contacto actualizado: %s', new Date().toISOString(), req.params.id);

    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
});

// Eliminar un contacto
router.delete('/:id', (req, res, next) => {
  try {
    const deleted = contactsModel.remove(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Contacto no encontrado' });
    }

// Registrar la operación de forma segura
    console.log('[%s] Contacto eliminado: %s', new Date().toISOString(), req.params.id);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;