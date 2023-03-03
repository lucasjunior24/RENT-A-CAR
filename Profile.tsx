import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View} from 'react-native';

type Movie = {
  id: string;
  title: string;
  releaseYear: string;
};

const Profile = () => {
  const [isLoading, setLoading] = useState(true);
  const [movie, setData] = useState<Movie[]>([]);

  const getMovies = async () => {
    try {
      const response = await fetch('https://reactnative.dev/movies.json');
      const json = await response.json();
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
                color: 'blue',
                fontSize: 19
               }}>
              {item.title}, {item.releaseYear}
            </Text>
          )}
        />
      )}
    </View>
  );
};

export default Profile;