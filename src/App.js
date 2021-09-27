import React from "react";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [dados, setDados] = useState([""]);

  function handle_sub(event) {
    event.preventDefault();
    const form = event.target;

    const cod_patrimonio = form.cod_patrimonio.value;
    const num_serie = form.num_serie.value;
    const descricao = form.descricao.value;
    const tipo = form.tipo.value;
    const dados_cru = {
      id: new Date().getTime(),
      cod_patrimonio,
      num_serie,
      descricao,
      tipo,
    };
    const novos_dados = [...dados, dados_cru];
    setDados(novos_dados);
    localStorage.setItem("dados", JSON.stringify(novos_dados));
  }

  function loadDados() {
    const carregar = localStorage.getItem("dados");
    setDados(JSON.parse(carregar) || []);
  }

  function handleDelete(id) {
    const novos_dados = dados.filter((dado) => dado.id !== id);
    localStorage.setItem("dados", JSON.stringify(novos_dados));
    setDados(novos_dados);
  }

  useEffect(() => {
    loadDados();
  }, []);

  return (
    <div class="Pagina">
      <h1>Cadastro equipamentos</h1>
      <form onSubmit={handle_sub}>
        <div>
          <label>código do patrimônio:</label>
          <input
            placeholder="Digite"
            type="text"
            name="cod_patrimonio"
            required
          />
        </div>
        <div>
          <label>número de série:</label>
          <input placeholder="Digite" type="text" name="num_serie" required />
        </div>
        <div>
          <label>descrição:</label>
          <input placeholder="Digite" type="text" name="descricao" required />
        </div>
        <div>
          <label>tipo:</label>
          <input placeholder="Digite" type="text" name="tipo" required />
        </div>
        <input placeholder="Digite" type="submit" value="Submit" />
      </form>
      <table>
        <thead>
          <tr>
            <th>Codigo do patrimônio</th>
            <th>Numero de série</th>
            <th>Descrição</th>
            <th>Tipo</th>
            <th colSpan={1}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {dados.map((dado) => (
            <tr key={dado.id}>
              <td>{dado.cod_patrimonio}</td>
              <td>{dado.num_serie}</td>
              <td>{dado.descricao}</td>
              <td>{dado.tipo}</td>
              <td>
                <button
                  className="Delete"
                  onClick={() => handleDelete(dado.id)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
