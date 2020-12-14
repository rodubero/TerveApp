let config = {};

if (Deno.env.get('DATABASE_URL')) {
  config.database = Deno.env.get('DATABASE_URL');
} else {
  config.database = {
    //Credentials still here because I could not set it up properly for environmental variables in windows environment

    hostname: "hattie.db.elephantsql.com",
    database: "hawrridp",
    user: "hawrridp",
    password: "ZlDLkkNtdrLsjLB5HzGjm3ORyz8WndoR",
    port: 5432

  };
}

export { config }; 


