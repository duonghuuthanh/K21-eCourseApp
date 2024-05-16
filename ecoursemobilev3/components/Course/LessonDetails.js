import { View, ActivityIndicator, Text, useWindowDimensions, ScrollView } from "react-native";
import { Button, Card, Chip, TextInput } from "react-native-paper";
import APIs, { endpoints } from "../../configs/APIs";
import React from "react";
import MyStyles from "../../styles/MyStyles";
import RenderHTML from "react-native-render-html";
import { isCloseToBottom } from "../Utils/Utils";
import Item from "../Utils/Item";

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
    }, [lessonId]);

    const loadMoreInfo = ({nativeEvent}) => {
        if (!comments && isCloseToBottom(nativeEvent))
            loadComments();
    }

    return (
        <View style={[MyStyles.container, MyStyles.margin]}>
            <ScrollView onScroll={loadMoreInfo}>
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

            <View>
                <TextInput label="Nội dung bình luận..." />
                <Button>Thêm bình luận</Button>
            </View>

            {comments===null?<ActivityIndicator />:<>
                {comments.map(c => <Item key={c.id} instance={c} />)}
            </>}
            </ScrollView>
        </View>
    );
}

export default LessonDetails;