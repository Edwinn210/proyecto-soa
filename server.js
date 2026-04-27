import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

// 🔹 Simulación de servicios internos
const consultarHCE = async (id) => {
  return {
    id,
    nombre: "Maria Rodriguez",
    edad: 35
  };
};

const consultarEPS = async (id) => {
  return {
    eps: "Sanitas",
    estado: "Activo"
  };
};

const consultarCitas = async () => {
  return [
    { fecha: "2026-05-01", especialidad: "Cardiología" }
  ];
};

// 🔹 API Gateway
app.get("/api/pacientes/:id", async (req, res) => {
  const { id } = req.params;

  const paciente = await consultarHCE(id);
  const eps = await consultarEPS(id);
  const citas = await consultarCitas(id);

  res.json({
    paciente,
    eps,
    citas
  });
});

const port = Number.parseInt(process.env.PORT ?? "3000", 10);
app.listen(port, "0.0.0.0", () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});
