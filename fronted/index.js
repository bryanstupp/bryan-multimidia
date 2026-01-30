// LOGIN
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


