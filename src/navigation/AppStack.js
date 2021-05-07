import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import Infor from '../screens/Infor';
import Order from '../screens/Order';
import Points from '../screens/Points';
import Store from '../screens/Store';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const Stack = createStackNavigator();
const Bottom=createBottomTabNavigator();
// const StackHome =() =>{
//     return (
//         <Stack.Navigator initialRouteName="Home">
//         <Stack.Screen name="Home" component={Home} />
//       </Stack.Navigator>
//     );
// };
const AppStack = () => {
    return (
        <NavigationContainer>
            <Bottom.Navigator initialRouteName="Home" screenOptions={({route})=>({
                tabBarLabel:({focused})=>{
                    let lable;
                    switch(route.name)
                    {
                          case 'TRANG CHỦ':
                              return lable=<Text style={{fontSize:10,fontWeight:'bold',color:focused?'#FF4000':'grey'}} >TRANG CHỦ</Text> ;
                          case 'ĐẶT MÓN':
                              return lable=<Text style={{fontSize:10,fontWeight:'bold',color:focused?'#FF4000':'grey'}}>ĐẶT MÓN</Text> ;
                          case 'CỬA HÀNG':
                              return lable=<Text style={{fontSize:10,fontWeight:'bold',color:focused?'#FF4000':'grey'}}>CỬA HÀNG</Text> ;
                          case 'TÍCH ĐIỂM':
                              return lable=<Text style={{fontSize:10,fontWeight:'bold',color:focused?'#FF4000':'grey'}}>TÍCH ĐIỂM</Text> ;
                          case 'KHÁC':
                              return lable=<Text style={{fontSize:10,fontWeight:'bold',color:focused?'#FF4000':'grey'}}>KHÁC</Text> ;
                    }
                },
                tabBarIcon:({focused,color})=>{
                    let iconName;
                    if(route.name==="TRANG CHỦ" ){
                        iconName=focused?"home-outline":"home-outline"
                        color =focused?"#FF4000":"grey"
                        return <Ionicons name={iconName} size={25} color={color}/>
                    }
                    else if(route.name==="ĐẶT MÓN"){
                        iconName=focused?"coffee":"coffee"
                        color =focused?"#FF4000":"grey"
                        return <Feather name={iconName} size={25} color={color}/>
                    }
                    else if(route.name==="CỬA HÀNG"){
                        iconName=focused?"storefront-outline":"storefront-outline"
                        color =focused?"#FF4000":"grey"
                        return <MaterialCommunityIcons name={iconName} size={25} color={color}/>
                    }
                    else if(route.name==="TÍCH ĐIỂM"){
                        iconName=focused?"smart-card-outline":"smart-card-outline"
                        color =focused?"#FF4000":"grey"
                        return <MaterialCommunityIcons name={iconName} size={25} color={color}/>
                    }
                    else if(route.name==="KHÁC"){
                        iconName=focused?"reorder-three":"reorder-three"
                        color =focused?"#FF4000":"grey"
                        return <Ionicons name={iconName} size={28} color={color}/>
                    }
                }
            })}>
                <Bottom.Screen name="TRANG CHỦ" component={Home}/>
                <Bottom.Screen name="ĐẶT MÓN" component={Order}/>
                <Bottom.Screen name="CỬA HÀNG" component={Store}/>
                <Bottom.Screen name="TÍCH ĐIỂM" component={Points}/>
                <Bottom.Screen name="KHÁC" component={Infor}/>
            </Bottom.Navigator>
        </NavigationContainer>
    )
}
export default AppStack