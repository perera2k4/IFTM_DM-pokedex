import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';

export default function DetailsScreen({ route }) {
  const { pokemon } = route.params || {};
  if (!pokemon) return <View style={styles.center}><Text>Sem dados</Text></View>;

  const types = (pokemon.types || []).map(t => t.type.name).join(', ');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: pokemon.sprites?.other?.['official-artwork']?.front_default || pokemon.sprites?.front_default }} style={styles.image} />
      <Text style={styles.name}>{pokemon.name}</Text>
      <Text style={styles.id}>#{pokemon.id}</Text>
      <Text style={styles.sectionTitle}>Types</Text>
      <Text style={styles.sectionText}>{types}</Text>

      <Text style={styles.sectionTitle}>Stats</Text>
      {pokemon.stats?.map(s => (
        <View key={s.stat.name} style={styles.statRow}>
          <Text style={styles.statName}>{s.stat.name}</Text>
          <Text style={styles.statValue}>{s.base_stat}</Text>
        </View>
      ))}

      <Text style={styles.sectionTitle}>Abilities</Text>
      {pokemon.abilities?.map(a => (
        <Text key={a.ability.name} style={styles.sectionText}>{a.ability.name}</Text>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  image: { width: 200, height: 200, resizeMode: 'contain' },
  name: { fontSize: 28, textTransform: 'capitalize', marginTop: 8 },
  id: { color: '#666' },
  sectionTitle: { marginTop: 16, fontWeight: '600' },
  sectionText: { textTransform: 'capitalize' },
  statRow: { flexDirection: 'row', width: '100%', justifyContent: 'space-between', paddingVertical: 4 },
  statName: { textTransform: 'capitalize' },
  statValue: {},
});
