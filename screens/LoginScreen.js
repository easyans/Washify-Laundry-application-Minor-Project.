import { ActivityIndicator, KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const LoginScreen = () => {
    const [email, setEMail] = useState("");
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState("");
    const navigation = useNavigation();

    useEffect(() => {
        setLoading(true);
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (!authUser) {
                setLoading(false);
            }
            if (authUser) {
                navigation.navigate("Home");
            }
        });

        return unsubscribe;
    }, [])

    const login = () => {
        signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            console.log("user userCredential", userCredential);
            const user = userCredential.user;
            console.log("user details", user)
        })
    }

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: "white",
                alignItems: "center",
                padding: 10
            }}
        >
        {loading ? (
            <View style={{alignItems:"center", justifyContent:"center",display:"flex", flexDirection:"row",flex:1}}>
                <Text style={{marginRight:10}}>Loading</Text>
                <ActivityIndicator size="large" color={"black"}/>
            </View>
        ) : (
            <KeyboardAvoidingView>
            
                <View style={{ justifyContent: "center", alignItems: "center", marginTop: 100 }}>
                    <Text style={{ fontSize: 20, color: "black", fontWeight: "bold" }}>Sign In</Text>

                    <Text style={{ fontSize: 18, marginTop: 8, fontWeight: "600" }}>Sign In to your account</Text>
                </View>

                <View style={{ marginTop: 50, }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <MaterialCommunityIcons name="email-outline" size={24} color="black" />
                        <TextInput placeholder='Email' value={email} onChangeText={(text) => setEMail(text)} placeholderTextColor="black" style={{ fontSize: password ? 18 : 18, borderBottomWidth: 1, borderBottomColor: "gray", width: 300, marginVertical: 10, marginLeft: 13, }} />
                    </View>

                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Ionicons name="ios-key-outline" size={24} color="black" />
                        <TextInput value={password} onChangeText={(text) => setPassword(text)} secureTextEntry={true} placeholder='Password' placeholderTextColor="black" style={{ fontSize: password ? 18 : 18, borderBottomWidth: 1, borderBottomColor: "gray", width: 300, marginVertical: 50, marginLeft: 13 }} />
                    </View>

                    <Pressable
                        onPress={login}
                        style={{
                            width: 200,
                            backgroundColor: "#24a0ed",
                            padding: 15,
                            borderRadius: 9,
                            marginTop: 50,
                            marginLeft: "auto",
                            marginRight: "auto",
                        }}>
                        <Text style={{ fontSize: 18, textAlign: "center", color: "white" }}>Login</Text>
                    </Pressable>

                    <Pressable onPress={() => navigation.navigate("Register")} style={{ marginTop: 20 }}>
                        <Text style={{
                            textAlign: "center",
                            fontSize: 17,
                            color: "gray",
                            fontWeight: "500",
                        }}>Don't have a account? Sign Up</Text>
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
        )}

        </SafeAreaView>
    )
};

export default LoginScreen

const styles = StyleSheet.create({})