let config = {};

if (Deno.env.get('DATABASE_URL')) {
  config.database = Deno.env.get('DATABASE_URL');
} else {
  config.database = {
    hostname: Deno.env.get('PGHOST'),
    database: Deno.env.get('PGDATABASE'),
    user: Deno.env.get('PGUSER'),
    password: Deno.env.get('PGPASSWORD'),
    port: Deno.env.get('PGPORT')
  };
}

export { config }; 


