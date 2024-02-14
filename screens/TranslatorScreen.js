import { StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';

export default function TranslatorScreen() {

    const [inputText, setInputText] = useState('');
    const [translateText, setTranslateText] = useState('');
    const [fromLanguage, setFromLanguage] = useState('English');
    const [toLanguage, setToLanguage] = useState('Tamil');
    const [openFrom, setOpenFrom] = useState(false);
    const [openTo, setOpenTo] = useState(false);
    const API_KEY = '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';

    const translateTextAsync = async () => {
        try {
            const response = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    message: [
                        { role: 'user', content: `Translate the following ${fromLanguage} text into ${toLanguage}: "${inputText}"` },
                        { role: 'assistance', content: 'translate' }
                    ],
                    max_tokens: 500,
                    model: 'gpt-3.5-turbo'
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${API_KEY}`
                    },
                }
            );
            setTranslateText(response.data.choices[0].message.content);

            Keyboard.dismiss();
        } catch (error) {
            console.error("Error translating text: ", error.response.data);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>TranslatorScreen</Text>
            <View style={styles.dropdowncontainer}>
                <DropDownPicker
                    open={openFrom}
                    value={fromLanguage}
                    setOpen={setOpenFrom}
                    setValue={setFromLanguage}
                    items={[
                        { label: 'English', value: 'English' },
                        { label: 'Tamil', value: 'Tamil' },
                        { label: 'Telugu', value: 'Telugu' },
                        { label: 'Hindi', value: 'Hindi' },
                    ]}
                    style={styles.dropdown}
                    containerStyle={{ height: 40, width: 200 }}
                    onChangeValue={(value) => setFromLanguage(value)}
                />
                <DropDownPicker
                    open={openTo}
                    value={toLanguage}
                    setOpen={setOpenTo}
                    setValue={setToLanguage}
                    items={[
                        { label: 'English', value: 'English' },
                        { label: 'Tamil', value: 'Tamil' },
                        { label: 'Telugu', value: 'Telugu' },
                        { label: 'Hindi', value: 'Hindi' },
                    ]}
                    style={styles.dropdown}
                    containerStyle={{ height: 40, width: 200 }}
                    onChangeValue={(value) => setToLanguage(value)}
                />
            </View>
            <TextInput
                style={styles.input}
                onChangeText={text => setInputText(text)}
                value={inputText}
                multiline
            />
            <TouchableOpacity
                style={styles.button}
                onPress={translateTextAsync}>
                <Text style={styles.buttontext}>Translate</Text>
            </TouchableOpacity>
            <Text style={styles.transtext}>Translated Text:</Text>
            <Text style={styles.text}>{translateText}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F8F8",
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontWeight: 'bold',
        fontSize: 30,
        color: "black",
        marginBottom: 20,
    },
    dropdowncontainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        marginBottom:80,
    },
    dropdown: {
        backgroundColor: "#EFEFF4",
        width: 200,
        marginTop: 30,
        color: 'black',
        borderRadius: 8,
        padding: 10,
    },
    input: {
        height: 150,
        width: "100%",
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#D1D1D6",
        padding: 10,
        marginTop: 50,
    },
    button: {
        backgroundColor: "#007AFF",
        width: 200,
        height: 50,
        marginTop: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttontext: {
        color: "white",
        fontSize: 20,
        fontWeight: '600'
    },
    transtext: {
        fontWeight: '600',
        fontSize: 32,
        marginBottom: 20,
        color: "black",
        marginTop: 50,
    },
    text: {
        color: "black",
        fontSize: 20,
    }
});
