import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nqorlrenpeeezdrnzits.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xb3JscmVucGVlZXpkcm56aXRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIxOTI0MzIsImV4cCI6MjA5Nzc2ODQzMn0.NUQnJzdbO62d5R0-GQiQcTMgu_ZkIdhUnevxgK4dw3o'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
