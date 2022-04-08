import {View, SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import DataTile from '../Components/DataTile';

const EmployeeDetail = ({navigation, route}) => {
  const {user} = route.params;

  return (
    <SafeAreaView style={styles.bodyView}>
      <View style={styles.bodyView}>
        <DataTile title="Employee Id:" value={user.id} />
        <DataTile title="Employee First Name:" value={user.empFirstName} />
        <DataTile title="Employee Last Name:" value={user.empLastName} />
        <DataTile title="Employee Email Id:" value={user.empEmailId} />
        <DataTile
          title="Employee Confirm Email Id:"
          value={user.empConfirmEmailId}
        />
        <DataTile title="Employee Title:" value={user.empTitle} />
        <DataTile title="Employee Department:" value={user.empDepartment} />
        <DataTile title="Employee Salary:" value={user.empSalary} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bodyView: {flex: 1, backgroundColor: 'white'},
});

export default EmployeeDetail;
