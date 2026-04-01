-- Ejecutar en el SQL Editor de Supabase
ALTER TABLE user_api_keys 
ADD COLUMN IF NOT EXISTS usage_count INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_reset_date DATE DEFAULT CURRENT_DATE;

-- También asegurar que vinculamos con perfiles por correo si no existe relación
-- (Opcional, pero recomendado para integridad)
ALTER TABLE user_api_keys
ADD COLUMN IF NOT EXISTS user_email TEXT;
