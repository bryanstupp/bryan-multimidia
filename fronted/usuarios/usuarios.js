// ==================== Seleção de elementos ====================
const listaUsuarios = document.getElementById("listaUsuarios");
const nomeInput = document.getElementById("nome");
const sobrenomeInput = document.getElementById("sobrenome");
const dtNascimentoInput = document.getElementById("dt_nascimento");
const tipoUsuario = document.getElementById("tipoUsuario");
const emailInput = document.getElementById("email");
const senhaInput = document.getElementById("senha");
const usuarioInput = document.getElementById("usuario");

let usuariosDB = [];
let editando = null;

// ==================== Renderização ====================
function renderUsuarios() {
  listaUsuarios.innerHTML = "";

  usuariosDB.forEach((u) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${u.nome}</td>
      <td>${u.sobrenome}</td>
      <td>${u.tipo}</td>
      <td></td>
    `;
    console.log(u);

    const tdAcoes = tr.querySelector("td:last-child");

    const btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";
    btnEditar.addEventListener("click", () => editarUsuario(u.id));

    const btnExcluir = document.createElement("button");
    btnExcluir.textContent = "Excluir";
    btnExcluir.addEventListener("click", () => {
      excluirUsuario(u.id);
    });

    tdAcoes.appendChild(btnEditar);
    tdAcoes.appendChild(btnExcluir);

    listaUsuarios.appendChild(tr);
  });
}

// ==================== Fetch GET para listar usuários ====================
function carregarUsuarios() {
  fetch("http://localhost:1880/listarusuarios")
    .then(res => res.json())
    .then(data => {
      console.log("Usuários recebidos:", data);
      usuariosDB = data.map(u => ({
        id: u.id,
        nome: u.nome,
        sobrenome: u.sobrenome,
        data_nascimento: u.data_nascimento,
        tipo: u.tipo_usuario === "P" ? "Professor" : "Aluno",
        email: u.email,
        senha: u.senha,
        usuario: u.usuario || ""
      }));
      renderUsuarios();
    })
    .catch(err => console.error("Erro ao buscar usuários:", err));
}

// ==================== Salvar usuário ====================
function salvarUsuario() {
  if (!dtNascimentoInput.value) {
    alert("Preencha a data de nascimento!");
    return;
  }

  const usuario = {
    id: editando !== null ? usuariosDB[editando].id : undefined, // mantém id se estiver editando
    nome: nomeInput.value,
    sobrenome: sobrenomeInput.value,
    data_nascimento: dtNascimentoInput.value,
    tipo: tipoUsuario.value === "professor" ? "P" : "A",
    email: emailInput.value,
    senha: senhaInput.value,
    usuario: usuarioInput ? usuarioInput.value : (nomeInput.value + sobrenomeInput.value).toLowerCase()
  };

  console.log(editando !== null ? "Atualizando usuário:" : "Enviando novo usuário:", usuario);

  const url = editando !== null ? "http://localhost:1880/editar/usuario" : "http://localhost:1880/cadastrar/usuario";

  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuario)
  })
    .then(res => res.json())
    .then(data => {
      console.log("Node-RED respondeu:", data);

      if (editando !== null) {
        usuariosDB[editando] = usuario;
        editando = null;
      } else {
        if (data.id) usuario.id = data.id; // pega id retornado do Node-RED
        usuariosDB.push(usuario);
      }

      limparCampos();
      renderUsuarios();
    })
    .catch(err => console.error("Erro no fetch:", err));
}

// ==================== Editar ====================
function editarUsuario(id) {
  const index = usuariosDB.findIndex(u => u.id === id);
  if (index === -1) return;

  const u = usuariosDB[index];

  nomeInput.value = u.nome;
  sobrenomeInput.value = u.sobrenome;
  dtNascimentoInput.value = u.data_nascimento;
  tipoUsuario.value = u.tipo === "P" ? "professor" : "aluno";
  emailInput.value = u.email;
  senhaInput.value = u.senha;
  if (usuarioInput) usuarioInput.value = u.usuario;

  editando = index;
}

// ==================== Excluir ====================
function excluirUsuario(id) {
  const index = usuariosDB.findIndex(u => u.id === id);
  if (index === -1) return;

  const usuarioRemovido = usuariosDB[index];

  usuariosDB.splice(index, 1);
  renderUsuarios();

  console.log("Excluindo usuário e enviando para Node-RED:", usuarioRemovido);

  fetch("http://localhost:1880/excluir/usuario", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ usuario: usuarioRemovido.usuario }) // envia o campo esperado pelo Node-RED
  })
    .then(res => res.json())
    .then(data => console.log("Node-RED respondeu:", data))
    .catch(err => console.error("Erro ao enviar para Node-RED:", err));
}

// ==================== Cancelar / Limpar ====================
function cancelarEdicao() {
  limparCampos();
  editando = null;
}

function limparCampos() {
  nomeInput.value = "";
  sobrenomeInput.value = "";
  dtNascimentoInput.value = "";
  tipoUsuario.value = "aluno";
  emailInput.value = "";
  senhaInput.value = "";
  if (usuarioInput) usuarioInput.value = "";
}

// ==================== Inicialização ====================
carregarUsuarios();