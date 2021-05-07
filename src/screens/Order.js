import React, {useEffect, useState} from "react";
import { ScrollView,Modal, FlatList,Pressable, StyleSheet, Text, TouchableOpacity, View, Image, InteractionManager, ImageBackground } from 'react-native';

import { getProduct } from '../services/Api'
import { getImage } from '../utils/Index'

import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';


const Order = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [product, setProduct] = useState()
    const [idProduct, setIdProduct] = useState()

    useEffect(() => {
    // alert('hello')
        const getApiProduct = async () => {
        const result = await getProduct()
        setProduct(result.data.data)
        console.log(product)
    }
    getApiProduct()
  }, [])
    const Header=()=>{
        return(
          <View style={styles.flat_header}>
              <Text style={{fontWeight:'bold',fontSize:20}}>Món phải thử</Text>
          </View>
        )
      }
    const renderItem = (item) => (
        <View style={styles.renderItem_view}>
            <TouchableOpacity style={styles.render_list} onPress={() => {
                setModalVisible(!modalVisible)
                setIdProduct(item._id)
            }}>
                <View style={styles.render_group_text}>
                    <Text style={styles.text_name}>{item.product_name}</Text>
                    <Text numberOfLines={2} style={styles.text_review}>{item.description}</Text>
                    <Text style={styles.text_price}>{item.price}₫</Text>
                </View>
                <Image style={styles.render_img} source={{ uri:item.image}}/>
            </TouchableOpacity>
        </View>
    );
    return (
        <View style={styles.main_content}>
            <TouchableOpacity style={styles.header_content}>
                <View style={styles.header_view_icon}>
                    <Fontisto name = "motorcycle" size={23} style={styles.header_icon}/>
                </View>
                <View style={{marginBottom:10}}>
                    <View style={styles.header_view_text}>
                        <Text style={[styles.header_text]}>Giao đến</Text>
                        <Ionicons name = "chevron-down-outline" size={15} style={{marginLeft:2,color:'black'}}/>
                    </View>
                    <Text style={{marginLeft:15}}>Dream Store,Kim Mã,Ngọc Khánh,Ba Đình,..</Text>
                </View>
            </TouchableOpacity>
            <View style={styles.group_button}>
                <TouchableOpacity  style={styles.button_try}>
                    <Text style={styles.button_try_text}>Món phải thử</Text>
                    <Ionicons name = "chevron-down-outline" size={25} style={styles.button_try_icon}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button_seach}>
                    <Entypo name = "magnifying-glass" size={23} style={styles.button_seach_icon}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button_heart}>
                    <Ionicons name = "heart" size={25} style={styles.button_heart_icon}/>
                </TouchableOpacity>
            </View>
            <FlatList
                data={product}
                renderItem={({item})=>renderItem(item)}
                keyExtractor={item => item._id?.toString()}
                style={{height:550}}
                ListHeaderComponent={Header}
            />
            <Modal
                animationType="slide"
                // transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                setModalVisible(!modalVisible);
                }}
            >
          <FlatList
                data={product}
                keyExtractor={item => item._id?.toString()}
                renderItem={({item})=>{
                if(item._id==idProduct)
                console.log(idProduct)
                return( 
                    <View style={{flex: 1}}>
                        <Image style={{width:'100%',height:360,borderRadius:9}} resizeMode="cover" source={{ uri:item.image}}/>
                        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={{position:'absolute',right:10,top:10}} >
                            <Ionicons name = "close-circle" size={40} style={{color:'white'}}/>
                        </TouchableOpacity>
                        <View  style={{borderBottomWidth:7,borderBottomColor:'#E6E6E6'}}>
                        <View style={{width:'90%',marginTop:20,alignSelf:'center'}}>
                            <View style={{backgroundColor:'white',marginBottom:20}}>
                                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                    <Text style={{fontWeight:'bold',color:'black',fontSize:30,width:'60%'}}>{item.product_name}</Text>
                                    <TouchableOpacity >
                                        <Ionicons name = "heart-outline" size={30} style={{color:'#848484',marginLeft:20}}/>
                                        <Text style={{fontWeight:'bold',color:'#848484',}}>YÊU THÍCH</Text>
                                    </TouchableOpacity>
                                </View>
                                <Text style={{color:'#6E6E6E',fontSize:20}}>{item.base_price}đ</Text>
                                <Text  style={{color:'#6E6E6E',fontSize:15,marginTop:10}}>{item.description}</Text>
                            </View>
                        </View>
                        </View>
                        <View style={{backgroundColor:'#FAFAFA'}}>
                            <View style={{width:'90%',marginTop:20,alignSelf:'center'}}>
                            <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:20,backgroundColor:'white'}}>
                                <View>
                                    <Text style={{fontWeight:'bold',fontSize:20,color:'black',}}>Size</Text>
                                    <Text  style={{color:'#6E6E6E',fontSize:15}}>Chọn 1 loại size</Text>
                                </View>
                                <View  style={{backgroundColor:'#F7BE81',width:'25%',height:25,borderRadius:10}}>
                                    <Text style={{fontWeight:'bold',color:'#B43104',alignSelf:'center',marginTop:5,fontSize:12}}>BẮT BUỘC</Text>
                                </View>
                            </View>
                            <View style={{marginTop:1}}>

                            </View>
                        </View>
                        </View>
                        <View></View>
                
                    </View>
                )
                }}
                style={{height:550}}
            />
      </Modal>
    </View>
    )
}
const styles = StyleSheet.create({
    main_content:
    {
        backgroundColor:'#FAFAFA'
    },
    header_content:
    {
        flexDirection:'row',
        backgroundColor:'white'
    },
    header_view_icon:
    {
        width:40,
        height:40 ,
        marginLeft:15,
        marginTop:15,
        backgroundColor:'#E0F2F7',
        borderRadius: 20,
        alignItems:'center'
    },
    header_icon:
    {
        marginTop:8,
        color:'#088A85'
    },
    header_view_text:
    {
        marginTop:13,
        marginLeft:15,
        flexDirection:'row'
    },
    header_text:
    { 
        fontSize:15, 
        fontWeight: 'bold'
    },
    group_button:
    {
        flexDirection:'row',
        height:60,
        alignItems:'center',
        borderBottomWidth:1,
        borderBottomColor:'#D8D8D8'
    },
    button_try:
    {
        flexDirection:'row',
        backgroundColor:'#D8D8D8',
        height:35,
        width:'65%'
        ,marginLeft:15,
        borderRadius:7,
        alignItems:'center',
        justifyContent:'space-between'
    },
    button_try_text:
    {
        marginLeft:10,
        fontSize:15
    },
    button_try_icon:
    {
        marginRight:10,
        color:'#A4A4A4'
    },
    button_seach:
    {
        backgroundColor:'#D8D8D8',
        height:35,
        width:'10%',
        marginLeft:15,
        borderRadius:7,
        alignItems:'center'
    },
    button_seach_icon:
    {
        marginTop:5,
        color:'#A4A4A4'
    },
    button_heart:
    {
        backgroundColor:'#D8D8D8',
        height:35,
        width:'10%',
        marginLeft:15,
        borderRadius:7,
        alignItems:'center'
    },
    button_heart_icon:
    {
        marginTop:5,
        color:'#A4A4A4'
    },
    renderItem_view:
    {
        alignItems:'center',
        marginTop:10
    },
    render_list:
    {
        width:'93%',
        height:120, 
        backgroundColor:'white',
        borderRadius:9,
        flexDirection:'row',
        justifyContent:"space-between",
        alignItems:'center',
        borderBottomWidth:0.5,
        borderBottomColor:'#D8D8D8'
    },
    render_group_text:
    {
        marginLeft:20,
        width:'65%'
    },
    text_name:
    {
        fontWeight:'bold',
        color:'black',
        fontSize:18
    },
    text_review:
    {
        color:'#848484',
        fontSize:15,
       
    },
    text_price:
    {
        color:'#848484',
        fontSize:17
    },
    render_img:
    {
        width:'25%',
        height:90,
        marginRight:10,
        borderRadius:7
    },
    flat_header:
    {
        marginTop:15,
        marginLeft:25,
        marginBottom:5
    },
})

export default Order
