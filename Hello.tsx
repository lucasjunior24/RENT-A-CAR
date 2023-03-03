import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View} from 'react-native';

type Movie = {
  id: string;
  name: string;
  brand: string;
};

export default function Hello() {
  const [isLoading, setLoading] = useState(true);
  const [movie, setData] = useState<Movie[]>([]);

  const getMovies = async () => {
    try {
      const response = await fetch('http://192.168.100.37:3333/cars');
      const json = await response.json();
      console.log(json)
      setData(json.movies);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <View style={{
      flexDirection: 'row', backgroundColor: 'red', alignItems: 'center'
       }}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={movie}
          keyExtractor={({id}) => id}
          renderItem={({item}) => (
            <Text style={{
                alignSelf: 'center', justifyContent: 'center',
                color: '#fff',
                fontSize: 19
               }}>
              {item.name}, {item.brand}
            </Text>
          )}
        />
      )}
    </View>
  );
};

