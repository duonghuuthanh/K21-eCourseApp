import React from "react";
import moment from "moment";
import { View, ActivityIndicator, Image, ScrollView, RefreshControl } from "react-native"
import { Chip, List, Searchbar } from "react-native-paper";
import APIs, { endpoints } from "../../configs/APIs";
import MyStyles from "../../styles/MyStyles";
import "moment/locale/vi";

const Course = () => {
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
            let url = `${endpoints['courses']}?q=${q}&category_id=${cateId}&page=${page}`;
            try {
                setLoading(true);
                let res = await APIs.get(url);
                if (page === 1)
                    setCourses(res.data.results);
                else if (page > 1)
                    setCourses(current => {
                        return [...current, ...res.data.results]
                    });
                if (res.data.next === null)
                    setPage(0);
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
        if (loading===false && isCloseToBottom(nativeEvent)) {
            setPage(page + 1);
        }
    }

    const search = (value, callback) => {
        setPage(1);
        callback(value);
    }

    return (
        <View style={[MyStyles.container, MyStyles.margin]}>
            <View style={MyStyles.row}>
                <Chip mode={!cateId?"outlined":"flat"} style={MyStyles.margin} onPress={() => search("", setCateId)} icon="shape-outline">Tất cả</Chip>
                {categories===null?<ActivityIndicator />:<>
                {categories.map(c => <Chip mode={cateId===c.id?"outlined":"flat"} onPress={() => search(c.id, setCateId)} style={MyStyles.margin} key={c.id} icon="shape-outline">{c.name}</Chip>)}
            </>}
            </View>
            <View>
                <Searchbar placeholder="Tìm khóa học..." value={q} onChangeText={t => search(t, setQ)} />
            </View>
            <ScrollView onScroll={loadMore}>
                <RefreshControl onRefresh={() => loadCourses()} />
                {loading && <ActivityIndicator/>}
                {courses.map(c => <List.Item style={MyStyles.margin} key={c.id} title={c.subject} description={moment(c.created_date).fromNow()} left={() => <Image style={MyStyles.avatar} source={{uri: c.image}} />} />)}
                {loading && page > 1 && <ActivityIndicator/>}
            </ScrollView>
        </View>
    )
}

export default Course;