// ================= ELEMENTOS =================
const dashboard = document.getElementById("dashboard");
const usuarios  = document.getElementById("usuarios");
const pedidos   = document.getElementById("pedidos");

const listaBases   = document.getElementById("listaBases");
const basesLivres  = document.getElementById("basesLivres");

const listaUsuarios = document.getElementById("listaUsuarios");
const nomeInput = document.getElementById("nome");
const sobrenomeInput = document.getElementById("sobrenome");
const tipoUsuario = document.getElementById("tipoUsuario");

const listaPedidos = document.getElementById("listaPedidos");
const pedidoCliente = document.getElementById("pedidoCliente");
const pedidoBase = document.getElementById("pedidoBase");
const pedidoStatus = document.getElementById("pedidoStatus");

document.querySelector(".btn-sair").onclick = () =>
  location.href = "../index.html";

// ================= NAVEGAÇÃO =================
function esconderTudo() {
  dashboard.style.display = "none";
  usuarios.style.display = "none";
  pedidos.style.display = "none";
}

function mostrarDashboard() {
  esconderTudo();
  dashboard.style.display = "block";
}

function mostrarUsuarios() {
  esconderTudo();
  usuarios.style.display = "block";
}

function mostrarPedidos() {
  esconderTudo();
  pedidos.style.display = "block";
}

mostrarDashboard();

// ================= ESTOQUE =================
const cores = ["azul","preto","vermelho"];
let bases = Array.from({ length: 28 }, () =>
  cores[Math.floor(Math.random() * 3)]
);

function mostrarBases() {
  listaBases.innerHTML = "";
  bases.forEach(b => {
    listaBases.innerHTML += `<div class="base ${b}"></div>`;
  });
  basesLivres.textContent = bases.filter(b => b !== "ocupado").length;
}

function ocuparAleatorio() {
  const livres = bases
    .map((b,i)=> b !== "ocupado" ? i : null)
    .filter(i => i !== null);

  if (!livres.length) return alert("Todas ocupadas");

  bases[livres[Math.floor(Math.random()*livres.length)]] = "ocupado";
  mostrarBases();
}

function resetarBases() {
  bases = Array.from({ length: 28 }, () =>
    cores[Math.floor(Math.random() * 3)]
  );
  mostrarBases();
}

mostrarBases();

// ================= USUÁRIOS =================
let usuariosDB = JSON.parse(localStorage.getItem("usuariosDB")) || [];

const userLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
if (userLogado) {
  const jaExiste = usuariosDB.some(
    u => u.nome === userLogado.nome && u.sobrenome === userLogado.sobrenome
  );
  if (!jaExiste) {
    usuariosDB.push(userLogado);
    localStorage.setItem("usuariosDB", JSON.stringify(usuariosDB));
  }
}

let editando = null;

function renderUsuarios() {
  listaUsuarios.innerHTML = "";
  usuariosDB.forEach((u,i) => {
    listaUsuarios.innerHTML += `
      <tr>
        <td>${u.nome}</td>
        <td>${u.sobrenome}</td>
        <td>${u.tipo}</td>
        <td>
          <button onclick="editarUsuario(${i})">Editar</button>
          <button onclick="excluirUsuario(${i})">Excluir</button>
        </td>
      </tr>`;
  });
}

function cadastrarUsuario() {
  const nome = nomeInput.value.trim();
  const sobrenome = sobrenomeInput.value.trim();
  const tipo = tipoUsuario.value;

  if (!nome || !sobrenome) return alert("Preencha tudo");

  const user = { nome, sobrenome, tipo };

  if (editando !== null) {
    usuariosDB[editando] = user;
    editando = null;
  } else {
    usuariosDB.push(user);
  }

  localStorage.setItem("usuariosDB", JSON.stringify(usuariosDB));
  limparUsuario();
  renderUsuarios();
}

function editarUsuario(i) {
  const u = usuariosDB[i];
  nomeInput.value = u.nome;
  sobrenomeInput.value = u.sobrenome;
  tipoUsuario.value = u.tipo;
  editando = i;
}

function excluirUsuario(i) {
  usuariosDB.splice(i, 1);
  localStorage.setItem("usuariosDB", JSON.stringify(usuariosDB));
  renderUsuarios();
}

function cancelarEdicao() {
  limparUsuario();
  editando = null;
}

function limparUsuario() {
  nomeInput.value = "";
  sobrenomeInput.value = "";
}

renderUsuarios();

// ================= PEDIDOS =================
let pedidosDB = [];

function renderPedidos() {
  listaPedidos.innerHTML = "";
  pedidosDB.forEach((p,i) => {
    listaPedidos.innerHTML += `
      <tr>
        <td>${p.cliente}</td>
        <td>${p.base}</td>
        <td>${p.status}</td>
        <td>
          <button>Editar</button>
          <button onclick="excluirPedido(${i})">Excluir</button>
        </td>
      </tr>`;
  });
}

function criarPedido() {
  const cliente = pedidoCliente.value.trim();
  if (!cliente) return alert("Cliente vazio");

  pedidosDB.push({
    cliente,
    base: pedidoBase.value,
    status: pedidoStatus.value
  });

  pedidoCliente.value = "";
  renderPedidos();
}

function excluirPedido(i) {
  pedidosDB.splice(i, 1);
  renderPedidos();
}
