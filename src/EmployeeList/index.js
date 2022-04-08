import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import realm, {getAllUsers} from '../../Database';
import {Searchbar} from 'react-native-paper';
import filter from 'lodash.filter';

function EmployeeList({navigation, route}) {
  useEffect(() => {
    setFullData(users);
    setData(users);
  }, []);
  const [searchQuery, setSearchQuery] = React.useState('');
  // const onChangeSearch = query => setSearchQuery(query);

  function onChangeSearch(text) {
    //setSearchQuery(text);
    const formattedQuery = text.toLowerCase();
    const data = filter(fullData, title => {
      return contains(title, formattedQuery);
    });
    setSearchQuery(text);
    setData(users);
  }

  function contains({title}, query) {
    // console.log(title);
    const titleQuery = title.toLowerCase();

    if (titleQuery.includes(query)) {
      return true;
    }
    return false;
  }

  const [users, setUsers] = useState(getAllUsers());

  const [query, setQuery] = useState('');
  const [data, setData] = useState([]);
  const [fullData, setFullData] = useState([]);

  const keyExtractor = item => `${item._id}`;

  let [filteredData, setFilteredData] = useState(users);

  const goToUserDetailPage = item =>
    navigation.navigate('Employee Details', {
      screen: 'EmployeeDetail',
      user: {
        _id: item._id,
        empFirstName: item.empFirstName,
        empLastName: item.empLastName,
        empEmailId: item.empEmailId,
        empConfirmEmailId: item.empConfirmEmailId,
        empTitle: item.empTitle,
        empDepartment: item.empDepartment,
        empSalary: item.empSalary,
      },
    });

  const CardListView = () => {
    return (
      <FlatList
        vertical
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={data}
        ItemSeparatorComponent={ItemSeparatorView}
        renderItem={renderItemForCardList}
        keyExtractor={keyExtractor}
      />
    );
  };

  const renderItemForCardList = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => goToUserDetailPage(item)}>
        <View
          style={{
            height: 50,
            flexDirection: 'row',
            backgroundColor: 'white',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: 'grey',
              fontWeight: '700',
              fontSize: 16,
              letterSpacing: 0.5,
              marginStart: 20,
            }}>
            {item.empFirstName} {item.empLastName}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const ItemSeparatorView = () => {
    return <View style={{height: 1, backgroundColor: 'black'}} />;
  };

  function _searchFilterFunction(searchText, users) {
    let newData = [];
    if (searchText) {
      newData = users.filter(function (item) {
        const itemData = item.empFirstName.toUpperCase();
        const textData = searchText.toUpperCase();
        return itemData.includes(textData);
      });
      setFilteredData([...newData]);
    } else {
      setFilteredData([...users]);
    }
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{height: 80, backgroundColor: 'white'}}>
          <Searchbar
            style={{
              marginLeft: 10,
              marginRight: 10,
              marginTop: 15,
              borderWidth: 1,
              borderColor: 'lightgrey',
              shadowOpacity: 0,
            }}
            placeholder="Search"
            // onChangeText={value => {
            //   _searchFilterFunction(value, users);
            // }}
            onChangeText={queryText => onChangeSearch(queryText)}
            // onChangeText={onChangeSearch}
            value={searchQuery}
          />
        </View>
        <CardListView />
      </View>
    </SafeAreaView>
  );
}

export default EmployeeList;
