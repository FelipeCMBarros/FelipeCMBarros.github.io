document.addEventListener('DOMContentLoaded', function () {
  const params = new URLSearchParams(window.location.search);

  const nome   = get('nome');
  const cpf    = aplicarMascaraCPF(get('cpf'));
  const rg     = aplicarMascaraRG(get('rg'));
  const dataBR = formatarDataBR(get('data_nascimento'));
  const genero = get('genero');
  const ra     = get('ra');

  setText('out-nome',   nome || '—');
  setText('out-cpf',    cpf  || '—');
  setText('out-data',   dataBR || '—');
  setText('out-rg',     rg   || '—');
  setText('out-genero', genero === 'homem' ? 'Homem' : (genero === 'mulher' ? 'Mulher' : '—'));

  // Exibir o RA somente se o gênero for Homem
  const campoRA = document.getElementById('campo-ra');
  if (genero === 'homem') {
    campoRA.style.display = 'block';
    setText('out-ra', ra || '—');
  } else {
    campoRA.style.display = 'none';
  }

  // ==== Funções auxiliares ====
  function get(key) {
    return (params.get(key) || '').trim();
  }

  function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  }

  // Máscara CPF: 000.000.000-00
  function aplicarMascaraCPF(valor) {
    const digitos = (valor || '').replace(/\D/g, '').slice(0, 11);
    if (!digitos) return '';
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
    const digitos = (valor || '').replace(/\D/g, '').slice(0, 9);
    if (!digitos) return '';
    const partes = [];
    if (digitos.length > 0) partes.push(digitos.substring(0, 2));
    if (digitos.length > 2) partes.push(digitos.substring(2, 5));
    if (digitos.length > 5) partes.push(digitos.substring(5, 8));
    let formatado = partes.join('.');
    if (digitos.length > 8) formatado += '-' + digitos.substring(8, 9);
    return formatado;
  }

  // Formata "aaaa-mm-dd" -> "dd/mm/aaaa"
  function formatarDataBR(iso) {
    if (!iso) return '';
    const partes = iso.split('-');
    if (partes.length !== 3) return iso;
    const [ano, mes, dia] = partes;
    if (ano.length === 4 && mes.length === 2 && dia.length === 2) {
      return `${dia}/${mes}/${ano}`;
    }
    return iso;
  }
});
