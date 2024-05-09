import { Image } from "react-native";
import { List } from "react-native-paper";
import MyStyles from "../../styles/MyStyles";

const Item = ({instance}) => {
    return (
        <List.Item title={instance.subject} description={instance.created_date?instance.created_date:""} 
                   left={() => <Image style={MyStyles.avatar} source={{uri: instance.image}} />} />
    );
}

export default Item;