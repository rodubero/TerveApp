let config = {};

if (Deno.env.get('DATABASE_URL')) {
  config.database = Deno.env.get('DATABASE_URL');
} else {
  config.database = {};
}

export { config }; 


/*
    hostname: "hattie.db.elephantsql.com",
    database: "hawrridp",
    user: "hawrridp",
    password: "ZlDLkkNtdrLsjLB5HzGjm3ORyz8WndoR",
    port: 5432
*/

