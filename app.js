const data = window.APP_DATA;
const gs = new Intl.NumberFormat('es-PY');
const fmtGs = (n) => `Gs. ${gs.format(Number(n || 0))}`;

// TOTAL GENERAL AUTOMÁTICO
const totalGeneral = data.categorias.reduce((acc, cat) => {
  const totalCat = cat.items.reduce((sum, item) => sum + Number(item[2] || 0), 0);
  return acc + totalCat;
}, 0);

document.getElementById('totalGeneral').textContent = fmtGs(totalGeneral);

const cards = document.getElementById('cards');
const tbodyGeneral = document.querySelector('#tablaGeneral tbody');
const tfootTotal = document.getElementById('tfootTotal');

let generalRows = "";

cards.innerHTML = data.categorias.map(cat => {
  const total = cat.items.reduce((a, b) => a + Number(b[2] || 0), 0);

  const rows = cat.items.map(item => {
    generalRows += `
      <tr>
        <td>${item[0]}</td>
        <td>${cat.nombre}</td>
        <td>${item[1]}</td>
        <td class="money">${fmtGs(item[2])}</td>
        <td>${item[3] ? `<img src="${item[3]}" class="thumb" onclick="verImagen('${item[3]}')">` : ""}</td>
      </tr>
    `;

    return `
      <tr>
        <td>${item[0]}</td>
        <td>${item[1]}</td>
        <td class="money">${fmtGs(item[2])}</td>
        <td>${item[3] ? `<img src="${item[3]}" class="thumb" onclick="verImagen('${item[3]}')">` : ""}</td>
      </tr>
    `;
  }).join('');

  return `
    <article class="cat-card color-${cat.color}">
      <div class="cat-head">
        <div class="cat-title-row">
          <div>
            <h2 class="cat-title">${cat.nombre}</h2>
            <div class="cat-sub">Fecha, detalle, monto y respaldo visual.</div>
          </div>
          <div class="cat-total">
            <div class="amount">${fmtGs(total)}</div>
            <div class="count">${cat.items.length} movimiento(s)</div>
          </div>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th style="width:120px">Fecha</th>
              <th>Detalle</th>
              <th style="width:140px;text-align:right">Monto</th>
              <th style="width:110px">Respaldo</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
          <tfoot>
            <tr>
              <td colspan="2">TOTAL ${cat.nombre.toUpperCase()}</td>
              <td class="money">${fmtGs(total)}</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </article>
  `;
}).join('');

tbodyGeneral.innerHTML = generalRows;
tfootTotal.textContent = fmtGs(totalGeneral);

window.verImagen = function(src){
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modalImg');
  modalImg.src = src;
  modal.classList.add('show');
};

window.cerrarModal = function(){
  document.getElementById('modal').classList.remove('show');
};