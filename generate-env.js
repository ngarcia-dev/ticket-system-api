import fs from "fs";

const envVariables = {
  DATABASE_URL:
    '"postgresql://postgres:password@127.0.0.1:5432/prisma-tickets?schema=public"',
};

const envContent = Object.entries(envVariables)
  .map(([key, value]) => `${key}=${value}`)
  .join("\n");

const envFilePath = ".env";

fs.writeFileSync(envFilePath, envContent);

console.log(`Archivo ${envFilePath} generado con éxito.`);
