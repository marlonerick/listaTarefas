import { BadgeCheck, BadgePlus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import axios from "axios";

export default function Dashboard() {
  const [tarefas, setTarefas] = useState([]);
  const [novatarefa, setNovaTarefa] = useState("");

  async function getTarefas() {
    await fetch("http://localhost:3000/tarefas")
      .then((data) => data.json())
      .then((data) => setTarefas(data));
  }

  useEffect(() => {
    getTarefas();
  }, []);

  function handleNovaTarefa() {
    if (!novatarefa) {
      return alert("Digite uma nova tarefa !");
    } else {
      const data = {
        tarefa: novatarefa,
        complete: false,
        id: uuid,
      };
      axios.post("http://localhost:3000/tarefas", data);
    }
  }

  async function completedTask(tarefa) {
    const result = window.confirm(
      `Tem certeza que deseja excluir a tarefa ${tarefa.tarefa}?`
    );
    console.log(!result);
    if (result) {
      await axios
        .delete(`http://localhost:3000/tarefas/${tarefa.id}`)
        .then((resp) => console.log(resp))
        .catch((error) => console.log(error));

      getTarefas();
    }
  }

  return (
    <>
      <div className="top-5 flex h-[40rem] w-[30rem] flex-col items-center rounded-xl border-[1px] border-blue-500 bg-[#00337C] text-white">
        <div className="m-7 flex w-full flex-col items-center justify-center">
          <h1 className="text text-3xl font-bold tracking-wide">
            LISTA DE TAREFAS
          </h1>
          <form onSubmit={handleNovaTarefa}>
            <div className=" flex items-center justify-center">
              <input
                placeholder="Digite uma nova tarefa"
                className="m-2 w-64 rounded-xl p-2 text-center text-black outline-none"
                onChange={(e) => setNovaTarefa(e.target.value)}
              />
              <button className="rounded-xl bg-green-500 p-2 outline-none">
                <BadgePlus />
              </button>
            </div>
          </form>
        </div>
        <div className="w-full overflow-auto scrollbar-none">
          <ol className="mx-12 ">
            {tarefas.map((tarefa) => (
              <li
                key={tarefa.id}
                className="m-2 flex w-full justify-between rounded-2xl border-2 border-cyan-500 bg-cyan-700 p-3"
              >
                {tarefa.tarefa}
                <button
                  className="outline-none"
                  onClick={() => completedTask(tarefa)}
                >
                  <BadgeCheck size={28} color="#11C511" />
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
}
