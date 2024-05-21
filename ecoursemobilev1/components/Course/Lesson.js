import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import APIs, { endpoints } from "../../configs/APIs";
import MyStyles from "../../styles/MyStyles";
import React from "react";
import Item from "../Utils/Item";

const Lesson = ({ route, navigation }) => {
    const [lessons, setLessons] = React.useState(null);
    const courseId = route.params?.courseId;

    const loadLessons = async () => {
        try {
            let res = await APIs.get(endpoints['lessons'](courseId));
            setLessons(res.data);
        } catch (ex) {
            console.error(ex);
        }
    }

    React.useEffect(() => {
        loadLessons();
    }, [courseId]);


    return (
        <View style={[MyStyles.container, MyStyles.margin]}>
            
            {lessons===null?<ActivityIndicator />:<>
                {lessons.map(l => <TouchableOpacity key={l.id} onPress={() => navigation.navigate("LessonDetails", {lessonId: l.id})}>
                    <Item instance={l} />
                </TouchableOpacity>)}
            </>}
        </View>
    );
}

export default Lesson;