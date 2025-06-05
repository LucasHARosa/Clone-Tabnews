const { exec } = require("node:child_process");

function checkPotgres() {
  exec("docker exec postgres-dev pg_isready --host localhost", handleReturn);
  function handleReturn(error, stdout) {
    if (stdout.search("accepting connections") === -1) {
      process.stdout.write(".");
      checkPotgres();
      return;
    }

    console.log("\nPronto para receber conexões\n");
  }
}

process.stdout.write("\n\nAguardando Postgres aceitar conexões");
checkPotgres();
