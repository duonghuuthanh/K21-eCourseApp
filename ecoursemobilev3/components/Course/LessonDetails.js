import { View, ActivityIndicator, Text, useWindowDimensions, ScrollView } from "react-native";
import { Card, Chip } from "react-native-paper";
import APIs, { endpoints } from "../../configs/APIs";
import React from "react";
import MyStyles from "../../styles/MyStyles";
import RenderHTML from "react-native-render-html";

const LessonDetails = ({route}) => {
    const [lesson, setLesson] = React.useState(null);
    const [comments, setComments] = React.useState(null);
    const lessonId = route.params?.lessonId;
    const { width } = useWindowDimensions();

    const loadLesson = async () => {
        try {
            let res = await APIs.get(endpoints['lesson-details'](lessonId))
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
            console.info(ex);
        }
    }

    React.useEffect(() => {
        loadLesson();
    }, [lessonId])

    return (
        <View style={[MyStyles.container, MyStyles.margin]}>
            <ScrollView>
            {lesson===null?<ActivityIndicator/>:<>
                <Card>
                    <Card.Title title={lesson.subject} titleStyle={MyStyles.subject} />
                   
                    <Card.Cover source={{ uri: lesson.image }} />

                    <View style={MyStyles.row}>
                        {lesson.tags.map(t => <Chip icon="tag" key={t.id} style={MyStyles.margin}>{t.name}</Chip>)}
                    </View>

                    <Card.Content>
                        {/* <Text variant="titleLarge">{lesson.subject}</Text> */}
                        
                        <Text variant="bodyMedium">
                           
                            <RenderHTML
                                contentWidth={width}
                                source={{html: lesson.content}}
                                />    
                        </Text>
                       
                    </Card.Content>
                </Card>
            </>}
            </ScrollView>
        </View>
    );
}

export default LessonDetails;