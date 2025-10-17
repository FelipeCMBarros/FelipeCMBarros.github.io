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

const cpfPattern = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

(function initCPF(){
  const input = document.getElementById('cpf');
  const errorEl = document.getElementById('cpf-error');
  const form = document.getElementById('form-cadastro');

  // Aplica máscara enquanto digita (sem mostrar erro)
  input.addEventListener('input', () => {
    const pos = input.selectionStart;
    const antes = input.value;
    input.value = aplicarMascaraCPF(input.value);

    // Ajuste simples do cursor para não "pular" muito
    const delta = input.value.length - antes.length;
    const novo = Math.max(0, (pos || 0) + (delta > 0 ? delta : 0));
    input.setSelectionRange(novo, novo);

    limparEstado(input, errorEl); // não mostra erro enquanto digita
  });

  // Mostra erro apenas quando sair do campo (blur) se formato estiver incorreto
  input.addEventListener('blur', () => {
    validarEstrutura();
  });

  function validarEstrutura(){
    const valor = input.value.trim();
    if (valor === '') { // campo vazio: tira estados
      limparEstado(input, errorEl);
      return false;
    }
    if (!cpfPattern.test(valor)) {
      marcarInvalido(input, errorEl, 'Formato inválido. Use 000.000.000-00.');
      return false;
    }
    marcarValido(input, errorEl);
    return true;
  }

  function marcarValido(el, msgEl){
    el.classList.add('is-valid');
    el.classList.remove('is-invalid');
    msgEl.textContent = '';
  }
  function marcarInvalido(el, msgEl, texto){
    el.classList.add('is-invalid');
    el.classList.remove('is-valid');
    msgEl.textContent = texto;
  }
  function limparEstado(el, msgEl){
    el.classList.remove('is-valid', 'is-invalid');
    msgEl.textContent = '';
  }
})();