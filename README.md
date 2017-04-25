# json-recursive
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
collection.findAll({ 'carreras.cursos.nombre': 'cuantica'})
```

```javascript
collection.chain()
  .findAll('carreras.cursos.nombre': 'cuantica')
  .updateAll({'nombre': 'mecanica'})
  .value()
```

```javascript
collection.chain()
  .pushAll({'carreras.cursos.nombre': 'cuantica'}, {'nombre': 'javascript', 'id': 100})
  .value()

//or
collection.chain()
  .findAll({"carreras.rating": 4.3})
  .pushAll({"cursos": {'nombre': 'javascript', 'id': 100})
  .value()
```

```javascript
collection.chain()
  .removeAll({'carreras.cursos.nombre': 'cuantica'})
  .value()
```
