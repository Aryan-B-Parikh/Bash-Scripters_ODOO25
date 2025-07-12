import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hzzrvyleufrnqgnfypcf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6enJ2eWxldWZybnFnbmZ5cGNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzMTQ3MTgsImV4cCI6MjA2Nzg5MDcxOH0.r4p11ZUGMxpAP3e0jvBy155-vyk8_gDKI0dvi_qBA4Y';

export const supabase = createClient(supabaseUrl, supabaseKey); 