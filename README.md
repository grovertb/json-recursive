json-recursive
============
[![GitHub Stars](https://img.shields.io/github/stars/grovertb/json-recursive.svg)](https://github.com/grovertb/json-recursive/stargazers) 
[![GitHub Issues](https://img.shields.io/github/issues/grovertb/json-recursive.svg)](https://github.com/grovertb/json-recursive/issues) 
[![Current Version](https://img.shields.io/github/release/grovertb/json-recursive.svg)](https://github.com/grovertb/json-recursive) 

```javascript
var collection = [
    {
      "nombre": "Villareal",
      "numero": 1,
      "carreras": [
        {
          "nombre": "Fisico",
          "rating": 4.3,
          "cursos": [
            {
              "nombre": "cuantica",
              "id": 1
            },
            {
              "nombre": "algebra",
              "id": 2
            }
          ]
        },
        {
          "nombre": "Matematica",
          "rating": 4,
          "cursos": [
            {
              "nombre": "algebra",
              "id": 2
            },
            {
              "nombre": "Aritmetica",
              "id": 3
            }
          ]
        }
      ]
    },
    {
      "nombre": "San Marcos",
      "numero": 2,
      "carreras": [
        {
          "nombre": "Medicina",
          "rating": 9.6,
          "cursos": [
            {
              "nombre": "Quimica",
              "id": 4
            },
            {
              "nombre": "Biologia",
              "id": 5
            }
          ]
        },
        {
          "nombre": "Metalurgia",
          "rating": 5,
          "cursos": [
            {
              "nombre": "quimica",
              "id": 4
            },
            {
              "nombre": "Fisica",
              "id": 5
            }
          ]
        }
      ]
    }
  ]
```

## Functions

```javascript
var jr = require('json-recursive');
```

## findAll
```javascript
jr.findAll(collection, { 'carreras.cursos.nombre': 'cuantica'})
```
## updateAll
```javascript
jr.updateAll(collection, {'carreras.cursos.nombre': 'cuantica'}, {'nombre': 'mecanica'})
```
## pushAll
```javascript
jr.pushAll(collection,{'carreras.cursos.nombre': 'quimica'}, {'nombre': 'javascript', 'id': 6})
```
## removeAll
```javascript
jr.removeAll(collection, {'carreras.cursos.nombre': 'algebra'})
```
