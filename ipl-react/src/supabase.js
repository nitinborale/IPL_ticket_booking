
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bsfupxndtrrnqjpwylae.supabase.co';

const supabaseKey = 'sb_publishable_-8X0Etjw2HQv3cCod-Fadg_6MPu82Pe';

export const supabase = createClient(
    supabaseUrl,
    supabaseKey
);
