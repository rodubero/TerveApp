let config = {};

if (Deno.env.get('DATABASE_URL')) {
  config.database = Deno.env.get('DATABASE_URL');
} else {
  config.database = {
    hostname: Deno.env.get('HOSTNAME'),
    database: Deno.env.get('DATABASE'),
    user: Deno.env.get('USER'),
    password: Deno.env.get('PASSWORD'),
    port: Deno.env.get('PORT')
  };
}

export { config }; 


