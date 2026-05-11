import { createClient } from '@supabase/supabase-js';

export default defineEventHandler(async () => {
  const supabaseUrl = process.env.SUPABASE_URL || '';
  const supabaseKey = process.env.SUPABASE_KEY || '';
  
  if (!supabaseUrl || !supabaseKey) {
    return [];
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data, error } = await supabase
    .from('donations')
    .select('id, name, amount, created_at, url')
    .eq('status', 'approved')
    .order('created_at', { ascending: false })
    .limit(50);

  if (error) {
    console.error('Supabase Error:', error);
    return [];
  }

  return data || [];
});
