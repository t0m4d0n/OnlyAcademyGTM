import { createClient } from '@supabase/supabase-js';

// Substitua pelos detalhes do seu projeto Supabase
const SUPABASE_URL = 'https://djxgnwkdxwtlrhqxkkcd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqeGdud2tkeHd0bHJocXhra2NkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkzNTcyODgsImV4cCI6MjAzNDkzMzI4OH0.mmHvxB1zvs6kEXw5LsoEJmG3lcKKgZTrNqxpti9a7vA';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;

