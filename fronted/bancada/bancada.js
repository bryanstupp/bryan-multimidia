const dashboard = document.getElementById("dashboard")
const pedidos = document.getElementById("pedidos")

document.getElementById("btnSair").onclick = () => {
  location.href = "../index.html"
}

/* NAVEGAÇÃO */
function esconderTudo() {
  dashboard.style.display = "none"
  pedidos.style.display = "none"
}

function mostrarDashboard() {
  esconderTudo()
  dashboard.style.display = "block"
}

function mostrarPedidos() {
  esconderTudo()
  pedidos.style.display = "block"
}

function irParaUsuarios() {
  location.href = "../usuarios/usuarios.html"
}

mostrarDashboard()

/* ESTOQUE */
const cores = ["azul","preto","vermelho"]
let bases = Array.from({ length: 28 }, () =>
  cores[Math.floor(Math.random() * 3)]
)

const listaBases = document.getElementById("listaBases")
const basesLivres = document.getElementById("basesLivres")

function mostrarBases() {
  listaBases.innerHTML = ""
  bases.forEach(b => {
    listaBases.innerHTML += `<div class="base ${b}"></div>`
  })
  basesLivres.textContent = bases.filter(b => b !== "ocupado").length
}

function ocuparAleatorio() {
  const livres = bases
    .map((b,i)=> b !== "ocupado" ? i : null)
    .filter(i => i !== null)

  if (!livres.length) return alert("Todas ocupadas")

  bases[livres[Math.floor(Math.random()*livres.length)]] = "ocupado"
  mostrarBases()
}

function resetarBases() {
  bases = Array.from({ length: 28 }, () =>
    cores[Math.floor(Math.random() * 3)]
  )
  mostrarBases()
}

mostrarBases()

/* PEDIDOS */
let pedidosDB = []
const listaPedidos = document.getElementById("listaPedidos")

function criarPedido() {
  pedidosDB.push({
    cliente: pedidoCliente.value,
    base: pedidoBase.value,
    status: pedidoStatus.value
  })
  pedidoCliente.value = ""
  renderPedidos()
}

function renderPedidos() {
  listaPedidos.innerHTML = ""
  pedidosDB.forEach((p,i) => {
    listaPedidos.innerHTML += `
      <tr>
        <td>${p.cliente}</td>
        <td>${p.base}</td>
        <td>${p.status}</td>
        <td><button onclick="excluirPedido(${i})">Excluir</button></td>
      </tr>
    `
  })
}

function excluirPedido(i) {
  pedidosDB.splice(i, 1)
  renderPedidos()
}
