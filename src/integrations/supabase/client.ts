// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://xgrkgdqowokhyukbhduo.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhncmtnZHFvd29raHl1a2JoZHVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA4NDMwNDUsImV4cCI6MjA2NjQxOTA0NX0.M0dRzWBjQZFl9ofjgFJQ2Q2z9TzkD3lz1mXwdwv3SiE";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);