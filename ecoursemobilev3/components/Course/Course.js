import moment from "moment";
import React from "react";
import { View, Text, ActivityIndicator, Image, ScrollView } from "react-native";
import { Chip, List, Searchbar } from "react-native-paper";
import APIs, { endpoints } from "../../configs/APIs";
import MyStyles from "../../styles/MyStyles";
import 'moment/locale/vi';

const Course = () => {
    const [categories, setCategories] = React.useState(null);
    const [courses, setCourses] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [q, setQ] = React.useState("");
    const [cateId, setCateId] = React.useState("");

    const loadCates = async () => {
        try {
            let res = await APIs.get(endpoints['categories']);
            setCategories(res.data);
        } catch (ex) {
            console.error(ex);
        }
    }

    const loadCourses = async () => {
        setLoading(true);
        try {
            let url = `${endpoints['courses']}?q=${q}&category_id=${cateId}`;
            let res = await APIs.get(url);
            setCourses(res.data.results);
        } catch (ex) {

        } finally {
            setLoading(false);
        }
    }

    React.useEffect(() => {
        loadCates();
    }, []);

    React.useEffect(() => {
        loadCourses();
    }, [q, cateId]);

    return (
        <View style={[MyStyles.container, MyStyles.margin]}>
            <View style={[MyStyles.row, MyStyles.wrap]}>
                <Chip mode={!cateId?"outlined":"flat"} style={MyStyles.margin} onPress={() => setCateId("")} icon='tag'>Tất cả</Chip>
                {categories===null?<ActivityIndicator/>:<>
                    {categories.map(c => <Chip mode={cateId===c.id?"outlined":"flat"} onPress={() => setCateId(c.id)} style={MyStyles.margin} key={c.id} icon='tag'>{c.name}</Chip>)}
                </>}
            </View>
            <View>
                <Searchbar value={q} onChangeText={setQ} placeholder="Tìm khóa học..." />
            </View>
            <ScrollView>
                {loading && <ActivityIndicator />}
                {courses.map(c => <List.Item key={c.id} title={c.subject} description={moment(c.created_date).fromNow()} left={() => <Image style={MyStyles.avatar} source={{uri: c.image}} />}  />)}
            </ScrollView>
        </View>
    );
}

export default Course;