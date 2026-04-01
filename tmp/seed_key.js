const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// Basic .env parser
const env = fs.readFileSync('.env', 'utf8').split('\n').reduce((acc, line) => {
    const [key, value] = line.split('=');
    if (key && value) acc[key.trim()] = value.trim();
    return acc;
}, {});

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function seed() {
    const { data: perfiles } = await supabase.from('perfiles').select('correo').limit(1);
    const email = perfiles?.[0]?.correo || 'test@example.com';
    
    const rawKey = 'ta_live_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    
    const { error } = await supabase.from('user_api_keys').insert([{
        user_email: email,
        key_name: 'Master Test Key',
        key_prefix: rawKey.substring(0, 12) + '...',
        key_hash: rawKey,
        is_active: true
    }]);

    if (error) {
        console.error('Error seeding key:', error.message);
        process.exit(1);
    } else {
        console.log('✅ API KEY GENERADA Y GUARDADA:');
        console.log(rawKey);
    }
}

seed();
