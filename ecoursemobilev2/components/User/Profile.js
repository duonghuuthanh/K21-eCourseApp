import { useContext } from "react";
import { View, Image, Text } from "react-native";
import { Button } from "react-native-paper";
import { MyDispatchContext, MyUserContext } from "../../configs/Context";
import MyStyles from "../../styles/MyStyles";

const Profile = () => {
    const user = useContext(MyUserContext);
    const dispatch = useContext(MyDispatchContext);

    return (
        <View style={[MyStyles.container, MyStyles.margin]}>
            <Text style={MyStyles.subject}>Chào {user.username}!</Text>
            <Image source={{uri: user.image}} style={MyStyles.avatar} />
            <Button icon="logout" onPress={() => dispatch({type: "logout"})}>Đăng xuất</Button>
        </View>
    );
}

export default Profile;