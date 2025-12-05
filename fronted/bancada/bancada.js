document.addEventListener("DOMContentLoaded", () => {

    console.log("JS carregado");

    // ================= BOTÃO SAIR =================
    const btnSair = document.querySelector(".btn-sair");
    if (btnSair) {
        btnSair.addEventListener("click", () => {
            window.location.href = "../index.html";
        });
    }


    // ================= TELAS =================
    const dashboard = document.getElementById("dashboard");
    const usuarios = document.getElementById("usuarios");
    const pedidos = document.getElementById("pedidos");

    dashboard.style.display = "grid";
    usuarios.style.display = "none";
    pedidos.style.display = "none";


    // ================= FUNÇÕES DO MENU =================
    window.mostrarDashboard = function () {
        dashboard.style.display = "grid";
        usuarios.style.display = "none";
        pedidos.style.display = "none";
    };

    window.mostrarUsuarios = function () {
        dashboard.style.display = "none";
        usuarios.style.display = "block";
        pedidos.style.display = "none";
    };

    window.mostrarPedidos = function () {
        dashboard.style.display = "none";
        usuarios.style.display = "none";
        pedidos.style.display = "block";
    };


    // ================= CADASTRO DE USUÁRIOS =================
    window.cadastrarUsuario = function () {

        const nome = document.getElementById('nome').value.trim();
        const sobrenome = document.getElementById('sobrenome').value.trim();
        const nascimento = document.getElementById('nascimento').value.trim();
        const email = document.getElementById('email').value.trim();
        const senha = document.getElementById('senha').value.trim();

        if (!nome || !sobrenome || !nascimento || !email || !senha) {
            alert("Preencha todos os campos!");
            return;
        }

        const tabela = document.getElementById("listaUsuarios");

        const linha = document.createElement("tr");
        linha.innerHTML = `
            <td>${nome}</td>
            <td>${sobrenome}</td>
            <td>${nascimento}</td>
            <td>${email}</td>
        `;

        tabela.appendChild(linha);

        // limpa campos
        document.getElementById('nome').value = "";
        document.getElementById('sobrenome').value = "";
        document.getElementById('nascimento').value = "";
        document.getElementById('email').value = "";
        document.getElementById('senha').value = "";
    };

});
