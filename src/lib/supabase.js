import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bqpxuncmbrfdwdgagfls.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxcHh1bmNtYnJmZHdkZ2FnZmxzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyNTU3NDEsImV4cCI6MjA2OTgzMTc0MX0.j0dx9JZ27uToa75ROVfwCbEPiJpAnv7TJJNEi8KyL7c';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);