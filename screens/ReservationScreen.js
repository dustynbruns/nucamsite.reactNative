import { Picker } from '@react-native-picker/picker';
import * as Animatable from 'react-native-animatable';
import DateTimePicker from '@react-native-community/datetimepicker';

import React, { useState } from 'react';
import { Text, ScrollView, StyleSheet, View, TextInput, Switch, Button, Alert } from 'react-native';

const ReservationScreen = () => {
  const [campers, setCampers] = useState('1');
  const [hikeIn, setHikeIn] = useState(false);
  const [date, setDate] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);

  const handleReservation = () => {
    Alert.alert(
      'Your Reservation OK?',
      `Number of Campers: ${campers}\nHike-In? ${hikeIn ? 'Yes' : 'No'}\nDate: ${date}`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Reservation canceled'),
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: () => {
            setCampers('1');
            setHikeIn(false);
            setDate('');
            setShowCalendar(false);
            console.log('Reservation confirmed');
          }
        }
      ],
      { cancelable: false }
    );
  };

  const handleCampersChange = (value) => {
    setCampers(value);
  };

  const handleHikeInChange = (value) => {
    setHikeIn(value);
  };

  const handleDateChange = (value) => {
    setDate(value);
  };

  return (
    <ScrollView>
      <View style={styles.formRow}>
        <Text style={styles.formLabel}>Number of Campers</Text>
        <TextInput
          style={styles.formItem}
          value={campers}
          keyboardType="numeric"
          onChangeText={handleCampersChange}
        />
      </View>
      <View style={styles.formRow}>
        <Text style={styles.formLabel}>Hike-In?</Text>
        <Switch
          style={styles.formItem}
          value={hikeIn}
          trackColor={{ true: '#5637DD', false: null }}
          onValueChange={handleHikeInChange}
        />
      </View>
      <View style={styles.formRow}>
        <Text style={styles.formLabel}>Date</Text>
        <Button
          onPress={() => setShowCalendar(true)}
          title={date ? new Date(date).toDateString() : 'Select Date'}
          color="#5637DD"
        />
      </View>
      {showCalendar && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display="default"
          onChange={(event, date) => {
            if (date !== undefined) {
              handleDateChange(date.toString());
            }
            setShowCalendar(false);
          }}
        />
      )}
      <View style={styles.formRow}>
        <Button title="Search" color="#5637DD" onPress={handleReservation} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  formRow: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    margin: 20
  },
  formLabel: {
    fontSize: 18,
    flex: 2
  },
  formItem: {
    flex: 1
  }
});

export default ReservationScreen;