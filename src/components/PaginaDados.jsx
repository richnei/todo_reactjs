import { useEffect, useState } from "react";

export default function PaginaDados() {
  const [tarefas, setTarefas] = useState([]);

function removerDoServidor(id) {
  fetch(`http://localhost:3001/tasks/${id}`, { method: "DELETE" })
    .then(() => {
      setTarefas(tarefas.filter(t => t.id !== id));
    })
    .catch(err => console.error("Erro ao remover:", err));
}

  useEffect(() => {
    fetch("http://localhost:3001/tasks")
      .then(res => res.json())
      .then(data => setTarefas(data))
      .catch(err => console.error("Erro ao buscar API:", err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Tarefas do Servidor JSON</h1>

      {tarefas.length === 0 && <p>Carregando dados...</p>}

      {tarefas.map((t) => (
        <div key={t.id} className="task-card">
        <strong>{t.titulo}</strong><br/>
        Descrição: {t.descricao}<br/>
        Pessoa responsável: {t.pessoa}<br/>
        Tempo: {t.tempo}

        <button
          style={{ marginTop: "8px" }}
          onClick={() => removerDoServidor(t.id)}
        >
          Remover
        </button>
      </div>
      ))}
    </div>
  );
}
