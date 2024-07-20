// JSON de productos
const productosJSON = [
    {
        "nombre": "Producto 1",
        "imagen": "https://via.placeholder.com/150",
        "precio": 100,
        "stock": 15,
        "categoria": "Electrónica",
        "descripcion": "Descripción del Producto 1"
    },
    {
        "nombre": "Producto 2",
        "imagen": "https://via.placeholder.com/150",
        "precio": 200,
        "stock": 7,
        "categoria": "Ropa",
        "descripcion": "Descripción del Producto 2"
    },
    {
        "nombre": "Producto 3",
        "imagen": "https://via.placeholder.com/150",
        "precio": 150,
        "stock": 10,
        "categoria": "Electrónica",
        "descripcion": "Descripción del Producto 3"
    },
    {
        "nombre": "Producto 4",
        "imagen": "https://via.placeholder.com/150",
        "precio": 300,
        "stock": 5,
        "categoria": "Hogar",
        "descripcion": "Descripción del Producto 4"
    },
    {
        "nombre": "Producto 1",
        "imagen": "https://via.placeholder.com/150",
        "precio": 100,
        "stock": 15,
        "categoria": "Electrónica",
        "descripcion": "Descripción del Producto 1"
    },
    {
        "nombre": "Producto 2",
        "imagen": "https://via.placeholder.com/150",
        "precio": 200,
        "stock": 7,
        "categoria": "Ropa",
        "descripcion": "Descripción del Producto 2"
    },
    {
        "nombre": "Producto 3",
        "imagen": "https://via.placeholder.com/150",
        "precio": 150,
        "stock": 10,
        "categoria": "Electrónica",
        "descripcion": "Descripción del Producto 3"
    },
    {
        "nombre": "Producto 4",
        "imagen": "https://via.placeholder.com/150",
        "precio": 300,
        "stock": 5,
        "categoria": "Hogar",
        "descripcion": "Descripción del Producto 4"
    },
    {
        "nombre": "Producto 1",
        "imagen": "https://via.placeholder.com/150",
        "precio": 100,
        "stock": 15,
        "categoria": "Electrónica",
        "descripcion": "Descripción del Producto 1"
    },
    {
        "nombre": "Producto 2",
        "imagen": "https://via.placeholder.com/150",
        "precio": 200,
        "stock": 7,
        "categoria": "Ropa",
        "descripcion": "Descripción del Producto 2"
    },
    {
        "nombre": "Producto 3",
        "imagen": "https://via.placeholder.com/150",
        "precio": 150,
        "stock": 10,
        "categoria": "Electrónica",
        "descripcion": "Descripción del Producto 3"
    },
    {
        "nombre": "Producto 4",
        "imagen": "https://via.placeholder.com/150",
        "precio": 300,
        "stock": 5,
        "categoria": "Hogar",
        "descripcion": "Descripción del Producto 4"
    },{
        "nombre": "Producto 1",
        "imagen": "https://via.placeholder.com/150",
        "precio": 100,
        "stock": 15,
        "categoria": "Electrónica",
        "descripcion": "Descripción del Producto 1"
    },
    {
        "nombre": "Producto 2",
        "imagen": "https://via.placeholder.com/150",
        "precio": 200,
        "stock": 7,
        "categoria": "Ropa",
        "descripcion": "Descripción del Producto 2"
    },
    {
        "nombre": "Producto 3",
        "imagen": "https://via.placeholder.com/150",
        "precio": 150,
        "stock": 10,
        "categoria": "Mascotas",
        "descripcion": "Descripción del Producto 3"
    }
];
// Uso de clases en poo
class Producto {
    constructor(nombre, imagen, precio, stock, categoria, descripcion) {
        this.nombre = nombre;
        this.imagen = imagen;
        this.precio = precio;
        this.stock = stock;
        this.categoria = categoria;
        this.descripcion = descripcion;
    }

    comprar() {
        if (this.stock > 0) {
            this.stock--;
            return true;
        } else {
            alert('No hay más stock disponible');
            return false;
        }
    }

    restar() {
        this.stock++;
    }

    mostrarInfo() {
        return `Nombre: ${this.nombre}\nPrecio: ${this.precio}\nDisponibilidad: ${this.stock}\nDescripción: ${this.descripcion}`;
    }
}

// Crear instancias de Producto desde el JSON
const productos = productosJSON.map(prod => new Producto(prod.nombre, prod.imagen, prod.precio, prod.stock, prod.categoria, prod.descripcion));

// Array para el carrito de compras
let carrito = [];

// Función para mostrar los productos en la página
function mostrarProductos(productosAmostrar) {
    const productosContainer = document.getElementById('productos-container');
    productosContainer.innerHTML = '';

    productosAmostrar.forEach((prod, index) => {
        const productoElement = document.createElement('div');
        productoElement.id = `producto${index + 1}`;
        productoElement.className = 'producto';
        productoElement.innerHTML = `
            <h2>${prod.nombre}</h2>
            <img src="${prod.imagen}" alt="${prod.nombre}">
            <p>Precio: $${prod.precio}</p>
            <p>Disponibilidad: <span class="stock">${prod.stock}</span></p>
            <button class="detalles-btn btn btn-info">Mostrar Detalles</button>
            <button class="comprar-btn btn btn-success">Comprar</button>
            <button class="restar-btn btn btn-warning">Restar</button>
        `;
        productosContainer.appendChild(productoElement);

        // Event listeners para los botones de cada producto
        productoElement.querySelector('.detalles-btn').addEventListener('click', () => mostrarDetalles(index));
        productoElement.querySelector('.comprar-btn').addEventListener('click', () => manejarCompra(index));
        productoElement.querySelector('.restar-btn').addEventListener('click', () => manejarResta(index));
    });
}

// Función para actualizar la disponibilidad en la página
function actualizarDisponibilidad() {
    productos.forEach((producto, index) => {
        document.querySelector(`#producto${index + 1} .stock`).innerText = producto.stock;
    });
}

// Función para actualizar el total de productos y el total del carrito
function actualizarCarrito() {
    const totalProductos = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    const totalCarrito = carrito.reduce((acc, item) => acc + (item.producto.precio * item.cantidad), 0);

    document.getElementById('total-productos').innerText = totalProductos;
    document.getElementById('total-carrito').innerText = totalCarrito;
    mostrarListaCarrito();
}

// Función para manejar la compra de productos
function manejarCompra(index) {
    const producto = productos[index];
    if (producto.comprar()) {
        const itemCarrito = carrito.find(item => item.producto.nombre === producto.nombre);
        if (itemCarrito) {
            itemCarrito.cantidad++;
        } else {
            carrito.push({ producto, cantidad: 1 });
        }
        actualizarDisponibilidad();
        actualizarCarrito();
    }
}

// Función para manejar la resta de productos
function manejarResta(index) {
    const producto = productos[index];
    const itemCarrito = carrito.find(item => item.producto.nombre === producto.nombre);
    if (itemCarrito && itemCarrito.cantidad > 0) {
        itemCarrito.cantidad--;
        producto.restar();
        if (itemCarrito.cantidad === 0) {
            carrito = carrito.filter(item => item.producto.nombre !== producto.nombre);
        }
        actualizarDisponibilidad();
        actualizarCarrito();
    }
}

// Función para mostrar la información del producto en un alert
function mostrarDetalles(index) {
    const producto = productos[index];
    alert(producto.mostrarInfo());
}

// Función para mostrar la lista de productos en el carrito
function mostrarListaCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    listaCarrito.innerHTML = '';
    
    carrito.forEach(item => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
            ${item.producto.nombre} - $${item.producto.precio} x ${item.cantidad}
            <button class="btn btn-danger btn-sm" onclick="eliminarDelCarrito('${item.producto.nombre}')">Eliminar</button>
        `;
        listaCarrito.appendChild(li);
    });
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(nombreProducto) {
    carrito = carrito.filter(item => item.producto.nombre !== nombreProducto);
    const producto = productos.find(p => p.nombre === nombreProducto);
    if (producto) {
        producto.stock += carrito.find(item => item.producto.nombre === nombreProducto)?.cantidad || 0;
    }
    actualizarDisponibilidad();
    actualizarCarrito();
}

// Función para manejar el botón de comprar carrito
function comprarCarrito() {
    if (carrito.length > 0) {
        alert('Primero debes loguearte!');
    } else {
        alert('El carrito está vacío');
    }
}

// Función para manejar el botón de limpiar carrito
function limpiarCarrito() {
    carrito = [];
    actualizarCarrito();
    alert('El carrito ha sido limpiado');
}

// Función para filtrar productos
function filtrarProductos(nombre = '', categoria = '', precioMin = NaN, precioMax = NaN) {
    let productosFiltrados = productos;

    // Filtrar por nombre
    if (nombre) {
        productosFiltrados = productosFiltrados.filter(p => p.nombre.toLowerCase().includes(nombre.toLowerCase()));
    }

    // Filtrar por categoría
    if (categoria) {
        productosFiltrados = productosFiltrados.filter(p => p.categoria === categoria);
    }

    // Filtrar por precio
    if (!isNaN(precioMin)) {
        productosFiltrados = productosFiltrados.filter(p => p.precio >= precioMin);
    }
    if (!isNaN(precioMax)) {
        productosFiltrados = productosFiltrados.filter(p => p.precio <= precioMax);
    }

    mostrarProductos(productosFiltrados);
}

// Función para extraer categorías únicas
function obtenerCategoriasUnicas(productos) {
    const categorias = productos.map(prod => prod.categoria);
    return [...new Set(categorias)];
}

// Función para poblar el menú desplegable de categorías
function poblarCategorias() {
    const categoriaSelect = document.getElementById('filtro-categoria');
    const categoriasUnicas = obtenerCategoriasUnicas(productos);

    categoriaSelect.innerHTML = '<option value="">Seleccionar categoría</option>'; // Opción por defecto
    categoriasUnicas.forEach(categoria => {
        const option = document.createElement('option');
        option.value = categoria;
        option.textContent = categoria;
        categoriaSelect.appendChild(option);
    });
}

// Event listener para DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    mostrarProductos(productos); // Mostrar todos los productos al cargar
    poblarCategorias(); // Poblar las categorías

    const nombreInput = document.getElementById('filtro-nombre');
    const categoriaInput = document.getElementById('filtro-categoria');
    const precioMinInput = document.getElementById('filtro-precio-min');
    const precioMaxInput = document.getElementById('filtro-precio-max');
    const filtrarBtn = document.getElementById('filtrar-btn');

    // Event listener para el botón de filtrar
    filtrarBtn.addEventListener('click', () => {
        const nombre = nombreInput.value.trim();
        const categoria = categoriaInput.value.trim();
        const precioMin = parseFloat(precioMinInput.value.trim());
        const precioMax = parseFloat(precioMaxInput.value.trim());

        filtrarProductos(nombre, categoria, precioMin, precioMax);
    });

    document.getElementById('comprar-carrito').addEventListener('click', comprarCarrito);
    document.getElementById('limpiar-carrito').addEventListener('click', limpiarCarrito);
});
