import { ActivityIndicator, Image, ScrollView, Text, useWindowDimensions, View } from "react-native";
import MyStyles from "../../styles/MyStyles";
import React from "react";
import APIs, { endpoints } from "../../configs/APIs";
import { Card, List } from "react-native-paper";
import RenderHTML from "react-native-render-html";
import { isCloseToBottom } from "../Utils/Utils";
import moment from "moment";

const LessonDetails = ({ route }) => {
    const [lesson, setLesson] = React.useState(null);
    const [comments, setComments] = React.useState(null);
    const lessonId = route.params?.lessonId;
    const { width } = useWindowDimensions();

    const loadLesson = async () => {
        try {
            let res = await APIs.get(endpoints['lesson-details'](lessonId));
            setLesson(res.data);
        } catch (ex) {
            console.error(ex);
        }
    }

    const loadComments = async () => {
        try {
            let res = await APIs.get(endpoints['comments'](lessonId));
            setComments(res.data);
        } catch (ex) {
            console.error(ex);
        }
    }

    React.useEffect(() => {
        loadLesson();
    }, [lessonId]);

    const loadMoreInfo = ({nativeEvent}) => {
        if (!comments && isCloseToBottom(nativeEvent)) {
            loadComments();
        }
    }

    return (
        <View style={[MyStyles.container, MyStyles.margin]}>
           <ScrollView onScroll={loadMoreInfo}>
            {lesson===null?<ActivityIndicator/>:<>
                <Card>
                    <Card.Title titleStyle={MyStyles.subject} title={lesson.subject} />
                    
                    <Card.Cover source={{ uri: lesson.image }} />
                    <Card.Content>
                        <RenderHTML contentWidth={width} source={{html: lesson.content}} />
                    </Card.Content>
                </Card>
                </>}

                {comments===null?<ActivityIndicator />:<>
                    {comments.map(c =>  <List.Item key={c.id} style={MyStyles.margin}  title={c.content}
                   description={moment(c.created_date).fromNow()} 
                   left={() => <Image style={MyStyles.avatar} source={{uri: c.user.avatar}} />} />)}
                </>}
           </ScrollView>
        </View>
    );
}

export default LessonDetails;