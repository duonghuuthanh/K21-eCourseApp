import moment from "moment";
import React from "react";
import { ActivityIndicator, Image, ScrollView, ScrollViewBase, Text, View } from "react-native";
import { Chip, List, Searchbar } from "react-native-paper";
import APIS, { endpoints } from "../../configs/APIS";
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
            let res = await APIS.get(endpoints['categories']);
            setCategories(res.data);
        } catch (ex) {
            console.error(ex);
        }
    }

    const loadCourses = async () => {
        setLoading(true);
        try {
            let url = `${endpoints['courses']}?q=${q}&category_id=${cateId}`;
            let res = await APIS.get(url);
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
    }, [q, cateId]);

    return (
        <View style={[MyStyles.container, MyStyles.margin]}>
            <View style={[MyStyles.row, MyStyles.wrap]}>
                <Chip mode={!cateId?"outlined":"flat"} onPress={() => setCateId("")} style={MyStyles.margin} icon="shape-plus">Tất cả</Chip>
                {categories===null?<ActivityIndicator/>:<>
                    {categories.map(c => <Chip mode={c.id===cateId?"outlined":"flat"} key={c.id} onPress={() => setCateId(c.id)} style={MyStyles.margin} icon="shape-plus">{c.name}</Chip>)}
                </>}
            </View>
            <View>
                <Searchbar placeholder="Nhập từ khóa..." onChangeText={setQ} value={q} />
            </View>
            <ScrollView>
                {courses.map(c => <List.Item key={c.id} title={c.subject} description={moment(c.created_date).fromNow()} left={() => <Image style={MyStyles.avatar} source={{uri: c.image}} />} />)}
                {loading && <ActivityIndicator />}
            </ScrollView>
        </View>
    );
}

export default Course;