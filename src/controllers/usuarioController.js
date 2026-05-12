/**
 * Controlador de Usuarios
 * Maneja las peticiones HTTP relacionadas con usuarios
 */

const { sendSuccess, sendError } = require('../handlers/responseHandler');
const usuarioService = require('../services/usuarioService');
const { createUsuarioSchema, updateUsuarioSchema } = require('../validations/usuarioValidation');

/**
 * POST /usuarios
 * Crea un nuevo usuario
 */
const crearUsuario = async (req, res) => {
  try {
    // 1. Validamos los datos de entrada con Joi
    const { error, value } = createUsuarioSchema.validate(req.body);

    if (error) {
      return sendError(
        res,
        'Error en validación de datos',
        400,
        error.details.map(err => err.message)
      );
    }

    // 2. Llamamos al servicio para crear el usuario
    const usuarioCreado = await usuarioService.crearUsuario(value);

    // 3. Respondemos con éxito
    return sendSuccess(
      res,
      usuarioCreado,
      'Usuario creado exitosamente',
      201
    );
  } catch (error) {
    console.error(error);
    return sendError(res, 'Error al crear usuario', 500);
  }
};

/**
 * GET /usuarios
 * Obtiene todos los usuarios
 */
const obtenerTodosLosUsuarios = async (req, res) => {
  try { 
    const usuarios = await usuarioService.obtenerTodosLosUsuarios();
    
    return sendSuccess(res, usuarios, "usuarios obtenidos exitosamente");
  } catch (error) {
    return sendError(res, 'Error al obtener usuarios', 500);
  }
};

/**
 * GET /usuarios/:id
 * Obtiene un usuario específico por ID
 */
const obtenerUsuarioPorId = async (req, res) => {
  try {
    const { id } = req.params;
    // TODO: Paso 1 - Llamar al servicio obtenerUsuarioPorId(id)
    const usuario = await usuarioService.obtenerUsuarioPorId(id)
    // TODO: Paso 2 - Si no existe (null), retornar sendError con 404
    if( !usuario){
      return sendError(res, 'usuario no encontrado', 404)
    }
    // TODO: Paso 3 - Si existe, retornar con sendSuccess()
    else{
      return sendSuccess(res, usuario, "usuarios obtenido correctamente")
    }
    return sendError(res, 'Endpoint no implementado', 501);
  } catch (error) {
    return sendError(res, 'Error al obtener usuario', 500);
  }
};

/**
 * PATCH /usuarios/:id
 * Actualiza un usuario existente
 */
const actualizarUsuario = async (req, res) => {
  try {
    // TODO: Paso 1 - Validar los datos con updateUsuarioSchema
    const validacion = updateUsuarioSchema.validate(req.body)
    // TODO: Paso 2 - Obtener el ID de req.params
    const obtenerId = req.params.id
    // TODO: Paso 3 - Llamar al servicio actualizarUsuario(id, value)
    const resultado = await usuarioService.actualizarUsuario(obtenerId, validacion.value);

    // TODO: Paso 4 - Si retorna null, enviar error 404

    if(!actualizarUsuario){
      return sendError(res, "usuario no encontrado", 404)
    }
    // TODO: Paso 5 - Si todo está bien, responder con sendSuccess()
    else{
      return sendSuccess(res, actualizarUsuario, "usuario actualizado correctamente")
    }
   
    return sendError(res, 'Endpoint no implementado', 501);
  } catch (error) {
    return sendError(res, 'Error al actualizar usuario', 500);
  }
};
/*
 * DELETE /usuarios/:id
 * Elimina un usuario
 */
const eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    // TODO: Paso 1 - Llamar al servicio eliminarUsuario(id)
     
    const eliminar = await usuarioService.eliminarUsuario(id)
    // TODO: Paso 2 - Si retorna false, enviar error 404

    if(!eliminar){
      return sendError(res, "usaruio no entonctrado", 404)
    }
    // TODO: Paso 3 - Responder con sendSuccess()

    else{
      return sendSuccess(res, "usuario eliminado correctamente")
    }
    return sendError(res, 'Endpoint no implementado', 501);
  } catch (error) {
    return sendError(res, 'Error al eliminar usuario', 500);
  }
};

module.exports = {
  crearUsuario,
  obtenerTodosLosUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario
};
