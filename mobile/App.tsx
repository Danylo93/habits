import './src/lib/dayjs';
import * as Notifications from 'expo-notifications';
import { StatusBar, Button } from 'react-native';
import { 
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold
} from '@expo-google-fonts/inter';

import { Loading } from './src/components/Loading';
import { Routes } from './src/routes';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false
  }),
})


export default function App() {


  
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold
  });

  async function scheduleNotification(){
    const trigger = new Date(Date.now());
    trigger.setMinutes(trigger.getMinutes() + 1);
    console.log(trigger)

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Ola, Danylo :)',
        body: 'Você praticou seus hábitos hoje?'
      },
      trigger
    })
  }

  if (!fontsLoaded) {
    return (
      <Loading />
    );
  }

  return (
    <>
    
      <Routes />

      <StatusBar barStyle="light-content" backgroundColor="transparent" />
      <Button title='Enviar notificação' onPress={scheduleNotification}/>
    </>
  );
}
