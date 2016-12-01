module.exports.worldToLocalDirection = ( object, worldDirectionVector, localDirectionVector ) => {
  object.updateMatrixWorld()
  localDirectionVector.copy( worldDirectionVector ).applyQuaternion( object.getWorldQuaternion().inverse() )
  return localDirectionVector
}
