import { View } from "react-native";
import MyStyles from "../../styles/MyStyles";

const UserProfile = () => {
    return (
        <View style={[MyStyles.container, MyStyles.margin]}>
            <Text style={MyStyles.subject}>USER ĐÃ LOGIN</Text>
        </View>
    );
}

export default UserProfile;