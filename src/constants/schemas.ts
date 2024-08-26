export const schemaMunicipios =
  `CREATE TABLE IF NOT EXISTS municipios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  cod_departamento INTEGER NOT NULL,
  nom_departamento TEXT NOT NULL,
  cod_municipio INTEGER NOT NULL UNIQUE,
  nom_municipio TEXT NOT NULL
);`

export const schemaSendFilesHistory =
  `CREATE TABLE IF NOT EXISTS send_files_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  id_file TEXT,
  id_user_file TEXT,
  id_user_send TEXT,
  json_data TEXT,
  date TEXT
);`

export const schemaVisitas =
  `CREATE TABLE IF NOT EXISTS visitas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  id_form TEXT,
  formato TEXT,
  json_data TEXT,
  sql_deleted BOOLEAN DEFAULT 0 CHECK (sql_deleted IN (0, 1)),
  last_modified INTEGER DEFAULT (strftime('%s', 'now'))
);`

export const insertMunicipios =
  `INSERT INTO municipios (cod_departamento, nom_departamento, cod_municipio, nom_municipio) VALUES
(76, 'Valle del Cauca', 76250, 'El Dovio'),
(76, 'Valle del Cauca', 76622, 'Roldanillo'),
(76, 'Valle del Cauca', 76054, 'Argelia'),
(76, 'Valle del Cauca', 76736, 'Sevilla'),
(76, 'Valle del Cauca', 76895, 'Zarzal'),
(76, 'Valle del Cauca', 76248, 'El Cerrito'),
(76, 'Valle del Cauca', 76147, 'Cartago'),
(76, 'Valle del Cauca', 76122, 'Caicedonia'),
(76, 'Valle del Cauca', 76246, 'El Cairo'),
(76, 'Valle del Cauca', 76400, 'La Unión'),
(76, 'Valle del Cauca', 76606, 'Restrepo'),
(76, 'Valle del Cauca', 76233, 'Dagua'),
(76, 'Valle del Cauca', 76318, 'Guacarí'),
(76, 'Valle del Cauca', 76041, 'Ansermanuevo'),
(76, 'Valle del Cauca', 76113, 'Bugalagrande'),
(76, 'Valle del Cauca', 76403, 'La Victoria'),
(76, 'Valle del Cauca', 76306, 'Ginebra'),
(76, 'Valle del Cauca', 76892, 'Yumbo'),
(76, 'Valle del Cauca', 76497, 'Obando'),
(76, 'Valle del Cauca', 76100, 'Bolívar'),
(76, 'Valle del Cauca', 76001, 'Cali'),
(76, 'Valle del Cauca', 76670, 'San Pedro'),
(76, 'Valle del Cauca', 76111, 'Guadalajara de Buga'),
(76, 'Valle del Cauca', 76126, 'Calima'),
(76, 'Valle del Cauca', 76036, 'Andalucía'),
(76, 'Valle del Cauca', 76563, 'Pradera'),
(76, 'Valle del Cauca', 76890, 'Yotoco'),
(76, 'Valle del Cauca', 76520, 'Palmira'),
(76, 'Valle del Cauca', 76616, 'Riofrío'),
(76, 'Valle del Cauca', 76020, 'Alcalá'),
(76, 'Valle del Cauca', 76863, 'Versalles'),
(76, 'Valle del Cauca', 76243, 'El Águila'),
(76, 'Valle del Cauca', 76823, 'Toro'),
(76, 'Valle del Cauca', 76130, 'Candelaria'),
(76, 'Valle del Cauca', 76377, 'La Cumbre'),
(76, 'Valle del Cauca', 76845, 'Ulloa'),
(76, 'Valle del Cauca', 76828, 'Trujillo'),
(76, 'Valle del Cauca', 76869, 'Vijes'),
(76, 'Valle del Cauca', 76834, 'Tuluá'),
(76, 'Valle del Cauca', 76275, 'Florida'),
(76, 'Valle del Cauca', 76364, 'Jamundí'),
(76, 'Valle del Cauca', 76109, 'Buenaventura');`

export const schemaEstablecimientos =
  `CREATE TABLE IF NOT EXISTS establecimientos (
  id INTEGER PRIMARY KEY NOT NULL,
  dane_municipio TEXT NOT NULL,
  doc_establecimiento TEXT NOT NULL,
  nom_establecimiento TEXT NOT NULL,
  direccion TEXT,
  sql_deleted BOOLEAN DEFAULT 0 CHECK (sql_deleted IN (0, 1)),
  last_modified INTEGER DEFAULT (strftime('%s', 'now'))
);`

export const insertEstablecimientos = `INSERT INTO establecimientos (dane_municipio, doc_establecimiento, nom_establecimiento, direccion) VALUES
('76147', '987654321', 'Tienda La Esperanza', 'Calle 1 #12-34'),
('76147', '987654321', 'Tienda La Esperanza segunda', 'Carrera 2 #23-45'),
('76147', '987654323', 'Papelería El Estudiante', 'Avenida 3 #34-56'),
('76147', '987654324', 'Ferretería El Constructor', 'Calle 4 #45-67'),
('76497', '987654325', 'Restaurante Sabor Latino', 'Carrera 5 #56-78'),
('76497', '987654326', 'Panadería Dulce Hogar', 'Avenida 6 #67-89'),
('76497', '987654327', 'Farmacia Salud y Vida', 'Calle 7 #78-90'),
('76497', '987654328', 'Librería Mundo de Libros', 'Carrera 8 #89-01'),
('76001', '987654329', 'Boutique Moda Joven', 'Avenida 9 #90-12'),
('76001', '987654329', 'Boutique Moda Joven', 'Calle 10 #101-23'),
('76001', '987654331', 'Centro Médico Vida Sana', 'Carrera 11 #112-34'),
('76001', '987654332', 'Gimnasio Fuerza Total', 'Avenida 12 #123-45'),
('76834', '987654329', 'Boutique Moda Joven', 'Calle 13 #134-56'),
('76834', '987654334', 'Estación de Servicio La Ruta', 'Carrera 14 #145-67'),
('76834', '987654335', 'Carnicería El Sabor de Campo', 'Avenida 15 #156-78'),
('76834', '987654336', 'Floristería Arte Floral', 'Calle 16 #167-89'),
('76834', '987654337', 'Tienda de Tecnología TecnoMundo', 'Carrera 17 #178-90'),
('76109', '987654338', 'Joyería El Brillante', 'Avenida 18 #189-01'),
('76109', '987654339', 'Estética y Spa Belleza Total', 'Calle 19 #190-12'),
('76109', '987654340', 'Restaurante Mariscos del Mar', 'Carrera 20 #201-23'),
('76109', '987654341', 'Cafetería Aroma y Sabor', 'Avenida 21 #212-34'),
('76109', '987654342', 'Consultorio Odontológico Sonrisa Perfecta', 'Calle 22 #223-45'),
('76364', '987654343', 'Tienda de Ropa Fashion Style', 'Carrera 23 #234-56'),
('76364', '987654344', 'Centro de Copiado Rápido', 'Avenida 24 #245-67'),
('76364', '987654345', 'Parqueadero Seguro Park', 'Calle 25 #256-78'),
('76364', '987654346', 'Hotel Descanso Pleno', 'Carrera 26 #267-89'),
('76364', '987654347', 'Agencia de Viajes Mundo Turístico', 'Avenida 27 #278-90'),
('76020', '987654348', 'Clínica Veterinaria Animal Care', 'Calle 28 #289-01'),
('76020', '987654349', 'Lavandería Clean & Fresh', 'Carrera 29 #290-12'),
('76020', '987654350', 'Salón de Belleza Estilo Chic', 'Avenida 30 #301-23'),
('76020', '987654351', 'Pastelería Delicias al Horno', 'Calle 31 #312-34'),
('76020', '987654352', 'Centro de Estudios Académico', 'Carrera 32 #323-45'),
('76020', '987654353', 'Agropecuaria El Campo', 'Avenida 33 #334-56'),
('76895', '987654354', 'Oficina de Correos Express', 'Calle 34 #345-67'),
('76895', '987654355', 'Electrónica y Hogar TecnoPlus', 'Carrera 35 #356-78'),
('76895', '987654356', 'Bazar El Ahorro', 'Avenida 36 #367-89'),
('76041', '987654357', 'Tienda de Deportes Fit & Fun', 'Calle 37 #378-90'),
('76041', '987654358', 'Centro Automotriz AutoPlus', 'Carrera 38 #389-01'),
('76041', '987654359', 'Zapatería Pasos Felices', 'Avenida 39 #390-12'),
('76113', '987654360', 'Óptica Visión Clara', 'Calle 40 #401-23'),
('76041', '987654361', 'Jardín Infantil Pequeños Gigantes', 'Carrera 41 #412-34'),
('76113', '987654362', 'Escuela de Música Melodía', 'Avenida 42 #423-45'),
('76113', '987654363', 'Tienda de Juguetes Mundo Mágico', 'Calle 43 #434-56'),
('76113', '987654364', 'Academia de Baile Ritmo y Sabor', 'Carrera 44 #445-67'),
('76113', '987654365', 'Estudio Fotográfico Sonríe', 'Avenida 45 #456-78'),
('76823', '987654366', 'Clínica de Fisioterapia Rehabilita', 'Calle 46 #467-89'),
('76823', '987654367', 'Centro de Yoga y Meditación Paz Interior', 'Carrera 47 #478-90'),
('76823', '987654368', 'Estación de Radio Voz Alegre', 'Avenida 48 #489-01'),
('76823', '987654369', 'Tienda de Instrumentos Musicales Melodías', 'Calle 49 #490-12'),
('76823', '987654370', 'Escuela de Idiomas Multilingüe', 'Carrera 50 #501-23');`

export const resetEstablecimientos = [
  `DELETE FROM establecimientos;`,
  `DELETE FROM sqlite_sequence WHERE name='establecimientos';`
]
/**
 * Este trigger se encarga de actualizar el campo last_modified de la tabla establecimientos
 * cada vez que se actualice la base de datos
 * ya que la base de datos SQlite no lo hace automáticamente
 */
export const triggerEstablecimientos =
  `CREATE TRIGGER IF NOT EXISTS establecimientos_trigger_last_modified AFTER UPDATE ON establecimientos FOR EACH ROW WHEN NEW.last_modified < OLD.last_modified BEGIN UPDATE establecimientos SET last_modified = (strftime('%s', 'now')) WHERE id = OLD.id; END;`
