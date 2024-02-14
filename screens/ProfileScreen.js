import { StyleSheet, Text, View, SafeAreaView, Pressable } from 'react-native';
import React from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen = () => {
  const user = auth.currentUser;
  const navigation = useNavigation();

  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        navigation.replace('Login');
      })
      .catch(err => {
        console.log(err);
      });
  };

  const goBack = () => {
    navigation.goBack();
  };

  const goToTranslator = () => {
    navigation.navigate('Translator'); // This will Navigates us to the Translator screen
  };

  const goToOrders = () => {
    navigation.navigate('Orders'); // This will Navigate to the Orders screen
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={goBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>
      </View>
      <View style={styles.content}>
        <Text style={styles.welcomeText}>Welcome, {user.email}</Text>
        <View style={styles.buttonContainer}>
          <Pressable onPress={signOutUser} style={styles.button}>
            <Text style={styles.buttonText}>Sign Out</Text>
          </Pressable>

          <Pressable onPress={goToTranslator} style={styles.button}>
            <Text style={styles.buttonText}>Go to Translator</Text>
          </Pressable>

          <Pressable onPress={goToOrders} style={styles.button}>
            <Text style={styles.buttonText}>Orders</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  backButton: {
    padding: 5,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 40,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
});

export default ProfileScreen;
