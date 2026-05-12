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
  // usuarioRepository.find()  // Llamada sin return, no devuelve nada
  // return [];  // Siempre devuelve array vacío
  // Propuesta: return await usuarioRepository.find();  // Devuelve todos los usuarios
  return await usuarioRepository.find();
};

/**
 * Obtener un usuario por ID
 * @param {Number} id - ID del usuario
 * @returns {Object|null} El usuario encontrado o null
 */
const obtenerUsuarioPorId = async (id) => {
  // TODO: Implementar la obtención de un usuario por ID
  // usuarioRepository.findOneBy({ id })  // Llamada sin return, no devuelve nada
  // return null;  // Siempre devuelve null
  // Propuesta: return await usuarioRepository.findOneBy({ id });  // Devuelve el usuario o null
  return await usuarioRepository.findOneBy({ id });
};

/**
 * Actualizar un usuario existente
 * @param {Number} id - ID del usuario
 * @param {Object} datosActualizados - Campos a actualizar
 * @returns {Object|null} El usuario actualizado o null si no existe
 */
const actualizarUsuario = async (id, datosActualizados) => {
  // TODO: Implementar la actualización de un usuario
  // user = usuarioRepository.update(id, datosActualizados)  // Variable no declarada, sin await
  // return obtenerUsuarioPorId(id)  // Sin await, return null después
  // return null;  // Código unreachable
  // Propuesta: await usuarioRepository.update(id, datosActualizados); return await obtenerUsuarioPorId(id);
  await usuarioRepository.update(id, datosActualizados);
  return await obtenerUsuarioPorId(id);
};

/**
 * Eliminar un usuario
 * @param {Number} id - ID del usuario
 * @returns {boolean} true si se eliminó, false si no existe
 */
const eliminarUsuario = async (id) => {
  // const result = await usuarioRepository.delete(id)  // Bien, pero luego...
  // if(result.affected === -1){  // -1 no es correcto, affected es >0 si se eliminó
  // return false;  // Solo en ese caso, sino undefined
  // }
  // Propuesta: const result = await usuarioRepository.delete(id); return result.affected > 0;
  const result = await usuarioRepository.delete(id);
  return result.affected > 0; return false;
}


module.exports = {
  crearUsuario,
  obtenerTodosLosUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario
};
