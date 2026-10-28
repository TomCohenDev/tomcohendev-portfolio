-- Inquiries submitted from the /automation landing page form.
-- Holds only what the visitor typed in. IP addresses are not stored.
CREATE TABLE IF NOT EXISTS automation_leads (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  full_name TEXT NOT NULL,
  business TEXT,
  contact TEXT NOT NULL,
  process TEXT NOT NULL,
  tools TEXT,
  frequency TEXT,
  consent INTEGER NOT NULL DEFAULT 0,
  page TEXT,
  email_notified INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'new'
);

CREATE INDEX IF NOT EXISTS idx_automation_leads_created_at
  ON automation_leads (created_at);
