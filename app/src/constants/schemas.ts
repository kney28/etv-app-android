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
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  dane_municipio TEXT NOT NULL,
  doc_establecimiento TEXT NOT NULL,
  nom_establecimiento TEXT NOT NULL,
  direccion TEXT,
  sql_deleted BOOLEAN DEFAULT 0 CHECK (sql_deleted IN (0, 1)),
  last_modified INTEGER DEFAULT (strftime('%s', 'now'))
);`

export const triggerEstablecimientos =
`CREATE TRIGGER IF NOT EXISTS establecimientos_trigger_last_modified AFTER UPDATE ON establecimientos FOR EACH ROW WHEN NEW.last_modified < OLD.last_modified BEGIN UPDATE establecimientos SET last_modified = (strftime('%s', 'now')) WHERE id = OLD.id; END;`