const { v4: uuidv4 } = require('uuid');

// Almacenamiento en memoria para nuestros contactos
const contacts = [
  // Algunos contactos de ejemplo
  {
    id: "1",
    firstName: "Carlos",
    lastName: "Rodriguez",
    email: "carlos.rodriguez@ejemplo.com",
    phone: "+5491156781234",
    createdAt: "2023-01-15T14:30:00Z"
  },
  {
    id: "2",
    firstName: "María",
    lastName: "González",
    email: "maria.gonzalez@ejemplo.com",
    phone: "+5491155789012",
    createdAt: "2023-01-20T10:15:00Z"
  },
  {
    id: "3",
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@example.com",
    phone: "+14155552671",
    createdAt: "2023-02-05T16:45:00Z"
  }
];

/**
 * Obtiene todos los contactos
 * @returns {Array} Lista de todos los contactos
 */
const getAll = () => contacts;

/**
 * Busca un contacto por su ID
 * @param {string} id - ID del contacto a buscar
 * @returns {Object|null} El contacto encontrado o null
 */
const getById = (id) => contacts.find(contact => contact.id === id);

/**
 * Crea un nuevo contacto
 * @param {Object} contactData - Datos del nuevo contacto
 * @returns {Object} El contacto creado
 */
const create = (contactData) => {
  const { firstName, lastName, email, phone } = contactData;
  
  // Validar que todos los campos requeridos estén presentes
  if (!firstName || !lastName || !email || !phone) {
    throw new Error('Todos los campos son requeridos: firstName, lastName, email, phone');
  }
  
  // Validar formato de email con una expresión regular básica
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error('Formato de email inválido');
  }
  
  // Validar formato de teléfono internacional
  const phoneRegex = /^\+\d{4,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error('Formato de teléfono inválido: debe comenzar con + seguido del código de país y número');
  }
  
  // Crear el nuevo contacto
  const newContact = {
    id: uuidv4(),
    firstName,
    lastName,
    email,
    phone,
    createdAt: new Date().toISOString()
  };
  
  contacts.push(newContact);
  return newContact;
};

/**
 * Actualiza un contacto existente
 * @param {string} id - ID del contacto a actualizar
 * @param {Object} updates - Campos a actualizar
 * @returns {Object|null} El contacto actualizado o null si no existe
 */
const update = (id, updates) => {
  const index = contacts.findIndex(contact => contact.id === id);
  if (index === -1) return null;
  
  // Validar el email si está presente en las actualizaciones
  if (updates.email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(updates.email)) {
      throw new Error('Formato de email inválido');
    }
  }
  
  // Validar el teléfono si está presente en las actualizaciones
  if (updates.phone) {
    const phoneRegex = /^\+\d{4,15}$/;
    if (!phoneRegex.test(updates.phone)) {
      throw new Error('Formato de teléfono inválido: debe comenzar con + seguido del código de país y número');
    }
  }
  
  // Actualizar el contacto
  contacts[index] = {
    ...contacts[index],
    ...updates,
    // No permitimos actualizar estos campos
    id: contacts[index].id,
    createdAt: contacts[index].createdAt
  };
  
  return contacts[index];
};

/**
 * Elimina un contacto
 * @param {string} id - ID del contacto a eliminar
 * @returns {boolean} true si se eliminó, false si no existía
 */
const remove = (id) => {
  const index = contacts.findIndex(contact => contact.id === id);
  if (index === -1) return false;
  
  contacts.splice(index, 1);
  return true;
};

/**
 * Busca contactos por criterios
 * @param {Object} criteria - Criterios de búsqueda
 * @returns {Array} Contactos que coinciden con los criterios
 */
const searchContacts = (criteria) => {
  return contacts.filter(contact => {
    // Si no hay criterios, devolver todos los contactos
    if (!criteria) return true;
    
    // Buscar por nombre
    if (criteria.firstName && 
        !contact.firstName.toLowerCase().includes(criteria.firstName.toLowerCase())) {
      return false;
    }
    
    // Buscar por apellido
    if (criteria.lastName && 
        !contact.lastName.toLowerCase().includes(criteria.lastName.toLowerCase())) {
      return false;
    }
    
    // Buscar por email
    if (criteria.email && 
        !contact.email.toLowerCase().includes(criteria.email.toLowerCase())) {
      return false;
    }
    
    // Buscar por teléfono
    if (criteria.phone && 
        !contact.phone.includes(criteria.phone)) {
      return false;
    }
    
    return true;
  });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  searchContacts
};