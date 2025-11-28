// index.js
function login() {
  const usuario = document.getElementById("usuario").value;
  const senha = document.getElementById("senha").value;

  if (usuario.trim() === "" || senha.trim() === "") {
    alert("Preencha usuário e senha.");
  } else {
    alert("Login aceito.");
  }
}