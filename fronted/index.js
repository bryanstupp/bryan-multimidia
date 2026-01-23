function login(e) {
  e.preventDefault()  
  const user = document.getElementById("usuario").value;
    const pass = document.getElementById("senha").value;

    if (user !== "" && pass !== "") {
        window.location.href = "bancada/bancada.html";  
    } else {
        alert("Preencha os dois campos.");
    }
}
function fazerLogin() {
  const nome = document.getElementById("nome").value.trim();
  const sobrenome = document.getElementById("sobrenome").value.trim();
  const email = document.getElementById("email").value.trim();
  const tipo = document.getElementById("tipoUsuario").value;

  if (!nome || !sobrenome || !email) {
    alert("Preencha todos os campos");
    return;
  }

  const usuario = {
    nome,
    sobrenome,
    email,
    tipo
  };

  localStorage.setItem("usuarioLogado", JSON.stringify(usuario));

  location.href = "bancada/bancada.html";
}
