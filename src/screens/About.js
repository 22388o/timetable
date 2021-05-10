import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Picker } from '@react-native-picker/picker'
import { useTranslation } from 'react-i18next'
import AsyncStorage from '@react-native-async-storage/async-storage'

// Component
import Button from '../components/Button'

/**
 * About App screen
 **/

const About = () => {
  const { t, i18n } = useTranslation()
  const navigation = useNavigation()

  const [appLanguage, setAppLanguage] = useState(i18n.language)

  const language = [
    { lang: 'en', label: 'English 🇬🇧' },
    { lang: 'ge', label: 'ქართული 🇬🇪' }
  ]

  const changeLangHandler = async languageSelected => {
    setAppLanguage(languageSelected)
    await i18n.changeLanguage(languageSelected)
    await AsyncStorage.setItem('i18NextBusTimetable', languageSelected)
  }

  // Opens Feedback screen
  const feedbackHandler = () => navigation.navigate('Feedback')

  return (
    <View style={styles.container}>
      <Text style={styles.info}>{t('about.info')}</Text>
      <Picker
        selectedValue={appLanguage}
        onValueChange={changeLangHandler}
        style={styles.picker}
      >
        {language.map(({ lang, label }, i) => {
          return <Picker.Item key={i} value={lang} label={label} />
        })}
      </Picker>
      <View style={styles.feedback}>
        <Button
          onPress={feedbackHandler}
          text={t('about.feedbackButton')}
          buttonColor='#c7dceb'
          textColor='black'
        />
      </View>
      <Text>
        {t('about.madeBy')} {new Date().getFullYear()}
      </Text>
    </View>
  )
}

export default About

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#bacfde'
  },
  info: {
    flex: 1,
    top: 10,
    lineHeight: 20
  },
  picker: {
    flex: 3,
    height: 200,
    width: 200
  },
  feedback: {
    bottom: 45
  }
})
