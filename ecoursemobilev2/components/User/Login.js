import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import { View, Text } from "react-native";
import { Button, TextInput } from "react-native-paper";
import APIs, { authApi, endpoints } from "../../configs/APIs";
import { MyDispatchContext } from "../../configs/Context";
import MyStyles from "../../styles/MyStyles";

const Login = () => {
    const fields = [{
        label: "Tên đăng nhập",
        icon: "account",
        field: "username"
    }, {
        label: "Mật khẩu",
        icon: "eye",
        field: "password",
        secureTextEntry: true
    }];

    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const nav = useNavigation();
    const dispatch = useContext(MyDispatchContext);

    const change = (value, field) => {
        setUser(current => {
            return {...current, [field]: value}
        })
    }

    const login = async () => {
        setLoading(true);
        try {
            let res = await APIs.post(endpoints['login'], {
                ...user, 
                'client_id': 'Vbe8euZZQJoWJ2UzW9wDThg4hJEZHHbhFmnfj7UR',
                'client_secret': 'cVm4w4hSdy4MtwbP4KuNgXkGPeQJ9yrQdBvXHGR6b3e97F2bYqQ81XJ49FEufzjcw4SKwpuOZQiCLsNelHY1MkuYTGBRcSqtWmSlebSUk27WfyDskCB2VeCQihnEKdZ2',
                'grant_type': 'password'
            });
            await AsyncStorage.setItem("token", res.data.access_token);

            setTimeout(async () => {
                let user = await authApi(res.data.access_token).get(endpoints['current-user']);
                console.info(user.data);

                dispatch({
                    "type": "login",
                    "payload": user.data
                })

                nav.navigate("Home");
            }, 100);
        } catch (ex) {
            console.error(ex);
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={[MyStyles.container, MyStyles.margin]}>
            <Text style={MyStyles.subject}>ĐĂNG NHẬP NGƯỜI DÙNG</Text>
            {fields.map(f => <TextInput value={user[f.field]} onChangeText={t => change(t, f.field)} key={f.field} style={MyStyles.margin} label={f.label} secureTextEntry={f.secureTextEntry} right={<TextInput.Icon icon={f.icon} />} />)}
            <Button loading={loading} icon="account" mode="contained" onPress={login}>ĐĂNG NHẬP</Button>
        </View>
    );
}

export default Login;