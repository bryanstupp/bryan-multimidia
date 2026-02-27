/* ============================= */
/* ELEMENTOS PRINCIPAIS */
/* ============================= */

const dashboard = document.getElementById("dashboard");
const pedidos = document.getElementById("pedidos");
const usuarios = document.getElementById("usuarios");

const listaBases = document.getElementById("listaBases");
const basesLivres = document.getElementById("basesLivres");

const listaPedidos = document.getElementById("listaPedidos");
const pedidoCliente = document.getElementById("pedidoCliente");
const pedidoBase = document.getElementById("pedidoBase");
const pedidoStatus = document.getElementById("pedidoStatus");

const listaUsuarios = document.getElementById("listaUsuarios");

document.getElementById("btnSair").onclick = () => {
  location.href = "../index.html";
};

/* ============================= */
/* NAVEGAÇÃO */
/* ============================= */

function esconderTudo() {
  dashboard.style.display = "none";
  pedidos.style.display = "none";
  usuarios.style.display = "none";
}

function mostrarDashboard() {
  esconderTudo();
  dashboard.style.display = "block";
}

function mostrarPedidos() {
  esconderTudo();
  pedidos.style.display = "block";
}

function mostrarUsuarios() {
  esconderTudo();
  usuarios.style.display = "block";
}

mostrarDashboard();

/* ============================= */
/* ESTOQUE */
/* ============================= */

const cores = ["azul", "preto", "vermelho"];

let bases = Array.from({ length: 28 }, () =>
  cores[Math.floor(Math.random() * cores.length)]
);

function mostrarBases() {
  listaBases.innerHTML = "";
  bases.forEach(b => {
    const div = document.createElement("div");
    div.className = "base " + b;
    listaBases.appendChild(div);
  });
  basesLivres.textContent = bases.filter(b => b !== "ocupado").length;
}

function ocuparAleatorio() {
  const livres = bases
    .map((b, i) => b !== "ocupado" ? i : null)
    .filter(i => i !== null);

  if (!livres.length) return alert("Todas ocupadas");

  bases[livres[Math.floor(Math.random() * livres.length)]] = "ocupado";
  mostrarBases();
}

function resetarBases() {
  bases = Array.from({ length: 28 }, () =>
    cores[Math.floor(Math.random() * cores.length)]
  );
  mostrarBases();
}

document.getElementById("btnRandomOccupy")
  .addEventListener("click", ocuparAleatorio);

mostrarBases();

/* ============================= */
/* PEDIDOS */
/* ============================= */

let pedidosDB = [];

document.getElementById("btnCriarPedido")
  .addEventListener("click", criarPedido);

function criarPedido() {
  if (!pedidoCliente.value) return;

  pedidosDB.push({
    cliente: pedidoCliente.value,
    base: pedidoBase.value,
    status: pedidoStatus.value
  });

  pedidoCliente.value = "";
  renderPedidos();
}

function renderPedidos() {
  listaPedidos.innerHTML = "";

  pedidosDB.forEach((p, i) => {
    listaPedidos.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>${p.cliente}</td>
        <td>${p.base}</td>
        <td>${p.status}</td>
        <td>-</td>
        <td><button onclick="excluirPedido(${i})">Excluir</button></td>
      </tr>
    `;
  });
}

function excluirPedido(i) {
  pedidosDB.splice(i, 1);
  renderPedidos();
}

/* ============================= */
/* USUÁRIOS */
/* ============================= */

let usuariosDB = [];
let editIndex = null;

const nome = document.getElementById("nome");
const sobrenome = document.getElementById("sobrenome");
const nascimento = document.getElementById("nascimento");
const email = document.getElementById("email");
const senha = document.getElementById("senha");
const tipoUsuario = document.getElementById("tipoUsuario");
const buscar = document.getElementById("buscar");

document.getElementById("btnCadastrar")
  .addEventListener("click", salvarUsuario);

document.getElementById("btnCancelarEdit")
  .addEventListener("click", limparCampos);

buscar.addEventListener("input", renderUsuarios);

function salvarUsuario() {
  if (!nome.value || !email.value) return;

  const usuario = {
    nome: nome.value,
    sobrenome: sobrenome.value,
    nascimento: nascimento.value,
    email: email.value,
    senha: senha.value,
    tipo: tipoUsuario.value
  };

  if (editIndex === null) {
    usuariosDB.push(usuario);
  } else {
    usuariosDB[editIndex] = usuario;
    editIndex = null;
  }

  limparCampos();
  renderUsuarios();
}

function renderUsuarios() {
  listaUsuarios.innerHTML = "";

  const filtro = buscar.value.toLowerCase();

  usuariosDB
    .filter(u =>
      u.nome.toLowerCase().includes(filtro) ||
      u.email.toLowerCase().includes(filtro)
    )
    .forEach((u, i) => {
      listaUsuarios.innerHTML += `
        <tr>
          <td>${u.nome}</td>
          <td>${u.sobrenome}</td>
          <td>${u.nascimento}</td>
          <td>${u.email}</td>
          <td>${u.tipo}</td>
          <td>
            <button onclick="editarUsuario(${i})">Editar</button>
            <button onclick="excluirUsuario(${i})">Excluir</button>
          </td>
        </tr>
      `;
    });
}

function editarUsuario(i) {
  const u = usuariosDB[i];
  nome.value = u.nome;
  sobrenome.value = u.sobrenome;
  nascimento.value = u.nascimento;
  email.value = u.email;
  senha.value = u.senha;
  tipoUsuario.value = u.tipo;
  editIndex = i;
}

function excluirUsuario(i) {
  usuariosDB.splice(i, 1);
  renderUsuarios();
}

function limparCampos() {
  nome.value = "";
  sobrenome.value = "";
  nascimento.value = "";
  email.value = "";
  senha.value = "";
  tipoUsuario.value = "professor";
  editIndex = null;
}