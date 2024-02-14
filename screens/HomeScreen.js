import { StyleSheet, Text, View, SafeAreaView, Alert, Pressable, Image, TextInput, ScrollView, } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Location from "expo-location";
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { SliderBox } from "react-native-image-slider-box";
import Carousel from '../components/Carousel';
import Services from '../components/Services';
import DressItem from '../components/DressItem';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../ProductReducer';
import { useNavigation } from '@react-navigation/native';
import { collection, doc, getDoc, getDocs  } from 'firebase/firestore';
import { db } from "../firebase";

const HomeScreen = () => {
    const cart = useSelector((state) => state.cart.cart);
    const [items,setItems] = useState([]);
    const total = cart.map((item) => item.quantity * item.price).reduce((curr, prev) => curr + prev, 0);
    const navigation = useNavigation();
    console.log(cart);
    const [displayCurrentAddress, setdisplayCurrentAddress] = useState("we are loading your location");
    const [locationServicesEnabled, setLocationServicesEnabled] = useState(false);

    useEffect(() => {
        checkIfLocationEnabled();
        getCurrentLocation();
    }, []);

    const checkIfLocationEnabled = async () => {
        let enabled = await Location.hasServicesEnabledAsync();
        if (!enabled) {
            Alert.alert(
                "Location services not enabled",
                "Please enable the location services",
                [
                    {
                        text: 'Cancel',
                        onPress: () => Alert.alert('Cancel Pressed'),
                        style: 'cancel',
                    },
                    { text: "OK", onPress: () => console.log("Ok pressed") }
                ],
                { cancelable: false },
            );
        } else {
            setLocationServicesEnabled(enabled);
        }
    };

    const getCurrentLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
            Alert.alert(
                "Permission denied",
                "Allow the app to use the location services",
                [
                    {
                        text: 'Cancel',
                        onPress: () => Alert.alert('Cancel Pressed'),
                        style: 'cancel',
                    },
                    { text: "OK", onPress: () => console.log("Ok pressed") }
                ],
                { cancelable: false },
            );
        }

        const { coords } = await Location.getCurrentPositionAsync();
        // console.log(coords)
        if (coords) {
            const { latitude, longitude } = coords;

            let response = await Location.reverseGeocodeAsync({
                latitude,
                longitude
            });

            // console.log(response) area

            for (let item of response) {
                let address = `${item.name}  ${item.postalCode}`;
                setdisplayCurrentAddress(address);
            }
        }
    };
    const product = useSelector((state) => state.product.product);
    const dispatch = useDispatch();
    useEffect(() => {
        if (product.length > 0) return;
    
        const fetchProducts = async () => {
          const colRef = collection(db,"types");
          const docsSnap = await getDocs(colRef);
          docsSnap.forEach((doc) => {
            items.push(doc.data());
          });
          items?.map((service) => dispatch(getProducts(service)));
        };
        fetchProducts();
    }, []);
    console.log(product);
    const services = [
        {
            id: "0",
            image: "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F10%2Fa0%2F10a0330f4e44e050f4e5eed550563ce17e443247.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5Bmen_shirt_dressed_slimfit%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]",
            name: "shirt",
            quantity: 0,
            price: 10,
        },
        {
            id: "11",
            image: "https://lp.cosstores.com/app001prod?set=quality%5B79%5D%2Csource%5B%2Fb9%2F2a%2Fb92a80a6c99764c4a30e375523b26ae462e9e89b.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5Bladies_tops_tshirts%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D%2Ctarget%5Bhm.com%5D&call=url[file:/product/main]",
            name: "T-shirt",
            quantity: 0,
            price: 10,
        },
        {
            id: "12",
            image: "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F68%2F6d%2F686dbd8ddf972c0efa27eb6652566d360b7c969a.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5Bladies_dresses_mididresses%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]",
            name: "dresses",
            quantity: 0,
            price: 10,
        },
        {
            id: "13",
            image: "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F0e%2Fc2%2F0ec223c5777f6014dfbaedf8f6b362894b63c963.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url[file:/product/main]",
            name: "jeans",
            quantity: 0,
            price: 10,
        },
        {
            id: "14",
            image: "https://www.baltini.com/cdn/shop/products/8280dc5e3e63c32f3818d8c616c4d3dd_9712bbc4-5423-47fd-9555-92688603c71a.jpg?height=1024&v=1697691867",
            name: "Sweater",
            quantity: 0,
            price: 10,
        },
        {
            id: "15",
            image: "https://d29c1z66frfv6c.cloudfront.net/pub/media/catalog/product/large/1b0ed4e285ffe04753ab607d73227a02c6952df1_xxl-1.jpg",
            name: "shorts",
            quantity: 0,
            price: 10,
        },
        {
            id: "16",
            image: "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F5e%2Fd3%2F5ed374b53df61405e167dc3113813155fc6b77bf.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5Bmen_tshirtstanks_tanks%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]",
            name: "Sleeveless",
            quantity: 0,
            price: 10,
        },
    ];

    return (
        <>
            <ScrollView style={{ backgroundColor: "#F0F0F0", flex: 1, marginTop: 50 }}>
                {/*...LOCATION AND PROFILE CODE...*/}
                <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
                    <MaterialIcons name="location-on" size={30} color="black" />
                    <View>
                        <Text style={{ fontSize: 18, fontWeight: "500" }}>Home</Text>
                        <Text>{displayCurrentAddress}</Text>
                    </View>
                    <Pressable onPress={() => navigation.navigate("Profile")} style={{ marginLeft: "auto", marginRight: 7 }}>
                        <Image style={{ width: 40, height: 40, borderRadius: 20 }} source={{ uri: "https://lh3.googleusercontent.com/ogw/AGvuzYbKEvC5CLtI1MV-RZ6u1RfQ5OkfVki83SSUjJBzymc=s32-c-mo" }} />
                    </Pressable>
                </View>

                {/*...SEARCH BAR...*/}
                <View style={{ padding: 10, margin: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderWidth: 0.8, borderColor: "#C0C0C0", borderRadius: "12" }}>
                    <TextInput placeholder="Search for items or more" />
                    <Feather name="search" size={24} color="black" />
                </View>

                {/*Image Carousel*/}
                <Carousel />

                {/*Services Component*/}
                <Services />

                {/*Rendering all the products*/}
                {product.map((item, index) => (
                    <DressItem item={item} key={index} />
                ))}
            </ScrollView>
            {total === 0 ? (
                null
            ) : (
                <Pressable style={{ backgroundColor: "black", padding: 10, marginBottom: 40, margin: 15, borderRadius: 7, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <View>
                        <Text  style={{fontSize:17,fontWeight:"600",color:"white"}}>{cart.length} items |  ₹ {total}</Text>
                        <Text style={{ fontSize: 15, fontWeight: "400", color: "white", marginVertical: 6 }}>extra charges may apply</Text>
                    </View>

                    <Pressable onPress={() => navigation.navigate("PickUp")}>
                        <Text style={{ fontSize: 15, fontWeight: "600", color: "white" }}>Prodceed to pickup</Text>
                    </Pressable>
                </Pressable>
            )}

        </>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({});
