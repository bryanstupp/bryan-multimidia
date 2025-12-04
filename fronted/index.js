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
