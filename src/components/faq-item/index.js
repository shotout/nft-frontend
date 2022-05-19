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
import HTMRenderer from '../html-renderer';

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
        <AntDesign
          name={showItem ? 'minus' : 'plus'}
          color={colors.dark}
          size={23}
        />
      </TouchableOpacity>
      {showItem && (
        <View style={styles.ctnAnswer}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              if (item.flag) {
                push('SafetyGuideline', {
                  id: item.flag,
                  question: item.question,
                });
              }
            }}>
            <HTMRenderer
              tagsStyles={{
                p: styles.txtAnswer,
              }}
              content={item.answer}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
