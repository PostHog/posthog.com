import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
    'https://hdgpujzmwdodbzqvnjbl.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzkwMjI4MywiZXhwIjoxOTU5NDc4MjgzfQ.BiIHgofgZx3oMt1G28YroZyGsMSaguPF7FDXMItyl5I'
)
