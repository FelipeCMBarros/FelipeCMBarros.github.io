document.addEventListener('DOMContentLoaded', function () {

  const form = document.getElementById('loginForm');
  const nome = document.getElementById('nome');
  const cpf = document.getElementById('cpf');
  const senha = document.getElementById('senha');
  const cpfError = document.getElementById('cpf-error');

  const cpfPattern = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

  // ---------- MÁSCARA DE CPF ----------
  function aplicarMascaraCPF(valor) {
    const digitos = valor.replace(/\D/g, '').slice(0, 11);
    const partes = [];
    if (digitos.length > 0) partes.push(digitos.substring(0, 3));
    if (digitos.length > 3) partes.push(digitos.substring(3, 6));
    if (digitos.length > 6) partes.push(digitos.substring(6, 9));
    let formatado = partes.join('.');
    if (digitos.length > 9) formatado += '-' + digitos.substring(9, 11);
    return formatado;
  }

  cpf.addEventListener('input', () => {
    const antes = cpf.value;
    const pos = cpf.selectionStart;
    cpf.value = aplicarMascaraCPF(cpf.value);
    const delta = cpf.value.length - antes.length;
    const novo = Math.max(0, (pos || 0) + (delta > 0 ? delta : 0));
    cpf.setSelectionRange(novo, novo);
  });

  // ---------- VALIDAÇÃO ----------
  function validarCampos() {
    let valido = true;
    cpfError.textContent = '';

    if (nome.value.trim() === '') {
      alert('Preencha o campo Nome.');
      valido = false;
    }

    if (!cpfPattern.test(cpf.value)) {
      cpfError.textContent = 'Formato de CPF inválido. Use 000.000.000-00.';
      valido = false;
    }

    if (senha.value.trim() === '') {
      alert('Preencha o campo Senha.');
      valido = false;
    }

    return valido;
  }

  // ---------- SUBMISSÃO ----------
  form.addEventListener('submit', function (event) {
    event.preventDefault(); // impede envio padrão

    if (validarCampos()) {
      // ✅ todos os campos corretos → redireciona
      window.location.href = 'menu.html';
    } else {
      // ❌ campos faltando ou inválidos → fica na página
      console.log('Acesso bloqueado: campos inválidos');
    }
  });

});