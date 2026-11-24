import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { crearProducto } from '../data/productos';

export default function AgregarScreen() {
  const router = useRouter();
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [categoria, setCategoria] = useState('Camisetas');
  const [talla, setTalla] = useState('');
  const [guardando, setGuardando] = useState(false);

  const categorias = ['Camisetas', 'Pantalones', 'Zapatos', 'Accesorios'];

  const handleGuardar = async () => {
    if (!nombre.trim() || !precio.trim()) {
      Alert.alert('Campos requeridos', 'Ingresa al menos el nombre y el precio.');
      return;
    }

    try {
      setGuardando(true);
      await crearProducto({
        nombre: nombre.trim(),
        precio: parseFloat(precio) || 0,
        categoria,
        talla: talla.trim() || 'Única',
      });

      setNombre('');
      setPrecio('');
      setTalla('');
      Alert.alert('¡Guardado!', 'El producto ya está en Supabase.');
      router.push('/catalogo');
    } catch (error: any) {
      Alert.alert('Error al guardar', error.message);
    } finally {
      setGuardando(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Agregar Prenda</Text>

      <Text style={styles.label}>Nombre del producto</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. Camiseta Oversize Negra"
        value={nombre}
        onChangeText={setNombre}
      />

      <Text style={styles.label}>Precio ($)</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. 25.00"
        keyboardType="numeric"
        value={precio}
        onChangeText={setPrecio}
      />

      <Text style={styles.label}>Talla</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. S, M, L, XL"
        value={talla}
        onChangeText={setTalla}
      />

      <Text style={styles.label}>Categoría</Text>
      <View style={styles.categoriasRow}>
        {categorias.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.chip, categoria === cat && styles.chipActivo]}
            onPress={() => setCategoria(cat)}
          >
            <Text style={[styles.chipTexto, categoria === cat && styles.chipTextoActivo]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.boton, guardando && { opacity: 0.6 }]}
        onPress={handleGuardar}
        disabled={guardando}
      >
        <Text style={styles.botonTexto}>
          {guardando ? 'Guardando en Supabase...' : 'Guardar Producto'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc', padding: 20 },
  titulo: { fontSize: 22, fontWeight: 'bold', color: '#0f172a', marginBottom: 16 },
  label: { fontSize: 14, fontWeight: '600', color: '#334155', marginBottom: 6, marginTop: 10 },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
  },
  categoriasRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 4 },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#e2e8f0',
  },
  chipActivo: { backgroundColor: '#2563eb' },
  chipTexto: { color: '#334155', fontWeight: '600' },
  chipTextoActivo: { color: '#ffffff' },
  boton: {
    backgroundColor: '#16a34a',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 24,
  },
  botonTexto: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
});