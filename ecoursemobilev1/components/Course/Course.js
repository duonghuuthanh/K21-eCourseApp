import moment from "moment";
import React from "react";
import { View, Text, ActivityIndicator, Image, ScrollView } from "react-native"
import { Chip, List } from "react-native-paper";
import APIs, { endpoints } from "../../configs/APIs";
import MyStyles from "../../styles/MyStyles"
import "moment/locale/vi"

const Course = () => {
    const [categories, setCategories] = React.useState(null);
    const [courses, setCourses] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    
    const loadCates = async () => {
        try {
            let res = await APIs.get(endpoints['categories']);
            setCategories(res.data);
        } catch (ex) {
            console.error(ex);
        }
    }

    const loadCourses = async () => {
        try {
            setLoading(true);
            let res = await APIs.get(endpoints['courses']);
            setCourses(res.data.results);
        } catch (ex) {
            console.error(ex);
        } finally {
            setLoading(false);
        }
    }

    React.useEffect(() => {
        loadCates();
    }, []);

    React.useEffect(() => {
        loadCourses();
    }, []);

    return (
        <View style={MyStyles.container}>
            <View style={MyStyles.row}>
                {categories===null?<ActivityIndicator />:<>
                {categories.map(c => <Chip style={MyStyles.margin} key={c.id} icon="shape-outline">{c.name}</Chip>)}
            </>}
            </View>

            <ScrollView>
                {courses.map(c => <List.Item style={MyStyles.margin} key={c.id} title={c.subject} description={moment(c.created_date).fromNow()} left={() => <Image style={MyStyles.avatar} source={{uri: c.image}} />} />)}
                {loading && <ActivityIndicator/>}
            </ScrollView>
        </View>
    )
}

export default Course;