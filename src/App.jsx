import { useState } from "react";
import TaskItem from "./components/TaskItem";
import PaginaDados from "./components/PaginaDados";

import { Routes, Route, Link } from "react-router-dom";

export default function App() {
  const [tasks, setTasks] = useState([]);

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [pessoa, setPessoa] = useState("");
  const [tempo, setTempo] = useState("");

  const [filtroPessoa, setFiltroPessoa] = useState("");
  const [filtroDescricao, setFiltroDescricao] = useState("");

  function adicionarTarefa(e) {
    e.preventDefault();

    const nova = {
      id: Math.random().toString(36).slice(2),
      titulo,
      descricao,
      pessoa,
      tempo
    };

    setTasks([nova, ...tasks]);

    setTitulo("");
    setDescricao("");
    setPessoa("");
    setTempo("");
  }

  function removerTarefa(id) {
    setTasks(tasks.filter((t) => t.id !== id));
  }

  const filtradas = tasks.filter((t) =>
    t.pessoa.toLowerCase().includes(filtroPessoa.toLowerCase()) &&
    t.descricao.toLowerCase().includes(filtroDescricao.toLowerCase())
  );

  return (
  <div className="container">
    <nav style={{ marginBottom: "20px", display: "flex", gap: "12px" }}>
      <Link to="/">Tarefas</Link>
      <Link to="/dados">Dados</Link>
    </nav>

    <Routes>

      <Route
        path="/"
        element={
          <>
            <h1>Aplicativo de Tarefas</h1>

            <form onSubmit={adicionarTarefa}>
              <input placeholder="Título" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
              <input placeholder="Descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
              <input placeholder="Nome da pessoa" value={pessoa} onChange={(e) => setPessoa(e.target.value)} />
              <input placeholder="Tempo gasto (ex: 2h)" value={tempo} onChange={(e) => setTempo(e.target.value)} />
              <button type="submit">Adicionar Tarefa</button>
            </form>

            <div className="filters">
              <h3>Filtros</h3>
              <input placeholder="Filtrar por pessoa" value={filtroPessoa} onChange={(e) => setFiltroPessoa(e.target.value)} />
              <input placeholder="Filtrar por descrição" value={filtroDescricao} onChange={(e) => setFiltroDescricao(e.target.value)} />
            </div>

            <div>
              <h3>Lista de Tarefas</h3>
              {filtradas.map((t) => (
                <TaskItem key={t.id} tarefa={t} onRemover={removerTarefa} />
              ))}
            </div>
          </>
        }
      />
      <Route
        path="/dados"
        element={<PaginaDados />}
      />
    </Routes>
  </div>
);

}
