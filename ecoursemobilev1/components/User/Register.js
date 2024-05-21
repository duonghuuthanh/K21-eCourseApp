import { View, Text, Alert, Image, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { Button, HelperText, TextInput, TouchableRipple } from "react-native-paper";
import MyStyles from "../../styles/MyStyles";
import * as ImagePicker from 'expo-image-picker';
import React from "react";
import APIs, { endpoints } from "../../configs/APIs";
import { useNavigation } from "@react-navigation/native";

const Register = () => {
    const [user, setUser] = React.useState({});
    const [err, setErr] = React.useState(false);
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
        "name": "password",
        "secureTextEntry": true
    }, {
        "label": "Xác nhận mật khẩu",
        "icon": "eye",
        "name": "confirm",
        "secureTextEntry": true
    }];
    const nav = useNavigation();
    const [loading, setLoading] = React.useState(false);

    const picker = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted')
            Alert.alert("iCourseApp", "Permissions Denied!");
        else {
            let res = await ImagePicker.launchImageLibraryAsync();
            if (!res.canceled) {
                updateSate("avatar", res.assets[0]);
            }
        }
    }

    const updateSate = (field, value) => {
        setUser(current => {
            return {...current, [field]: value}
        });
    }

    const register = async () => {
        if (user['password'] !== user['confirm'])
            setErr(true);
        else {
            setErr(false);

            let form = new FormData();
            for (let key in user)
                if (key !== 'confirm')
                    if (key === 'avatar') {
                        form.append(key, {
                            uri: user.avatar.uri,
                            name: user.avatar.fileName,
                            type: user.avatar.type
                        });
                    } else
                        form.append(key, user[key]);
            
            console.info(form);
            setLoading(true);
            try {
                let res = await APIs.post(endpoints['register'], form, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
    
                if (res.status === 201)
                    nav.navigate("Login");
            } catch (ex) {
                console.error(ex);
            } finally {
                setLoading(false);
            }
        }
    }
    

    return (
        <View style={[MyStyles.container, MyStyles.margin]}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView>
                <Text style={MyStyles.subject}>ĐĂNG KÝ NGƯỜI DÙNG</Text>

                {fields.map(c => <TextInput secureTextEntry={c.secureTextEntry} value={user[c.name]} onChangeText={t => updateSate(c.name, t)} style={MyStyles.margin} key={c.name} label={c.label} right={<TextInput.Icon icon={c.icon} />} />)}

                <HelperText type="error" visible={err}>
                    Mật khẩu không khớp!
                </HelperText>
                
                <TouchableRipple style={MyStyles.margin} onPress={picker}>
                    <Text>Chọn ảnh đại diện...</Text>
                </TouchableRipple>

                {user.avatar && <Image source={{uri: user.avatar.uri}} style={MyStyles.avatar} />}

                <Button icon="account" loading={loading} mode="contained" onPress={register}>ĐĂNG KÝ</Button>
            </ScrollView>
            </KeyboardAvoidingView>
            
        </View>
    );
}

export default Register;