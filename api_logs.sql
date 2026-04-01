-- Ejecutar en el SQL Editor de Supabase
CREATE TABLE IF NOT EXISTS api_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    api_key_id UUID REFERENCES user_api_keys(id),
    endpoint TEXT NOT NULL,
    method TEXT NOT NULL,
    status_code INT,
    user_email TEXT,
    ip_address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Indices para búsqueda rápida por desarrolladores
CREATE INDEX IF NOT EXISTS idx_api_logs_key ON api_logs(api_key_id);
CREATE INDEX IF NOT EXISTS idx_api_logs_email ON api_logs(user_email);
