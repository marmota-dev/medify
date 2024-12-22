import { registerRootComponent } from 'expo'
import { createStaticNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import _layoutTab from './tabs/_layout-tab'

const RootStack = createNativeStackNavigator({
  screenOptions: { headerShown: false },
  screens: { tabs: _layoutTab },
})

const Navigation = createStaticNavigation(RootStack)
registerRootComponent(() => <Navigation />)
