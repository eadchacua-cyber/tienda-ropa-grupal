import { useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PRODUCTOS_INICIALES, Producto } from '../data/productos';

export default function CatalogoScreen() {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>('Todas');

  const categorias = ['Todas', 'Camisetas', 'Pantalones', 'Abrigos'];

  const productosFiltrados =
    categoriaSeleccionada === 'Todas'
      ? PRODUCTOS_INICIALES
      : PRODUCTOS_INICIALES.filter((item) => item.categoria === categoriaSeleccionada);

  const renderProducto = ({ item }: { item: Producto }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.imagen }} style={styles.imagen} />
      <View style={styles.info}>
        <Text style={styles.nombre}>{item.nombre}</Text>
        <Text style={styles.detalle}>
          Categoría: {item.categoria} | Talla: {item.talla}
        </Text>
        <Text style={styles.precio}>${item.precio.toFixed(2)}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.filtrosContainer}>
        {categorias.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.botonFiltro,
              categoriaSeleccionada === cat && styles.botonFiltroActivo,
            ]}
            onPress={() => setCategoriaSeleccionada(cat)}
          >
            <Text
              style={[
                styles.textoFiltro,
                categoriaSeleccionada === cat && styles.textoFiltroActivo,
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={productosFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={renderProducto}
        contentContainerStyle={styles.lista}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 15,
  },
  filtrosContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  botonFiltro: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#E2E8F0',
  },
  botonFiltroActivo: {
    backgroundColor: '#1E293B',
  },
  textoFiltro: {
    fontSize: 12,
    fontWeight: '600',
    color: '#334155',
  },
  textoFiltroActivo: {
    color: '#FFFFFF',
  },
  lista: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
  },
  imagen: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 14,
  },
  info: {
    flex: 1,
  },
  nombre: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  detalle: {
    fontSize: 13,
    color: '#64748B',
    marginVertical: 4,
  },
  precio: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#16A34A',
  },
});