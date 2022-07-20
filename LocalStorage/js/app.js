// VARIABLES
const listaProductos = document.querySelector('#lista-productos');
const formulario = document.querySelector('#formulario');
let productos = [];

// EVENT LISTENERS
eventListeners();

function eventListeners() {
     //Cuando se envia el formulario
     formulario.addEventListener('submit', agregarProducto);

     // Borrar Productos
     listaProductos.addEventListener('click', borrarProducto);

     // Contenido cargado
     document.addEventListener('DOMContentLoaded', () => {
          productos = JSON.parse( localStorage.getItem('productos') ) || []  ;
          console.log(productos);
          crearHTML();
     });
}

//FUNTIONS

// Añadir producto del formulario
function agregarProducto(e) {
     e.preventDefault();
     // leer el valor del textarea
     const producto = document.querySelector('#producto').value;
     
     // validación
     if(producto === '') {
          mostrarError('Un mensaje no puede ir vacio');
          return;
     }

     // Crear un objeto Producto
     const productoObj = {
          id: Date.now(),
          texto: producto
     }

     // Añadirlo a mis productos
     productos = [...productos, productoObj];
     
     // Una vez agregado, mandamos renderizar nuestro HTML
     crearHTML();

     // Reiniciar el formulario
     formulario.reset();
}

function mostrarError(error) {
     const mensajeEerror = document.createElement('p');
     mensajeEerror.textContent = error;
     mensajeEerror.classList.add('error');

     const contenido = document.querySelector('#contenido');
     contenido.appendChild(mensajeEerror);

     setTimeout(() => {
          mensajeEerror.remove();
     }, 3000);
}

function crearHTML() {
     limpiarHTML();
     
     if(productos.length > 0 ) {
          productos.forEach( producto =>  {
               // crear boton de eliminar
               const botonBorrar = document.createElement('a');
               botonBorrar.classList = 'borrar-producto';
               botonBorrar.innerText = 'X';
     
               // Crear elemento y añadirle el contenido a la lista
               const li = document.createElement('li');

               // Añade el texto
               li.innerText = producto.texto;

               // añade el botón de borrar al producto
               li.appendChild(botonBorrar);

               // añade un atributo único...
               li.dataset.productoId = producto.id;

               // añade el producto a la lista
               listaProductos.appendChild(li);
          });
     }

     sincronizarStorage();
}

// Elimina el Producto del DOM
function borrarProducto(e) {
     e.preventDefault();

     // console.log(e.target.parentElement.dataset.productoId);
     const id = e.target.parentElement.dataset.productoId;
     productos = productos.filter( producto => producto.id != id  );
     crearHTML();
}

// Agrega producto a local storage
function sincronizarStorage() {
     localStorage.setItem('productos', JSON.stringify(productos));
}

// Elimina los cursos del carrito en el DOM
function limpiarHTML() {
     while(listaProductos.firstChild) {
          listaProductos.removeChild(listaProductos.firstChild);
     }
}