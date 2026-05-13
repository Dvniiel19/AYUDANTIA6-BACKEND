/**
 * Servicio de Usuarios
 * Contiene la lógica de negocio para gestionar usuarios
 */

const db = require('../config/db');
const Usuario = require('../entities/Usuario');

const usuarioRepository = db.getRepository(Usuario);

/**
 * Crear un nuevo usuario
 * @param {Object} datosUsuario - { nombre, apellido, email, edad }
 * @returns {Object} El usuario creado
 */
const crearUsuario = async (datosUsuario) => {
  const nuevoUsuario = usuarioRepository.create(datosUsuario);
  return await usuarioRepository.save(nuevoUsuario);
};

/**
 * Obtener todos los usuarios
 * @returns {Array} Array de todos los usuarios
 */
const obtenerTodosLosUsuarios = async () => {
  // TODO: Implementar la obtención de todos los usuarios
  // Ayudita: Usa usuarioRepository.find()
  return await usuarioRepository.find();
  //return []; //da error porque espera un array, pero luego lo reemplazaremos con la consulta real a la base de datos
  return null;
};

/**
 * Obtener un usuario por ID
 * @param {Number} id - ID del usuario
 * @param {Object} datosActualizados - Campos a actualizar
 * @returns {Object|null} El usuario encontrado o null
 */
const obtenerUsuarioPorId = async (id) => {
  // TODO: Implementar la obtención de un usuario por ID
  // Ayudita: Usa usuarioRepository.findOneBy({ id })
  return await usuarioRepository.findOneBy({ id });
  return null;
};

/**
 * Actualizar un usuario existente
 * @param {Number} id - ID del usuario
 * @param {Object} datosActualizados - Campos a actualizar
 * @returns {Object|null} El usuario actualizado o null si no existe
 */
const actualizarUsuario = async (id, datosActualizados) => {
  // TODO: Implementar la actualización de un usuario
  // Ayudita: Primero usa usuarioRepository.update(id, datosActualizados)
  await usuarioRepository.update(id, datosActualizados);
  // Y luego retorna el usuario actualizado usando obtenerUsuarioPorId(id)
  return await obtenerUsuarioPorId(id);
  return null; // si no existe 
};

/**
 * Eliminar un usuario
 * @param {Number} id - ID del usuario
 * @returns {boolean} true si se eliminó, false si no existe
 */
const eliminarUsuario = async (id) => {
  // TODO: Implementar la eliminación de un usuario
  // Ayudita: Usa usuarioRepository.delete(id) y verifica result.affected
  const result = await usuarioRepository.delete(id);
  if(result.affected === 0){
    return false;
  }
  return true; 
};

module.exports = {
  crearUsuario,
  obtenerTodosLosUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario
};
