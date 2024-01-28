//Usuarios activos con más de 500 puntos
db.usuarios.find({"activo":true, "puntos":{$gte:500}},{nombre:1,activo:1, puntos:1});

//Usuarios que han comprado el producto "Producto 1" en la última semana.
db.usuarios.aggregate([{ $unwind: "$historial_compras" }, { $match: { "historial_compras.producto": "Producto 1", "historial_compras.fecha": { $gte: new Date(new Date().setDate(new Date().getDate() - 7)) } } }, { $group: { _id: "$_id", nombre: { $first: "$nombre" }, comprasRecientes: { $push: "$historial_compras" } } }]);

//Usuarios con la etiqueta "tag2" y que tienen más de 100 visitas.
db.usuarios.find({ "tags": "tag2", "visitas": { $gte: 100 }}, {nombre:1, tags:1, visitas:1 })

//Usuarios con preferencias de color "azul" y que tienen entre 1000 y 2000 amigos.
db.usuarios.aggregate([ { $project: { nombre: 1, preferencias: 1, cantidadAmigos: { $size: "$amigos" } } }, { $match: { "preferencias.color": "Blue", "cantidadAmigos": { $gte: 1000, $lte: 2000 } } }] );


//CONSULTAS 

//Usuarios activos con más de 500 puntos 
db.usuarios.find({"activo":true, "puntos":{$gte:500}},{nombre:1,activo:1, puntos:1}).explain('executionStats');

//Usuarios que han comprado el producto "Producto 1" en la última semana.
db.usuarios.aggregate([{ $unwind: "$historial_compras" }, { $match: { "historial_compras.producto": "Producto 1", "historial_compras.fecha": { $gte: new Date(new Date().setDate(new Date().getDate() - 7)) } } }, { $group: { _id: "$_id", nombre: { $first: "$nombre" }, comprasRecientes: { $push: "$historial_compras" } } }]).explain('executionStats');

//Usuarios con la etiqueta "tag2" y que tienen más de 100 visitas.
db.usuarios.find({ "tags": "tag2", "visitas": { $gte: 100 }}, {nombre:1, tags:1, visitas:1 }).explain('executionStats');

//Usuarios con preferencias de color "azul" y que tienen entre 1000 y 2000 amigos.
db.usuarios.aggregate([ { $project: { nombre: 1, preferencias: 1, cantidadAmigos: { $size: "$amigos" } } }, { $match: { "preferencias.color": "Blue", "cantidadAmigos": { $gte: 1000, $lte: 2000 } } }] ).explain('executionStats');