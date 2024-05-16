import React from "react";
import { ActivityIndicator, RefreshControl, ScrollView, View, TouchableOpacity } from "react-native";
import { Chip, Searchbar } from "react-native-paper";
import APIs, { endpoints } from "../../configs/APIs";
import MyStyles from "../../styles/MyStyles";
import 'moment/locale/vi';

import Item from "../Utils/Item";

const Course = ({navigation}) => {
    const [categories, setCategories] = React.useState(null);
    const [courses, setCourses] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [q, setQ] = React.useState("");
    const [cateId, setCateId] = React.useState("");
    const [page, setPage] = React.useState(1);

    const loadCates = async () => {
        try {
            let res = await APIs.get(endpoints['categories']);
            setCategories(res.data);
        } catch (ex) {
            console.error(ex);
        }
    }

    const loadCourses = async () => {
        if (page > 0) {
            setLoading(true);
            try {
                let url = `${endpoints['courses']}?q=${q}&category_id=${cateId}&page=${page}`;
                
                let res = await APIs.get(url);
    
                if (res.data.next === null)
                    setPage(0);
    
                if (page === 1)
                    setCourses(res.data.results);
                else
                    setCourses(current => {
                        return [...current, ...res.data.results];
                    });
            } catch (ex) {
                console.error(ex);
            } finally {
                setLoading(false);
            }
        }
    }

    React.useEffect(() => {
        loadCates();
    }, []);

    React.useEffect(() => {
        loadCourses();
    }, [q, cateId, page]);

    const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >=
          contentSize.height - paddingToBottom;
    };

    const loadMore = ({nativeEvent}) => {
        if (!loading && page > 0 && isCloseToBottom(nativeEvent)) {
                setPage(page + 1);
        }
    }

    const goLesson = (courseId) => {
        navigation.navigate('Lesson', {'courseId': courseId})
    }

    const search = (value, callback) => {
        setPage(1);
        callback(value)
    }

    return (
        <View style={[MyStyles.container, MyStyles.margin]}>
            <View style={[MyStyles.row, MyStyles.wrap]}>
                <Chip mode={!cateId?"outlined":"flat"} onPress={() => search("", setCateId)} style={MyStyles.margin} icon="shape-plus">Tất cả</Chip>
                {categories===null?<ActivityIndicator/>:<>
                    {categories.map(c => <Chip mode={c.id===cateId?"outlined":"flat"} key={c.id} onPress={() => search(c.id, setCateId)} style={MyStyles.margin} icon="shape-plus">{c.name}</Chip>)}
                </>}
            </View>
            <View>
                <Searchbar placeholder="Nhập từ khóa..." onChangeText={(t) => search(t, setQ)} value={q} />
            </View>
            <ScrollView onScroll={loadMore}>
                <RefreshControl onRefresh={() => loadCourses()} />
                {loading && <ActivityIndicator />}
                {courses.map(c => <TouchableOpacity key={c.id} onPress={() => goLesson(c.id)}>
                    <Item instance={c} />
                </TouchableOpacity>)}
                {loading && page > 1 && <ActivityIndicator />}
            </ScrollView>
        </View>
    );
}

export default Course;