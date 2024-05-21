import { View, Text, Image, ScrollView, Platform, KeyboardAvoidingView } from "react-native";
import { Button, HelperText, TextInput, TouchableRipple } from "react-native-paper";
import MyStyles from "../../styles/MyStyles";
import * as ImagePicker from 'expo-image-picker';
import React from "react";
import APIs, { endpoints } from "../../configs/APIs";
import { useNavigation } from "@react-navigation/native";

const Register = () => {
    const [user, setUser] = React.useState({});
    const fields = [{
        "label": "Tên",
        "icon": "text",
        "name": "first_name"
    }, {
        "label": "Họ và tên lót",
        "icon": "text",
        "name": "last_name"
    }, {
        "label": "Tên đăng nhập",
        "icon": "account",
        "name": "username"
    }, {
        "label": "Mật khẩu",
        "icon": "eye",
        "secureTextEntry": true,
        "name": "password"
    }, {
        "label": "Xác nhận mật khẩu",
        "icon": "eye",
        "secureTextEntry": true,
        "name": "confirm"
    }];
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);
    const nav = useNavigation();

    const picker = async () => {
        let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert("Permissions denied!");
        } else {
            const result = await ImagePicker.launchImageLibraryAsync();
            if (!result.canceled)
                setUser(current => {
                    return { ...current, "avatar": result.assets[0] }
                });
        }
    }

    const register = async () => {

        if (user?.password !== user?.confirm) {
            setError(true);
            return;
        } else
            setError(false);

        setLoading(true)
        try {
            let form = new FormData();
            for (let key in user)
                if (key !== 'confirm')
                    if (key === 'avatar') {
                        form.append(key, {
                            uri: user.avatar.uri,
                            name: user.avatar.fileName,
                            type: user.avatar.type
                        })
                    } else {
                        form.append(key, user[key]);
                    }

            form.append("email", "thanh@gmail.com");
            console.info(form);


            let res = await APIs.post(endpoints['register'], form, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (res.status === 201)
                nav.navigate("Login");
        } catch (ex) {
            console.log(ex);
        } finally {
            setLoading(false);
        }
    }


    const updateState = (field, value) => {
        setUser(current => {
            return { ...current, [field]: value }
        })
    }

    return (

        <View style={[MyStyles.container, MyStyles.margin]}>
            <ScrollView>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    {fields.map(f => <TextInput value={user[f.name]} onChangeText={t => updateState(f.name, t)} key={f.label} style={MyStyles.margin} label={f.label} secureTextEntry={f.secureTextEntry} right={<TextInput.Icon icon={f.icon} />} />)}

                    <TouchableRipple onPress={picker}>
                        <Text style={MyStyles.margin}>Chọn hình đại diện...</Text>
                    </TouchableRipple>

                    <HelperText type="error" visible={error}>
                        Mật khẩu không khớp!
                    </HelperText>

                    {user?.avatar && <Image source={{ uri: user.avatar.uri }} style={MyStyles.avatar} />}

                    <Button style={MyStyles.margin} loading={loading} icon="account" mode="contained" onPress={register}>
                        Đăng ký
                    </Button>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>

    );
}

export default Register;