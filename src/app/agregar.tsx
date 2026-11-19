import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function AgregarPrendaScreen() {
  const [nombre, setNombre] = useState('');
  const [talla, setTalla] = useState('');
  const [precio, setPrecio] = useState('');
  const [ultimaPrenda, setUltimaPrenda] = useState<string | null>(null);

  const handleGuardar = () => {
    if (!nombre.trim() || !talla.trim() || !precio.trim()) {
      Alert.alert('Campos incompletos', 'Por favor llena todos los datos de la prenda.');
      return;
    }

    const precioNumero = parseFloat(precio);
    if (isNaN(precioNumero) || precioNumero <= 0) {
      Alert.alert('Precio inválido', 'Ingresa un valor numérico mayor a 0.');
      return;
    }

    setUltimaPrenda(`${nombre} (Talla ${talla.toUpperCase()}) - $${precioNumero.toFixed(2)}`);
    Alert.alert('¡Guardado!', 'Prenda registrada correctamente en memoria local.');

    setNombre('');
    setTalla('');
    setPrecio('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Registrar Nueva Prenda</Text>

      <Text style={styles.label}>Nombre de la prenda</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. Sudadera Hoodie Gris"
        value={nombre}
        onChangeText={setNombre}
      />

      <Text style={styles.label}>Talla</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. S, M, L, XL o 32"
        value={talla}
        onChangeText={setTalla}
      />

      <Text style={styles.label}>Precio ($ USD)</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. 25.50"
        keyboardType="numeric"
        value={precio}
        onChangeText={setPrecio}
      />

      <TouchableOpacity style={styles.boton} onPress={handleGuardar}>
        <Text style={styles.textoBoton}>Guardar Prenda</Text>
      </TouchableOpacity>

      {ultimaPrenda && (
        <View style={styles.confirmacionBox}>
          <Text style={styles.confirmacionTitulo}>Último registro en sesión:</Text>
          <Text style={styles.confirmacionTexto}>{ultimaPrenda}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    marginBottom: 16,
  },
  boton: {
    backgroundColor: '#1E293B',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  textoBoton: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  confirmacionBox: {
    marginTop: 24,
    padding: 14,
    backgroundColor: '#DCFCE7',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#86EFAC',
  },
  confirmacionTitulo: {
    fontWeight: 'bold',
    color: '#166534',
    marginBottom: 4,
  },
  confirmacionTexto: {
    color: '#15803D',
    fontSize: 14,
  },
});