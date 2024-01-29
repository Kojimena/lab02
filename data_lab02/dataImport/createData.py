from pymongo import MongoClient
from faker import Faker
import random
import pandas as pd
import numpy as np
from datetime import datetime


cliente = MongoClient('mongodb://localhost:27017/')
db = cliente['laboratorio2']
coleccion = db['usuarios']

faker = Faker()

def generar_usuario():
    historial_compras = [
        {'producto': f'Producto {random.randint(1, 10)}', 'fecha': datetime.combine(faker.date_between(start_date='-2y', end_date='today'), datetime.min.time())}
        for _ in range(random.randint(1, 10)) # cantidad de compras entre 1 y 10
    ]
    direccion = {
        'calle': faker.street_name(), 
        'ciudad': faker.city(), 
        'codigo_postal': faker.postcode()
    }
    tags = ['tag2' if random.random() < 0.5 else f'tag{random.randint(3, 10)}' for _ in range(random.randint(1, 5))]
    preferencias = {
        'color': faker.color_name(),
        'idioma': faker.language_name(),
        'tema': faker.word()
    }

    return {
        'nombre': faker.name(),
        'email': faker.email(),
        'fecha_registro': datetime.combine(faker.date_between(start_date='-5y', end_date='today'),datetime.min.time()),
        'puntos': random.randint(0, 1000),
        'historial_compras': historial_compras,
        'direccion': direccion,
        'tags': tags,
        'activo': faker.boolean(),
        'notas': faker.text(),
        'visitas': random.randint(0, 1000),
        'amigos': [random.randint(0, 10000) for _ in range(random.randint(0, 2000))],
        'preferencias': preferencias
    }

def generar_usuarios(n):
    usuarios = []
    for _ in range(n):
        usuarios.append(generar_usuario())
    return usuarios

def generar_usuarios_df(n):
    usuarios = generar_usuarios(n)
    return pd.DataFrame(usuarios)

#generar_usuarios_df(100).to_csv('usuarios.csv', index=False)

""" datos = pd.read_csv('usuarios.csv')
for col in datos.columns:
    print (col + ': ' + str(datos[col].dtype))
print(datos.head()) """

for _ in range(100000):
    usuario = generar_usuario()
    coleccion.insert_one(usuario)
print('Usuarios insertados')

#para insertar 50.000 usuarios
""" for _ in range(50000):
    usuario = generar_usuario()
    coleccion.insert_one(usuario)
print('Usuarios insertados') """