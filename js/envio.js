document.addEventListener('DOMContentLoaded', function(){});

// Máscara CPF: 000.000.000-00
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

// Padrão ESTRUTURAL (não valida dígitos verificadores)
const cpfPattern = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

(function initValidacoes(){
  // form da página de envio
  const form = document.querySelector('.form-notificacao');

  // CPF
  const inputCPF = document.getElementById('cpf');
  const errorCPF = document.getElementById('cpf-error');

  // Máscara enquanto digita
  inputCPF.addEventListener('input', () => {
    inputCPF.value = aplicarMascaraCPF(inputCPF.value);
    limparEstado(inputCPF, errorCPF);
  });

  // Validação no blur
  inputCPF.addEventListener('blur', () => {
    validarEstrutura(inputCPF, errorCPF, cpfPattern, 'Formato de CPF inválido. Use 000.000.000-00.');
  });

  // Validação no envio
  form.addEventListener('submit', (e) => {
    const cpfOK = validarEstrutura(inputCPF, errorCPF, cpfPattern, 'Formato de CPF inválido. Use 000.000.000-00.');

    if (!cpfOK) {
      e.preventDefault();
      alert('Verifique o CPF antes de enviar.');
      inputCPF.focus();
    }
  });

  // ===== Funções auxiliares no mesmo estilo do seu base =====
  function validarEstrutura(campo, msgEl, pattern, msg) {
    const valor = campo.value.trim();
    if (valor === '') { 
      marcarInvalido(campo, msgEl, 'Preencha o CPF no formato 000.000.000-00.');
      return false; 
    }
    if (!pattern.test(valor)) {
      marcarInvalido(campo, msgEl, msg);
      return false;
    }
    marcarValido(campo, msgEl);
    return true;
  }

  function marcarValido(el, msgEl) {
    el.classList.add('is-valid');
    el.classList.remove('is-invalid');
    msgEl.textContent = '';
  }

  function marcarInvalido(el, msgEl, texto) {
    el.classList.add('is-invalid');
    el.classList.remove('is-valid');
    msgEl.textContent = texto;
  }

  function limparEstado(el, msgEl) {
    el.classList.remove('is-valid', 'is-invalid');
    msgEl.textContent = '';
  }
})();