-- Function to get a document with its signers
CREATE OR REPLACE FUNCTION get_document_with_signers(document_id UUID)
RETURNS TABLE (
  id UUID,
  name TEXT,
  url TEXT,
  status TEXT,
  created_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  is_completed BOOLEAN,
  is_declined BOOLEAN,
  signers JSON
) 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    d.id,
    d.name,
    d.url,
    d.status,
    d.created_at,
    d.expires_at,
    d.is_completed,
    d.is_declined,
    COALESCE(
      (SELECT json_agg(
        json_build_object(
          'id', s.id,
          'name', s.name,
          'email', s.email,
          'status', s.status,
          'signed_at', s.signed_at
        )
      ) FROM signers s WHERE s.document_id = d.id),
      '[]'::json
    ) AS signers
  FROM documents d
  WHERE d.id = document_id
  AND (d.user_id = auth.uid() OR EXISTS (
    SELECT 1 FROM signers s 
    WHERE s.document_id = d.id 
    AND s.user_id = auth.uid()
  ));
END;
$$;

-- Function to get a document's audit trail
CREATE OR REPLACE FUNCTION get_document_audit_trail(document_id UUID)
RETURNS TABLE (
  id UUID,
  action TEXT,
  signer_name TEXT,
  signer_email TEXT,
  ip_address TEXT,
  event_time TIMESTAMPTZ,
  details JSONB
) 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    a.id,
    a.action,
    s.name AS signer_name,
    s.email AS signer_email,
    a.ip_address,
    a.event_time,
    a.details
  FROM audit_trail a
  LEFT JOIN signers s ON a.signer_id = s.id
  WHERE a.document_id = document_id
  AND EXISTS (
    SELECT 1 FROM documents d 
    WHERE d.id = document_id 
    AND (d.user_id = auth.uid() OR EXISTS (
      SELECT 1 FROM signers s 
      WHERE s.document_id = d.id 
      AND s.user_id = auth.uid()
    ))
  )
  ORDER BY a.event_time;
END;
$$;

-- Function to create a new document from a template
CREATE OR REPLACE FUNCTION create_document_from_template(
  template_id UUID,
  document_name TEXT DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_document_id UUID;
  template_record RECORD;
  placeholder_record RECORD;
BEGIN
  -- Get template details
  SELECT * INTO template_record FROM templates WHERE id = template_id AND (user_id = auth.uid() OR is_public = true);
  
  IF template_record IS NULL THEN
    RAISE EXCEPTION 'Template not found or you do not have permission to use it';
  END IF;
  
  -- Create new document
  INSERT INTO documents (
    name,
    url,
    user_id,
    note,
    description,
    send_in_order,
    automatic_reminders,
    reminder_frequency,
    time_to_complete_days,
    is_enable_otp,
    is_tour_enabled,
    notify_on_signatures,
    allow_modifications,
    redirect_url,
    expires_at
  )
  VALUES (
    COALESCE(document_name, template_record.name),
    template_record.url,
    auth.uid(),
    template_record.note,
    template_record.description,
    template_record.send_in_order,
    template_record.automatic_reminders,
    template_record.reminder_frequency,
    template_record.time_to_complete_days,
    template_record.is_enable_otp,
    template_record.is_tour_enabled,
    template_record.notify_on_signatures,
    template_record.allow_modifications,
    template_record.redirect_url,
    (CURRENT_TIMESTAMP + (template_record.time_to_complete_days || ' days')::INTERVAL)
  )
  RETURNING id INTO new_document_id;
  
  -- Copy placeholders from template
  FOR placeholder_record IN 
    SELECT * FROM placeholders WHERE document_id = template_id
  LOOP
    INSERT INTO placeholders (
      document_id,
      page_number,
      x_position,
      y_position,
      width,
      height,
      type,
      options
    )
    VALUES (
      new_document_id,
      placeholder_record.page_number,
      placeholder_record.x_position,
      placeholder_record.y_position,
      placeholder_record.width,
      placeholder_record.height,
      placeholder_record.type,
      placeholder_record.options
    );
  END LOOP;
  
  RETURN new_document_id;
END;
$$;