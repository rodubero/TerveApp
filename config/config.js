let config = {};

if (Deno.env.get('TEST_ENVIRONMENT')) {
  config.database = {};
} else {
  config.database = {
    hostname: "hattie.db.elephantsql.com",
    database: "hawrridp",
    user: "hawrridp",
    password: "ZlDLkkNtdrLsjLB5HzGjm3ORyz8WndoR",
    port: 5432
  };
}

export { config }; 