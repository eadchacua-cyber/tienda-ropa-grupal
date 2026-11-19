export interface Producto {
  id: string;
  nombre: string;
  categoria: 'Camisetas' | 'Pantalones' | 'Abrigos';
  talla: string;
  precio: number;
  imagen: string;
}

export const PRODUCTOS_INICIALES: Producto[] = [
  {
    id: '1',
    nombre: 'Camiseta Oversize Negra',
    categoria: 'Camisetas',
    talla: 'L',
    precio: 18.50,
    imagen: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
  },
  {
    id: '2',
    nombre: 'Jean Cargo Urbano',
    categoria: 'Pantalones',
    talla: '32',
    precio: 35.00,
    imagen: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400',
  },
  {
    id: '3',
    nombre: 'Chaqueta Bomber Clásica',
    categoria: 'Abrigos',
    talla: 'M',
    precio: 45.00,
    imagen: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400',
  },
  {
    id: '4',
    nombre: 'Camiseta Básica Blanca',
    categoria: 'Camisetas',
    talla: 'M',
    precio: 15.00,
    imagen: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400',
  },
];