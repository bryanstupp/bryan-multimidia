// ================= NAVEGAÇÃO ENTRE TELAS =================
function mostrarDashboard() {
    document.getElementById("dashboard").style.display = "grid";
    document.getElementById("usuarios").style.display = "none";
    document.getElementById("pedidos").style.display = "none";
}

function mostrarUsuarios() {
    document.getElementById("dashboard").style.display = "none";
    document.getElementById("usuarios").style.display = "flex";
    document.getElementById("pedidos").style.display = "none";
}

function mostrarPedidos() {
    document.getElementById("dashboard").style.display = "none";
    document.getElementById("usuarios").style.display = "none";
    document.getElementById("pedidos").style.display = "block";
}

// Botão sair
document.querySelector(".btn-sair").onclick = () => location.href="../index.html";

// ================= ESTOQUE =================
const cores = ['preto', 'azul', 'vermelho'];
let bases = Array.from({length: 28}, () => cores[Math.floor(Math.random()*3)]);

function mostrarBases() {
    const container = document.getElementById("listaBases");
    container.innerHTML = "";
    bases.forEach(c => {
        container.innerHTML += `<div class="base ${c}"></div>`;
    });
    document.getElementById("basesLivres").textContent = bases.filter(b => b !== 'ocupado').length;
}

function ocuparAleatorio() {
    const livres = bases.map((b,i)=>b!=='ocupado'?i:-1).filter(i=>i!==-1);
    if (livres.length === 0) { alert("Todas ocupadas!"); return; }
    bases[livres[Math.floor(Math.random()*livres.length)]] = 'ocupado';
    mostrarBases();
}

function resetarBases() {
    bases = Array.from({length: 28}, () => cores[Math.floor(Math.random()*3)]);
    mostrarBases();
}

mostrarBases();

// ================= USUÁRIOS =================
let listaUsuarios = [], editando = null;

function atualizarTabelaUsuarios() {
    const tabela = document.getElementById("listaUsuarios");
    tabela.innerHTML = "";
    listaUsuarios.forEach((u,i)=>{
        tabela.innerHTML += `
        <tr>
            <td>${u.nome}</td>
            <td>${u.sobrenome}</td>
            <td>${u.tipo}</td>
            <td>
                <button onclick="editarUsuario(${i})">Editar</button>
                <button onclick="excluirUsuario(${i})" style="background:red;color:white;">Excluir</button>
            </td>
        </tr>`;
    });
}

function cadastrarUsuario() {
    const nome = document.getElementById("nome").value.trim();
    const sobrenome = document.getElementById("sobrenome").value.trim();
    const tipo = document.getElementById("tipoUsuario").value;

    if (!nome || !sobrenome) { alert("Preencha todos os campos"); return; }

    const user = {nome, sobrenome, tipo};

    if (editando !== null) {
        listaUsuarios[editando] = user;
        editando = null;
    } else {
        listaUsuarios.push(user);
    }

    document.getElementById("nome").value = "";
    document.getElementById("sobrenome").value = "";

    atualizarTabelaUsuarios();
}

function editarUsuario(i) {
    const u = listaUsuarios[i];
    document.getElementById("nome").value = u.nome;
    document.getElementById("sobrenome").value = u.sobrenome;
    document.getElementById("tipoUsuario").value = u.tipo;
    editando = i;
}

function excluirUsuario(i) {
    if (confirm("Excluir usuário?")) {
        listaUsuarios.splice(i,1);
        atualizarTabelaUsuarios();
    }
}

// ================= PEDIDOS =================
let listaPedidos = [];

function atualizarTabelaPedidos() {
    const tabela = document.getElementById("listaPedidos");
    tabela.innerHTML = "";
    listaPedidos.forEach((p,i)=>{
        tabela.innerHTML += `
        <tr>
            <td>${p.cliente}</td>
            <td>${p.base}</td>
            <td>${p.status}</td>
            <td>${p.paredeA}-${p.paredeB}-${p.paredeC}</td>
            <td>
                <button onclick="editarPedido(${i})">Editar</button>
                <button onclick="excluirPedido(${i})" style="background:red;color:white;">Excluir</button>
            </td>
        </tr>`;
    });
}

function criarPedido() {
    const cliente = document.getElementById("pedidoCliente").value.trim();
    const base = document.getElementById("pedidoBase").value;
    const paredeA = document.getElementById("paredeA").value;
    const paredeB = document.getElementById("paredeB").value;
    const paredeC = document.getElementById("paredeC").value;
    const status = document.getElementById("pedidoStatus").value;

    if (!cliente) { alert("Preencha o cliente"); return; }

    listaPedidos.push({cliente, base, paredeA, paredeB, paredeC, status});

    document.getElementById("pedidoCliente").value = "";
    document.getElementById("paredeA").value = "";
    document.getElementById("paredeB").value = "";
    document.getElementById("paredeC").value = "";

    atualizarTabelaPedidos();
}

function editarPedido(i) {
    const p = listaPedidos[i];
    document.getElementById("pedidoCliente").value = p.cliente;
    document.getElementById("pedidoBase").value = p.base;
    document.getElementById("paredeA").value = p.paredeA;
    document.getElementById("paredeB").value = p.paredeB;
    document.getElementById("paredeC").value = p.paredeC;
    document.getElementById("pedidoStatus").value = p.status;
    listaPedidos.splice(i,1);
}

function excluirPedido(i) {
    if(confirm("Excluir pedido?")) {
        listaPedidos.splice(i,1);
        atualizarTabelaPedidos();
    }
}
