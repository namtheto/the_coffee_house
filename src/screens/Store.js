import React, {useEffect, useState} from "react";
import {  SafeAreaView,ScrollView, FlatList, StyleSheet, Text, TouchableOpacity, View, Image,TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getAllStore } from '../services/Api'
import Entypo from 'react-native-vector-icons/Entypo';

const Store = () => {
    const [text, onChangeText] = React.useState("Useless Text");
    const [number, onChangeNumber] = React.useState(null);
    const [AllStore, setAllStore] = useState()
    useEffect(() => {
    // alert('hello')
        const getApiStore = async () => {
        const result = await getAllStore()
        console.log('result', result)
        setAllStore(result.data)
    }
    getApiStore()
  }, [])
    const Header=()=>{
      return(
        <View style={styles.back_time}>
            <Entypo name = "back-in-time" size={23} style={styles.button_seach_icon}/>
            <Text style={styles.back_time_text}>CÁC CỬA HÀNG KHÁC</Text>
        </View>
      )
    }
    const renderItem = ({ item }) => (
      <View style={styles.renderItem_view}>
          <TouchableOpacity style={styles.render_list}>
          <Image style={styles.render_img} source={{ uri: item.image_1}}/>
              <View style={styles.render_group_text}>
                  <Text style={styles.text_coffee}>THE COFFEE HOUSE</Text>
                  <Text style={styles.text_address}>{item.address.full_address}</Text>
                  <Text style={styles.text_far}>{item.far}</Text>
              </View>
          </TouchableOpacity>
      </View>
  );
    return (
        <View>
            <View style={[styles.header_content]}>
                <View style={styles.header_content_1}>
                    <Text style={[styles.header_text]}>THE Co̠FFEE Ho̠USE</Text>
                    <TouchableOpacity>
                        <Ionicons name = "md-card" size={30} style={styles.header_icon_card}/>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row',}}>
                  <View style={styles.seach_content}>
                    <Entypo name = "magnifying-glass" size={23} style={styles.button_seach_icon}/>
                    <TextInput style={styles.seach_input}
                            onChangeText={onChangeText}
                            value={number}
                            placeholder="Nhập tên đường,quận..."
                    />
                  </View>
                  <TouchableOpacity style={{flexDirection:'row'}}>
                    <Ionicons name = "map-sharp" size={25} style={styles.map_icon}/>
                    <Text style={styles.map_text}>BẢN ĐỒ</Text>
                  </TouchableOpacity>
                </View>
            </View>
            <FlatList
                data={AllStore}
                renderItem={renderItem}
                keyExtractor={item => item.id?.toString()}
                style={{height:550}}
                ListHeaderComponent={Header}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    header_content:
  {
    borderBottomWidth:1,
    borderBottomColor:'#D8D8D8',
    height:110,
    backgroundColor:'white'
  },
  header_content_1:
  { 
    flexDirection:'row',
    justifyContent:'space-between'
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
  seach_content:
  {
    width:'65%',
    height: 40,
    marginLeft:15,
    borderRadius: 7,
    marginTop:15,
    flexDirection:'row',
    backgroundColor:'#D8D8D8'
  },
  seach_input:
  {
    width:'90%',
    height: 40,
    marginLeft:15
  },
  button_seach_icon:
  {
      marginLeft:10,
      marginTop:7,
      color:'#A4A4A4'
},
map_icon:
{
  marginTop:20,
  marginLeft:20,
  color:'#A4A4A4'
},
map_text:
{
  fontSize:15,
  marginTop:22,
  marginLeft:10
},
renderItem_view:
    {
        alignItems:'center',
        marginTop:10
    },
    render_list:
    {
        width:'93%',
        height:100, 
        backgroundColor:'white',
        borderRadius:9,
        flexDirection:'row',
        justifyContent:"space-between",
        alignItems:'center',
        borderBottomWidth:0.5,
        borderBottomColor:'#A4A4A4'
    },
    render_group_text:
    {
      marginRight:10,
      width:'65%'
    },
    text_coffee:
    {
      fontWeight:'bold',
      color:'#6E6E6E',
      fontSize:11
    },
    text_address:
    {
        fontWeight:'bold',
        color:'black',
        fontSize:16
    },
    text_far:
    {
        color:'#848484',
        fontSize:15
    },
    text_price:
    {
        color:'#848484',
        fontSize:20
    },
    render_img:
    {
        marginLeft:10,
        width:'25%',
        height:80,
        borderRadius:7
    },
    back_time:
    {
      height:40,
      width:'93%',
      marginTop:20,
      borderRadius:9,
      alignSelf:'center',
      backgroundColor:'#D8D8D8',
      flexDirection:'row'
    },
    back_time_text:
    {
      fontWeight:'bold',
      fontSize:15,
      marginTop:8,
      marginLeft:10,
      color:'#6E6E6E'
    }
})
export default Store
