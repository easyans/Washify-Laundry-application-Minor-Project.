import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Alert,
  Pressable,
  Image,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import Carousel from "../components/Carousel";
import Services from "../components/Services";
import DressItem from "../components/DressItem";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../ProductReducer";
import { useNavigation } from "@react-navigation/native";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const HomeScreen = () => {
  const cart = useSelector((state) => state.cart?.cart || []);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const total = cart
    .map((item) => (item?.quantity || 0) * (item?.price || 0))
    .reduce((curr, prev) => curr + prev, 0);
  const navigation = useNavigation();
  const [displayCurrentAddress, setdisplayCurrentAddress] = useState(
    "We are loading your location..."
  );
  const [locationServicesEnabled, setLocationServicesEnabled] = useState(false);

  useEffect(() => {
    checkIfLocationEnabled();
    getCurrentLocation();
  }, []);

  const checkIfLocationEnabled = async () => {
    try {
      let enabled = await Location.hasServicesEnabledAsync();
      if (!enabled) {
        Alert.alert(
          "Location services not enabled",
          "Please enable the location services",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            { text: "OK", onPress: () => console.log("OK pressed") },
          ]
        );
      } else {
        setLocationServicesEnabled(enabled);
      }
    } catch (error) {
      console.error("Error checking location services:", error);
    }
  };

  const getCurrentLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permission denied",
          "Allow the app to use the location services",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            { text: "OK", onPress: () => console.log("OK pressed") },
          ]
        );
        return;
      }

      const { coords } = await Location.getCurrentPositionAsync();
      if (coords) {
        const { latitude, longitude } = coords;
        let response = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });

        for (let item of response) {
          let address = `${item.name} ${item.postalCode}`;
          setdisplayCurrentAddress(address);
        }
      }
    } catch (error) {
      console.error("Error getting location:", error);
      setdisplayCurrentAddress("Could not get location");
    }
  };

  const product = useSelector((state) => state.product?.product || []);
  const dispatch = useDispatch();

  useEffect(() => {
    if (product && product.length > 0) {
      setLoading(false);
      return;
    }

    const fetchProducts = async () => {
      try {
        const colRef = collection(db, "types");
        const docsSnap = await getDocs(colRef);
        const newItems = [];
        docsSnap.forEach((doc) => {
          newItems.push(doc.data());
        });
        setItems(newItems);
        newItems.forEach((service) => dispatch(getProducts(service)));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [product?.length, dispatch]);

  const services = [
    {
      id: "0",
      image: "https://images.unsplash.com/photo-1730129409193-dce14789ae88?q=80&w=2350&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Dry Wash",
      quantity: 0,
      price: 10,
    },
    {
      id: "11",
      image:
      "https://images.unsplash.com/photo-1714317437445-785581e4ff7a?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Ironing",
      quantity: 0,
      price: 10,
    },
    {
      id: "12",
      image: "https://images.unsplash.com/photo-1712123486120-c617559e95a7?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Dresses",
      quantity: 0,
      price: 10,
    },
    {
      id: "13",
      image:
        "https://images.unsplash.com/photo-1520783155484-157cf5431a06?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Deep Cleaning",
      quantity: 0,
      price: 10,
    },
    {
      id: "14",
      image:
        "https://images.unsplash.com/photo-1599753931952-654e960af582?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Steaming",
      quantity: 0,
      price: 10,
    },
    {
      id: "15",
      image:
        "https://images.unsplash.com/photo-1473252812967-d565c3607e28?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Curtains",
      quantity: 0,
      price: 10,
    },
    {
      id: "16",
      image:
      "https://images.unsplash.com/photo-1558171813-4c088753af8f?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Sleeveless",
      quantity: 0,
      price: 10,
    },
  ];

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F0F0F0" }}>
      <ScrollView style={{ flex: 1, marginTop: 50 }}>
        {/* Location and Profile */}
        <View
          style={{ flexDirection: "row", alignItems: "center", padding: 10 }}
        >
          <MaterialIcons name="location-on" size={30} color="black" />
          <View>
            <Text style={{ fontSize: 18, fontWeight: "500" }}>Home</Text>
            <Text>{displayCurrentAddress}</Text>
          </View>
          <Pressable
            onPress={() => navigation.navigate("Profile")}
            style={{ marginLeft: "auto", marginRight: 7 }}
          >
            <Image
              style={{ width: 40, height: 40, borderRadius: 20 }}
              source={{
                uri: "https://lh3.googleusercontent.com/ogw/AGvuzYbKEvC5CLtI1MV-RZ6u1RfQ5OkfVki83SSUjJBzymc=s32-c-mo",
              }}
            />
          </Pressable>
        </View>

        {/* Search Bar */}
        <View
          style={{
            padding: 10,
            margin: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderWidth: 0.8,
            borderColor: "#C0C0C0",
            borderRadius: 12,
            backgroundColor: "white",
          }}
        >
          <TextInput
            placeholder="Search for items or more"
            style={{ flex: 1 }}
          />
          <Feather name="search" size={24} color="black" />
        </View>

        {/* Image Carousel */}
        <Carousel />

        {/* Services Component */}
        <Services services={services} />

        {/* Rendering all the products */}
        {product && product.length > 0 && product.map((item, index) => (
          <DressItem item={item} key={index} />
        ))}
      </ScrollView>

      {total === 0 ? null : (
        <Pressable
          style={{
            backgroundColor: "black",
            padding: 10,
            marginBottom: 40,
            margin: 15,
            borderRadius: 7,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          onPress={() => navigation.navigate("PickUp")}
        >
          <View>
            <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>
              {cart.length} items | ₹ {total}
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "400",
                color: "white",
                marginVertical: 6,
              }}
            >
              Extra charges may apply
            </Text>
          </View>

          <Text style={{ fontSize: 15, fontWeight: "600", color: "white" }}>
            Proceed to pickup
          </Text>
        </Pressable>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;