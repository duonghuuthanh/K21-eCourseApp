import { useContext } from "react";
import { View, Image } from "react-native";
import { Button } from "react-native-paper";
import { MyDispatchContext, MyUserContext } from "../../configs/Context";

const Profile = () => {
    const user = useContext(MyUserContext);
    const dispatch = useContext(MyDispatchContext);

    return (
        <View style={[MyStyles.container, MyStyles.margin]}>
            <Text>Chào {user.username}!</Text>
            <Image source={{uri: user.avatar}} />
            <Button icon="logout" onPress={() => dispatch({type: "logout"})}>Đăng xuất</Button>
        </View>
    );
}

export default Profile;