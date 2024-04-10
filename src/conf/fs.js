import fs from "fs";

const envExample = ".env.example";
const envFile = ".env";

const generarFileEnv = async () => {
  try {
    await fs.promises.copyFile(envExample, envFile);
    console.log("Archivo .env generado correctamente");
  } catch (err) {
    console.error("Error al generar el archivo .env");
  }
};

generarFileEnv();
