export default function TaskItem({ tarefa, onRemover }) {
  return (
    <div className="task-card">
      <strong>{tarefa.titulo}</strong><br/>
      Descrição: {tarefa.descricao}<br/>
      Pessoa responsável: {tarefa.pessoa}<br/>
      Tempo: {tarefa.tempo}

      <div className="task-footer">
        <button className="remove-btn" onClick={() => onRemover(tarefa.id)}>
          Remover
        </button>
      </div>
    </div>
  );
}
