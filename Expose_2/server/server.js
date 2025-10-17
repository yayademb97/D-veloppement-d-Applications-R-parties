import express from "express";
import cors from "cors";
import { add, substract, multiply, division } from "./methods/math.js";

const app = express();
const PORT = 5000; // ton frontend appelle le port 5000 !

app.use(cors());
app.use(express.json());

const methods = { add, substract, multiply, division };

app.post("/rpc", (req, res) => {
  const { method, params } = req.body;

  if (methods[method]) {
    const result = methods[method](...params);
    res.json({ result });
  } else {
    res.status(404).json({ error: "Method not found" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
