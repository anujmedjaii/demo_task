/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  FlatList,
  TextInput,
  Button,
  Alert,
  Platform,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import realm, {getAllUsers, addUser} from '../../Database';

const EmployeeForm = ({navigation}) => {
  const [users, setUsers] = useState(getAllUsers());
  //const goToUserListPage = () => navigation.navigate('EmployeeList');
  const goToUserListPage = () =>
    navigation.navigate('Employee List', {screen: 'EmployeeList'});

  const [user, setUser] = useState({
    empFirstName: '',
    empLastName: '',
    empEmailId: '',
    empConfirmEmailId: '',
    empTitle: '',
    empDepartment: '',
    empSalary: '',
  });

  const TopStatusBarView = () => {
    return <View style={styles.topStatusBarView}></View>;
  };

  const HeaderView = () => {
    return (
      <View
        style={{
          flex: 1,
          height: 50,
          backgroundColor: 'transparent',
          marginLeft: 20,
          marginRight: 20,
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <View
          style={{
            flex: 1 / 1,
            height: 50,
            backgroundColor: 'transparent',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Text style={styles.HeaderTitle}>Employee Form</Text>
        </View>

        <View
          style={{
            flex: 1 / 2,
            height: 50,
            backgroundColor: 'transparent',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Button color="green" title="User Listing" onPress={goToUserList} />
        </View>
      </View>
    );
  };

  const InputTextField = props => {
    return (
      <View style={styles.TextInputView}>
        <TextInput
          style={{height: 50, marginLeft: 5, marginRight: 5}}
          placeholder={props.placeholder}
          value={props.value}
          onChangeText={props.onChangeText}
          autoFocus={false}
          //returnKeyType= 'next'
          //defaultValue=""
        />
      </View>
    );
  };

  const SaveBtn = () => {
    return (
      <View
        style={{
          height: 80,
          backgroundColor: 'transparent',
          marginLeft: 20,
          marginRight: 20,
        }}>
        <Button
          style={{
            height: 80,
          }}
          color="green"
          title="Add User"
          onPress={saveEmployeeData}
        />
      </View>
    );
  };

  const goToUserList = () => {
    if (users.length < 0) {
      Alert.alert('No data in list.');
      return;
    }
    goToUserListPage();
  };

  const saveEmployeeData = async () => {
    if (!user.empFirstName) {
      Alert.alert('Please enter employee first name.');
      return;
    }
    if (!user.empLastName) {
      Alert.alert('Please enter employee last name.');
      return;
    }
    if (!user.empEmailId) {
      Alert.alert('Please enter employee email id.');
      return;
    }
    if (!user.empConfirmEmailId) {
      Alert.alert('Please enter employee confirm email id.');
      return;
    }
    // if !(user.empEmailId === user.empConfirmEmailId) {
    //   Alert.alert('Please enter same email id.');
    // }
    if (!user.empTitle) {
      Alert.alert('Please enter employee title.');
      return;
    }
    if (!user.empDepartment) {
      Alert.alert('Please enter employee department.');
      return;
    }
    if (!user.empSalary) {
      Alert.alert('Please enter employee salary.');
      return;
    }
    addUser(
      Math.floor(Math.random() * 500),
      user.empFirstName,
      user.empLastName,
      user.empEmailId,
      user.empConfirmEmailId,
      user.empTitle,
      user.empDepartment,
      user.empSalary,
    );
  };

  const FormListView = () => {
    return (
      <FlatList
        vertical
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={<HeaderViewForFlatList />}
        //keyboardShouldPersistTaps="never"
      />
    );
  };

  const HeaderViewForFlatList = () => {
    return (
      <View style={{height: 570, backgroundColor: 'white'}}>
        <TopStatusBarView />
        <HeaderView />
        <InputTextField
          placeholder="Employee First Name"
          value={user.empFirstName}
          onChangeText={text => setUser({...user, empFirstName: text})}
        />
        <InputTextField
          placeholder="Employee Last Name"
          value={user.empLastName}
          onChangeText={text => setUser({...user, empLastName: text})}
        />
        <InputTextField
          placeholder="Employee Email ID"
          value={user.empEmailId}
          onChangeText={text => setUser({...user, empEmailId: text})}
        />
        <InputTextField
          placeholder="Employee Confirm Email ID"
          value={user.empConfirmEmailId}
          onChangeText={text => setUser({...user, empConfirmEmailId: text})}
        />
        <InputTextField
          placeholder="Employee Title"
          value={user.empTitle}
          onChangeText={text => setUser({...user, empTitle: text})}
        />
        <InputTextField
          placeholder="Employee Department"
          value={user.empDepartment}
          onChangeText={text => setUser({...user, empDepartment: text})}
        />
        <InputTextField
          placeholder="Employee Salary"
          value={user.empSalary}
          onChangeText={text => setUser({...user, empSalary: text})}
        />
        <SaveBtn />
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? '' : ''}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <FormListView />
          {/* <ScrollView keyboardShouldPersistTaps="handled">
            <View style={styles.container}>
              <TopStatusBarView />
              <HeaderView />
              <EmployeeFirstName />
              <EmployeeLastName />
              <EmployeeEmail />
              <EmployeeConfirmEmail />
              <EmployeeTitle />
              <EmployeeDepartment />
              <EmployeeSalary />
              <SaveBtn />
            </View>
          </ScrollView> */}
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topStatusBarView: {
    backgroundColor: 'white',
    height: Platform.OS === 'ios' ? 0 : 30,
  },
  HeaderTitle: {
    fontWeight: 'bold',
    fontStyle: 'normal',
    fontSize: 25,
    textAlign: 'center',
    color: 'black',
  },
  TextInputView: {
    height: 50,
    backgroundColor: 'transparent',
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    borderColor: 'gray',
    borderWidth: 1,
  },
});

export default EmployeeForm;
