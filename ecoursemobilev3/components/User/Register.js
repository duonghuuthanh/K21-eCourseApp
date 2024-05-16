import { View, Text, Image } from "react-native";
import { Button, TextInput, TouchableRipple } from "react-native-paper";
import MyStyles from "../../styles/MyStyles";
import * as ImagePicker from 'expo-image-picker';
import React from "react";

const Register = () => {
    const [user, setUser] = React.useState({});
    const fields = [{
        "label": "Tên",
        "icon": "text"
    }, {
        "label": "Họ và tên lót",
        "icon": "text"
    }, {
        "label": "Họ và tên lót",
        "icon": "text"
    }, {
        "label": "Tên đăng nhập",
        "icon": "account"
    }, {
        "label": "Mật khẩu",
        "icon": "eye",
        "secureTextEntry": true
    },  {
        "label": "Xác nhận mật khẩu",
        "icon": "eye",
        "secureTextEntry": true
    }];

    const picker = async () => {
        let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert("Permissions denied!");
        } else {
            const result = await ImagePicker.launchImageLibraryAsync();
            if (!result.canceled)
                setUser(current => {
                    return {...current, "avatar": result.assets[0]}
                })
        }
    }

    return (
        <View style={[MyStyles.container, MyStyles.margin]}>
            <Text style={[MyStyles.subject, MyStyles.center]}>ĐĂNG KÝ NGƯỜI DÙNG</Text>
            {fields.map(f => <TextInput style={MyStyles.margin} label={f.label} secureTextEntry={f.secureTextEntry} right={<TextInput.Icon icon={f.icon} />} />)}
            
            <TouchableRipple onPress={picker}>
                <Text style={MyStyles.margin}>Chọn hình đại diện...</Text>
            </TouchableRipple>

            {user?.avatar && <Image source={{uri: user.avatar.uri }} style={MyStyles.avatar} />}

            <Button style={MyStyles.margin} icon="account" mode="contained" onPress={() => console.log('Pressed')}>
                Đăng ký
            </Button>
        </View>
    );
}

export default Register;