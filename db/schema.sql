CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL ,
    email TEXT NOT NULL,
    contrasena Text not null
);
CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL UNIQUE,
    precio int not null,
    imagenPrimaria TEXT not null,
    imagenSecundaria Text not null,
    imagenTerciaria Text not null,
    descripcion text not null,
    categoria text not null,
    stock integer not null
  );
