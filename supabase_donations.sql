-- Rode este script no SQL Editor do painel do Supabase

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS donations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  amount NUMERIC(10, 2) NOT NULL,
  status TEXT DEFAULT 'pending',
  payment_id TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Habilitar RLS
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;

-- Política para leitura (todos podem ver as doações aprovadas)
CREATE POLICY "Permitir leitura publica de doacoes aprovadas" 
ON donations FOR SELECT 
USING (status = 'approved');

-- A API do Nuxt insere dados e atualiza o status ignorando RLS,
-- pois ela utiliza a chave secreta no lado do servidor.
