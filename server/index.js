const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const os = require("os");
const { exec } = require("child_process");

const app = express();
const PORT = 5000;

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Hello, World" });
});

app.post("/run", (req, res) => {
  const { code } = req.body;

  console.log(code);
  // Cria um arquivo temporário no diretório do sistema
  const tempFilePath = path.join(os.tmpdir(), `tempCode-${Date.now()}.txt`);

  // Escreve o código no arquivo temporário
  fs.writeFile(tempFilePath, code, (err) => {
    if (err) {
      return res
        .status(500)
        .send({ output: `Erro ao criar arquivo temporário: ${err.message}` });
    }

    // Executa o comando passando o caminho do arquivo temporário
    exec(
      `/home/thomruby/Documentos/minipar_exe/minipar ${tempFilePath}`,
      (error, stdout, stderr) => {
        // Apaga o arquivo temporário após a execução
        fs.unlink(tempFilePath, (unlinkErr) => {
          if (unlinkErr) {
            console.error(
              `Erro ao deletar arquivo temporário: ${unlinkErr.message}`,
            );
          }
        });

        if (error) {
          return res.status(500).send({ output: `Erro: ${error.message}` });
        }
        if (stderr) {
          return res.status(400).send({ output: `Stderr: ${stderr}` });
        }
        res.send({ output: stdout });
      },
    );
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
