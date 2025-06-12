import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kxkkbwfnvzkbnlvqfqpv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4a2tid2ZudnprYm5sdnFmcXB2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2Nzk1OTYsImV4cCI6MjA2NTI1NTU5Nn0.oWxlt_AzLqEJP8gyyHeiZ03lQQtapyjyLv8j-47n0oY'; // substitua pela sua chave real

export const supabase = createClient(supabaseUrl, supabaseKey);
