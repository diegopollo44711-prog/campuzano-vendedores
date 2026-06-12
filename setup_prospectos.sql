-- Tabla para el CRM de prospectos (plataforma de vendedores)
CREATE TABLE IF NOT EXISTS prospectos (
  id TEXT PRIMARY KEY,
  nombre TEXT NOT NULL DEFAULT '',
  empresa TEXT DEFAULT '',
  telefono TEXT DEFAULT '',
  email TEXT DEFAULT '',
  etapa TEXT DEFAULT 'lead',
  valor_estimado NUMERIC DEFAULT NULL,
  notas TEXT DEFAULT '',
  vendedor TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE prospectos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_access_prospectos"
  ON prospectos FOR ALL
  USING (true) WITH CHECK (true);
