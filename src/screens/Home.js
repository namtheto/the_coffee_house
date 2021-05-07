import React, {useState} from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, StatusBar } from 'react-native';
import Swiper from 'react-native-swiper';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeSlideImg from '../data/HomeSlideImg';

const Home = ({navigation}) => {
  return (
    <LinearGradient colors={['#000000','#FF8000','#FFFFFF', '#D8D8D8']} style={styles.main_content}>
      <View style={[styles.header_content]}>
        <Text style={[styles.header_text]}>THE Co̠FFEE Ho̠USE</Text>
        <TouchableOpacity>
          <Ionicons name = "md-card" size={30} style={styles.header_icon_card}/>
        </TouchableOpacity>
      </View>
      <ScrollView>
      <View style={{flex:0.57}} >
          <View style={styles.wrapper}>
            <StatusBar barStyle="light-content" />
       <Swiper  
         dot={
          <View style={styles.dot}/>
          }
          activeDot={
             <View style={styles.active_dot}/>
          }
          paginationStyle={{
          bottom:20
         }}
          autoplay autoplayTimeout={4}>{
          HomeSlideImg.map(item=>{
          return(
            <TouchableOpacity style={styles.swiper_content}>
                 <Image source={{uri:item.url}} style={styles.swiper_img} resizeMode="cover"  />
            </TouchableOpacity>  
          )
        })}
      </Swiper>
      </View>
      <View style={styles.button_content}>
        <TouchableOpacity style={styles.button_moto_touchable}>
          <View style={styles.button_moto_view}>
            <Fontisto name = "motorcycle" size={23} style={styles.button_moto_icon}/>
          </View>
          <Text style={[styles.button_moto_text]}>Giao tận nơi</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button_cup_touchable}>
          <View style={styles.button_cup_view}>
            <MaterialCommunityIcons name = "cup-water" size={23} style={styles.button_cup_icon}/>
          </View>
          <Text style={[styles.button_cup_text]}>Tự đến lấy</Text>
        </TouchableOpacity>
      </View>
    </View>
    <View style={styles.event_content}>
      <TouchableOpacity style={styles.event_touchable_img}>
      <Image source={{uri:'https://storage.googleapis.com/golden-age/75b8b6e1-bef0-40d5-9b59-2a576bee48ea/The-Coffe-House-45k.jpg'}} style={styles.event_img} resizeMode="cover"/>
      </TouchableOpacity>
      <View style={styles.notification_content}>
        <View style={styles.notification_view_name}>
          <Text style={[styles.notification_text_name]}>Thông báo mới</Text>
          <View style={styles.notification_view_number}>
            <Text style={styles.notification_number}>1</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.notification_touchable}>
          <Image source={{uri:'https://image.bnews.vn/MediaUpload/Org/2021/01/23/the-coffee-house2.jpg'}} style={{width:'15%',height:50,borderRadius: 9}} resizeMode="cover"/>
          <View style={[{ marginLeft:18}]}>
            <Text style={[{ fontSize:18}]}>Chào bạn mới</Text>
            <Text style={[{ fontSize:18}]}>2021/04/02-09:59</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
    </ScrollView>
  </LinearGradient>
  )
}
const styles = StyleSheet.create({
  main_content:
  {
    flex:1
  },
  header_content:
  {
    flexDirection:'row',
    height:40,
    justifyContent:'space-between', 
    height:40,
    backgroundColor:'white'
  },
  header_text:
  {
    fontSize:17,
    fontWeight: 'bold',
    marginTop:10,
    marginLeft:15
  },
  header_icon_card:
  {
    color:'#DF3A01',
    marginTop:5, 
    marginLeft:35, 
    marginRight:20
  },
  wrapper: {
    width:'100%',
    height:280,
    //backgroundColor: '#f00'
  },
  swiper_content:
  {
    marginTop:15,
    marginBottom:10,
    alignItems:'center' 
  },
  swiper_img:
  {
    width:'93%',
    height:250,
    borderRadius: 9
  },
  button_content:
  {
    width:'93%',
    marginBottom:10,
    flexDirection:'row',
    justifyContent:'space-between',
    alignSelf:'center'
  },
  button_moto_touchable:
  {
    width:'49%',
    height:100,
    backgroundColor:'white',
    borderRadius: 9
  },
  button_moto_view:
  {
    width:40,
    height:40 ,
    marginLeft:15,
    marginTop:15,
    backgroundColor:'#E0F2F7',
    borderRadius: 20,
    alignItems:'center'
  },
  button_moto_icon:
  {
    marginTop:8,
    color:'#088A85'
  },
  button_moto_text:
  { 
    fontSize:18, 
    fontWeight: 'bold',
    marginLeft:15,
    marginTop:10
  },
  button_cup_touchable:
  {
    width:'49%',
    height:100,
    backgroundColor:'white',
    borderRadius: 9
  },
  button_cup_view:
  {
    width:40,
    height:40 ,
    marginLeft:15,
    marginTop:15,
    backgroundColor:'#F6CECE',
    borderRadius: 20,
    alignItems:'center'
  },
  button_cup_icon:
  {
    marginTop:8,
    color:'#DF0101'
  },
  button_cup_text:
  { 
    fontSize:18, 
    fontWeight: 'bold',
    marginLeft:15,
    marginTop:10
  },
  event_content:
  {
    width:'100%',
    marginTop:10,
    alignItems:'center'
  },
  event_touchable_img:
  {
    width:'93%',
    height:150,
    borderRadius: 9
  },
  event_img:
  {
    height:150,
    borderRadius: 9
  },
  notification_content:
  {
    width:'93%',
    height:150,
    marginTop:10,
    borderRadius: 9,
    backgroundColor:'white'
  },
  notification_view_name:
  {
    flexDirection:'row',
    height:50,
    borderBottomWidth:1,
    borderBottomColor:'#BDBDBD'
  },
  notification_text_name:
  {
    fontSize:18, 
    fontWeight: 'bold', 
    marginTop:15,
    marginLeft:20
  },
  notification_view_number:
  {
    width:18,
    height:18,
    backgroundColor:'#FF0000',
    borderRadius: 9,
    alignItems:'center',
    marginLeft:10, 
    marginTop:15
  },
  notification_number:
  {
    alignSelf:'center',
    color:'white'
  },
  notification_touchable:
  {
    flexDirection:'row',
    height:30,
    marginTop:20,
    marginLeft:20
  },
  dot:{
    backgroundColor: 'rgba(255,255,255,.3)',
    width: 20,
    height: 3,
    marginLeft: 1,
    marginRight: 1,
},
  active_dot:{
    backgroundColor: 'white',
    width: 20,
    height: 3,
    marginLeft: 1,
    marginRight: 1
}
})
export default Home
