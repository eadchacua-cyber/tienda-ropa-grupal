import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Producto,
  actualizarProducto,
  eliminarProducto,
  obtenerProductos,
} from '../data/productos';

export default function CatalogoScreen() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todas');

  const [modalVisible, setModalVisible] = useState(false);
  const [productoEditando, setProductoEditando] = useState<Producto | null>(null);
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevoPrecio, setNuevoPrecio] = useState('');
  const [nuevaTalla, setNuevaTalla] = useState('');

  const categorias = ['Todas', 'Camisetas', 'Pantalones', 'Zapatos', 'Accesorios'];

  const cargarDatos = async () => {
    try {
      setCargando(true);
      const data = await obtenerProductos();
      setProductos(data);
    } catch (error: any) {
      Alert.alert('Error al cargar catálogo', error.message);
    } finally {
      setCargando(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      cargarDatos();
    }, [])
  );

  const productosFiltrados =
    categoriaSeleccionada === 'Todas'
      ? productos
      : productos.filter((item) => item.categoria === categoriaSeleccionada);

  const abrirEdicion = (item: Producto) => {
    setProductoEditando(item);
    setNuevoNombre(item.nombre);
    setNuevoPrecio(String(item.precio));
    setNuevaTalla(item.talla || '');
    setModalVisible(true);
  };

  const guardarEdicion = async () => {
    if (!productoEditando?.id) return;
    try {
      await actualizarProducto(productoEditando.id, {
        nombre: nuevoNombre.trim(),
        precio: parseFloat(nuevoPrecio) || 0,
        talla: nuevaTalla.trim(),
      });
      setModalVisible(false);
      cargarDatos();
    } catch (error: any) {
      Alert.alert('Error al actualizar', error.message);
    }
  };

  const confirmarEliminar = (id?: number) => {
    if (!id) return;
    Alert.alert('Eliminar prenda', '¿Seguro que deseas borrar este producto?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: async () => {
          try {
            await eliminarProducto(id);
            cargarDatos();
          } catch (error: any) {
            Alert.alert('Error al eliminar', error.message);
          }
        },
      },
    ]);
  };

  const renderProducto = ({ item }: { item: Producto }) => (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.nombre}>{item.nombre}</Text>
        <Text style={styles.detalle}>
          {item.categoria || 'General'} • Talla: {item.talla || 'Única'}
        </Text>
        <Text style={styles.precio}>${Number(item.precio).toFixed(2)}</Text>
      </View>

      <View style={styles.acciones}>
        <TouchableOpacity style={styles.btnEditar} onPress={() => abrirEdicion(item)}>
          <Text style={styles.btnTexto}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnEliminar} onPress={() => confirmarEliminar(item.id)}>
          <Text style={styles.btnTexto}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.filtros}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categorias}
          keyExtractor={(cat) => cat}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.chip, categoriaSeleccionada === item && styles.chipActivo]}
              onPress={() => setCategoriaSeleccionada(item)}
            >
              <Text
                style={[
                  styles.chipTexto,
                  categoriaSeleccionada === item && styles.chipTextoActivo,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {cargando ? (
        <ActivityIndicator size="large" color="#1E293B" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={productosFiltrados}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderProducto}
          onRefresh={cargarDatos}
          refreshing={cargando}
          ListEmptyComponent={
            <Text style={styles.vacio}>No hay prendas registradas en esta categoría.</Text>
          }
        />
      )}

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalFondo}>
          <View style={styles.modalCaja}>
            <Text style={styles.modalTitulo}>Editar Prenda</Text>
            <TextInput
              style={styles.input}
              value={nuevoNombre}
              onChangeText={setNuevoNombre}
              placeholder="Nombre"
            />
            <TextInput
              style={styles.input}
              value={nuevoPrecio}
              onChangeText={setNuevoPrecio}
              placeholder="Precio"
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              value={nuevaTalla}
              onChangeText={setNuevaTalla}
              placeholder="Talla (ej. S, M, L)"
            />
            <View style={styles.modalBotones}>
              <TouchableOpacity
                style={[styles.btnEliminar, { flex: 1 }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.btnTexto}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.btnEditar, { flex: 1 }]}
                onPress={guardarEdicion}
              >
                <Text style={styles.btnTexto}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc', padding: 16 },
  filtros: { marginBottom: 12, maxHeight: 42 },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#e2e8f0',
    marginRight: 8,
  },
  chipActivo: { backgroundColor: '#1E293B' },
  chipTexto: { color: '#334155', fontWeight: '600' },
  chipTextoActivo: { color: '#ffffff' },
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
  },
  info: { flex: 1, paddingRight: 8 },
  nombre: { fontSize: 16, fontWeight: 'bold', color: '#0f172a' },
  detalle: { fontSize: 12, color: '#64748b', marginTop: 2 },
  precio: { fontSize: 15, fontWeight: '700', color: '#16a34a', marginTop: 4 },
  acciones: { flexDirection: 'row', gap: 6 },
  btnEditar: { backgroundColor: '#2563eb', paddingHorizontal: 10, paddingVertical: 8, borderRadius: 8 },
  btnEliminar: { backgroundColor: '#dc2626', paddingHorizontal: 10, paddingVertical: 8, borderRadius: 8 },
  btnTexto: { color: '#fff', fontWeight: '600', fontSize: 12, textAlign: 'center' },
  vacio: { textAlign: 'center', color: '#64748b', marginTop: 40 },
  modalFondo: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 20 },
  modalCaja: { backgroundColor: '#fff', borderRadius: 12, padding: 20, gap: 12 },
  modalTitulo: { fontSize: 18, fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 8, padding: 10 },
  modalBotones: { flexDirection: 'row', gap: 10, marginTop: 8 },
});