import { useState } from "react";
import axios from "axios";

function App() {
  const [result, setResult] = useState(null);

  const callRPC = async (method, params) => {
    try {
      const { data } = await axios.post("http://localhost:5000/rpc", {
        method,
        params,
      });
      setResult(data.result);
      console.log("Résultat de l'appel RPC :", data.result);
    } catch (error) {
      console.error("Erreur RPC :", error);
    }
  };

  return (
    <>
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>🧮 Mini Application RPC (ES6)</h2>

        <button onClick={() => callRPC("add", [5, 3])}>add(5, 3)</button>
        <button onClick={() => callRPC("substract", [10, 4])}>substract(10, 4)</button>
        <button onClick={() => callRPC("multiply", [2, 6])}>multiply(2, 6)</button>
        <button onClick={() => callRPC("division", [8, 2])}>division(8, 2)</button>

        {result !== null && <h3>Résultat : {result}</h3>}
      </div>
    </>
  );
}

export default App;
