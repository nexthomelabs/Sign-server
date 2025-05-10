import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://johwixbrrrloijuwtnsh.supabase.co';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpvaHdpeGJycnJsb2lqdXd0bnNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYzMTgwNTUsImV4cCI6MjA2MTg5NDA1NX0.CCT7Dfk58S6vlo-XTaRwjNiYwf6pK1tO2qQogP-xYSk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);