import { List } from "react-native-paper";
import MyStyles from "../../styles/MyStyles";
import moment from "moment";
import { Image } from "react-native";

const Item = ({ instance }) => {
    
    return (
        <List.Item style={MyStyles.margin}  title={instance.subject} 
                   description={instance.created_date?moment(instance.created_date).fromNow():""} 
                   left={() => <Image style={MyStyles.avatar} source={{uri: instance.image}} />} />
    );
}

export default Item;