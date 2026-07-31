import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://gkddsnllqwubtuoulcrh.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_g2bDn-yHyZlFrqujgheO-g_yZ_TSDqV';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const TABLE_NAME = 'linkedout_posts';
