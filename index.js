var _ = require('lodash');

var recursive = function(type, update, array, where, value, cb, count, envio) {
  where = where.split('.')
  count ? count++ : count = 1
  if (_.compact(where).length > 1) {
    var state = where.shift()
    _.forEach(array, function(document) {
      if (document[ state ] && count === 1) {
        recursive(type, update, document[ state ], where.join('.'), value, cb, count, document)
      } else {
        recursive(type, update, document[ state ], where.join('.'), value, cb, count, envio)
      }
    })
  } else {
    var json = {}
    json[ where.join() ] = value
    if (type === 'UPDATE') {
      if ((!update)) {
        _.forEach(array, function (document) {
          _.assign(document, json)
        })
        cb(array)
      } else {
        _.forEach(_.filter(array, json), function (val) {
          _.assign(val, update)
        })
        cb(envio)
      }
    } else if (type === 'FIND') {
      var dato = _.filter(array, json)
      if (dato.length > 0) {
        cb(dato)
      }
    } else if (type === 'PUSH') {
      if ((!update)) {
        if (typeof value === 'object' && _.keys(value).length > 0) {
          _.forEach(array, function (document) {
            document[ where.join() ].push(value)
          })
        } else {
          _.forEach(array, function (document) {
            _.merge(document, json)
          })
        }
      } else {
        if (_.filter(array, json).length > 0) {
          array.push(update)
        }
      }
      cb(array)
    } else if (type === 'REMOVE') {
      var lista = []
      _.forEach(_.filter(array, json), function (val) {
        _.remove(array, val)
        lista.push(val)
      })
      cb(lista)
    } else if (type === 'WHERE') {
      if (_.filter(array, json).length > 0) {
        count === 1 ? cb(dato) : cb(envio)
      }
    }
  }
}
var removeAll = function(array, remove) {
  var list = []
  _.forIn(remove, function(value, key) {
    recursive('REMOVE', null, array, key, value, function(dato) {
      if (!(Object.prototype.toString.call(dato) === '[object Array]')) {
        list.push(dato)
      } else {
        _.forEach(dato, function(value) {
          list.push(value)
        })
      }
    })
    array = list
    list = []
  })
  var val = {},
      listFinal = []
  _.forEach(array, function(document) {
    if (!_.isEqual(val, document)) {
      val = document
      listFinal.push(document)
    }
  })
  array = listFinal
  return array
}
var findAll = function(array, where) {
  var list = []
  _.forIn(where, function(value, key) {
    recursive('FIND', null, array, key, value, function(dato) {
      if (!(Object.prototype.toString.call(dato) === '[object Array]')) {
        list.push(dato)
      } else {
        _.forEach(dato, function (value) {
          list.push(value)
        })
      }
    })
    array = list
    list = []
  })
  var val = {},
      listFinal = []
  _.forEach(array, function(document) {
    if (!_.isEqual(val, document)) {
      val = document
      listFinal.push(document)
    }
  })
  array = listFinal
  return array
}
var updateAll =  function(array, update, where) {
  _.forIn(update, function(value, key) {
    recursive('UPDATE', where, array, key, value, function(dato) {})
  })
  return array
}
var pushAll = function(array, where, push) {
  var list = []
  _.forIn(where, function(value, key) {
    recursive('PUSH', push, array, key, value, function(dato) {
      if (!(Object.prototype.toString.call(dato) === '[object Array]')) {
        list.push(dato)
      } else {
        _.forEach(dato, function (value) {
          list.push(value)
        })
      }
    })
    array = list
    list = []
  })
  var val = {},
      listFinal = []
  _.forEach(array, function(document) {
    if (!_.isEqual(val, document)) {
      val = document
      listFinal.push(document)
    }
  })
  array = listFinal
  return array
}
module.exports = {
  findAll: findAll,
  pushAll: pushAll,
  updateAll: updateAll,
  removeAll: removeAll
}
