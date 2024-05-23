import { useState } from "react";
import { View, Text, ScrollView, KeyboardAvoidingView, Platform, Alert, Image } from "react-native";
import { Button, HelperText, TextInput, TouchableRipple } from "react-native-paper";
import MyStyles from "../../styles/MyStyles";
import * as ImagePicker from 'expo-image-picker';
import APIs, { endpoints } from "../../configs/APIs";
import { useNavigation } from "@react-navigation/native";

const Register = () => {
    const fields = [{
        label: "Tên người dùng",
        icon: "text",
        field: "first_name"
    }, {
        label: "Họ và tên lót",
        icon: "text",
        field: "last_name"
    }, {
        label: "Tên đăng nhập",
        icon: "account",
        field: "username"
    }, {
        label: "Mật khẩu",
        icon: "eye",
        field: "password",
        secureTextEntry: true
    },  {
        label: "Xác nhận mật khẩu",
        icon: "eye",
        field: "confirm",
        secureTextEntry: true
    }];

    const [user, setUser] = useState({});
    const [err, setErr] = useState(false);
    const [loading, setLoading] = useState(false);
    const nav = useNavigation();

    const change = (value, field) => {
        setUser(current => {
            return {...current, [field]: value}
        })
    }

    const picker = async () => {
        let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted')
            Alert.alert("iCourseApp", "Permissions Denied!");
        else {
            let res = await ImagePicker.launchImageLibraryAsync();
            if (!res.canceled)
                change(res.assets[0], 'avatar');
        }
    }

    const register = async () => {
        if (user.password !== user.confirm)
            setErr(true);
        else {
            setErr(false);

            let form = new FormData();
            for (let k in user)
                if (k !== 'confirm')
                    if (k === 'avatar') {
                        form.append(k, {
                            uri: user.avatar.uri,
                            name: user.avatar.fileName,
                            type: user.avatar.type
                        });
                    } else
                        form.append(k, user[k]);

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
            <ScrollView>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    <Text style={MyStyles.subject}>ĐĂNG KÝ NGƯỜI DÙNG</Text>
                    {fields.map(f => <TextInput value={user[f.field]} onChangeText={t => change(t, f.field)} key={f.field} style={MyStyles.margin} label={f.label} secureTextEntry={f.secureTextEntry} right={<TextInput.Icon icon={f.icon} />} />)}

                    <TouchableRipple onPress={picker}>
                        <Text style={MyStyles.margin}>Chọn ảnh đại diện...</Text>
                    </TouchableRipple>

                    <HelperText type="error" visible={err}>
                       Mật khẩu không khớp!
                    </HelperText>

                    {user.avatar && <Image source={{uri:user.avatar.uri}} style={MyStyles.avatar} />}

                    <Button loading={loading} icon="account" mode="contained" onPress={register}>ĐĂNG KÝ</Button>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    );
}

export default Register;