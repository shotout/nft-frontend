import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from './styles';
import {colors} from '../../shared/styling';
import {push} from '../../helpers/navigationRef';

export default function FAQItem({item}) {
  const [showItem, setShowItem] = useState(false);

  return (
    <View style={styles.ctnRoot}>
      <TouchableOpacity
        style={styles.ctnTitle}
        onPress={() => {
          setShowItem(!showItem);
        }}>
        <View style={styles.txtWrapper}>
          <Text style={styles.txtTitle}>{item.question}</Text>
        </View>
        <AntDesign name="plus" color={colors.dark} size={23} />
      </TouchableOpacity>
      {showItem && (
        <View style={styles.ctnAnswer}>
          <TouchableWithoutFeedback
            onPress={() => {
              if (item.flag) {
                push('SafetyGuideline', {
                  id: item.flag,
                  question: item.question,
                });
              }
            }}>
            <Text style={styles.txtAnswer}>{item.answer}</Text>
          </TouchableWithoutFeedback>
        </View>
      )}
    </View>
  );
}
