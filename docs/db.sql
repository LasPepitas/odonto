CREATE DATABASE IF NOT EXISTS odonto;
CREATE USER IF NOT EXISTS 'developer'@'%' IDENTIFIED BY '124217';
GRANT ALL PRIVILEGES ON odonto.* TO 'developer'@'%';
FLUSH PRIVILEGES;
-- -----------------------------
-- 1. Tabla de Usuarios
-- -----------------------------
CREATE TABLE IF NOT EXISTS user (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  full_name VARCHAR(255) NOT NULL,
  password_hash TEXT NOT NULL,
  role ENUM('admin', 'receptionist', 'dentist') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------
-- 2. Tabla de Dentistas (vinculados a user)
-- -----------------------------
CREATE TABLE IF NOT EXISTS dentist (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id INT UNSIGNED NOT NULL UNIQUE,
  FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

-- -----------------------------
-- 3. Tabla de Pacientes
-- -----------------------------
CREATE TABLE IF NOT EXISTS patient (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  dni VARCHAR(20) NOT NULL UNIQUE,
  phone VARCHAR(20),
  address TEXT,
  birth_date DATE
);

-- -----------------------------
-- 4. Catálogo de Tratamientos
-- -----------------------------
CREATE TABLE IF NOT EXISTS treatment (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  cost DECIMAL(10,2) NOT NULL
);

-- -----------------------------
-- 5. Citas
-- -----------------------------
CREATE TABLE IF NOT EXISTS appointment (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  patient_id INT UNSIGNED NOT NULL,
  dentist_id INT UNSIGNED NOT NULL,
  treatment_id INT UNSIGNED,  -- puede estar vacío al agendar
  appointment_datetime DATETIME NOT NULL,
  status ENUM('scheduled', 'completed', 'cancelled') NOT NULL,
  FOREIGN KEY (patient_id) REFERENCES patient(id) ON DELETE CASCADE,
  FOREIGN KEY (dentist_id) REFERENCES dentist(id) ON DELETE CASCADE,
  FOREIGN KEY (treatment_id) REFERENCES treatment(id) ON DELETE SET NULL
);

-- -----------------------------
-- 6. Pagos
-- -----------------------------
CREATE TABLE IF NOT EXISTS payment (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  appointment_id INT UNSIGNED NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  payment_date DATE NOT NULL,
  FOREIGN KEY (appointment_id) REFERENCES appointment(id) ON DELETE CASCADE
);

-- -----------------------------
-- 7. Inventario
-- -----------------------------
CREATE TABLE IF NOT EXISTS inventory (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  material_name VARCHAR(255) NOT NULL,
  quantity INT NOT NULL DEFAULT 0,
  unit VARCHAR(20) NOT NULL,
  min_stock INT NOT NULL DEFAULT 0
);
