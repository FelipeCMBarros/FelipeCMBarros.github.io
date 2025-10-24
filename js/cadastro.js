document.addEventListener('DOMContentLoaded', function(){})

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

// Máscara RG: 00.000.000-0
function aplicarMascaraRG(valor) {
  const digitos = valor.replace(/\D/g, '').slice(0, 9);
  const partes = [];
  if (digitos.length > 0) partes.push(digitos.substring(0, 2));
  if (digitos.length > 2) partes.push(digitos.substring(2, 5));
  if (digitos.length > 5) partes.push(digitos.substring(5, 8));
  let formatado = partes.join('.');
  if (digitos.length > 8) formatado += '-' + digitos.substring(8, 9);
  return formatado;
}

// Padrões (somente estrutura)
const cpfPattern = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
const rgPattern  = /^\d{2}\.\d{3}\.\d{3}-\d{1}$/;

(function initValidacoes(){
  const form = document.getElementById('form-cadastro');

  // CPF
  const inputCPF = document.getElementById('cpf');
  const errorCPF = document.getElementById('cpf-error');
  inputCPF.addEventListener('input', () => {
    inputCPF.value = aplicarMascaraCPF(inputCPF.value);
    limparEstado(inputCPF, errorCPF);
  });
  inputCPF.addEventListener('blur', () => validarEstrutura(inputCPF, errorCPF, cpfPattern, 'Formato de CPF inválido. Use 000.000.000-00.'));

  // RG
  const inputRG = document.getElementById('rg');
  const errorRG = document.getElementById('rg-error');
  inputRG.addEventListener('input', () => {
    inputRG.value = aplicarMascaraRG(inputRG.value);
    limparEstado(inputRG, errorRG);
  });
  inputRG.addEventListener('blur', () => validarEstrutura(inputRG, errorRG, rgPattern, 'Formato de RG inválido. Use 00.000.000-0.'));

  // Validação geral no envio
  form.addEventListener('submit', (e) => {
    const cpfOK = validarEstrutura(inputCPF, errorCPF, cpfPattern, 'Formato de CPF inválido. Use 000.000.000-00.');
    const rgOK  = validarEstrutura(inputRG, errorRG, rgPattern,  'Formato de RG inválido. Use 00.000.000-0.');
    if (!cpfOK || !rgOK) {
      e.preventDefault();
      alert('Verifique os campos com erro antes de enviar.');
    } else {
      alert('Dados enviados com sucesso!');
    }
  });

  // Funções auxiliares
  function validarEstrutura(campo, msgEl, pattern, msg) {
    const valor = campo.value.trim();
    if (valor === '') { limparEstado(campo, msgEl); return false; }
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