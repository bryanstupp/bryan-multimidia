const listaUsuarios = document.getElementById("listaUsuarios")
const nomeInput = document.getElementById("nome")
const sobrenomeInput = document.getElementById("sobrenome")
const tipoUsuario = document.getElementById("tipoUsuario")

let usuariosDB = JSON.parse(localStorage.getItem("usuariosDB")) || []
let editando = null

function renderUsuarios() {
  listaUsuarios.innerHTML = ""

  usuariosDB.forEach((u, i) => {
    listaUsuarios.innerHTML += `
      <tr>
        <td>${u.nome}</td>
        <td>${u.sobrenome}</td>
        <td>${u.tipo}</td>
        <td>
          <button onclick="editarUsuario(${i})">Editar</button>
          <button onclick="excluirUsuario(${i})">Excluir</button>
        </td>
      </tr>
    `
  })
}

function salvarUsuario() {
  const usuario = {
    nome: nomeInput.value,
    sobrenome: sobrenomeInput.value,
    tipo: tipoUsuario.value
  }

  if (!usuario.nome || !usuario.sobrenome) {
    alert("Preencha tudo")
    return
  }

  if (editando === null) {
    usuariosDB.push(usuario)
  } else {
    usuariosDB[editando] = usuario
    editando = null
  }

  localStorage.setItem("usuariosDB", JSON.stringify(usuariosDB))
  limparCampos()
  renderUsuarios()
}

function editarUsuario(i) {
  const u = usuariosDB[i]
  nomeInput.value = u.nome
  sobrenomeInput.value = u.sobrenome
  tipoUsuario.value = u.tipo
  editando = i
}

function login(e) {
  e.preventDefault()

  const usuario = document.getElementById("usuario").value
  const senha = document.getElementById("senha").value

  fetch("http://localhost:1880/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ usuario, senha })
  })
  .then(resposta => resposta.json())
  .then(dados => {
    window.location.href = "bancada/bancada.html"
    // NÃO faz nada se não for sucesso
  })
}


function cancelarEdicao() {
  limparCampos()
  editando = null
}

function limparCampos() {
  nomeInput.value = ""
  sobrenomeInput.value = ""
}

renderUsuarios()
