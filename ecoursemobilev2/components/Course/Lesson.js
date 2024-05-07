import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import MyStyles from "../../styles/MyStyles";
import React from "react";
import Item from "./Item";
import APIs, { endpoints } from "../../configs/APIs";

const Lesson = ({navigation, route}) => {
    const [lessons, setLessons] = React.useState(null);
    const courseId = route.params?.courseId;

    const loadLessons = async () => {
        try {
            let res = await APIs.get(endpoints['lessons'](courseId));
            setLessons(res.data);
        } catch (err) {
            console.error(err);
        }
    }

    React.useEffect(() => {
        loadLessons();
    }, [courseId])

    return (
        <View style={[MyStyles.container, MyStyles.margin]}>
           {lessons===null?<ActivityIndicator/>:<>
            {lessons.map(l => <TouchableOpacity key={l.id} onPress={() => navigation.navigate('LessonDetails', {'lessonId': l.id})}>
                <Item instance={l} />
            </TouchableOpacity>)}
           </>}
        </View>
    );
}

export default Lesson;