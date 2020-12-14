let config = {};

if (Deno.env.get('TEST_ENVIRONMENT')) {
  config.database = {
    hostname: "hattie.db.elephantsql.com",
    database: "hawrridp",
    user: "hawrridp",
    password: "ZlDLkkNtdrLsjLB5HzGjm3ORyz8WndoR",
    port: 5432
  };
} else {
  config.database = {
    hostname: Deno.env.toObject().HOSTNAME,
    database: Deno.env.toObject().DATABASE,
    user: Deno.env.toObject().USER,
    password: Deno.env.toObject().PASSWORD,
    port: Deno.env.toObject().PORT
  };
}

/*
    hostname: "hattie.db.elephantsql.com",
    database: "hawrridp",
    user: "hawrridp",
    password: "ZlDLkkNtdrLsjLB5HzGjm3ORyz8WndoR",
    port: 5432
*/

export { config }; 