/* Interacciones locales de demostración. No realiza solicitudes ni autentica. */
'use strict';

document.documentElement.classList.add('js-enabled');

const icons = {
  arrow: '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h14m-5-5 5 5-5 5"/></svg>',
  book: '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 5c-3-2-6-2-9-1v15c3-1 6-1 9 1 3-2 6-2 9-1V4c-3-1-6-1-9 1Zm0 0v15"/></svg>'
};

const books = [
  {id:'AC-ING-001', title:'Ingeniería de software', author:'Ian Sommerville', isbn:'9786073206037', area:'Ingeniería', collection:'General', status:'Disponible', color:'#294c68', text:'#f5eddb', year:'2011', shelf:'QA76.758 · S65'},
  {id:'AC-DER-002', title:'Introducción al estudio del derecho', author:'Eduardo García Máynez', isbn:'9786070913051', area:'Derecho', collection:'General', status:'Disponible', color:'#d5c5a2', text:'#394839', year:'2019', shelf:'K230 · G37'},
  {id:'AC-HUM-003', title:'El laberinto de la soledad', author:'Octavio Paz', isbn:'9789681600131', area:'Humanidades', collection:'General', status:'Prestado', color:'#6d7f7a', text:'#f4ecd8', year:'2004', shelf:'F1210 · P39'},
  {id:'AC-MAT-004', title:'Cálculo de una variable', author:'James Stewart', isbn:'9786075265505', area:'Matemáticas', collection:'General', status:'Disponible', color:'#7a4e49', text:'#f3e5d4', year:'2018', shelf:'QA303 · S74'},
  {id:'AC-ECO-005', title:'Principios de economía', author:'N. Gregory Mankiw', isbn:'9786074818291', area:'Ciencias sociales', collection:'General', status:'Disponible', color:'#4a617c', text:'#f8eed9', year:'2012', shelf:'HB171.5 · M36'},
  {id:'AC-ARQ-006', title:'Historia de la arquitectura', author:'Spiro Kostof', isbn:'9788420670553', area:'Arquitectura', collection:'Consulta', status:'Reservado', color:'#b3a389', text:'#243f51', year:'1988', shelf:'NA200 · K67'}
];
const users = {
  '321000123': {id:'321000123', name:'Mariana López García', initials:'ML', profile:'Alumno de licenciatura', status:'Válido', email:'mariana.lopez@example.com', debt:false, amount:'0.00', active:2, limit:5, available:3},
  'TRAB-042': {id:'TRAB-042', name:'Daniel Rivera Torres', initials:'DR', profile:'Profesor', status:'Suspendido', email:'daniel.rivera@example.com', debt:true, amount:'45.00', active:1, limit:4, available:3}
};
const sampleReceipt = {number:'DEMO-2026-001', user:'321000123', copy:'AC-ING-001', librarian:'BIB-001', requested:'2026-10-24', due:'2026-10-29', confirmed:'2026-10-24', time:'10:30:00', verification:'EJEMPLO-SGPL-001'};
const $ = selector => document.querySelector(selector);
const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
const params = new URLSearchParams(window.location.search);

function message(target, text, error = false) {
  target.textContent = text;
  target.classList.toggle('error', error);
  target.hidden = false;
}
function validateForm(form) {
  for (const input of form.querySelectorAll('input:not([type=password]), select')) {
    input.value = input.value.trim();
  }
  return form.reportValidity();
}
function dateLabel(value) {
  const [year, month, day] = value.split('-');
  return `${day}/${month}/${year}`;
}
function currentReceipt() {
  try {
    const stored = JSON.parse(sessionStorage.getItem('sgpl.demo.receipt'));
    const dateOK = value => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value);
    if (stored && ['number','user','copy','verification','time'].every(key => typeof stored[key] === 'string') && ['requested','due','confirmed'].every(key => dateOK(stored[key]))) return stored;
  } catch { /* El ejemplo fijo sigue disponible si el navegador limita el almacenamiento. */ }
  return null;
}

const menuToggle = $('.menu-toggle');
menuToggle?.addEventListener('click', () => {
  const open = $('#main-navigation').classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && $('#main-navigation')?.classList.contains('is-open')) {
    $('#main-navigation').classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded','false');
    menuToggle.setAttribute('aria-label','Abrir menú de navegación');
    menuToggle.focus();
  }
});

const loginForm = $('#login-form');
if (loginForm) {
  $('#toggle-password').addEventListener('click', event => {
    const button = event.currentTarget;
    const visible = $('#password').type === 'password';
    $('#password').type = visible ? 'text' : 'password';
    button.setAttribute('aria-pressed',String(visible));
    button.setAttribute('aria-label',visible ? 'Ocultar contraseña' : 'Mostrar contraseña');
  });
  loginForm.addEventListener('submit', event => {
    event.preventDefault();
    if (!validateForm(loginForm)) return;
    // El valor de la contraseña no se lee ni se guarda. Solo se demuestra la navegación.
    window.location.assign('catalogo.html');
  });
}

function renderBooks(items) {
  $('#result-count').textContent = `${items.length} ${items.length === 1 ? 'libro encontrado' : 'libros encontrados'}`;
  $('#book-grid').innerHTML = items.length ? items.map(book => `
    <article class="book-card">
      <div class="cover-stage" aria-hidden="true">
        <div class="cover" style="--cover:${book.color};--cover-text:${book.text}"><small>BIBLIOTECA · ACATLÁN</small><strong>${book.title}</strong><span class="cover-rule"></span><small>${book.author}</small></div>
        <span class="badge ${book.status === 'Disponible' ? '' : 'neutral'}">${book.status}</span>
      </div>
      <div class="book-body"><p class="book-area">${book.area}</p><h3>${book.title}</h3><p class="book-author">${book.author}</p>
      <div class="book-meta"><span>ISBN ${book.isbn} · ${book.year}</span><span>Ejemplar ${book.id} · ${book.collection}</span><span>Ubicación de ejemplo: ${book.shelf}</span></div>
      <div class="book-action"><span>${book.status}</span><a href="prestamo.html?ejemplar=${encodeURIComponent(book.id)}">Usar en préstamo ${icons.arrow}</a></div></div>
    </article>`).join('') : '<div class="result-empty"><h3>No encontramos coincidencias</h3><p>Prueba otro título o limpia los filtros para ver el catálogo de ejemplo.</p></div>';
}
const searchForm = $('#search-form');
if (searchForm) {
  renderBooks(books);
  searchForm.addEventListener('submit', event => {
    event.preventDefault();
    if (!validateForm(searchForm)) return;
    const data = new FormData(searchForm);
    const title = normalize(data.get('titulo'));
    const author = normalize(data.get('autor'));
    const isbn = data.get('isbn').replace(/[\s-]/g,'');
    const area = data.get('area');
    renderBooks(books.filter(book => normalize(book.title).includes(title) && normalize(book.author).includes(author) && book.isbn.includes(isbn) && (!area || book.area === area)));
  });
  searchForm.addEventListener('reset', () => renderBooks(books));
}

document.querySelectorAll('[data-user-sample]').forEach(button => button.addEventListener('click', () => {
  $('#user-id').value = button.dataset.userSample;
  $('#user-id').focus();
}));
const validationForm = $('#validation-form');
if (validationForm) {
  validationForm.addEventListener('submit', event => {
    event.preventDefault();
    if (!validateForm(validationForm)) return;
    const user = users[$('#user-id').value.toUpperCase()];
    $('#user-result').hidden = !user;
    $('#user-empty').hidden = Boolean(user);
    $('#validation-message').hidden = true;
    if (!user) {
      message($('#validation-message'),'No se encontró ese identificador en los datos ficticios. Usa 321000123 o TRAB-042.', true);
      return;
    }
    $('#profile-name').textContent = user.name;
    $('#profile-initials').textContent = user.initials;
    $('#profile-id').textContent = user.id;
    $('#profile-status').textContent = user.status;
    $('#profile-status').className = `badge ${user.status === 'Válido' ? '' : 'warning'}`;
    $('#profile-type').textContent = user.profile;
    $('#profile-email').textContent = user.email;
    $('#profile-debt').textContent = user.debt ? 'Sí, adeudo de ejemplo' : 'Sin adeudos';
    $('#profile-amount').textContent = `${user.amount} unidades monetarias (ejemplo)`;
    $('#profile-active').textContent = user.active;
    $('#profile-limit').textContent = user.limit;
    $('#profile-available').textContent = user.available;
    $('#profile-meter').style.width = `${(user.active / user.limit) * 100}%`;
    $('#continue-loan').href = `prestamo.html?usuario=${encodeURIComponent(user.id)}`;
    message($('#validation-message'),'Consulta de ejemplo completada. Los datos mostrados no constituyen una autorización de préstamo.');
  });
}

const loanForm = $('#loan-form');
if (loanForm) {
  $('#loan-user').value = (params.get('usuario') || '').slice(0,15);
  $('#loan-copy').value = (params.get('ejemplar') || '').slice(0,30);
  $('#fill-loan').addEventListener('click', () => {
    $('#loan-user').value = sampleReceipt.user;
    $('#loan-copy').value = sampleReceipt.copy;
    $('#loan-librarian').value = sampleReceipt.librarian;
    $('#loan-requested').value = sampleReceipt.requested;
    $('#loan-due').value = sampleReceipt.due;
    $('#loan-user').focus();
  });
  loanForm.addEventListener('submit', event => {
    event.preventDefault();
    if (!validateForm(loanForm)) return;
    const now = new Date();
    const dateParts = Object.fromEntries(new Intl.DateTimeFormat('en-CA',{timeZone:'America/Mexico_City',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(now).map(part => [part.type,part.value]));
    const receipt = {
      number:`DEMO-${now.getTime()}`, user:$('#loan-user').value, copy:$('#loan-copy').value,
      librarian:$('#loan-librarian').value, requested:$('#loan-requested').value,
      due:$('#loan-due').value, confirmed:`${dateParts.year}-${dateParts.month}-${dateParts.day}`,
      time:new Intl.DateTimeFormat('es-MX',{timeZone:'America/Mexico_City',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}).format(now),
      verification:'EJEMPLO-SIN-VALIDEZ'
    };
    try {
      sessionStorage.setItem('sgpl.demo.receipt',JSON.stringify(receipt));
      window.location.assign(`comprobante.html?numero=${encodeURIComponent(receipt.number)}`);
    } catch {
      message($('#loan-message'),'El navegador no permite conservar el ejemplo entre pantallas. Puedes consultar DEMO-2026-001 en Comprobante digital.', true);
    }
  });
}

function renderReceipt(receipt) {
  const user = users[receipt.user];
  const book = books.find(item => item.id === receipt.copy);
  const values = {'receipt-number':receipt.number,'receipt-user':receipt.user,'receipt-name':user?.name || 'Usuario de demostración','receipt-copy':receipt.copy,'receipt-requested':dateLabel(receipt.requested),'receipt-confirmed':`${dateLabel(receipt.confirmed)} · ${receipt.time}`,'receipt-title':book?.title || 'Ejemplar de demostración','receipt-author':book?.author || 'Sin datos en el catálogo ficticio','receipt-due':dateLabel(receipt.due),'receipt-code':receipt.verification};
  Object.entries(values).forEach(([id,value]) => { document.getElementById(id).textContent = value; });
  $('#receipt-card').hidden = false;
  $('#receipt-actions').hidden = false;
}
const receiptForm = $('#receipt-form');
if (receiptForm) {
  $('#receipt-query').value = (params.get('numero') || sampleReceipt.number).slice(0,20);
  const lookup = () => {
    if (!validateForm(receiptForm)) return;
    const query = $('#receipt-query').value.toUpperCase();
    const stored = currentReceipt();
    const receipt = query === sampleReceipt.number ? sampleReceipt : stored?.number === query ? stored : null;
    if (receipt) {
      renderReceipt(receipt);
      message($('#receipt-message'),'Comprobante de demostración encontrado. Sin validez institucional.');
    } else {
      $('#receipt-card').hidden = true;
      $('#receipt-actions').hidden = true;
      message($('#receipt-message'),'No se encontró ese número. Consulta DEMO-2026-001 o genera un ejemplo desde Registro de préstamo.',true);
    }
  };
  receiptForm.addEventListener('submit',event => { event.preventDefault(); lookup(); });
  $('#sample-receipt').addEventListener('click',() => { $('#receipt-query').value = sampleReceipt.number; lookup(); });
  $('#print-receipt').addEventListener('click',() => window.print());
  lookup();
}
