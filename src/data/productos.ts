import { supabase } from '../supabase';

export interface Producto {
  id?: number;
  nombre: string;
  precio: number;
  descripcion?: string;
  talla?: string;
  imagen?: string;
}

// LEER todos los productos
export async function obtenerProductos(): Promise<Producto[]> {
  const { data, error } = await supabase
    .from('productos')
    .select('*')
    .order('id', { ascending: false });

  if (error) throw error;
  return data || [];
}

// CREAR un producto nuevo
export async function crearProducto(producto: Producto) {
  const { data, error } = await supabase
    .from('productos')
    .insert([producto])
    .select();

  if (error) throw error;
  return data;
}

// EDITAR / ACTUALIZAR un producto por su id
export async function actualizarProducto(id: number, cambios: Partial<Producto>) {
  const { data, error } = await supabase
    .from('productos')
    .update(cambios)
    .eq('id', id)
    .select();

  if (error) throw error;
  return data;
}

// ELIMINAR un producto por su id
export async function eliminarProducto(id: number) {
  const { error } = await supabase
    .from('productos')
    .delete()
    .eq('id', id);

  if (error) throw error;
}