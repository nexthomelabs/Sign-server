/*
  # Create document tables

  1. New Tables
    - `documents`
      - `id` (uuid, primary key)
      - `name` (text)
      - `url` (text)
      - `created_at` (timestamp with time zone)
      - `user_id` (uuid, references auth.users)
      - `status` (text)
      - `expires_at` (timestamp with time zone)
    - `signers`
      - `id` (uuid, primary key)
      - `document_id` (uuid, references documents)
      - `name` (text)
      - `email` (text)
      - `status` (text)
      - `signed_at` (timestamp with time zone)
    - `audit_trail`
      - `id` (uuid, primary key)
      - `document_id` (uuid, references documents)
      - `signer_id` (uuid, references signers)
      - `action` (text)
      - `ip_address` (text)
      - `timestamp` (timestamp with time zone)
  2. Security
    - Enable RLS on all tables
    - Add policies for document owners and signers
*/

-- Create documents table
CREATE TABLE IF NOT EXISTS documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  url text,
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  status text DEFAULT 'draft',
  expires_at timestamptz,
  note text,
  description text,
  is_template boolean DEFAULT false,
  is_completed boolean DEFAULT false,
  is_declined boolean DEFAULT false,
  is_archived boolean DEFAULT false,
  send_in_order boolean DEFAULT false,
  automatic_reminders boolean DEFAULT false,
  reminder_frequency integer DEFAULT 5,
  time_to_complete_days integer DEFAULT 15,
  is_enable_otp boolean DEFAULT false,
  is_tour_enabled boolean DEFAULT false,
  notify_on_signatures boolean DEFAULT true,
  allow_modifications boolean DEFAULT false,
  redirect_url text,
  folder_id uuid REFERENCES documents(id)
);

-- Create signers table
CREATE TABLE IF NOT EXISTS signers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id uuid REFERENCES documents(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  status text DEFAULT 'pending',
  signed_at timestamptz,
  role text,
  order_index integer,
  user_id uuid REFERENCES auth.users(id)
);

-- Create audit_trail table
CREATE TABLE IF NOT EXISTS audit_trail (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id uuid REFERENCES documents(id) ON DELETE CASCADE,
  signer_id uuid REFERENCES signers(id) ON DELETE SET NULL,
  action text NOT NULL,
  ip_address text,
  timestamp timestamptz DEFAULT now(),
  signature_url text,
  details jsonb
);

-- Create placeholders table
CREATE TABLE IF NOT EXISTS placeholders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id uuid REFERENCES documents(id) ON DELETE CASCADE,
  signer_id uuid REFERENCES signers(id) ON DELETE CASCADE,
  page_number integer NOT NULL,
  x_position float NOT NULL,
  y_position float NOT NULL,
  width float,
  height float,
  type text NOT NULL,
  value text,
  options jsonb,
  is_signed boolean DEFAULT false,
  sign_url text,
  created_at timestamptz DEFAULT now()
);

-- Create templates table
CREATE TABLE IF NOT EXISTS templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  url text,
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  note text,
  description text,
  is_public boolean DEFAULT false,
  send_in_order boolean DEFAULT false,
  automatic_reminders boolean DEFAULT false,
  reminder_frequency integer DEFAULT 5,
  time_to_complete_days integer DEFAULT 15,
  is_enable_otp boolean DEFAULT false,
  is_tour_enabled boolean DEFAULT false,
  notify_on_signatures boolean DEFAULT true,
  allow_modifications boolean DEFAULT false,
  redirect_url text,
  folder_id uuid REFERENCES templates(id)
);

-- Create contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  created_at timestamptz DEFAULT now(),
  is_deleted boolean DEFAULT false
);

-- Create signatures table
CREATE TABLE IF NOT EXISTS signatures (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  signature_name text,
  image_url text,
  initials text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE signers ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_trail ENABLE ROW LEVEL SECURITY;
ALTER TABLE placeholders ENABLE ROW LEVEL SECURITY;
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE signatures ENABLE ROW LEVEL SECURITY;

-- Create policies for documents
CREATE POLICY "Users can view their own documents"
  ON documents
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create documents"
  ON documents
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own documents"
  ON documents
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete their own documents"
  ON documents
  FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- Create policies for signers
CREATE POLICY "Document owners can view signers"
  ON signers
  FOR SELECT
  TO authenticated
  USING (
    document_id IN (
      SELECT id FROM documents WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Document owners can create signers"
  ON signers
  FOR INSERT
  TO authenticated
  WITH CHECK (
    document_id IN (
      SELECT id FROM documents WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Document owners can update signers"
  ON signers
  FOR UPDATE
  TO authenticated
  USING (
    document_id IN (
      SELECT id FROM documents WHERE user_id = auth.uid()
    )
  );

-- Create policies for audit_trail
CREATE POLICY "Document owners can view audit trail"
  ON audit_trail
  FOR SELECT
  TO authenticated
  USING (
    document_id IN (
      SELECT id FROM documents WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Document owners can create audit trail entries"
  ON audit_trail
  FOR INSERT
  TO authenticated
  WITH CHECK (
    document_id IN (
      SELECT id FROM documents WHERE user_id = auth.uid()
    )
  );

-- Create policies for placeholders
CREATE POLICY "Document owners can view placeholders"
  ON placeholders
  FOR SELECT
  TO authenticated
  USING (
    document_id IN (
      SELECT id FROM documents WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Document owners can create placeholders"
  ON placeholders
  FOR INSERT
  TO authenticated
  WITH CHECK (
    document_id IN (
      SELECT id FROM documents WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Document owners can update placeholders"
  ON placeholders
  FOR UPDATE
  TO authenticated
  USING (
    document_id IN (
      SELECT id FROM documents WHERE user_id = auth.uid()
    )
  );

-- Create policies for templates
CREATE POLICY "Users can view their own templates"
  ON templates
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid() OR is_public = true);

CREATE POLICY "Users can create templates"
  ON templates
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own templates"
  ON templates
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete their own templates"
  ON templates
  FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- Create policies for contacts
CREATE POLICY "Users can view their own contacts"
  ON contacts
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create contacts"
  ON contacts
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own contacts"
  ON contacts
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete their own contacts"
  ON contacts
  FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- Create policies for signatures
CREATE POLICY "Users can view their own signatures"
  ON signatures
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create signatures"
  ON signatures
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own signatures"
  ON signatures
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete their own signatures"
  ON signatures
  FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS documents_user_id_idx ON documents(user_id);
CREATE INDEX IF NOT EXISTS documents_status_idx ON documents(status);
CREATE INDEX IF NOT EXISTS signers_document_id_idx ON signers(document_id);
CREATE INDEX IF NOT EXISTS signers_email_idx ON signers(email);
CREATE INDEX IF NOT EXISTS audit_trail_document_id_idx ON audit_trail(document_id);
CREATE INDEX IF NOT EXISTS placeholders_document_id_idx ON placeholders(document_id);
CREATE INDEX IF NOT EXISTS placeholders_signer_id_idx ON placeholders(signer_id);
CREATE INDEX IF NOT EXISTS templates_user_id_idx ON templates(user_id);
CREATE INDEX IF NOT EXISTS contacts_user_id_idx ON contacts(user_id);
CREATE INDEX IF NOT EXISTS contacts_email_idx ON contacts(email);
CREATE INDEX IF NOT EXISTS signatures_user_id_idx ON signatures(user_id);