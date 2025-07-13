// const getCurrentLocation = async () => {
//     try {
//       let { status } = await Location.requestForegroundPermissionsAsync();

//       if (status !== "granted") {
//         Alert.alert(
//           "Permission denied",
//           "Allow the app to use the location services",
//           [
//             {
//               text: "Cancel",
//               onPress: () => console.log("Cancel Pressed"),
//               style: "cancel",
//             },
//             { text: "OK", onPress: () => console.log("OK pressed") },
//           ]
//         );
//         return;
//       }