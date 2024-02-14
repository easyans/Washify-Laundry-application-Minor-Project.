import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';

const OrderScreen = () => {
    const navigation = useNavigation();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.navigate('Home');
        }, 5000); // Adjust the time delay as needed
        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <SafeAreaView>
            <LottieView
                source={require("../assets/thumbs.json")}
                style={{
                    height: 360, width: 300,
                    alignSelf: "center",
                    marginTop: 40,
                    justifyContent: "center",
                }}
                autoPlay
                loop={false}
                speed={0.7}
            />

            <Text style={{
                marginTop: 40,
                fontSize: 19,
                fontWeight: "600",
                textAlign: "center",
            }}>Your order has been placed</Text>

            <LottieView
                source={require("../assets/sparkle.json")}
                style={{
                    height: 300,
                    position: "absolute",
                    top: 100,
                    width: 300,
                    alignSelf: "center",
                }}
                autoPlay
                loop={false}
                speed={0.7}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({});

export default OrderScreen;
