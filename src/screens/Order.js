import React, { useEffect, useState } from "react";
import { Modal, FlatList, TextInput, StyleSheet, Text, TouchableOpacity, View, Image, Switch, ImageBackground, ScrollView } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from '../reducers/productReducer';
import { getCategorys } from '../reducers/categoryReducer';
import LinearGradient from 'react-native-linear-gradient';
import { SwipeListView } from 'react-native-swipe-list-view';
import StickyHeaderFlatlist from 'react-native-sticky-header-flatlist';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const Order = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalCart, setModalCart] = useState(false);
    const [heart, setHeart] = useState(false);
    const addFavorite = () => {
        setHeart(!heart);
    };
    const [select, setSelect] = useState(false);
    const Select = () => {
        setSelect(!select);
    };
    const [checkedSize, setCheckedSize] = useState();
    const [text, onChangeText] = React.useState("Useless Text");
    const [number, onChangeNumber] = React.useState(null);
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const [productSelected, setProductSelected] = useState([])
    const dispatch = useDispatch();
    const productData = useSelector((store) => store.productReducer.products);
    const categoryData = useSelector((store) => store.categoryReducer.categorys);
    useEffect(() => {
        dispatch(getProducts());
        dispatch(getCategorys());
    }, [])
    const categoryID = categoryData.map(e => e.id)
    const groupData = productData?.length && categoryID?.map(e => ({
        category: e,
        productList: productData?.filter(el => el?.categ_id?.includes(e)),
    })) || [];
    const data = useSelector((store) => store.cartReducer.cart);
    const onAddCart = () => {
        dispatch({ type: 'ADD_CART', detail: productSelected })
    }
    const onRemoveAll = () => dispatch({ type: 'REMOVE_ALL' })
    const onRemoveItem = (item) => () => dispatch({ type: 'REMOVE_ITEM', data: item })
    const onChangeQuantity = (type, item) => () => {
        // dispatch({ type: 'CHANGE_QUANTITY', data: item, quantityType: type })
        if (type === 'increase') {
            dispatch({ type: 'ADD_CART', detail: item })
        } else {
            dispatch({ type: 'REDUCE_ITEM', detail: item })
        }
    }

    const renderHiddenItem = ({ item }) => (
        <View style={{ backgroundColor: '#f2f2f2', height: 100, flexDirection: 'row', justifyContent: 'flex-end', }}>
            <TouchableOpacity style={[{ backgroundColor: 'grey', width: 75, height: 75, marginHorizontal: 10, borderRadius: 8, justifyContent: 'center', alignItems: 'center' }]} onPress={() => {
                setModalVisible(!modalVisible)
                setProductSelected(item)
            }}>
                <Entypo name="pencil" size={25} style={{ color: 'white' }} />
                <Text style={{ color: '#FFF', fontSize: 10, fontWeight: 'bold' }}>CHỈNH SỬA</Text>
            </TouchableOpacity>
            <View style={{ backgroundColor: '#FF8C00', width: 75, height: 75, marginHorizontal: 10, borderRadius: 8 }} >
                <TouchableOpacity style={{ backgroundColor: '#FF8C00', width: 75, height: 37, borderTopRightRadius: 8, borderTopLeftRadius: 8, alignItems: 'center' }}
                    onPress={onChangeQuantity('increase', item)}>
                    <Ionicons name="add-outline" size={25} color={'black'} style={{ marginTop: 5 }} />
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: '#FF8C00', width: 75, height: 38, borderBottomRightRadius: 8, borderBottomLeftRadius: 8, alignItems: 'center' }}
                    onPress={onChangeQuantity('reduce', item)}>
                    <Ionicons name="md-remove" size={25} color={'black'} style={{ marginTop: 5 }} />
                </TouchableOpacity>
                <Text style={{ color: '#FFF', fontSize: 15, marginTop: 26, fontWeight: 'bold', alignSelf: 'center', position: 'absolute' }}>{item?.quantity}x</Text>
            </View>
            <TouchableOpacity style={[{ backgroundColor: 'red', width: 75, height: 75, marginHorizontal: 10, borderRadius: 8, justifyContent: 'center', alignItems: 'center' }]} onPress={onRemoveItem(item)}>
                <FontAwesome name="trash" size={25} style={{ color: 'white' }} />
                <Text style={{ color: '#FFF', fontSize: 10, fontWeight: 'bold' }}>BỎ CHỌN</Text>
            </TouchableOpacity>
        </View>
    );
    const renderItem = (item) => (
        <View style={styles.renderItem_view}>
            <TouchableOpacity style={styles.render_list} onPress={() => {
                setModalVisible(!modalVisible)
                setProductSelected(item)
            }}>
                <View style={styles.render_group_text}>
                    <Text style={styles.text_name}>{item.product_name}</Text>
                    <Text numberOfLines={2} style={styles.text_review}>{item.description}</Text>
                    <Text style={styles.text_price}>{item.price}₫</Text>
                </View>
                <Image style={styles.render_img} source={{ uri: item.image }} />
            </TouchableOpacity>
        </View>
    );
    const renderHeader = ({ item }) => {
        const category = categoryData?.find(e => e.id === item?.category)
        return (
            <View style={styles.group_button}>
                <TouchableOpacity style={styles.button_try}>
                    <Text style={styles.button_try_text}>{category?.name}</Text>
                    <Ionicons name="chevron-down-outline" size={25} style={styles.button_try_icon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button_seach}>
                    <Entypo name="magnifying-glass" size={23} style={styles.button_icon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button_heart}>
                    <Ionicons name="heart" size={25} style={styles.button_icon} />
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <View style={styles.main_content}>
            <TouchableOpacity style={styles.header_content}>
                <View style={styles.header_view_icon}>
                    <Fontisto name="motorcycle" size={23} style={styles.header_icon} />
                </View>
                <View style={{ marginBottom: 10 }}>
                    <View style={styles.header_view_text}>
                        <Text style={[styles.header_text]}>Giao đến</Text>
                        <Ionicons name="chevron-down-outline" size={15} style={{ marginLeft: 2, color: 'black' }} />
                    </View>
                    <Text style={{ marginLeft: 15 }}>Dream Store,Kim Mã,Ngọc Khánh,Ba Đình,..</Text>
                </View>
            </TouchableOpacity>
            {groupData?.length ?
                <StickyHeaderFlatlist
                    data={groupData}
                    style={{ height: 'auto' }}
                    keyExtractor={(_, i) => i + ""}
                    childrenKey={"productList"}
                    renderHeader={renderHeader}
                    renderItem={({ item }) => renderItem(item)}
                /> : null}
            <TouchableOpacity style={{ width: '100%', marginBottom: 5, marginTop: 590, alignSelf: 'center', position: 'absolute' }} onPress={() => setModalCart(!modalCart)}>
                <LinearGradient colors={['#3B170B', '#FE9A2E', '#8A2908']}
                    start={{ x: 0, y: 0.01 }} end={{ x: 2.5, y: 1.5 }}
                    locations={[0, 0, 1]}
                    style={{ width: '93%', height: 60, alignSelf: 'center', borderRadius: 9, justifyContent: 'space-between', flexDirection: 'row' }}>
                    <View>
                        <Text style={{ color: 'white', marginTop: 10, marginLeft: 20, fontSize: 15, fontWeight: 'bold' }}>1 món trong giỏ hàng</Text>
                        <Text style={{ color: 'white', marginLeft: 20, fontSize: 15, fontWeight: 'bold' }}>50.000đ</Text>
                    </View>
                    <View style={{ width: '25%', height: 28, marginRight: 20, backgroundColor: 'white', alignSelf: 'center', borderRadius: 15 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 15, marginTop: 3, marginLeft: 7, color: '#FE9A2E' }}>GIỎ HÀNG</Text>
                    </View>
                </LinearGradient>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View>
                    <ScrollView style={{ width: '100%' }}>
                        <View style={{ flex: 1 }}>
                            <Image style={{ width: '100%', height: 360, borderRadius: 9 }} resizeMode="cover" source={{ uri: productSelected?.image }} />
                            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={{ position: 'absolute', right: 10, top: 10 }} >
                                <Ionicons name="close-circle" size={40} style={{ color: 'white' }} />
                            </TouchableOpacity>
                            <View style={{ borderBottomWidth: 1, borderBottomColor: '#E6E6E6' }}>
                                <View style={{ width: '90%', marginTop: 20, alignSelf: 'center' }}>
                                    <View style={{ backgroundColor: 'white', marginBottom: 20 }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 30, width: '60%' }}>{productSelected?.product_name}</Text>
                                            <View style={{ marginRight: 30, alignItems: 'center', marginTop: 10 }}>
                                                <TouchableOpacity onPress={() => addFavorite()}>
                                                    <AntDesign name={heart ? 'heart' : 'hearto'} color={heart ? '#990000' : 'grey'} size={23} />
                                                </TouchableOpacity>
                                                <Text style={{ color: 'grey', fontSize: 13, fontWeight: 'bold' }}>YÊU THÍCH</Text>
                                            </View>
                                        </View>
                                        <Text style={{ color: '#6E6E6E', fontSize: 20 }}>{productSelected?.base_price}đ</Text>
                                        <Text style={{ color: '#6E6E6E', fontSize: 15, marginTop: 10 }}>{productSelected?.description}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ width: '100%', alignSelf: 'center' }}>
                                <View style={{ height: 10, backgroundColor: '#f2f2f2', width: '100%', alignSelf: 'flex-end' }} />
                                {productSelected != 0 && productSelected?.options.length == 2 ?
                                    <View style={{ height: 'auto' }}>
                                        <View style={{ height: 80, borderBottomWidth: 0.7, borderBottomColor: 'silver' }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15, marginTop: 20 }}>
                                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{productSelected?.options[0].name}</Text>
                                                <View style={{ borderRadius: 50, backgroundColor: '#FBE1C4', width: 80, alignItems: 'center', justifyContent: 'center', height: 30 }}>
                                                    <Text style={{ color: '#CA4600', fontSize: 12, fontWeight: 'bold' }}>BẮT BUỘC </Text>
                                                </View>
                                            </View>
                                            <Text style={{ marginLeft: 15, color: 'grey' }}>{productSelected?.options[0].desciption}</Text>
                                        </View>
                                        <View style={{ height: 'auto', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <View style={{ height: 'auto', width: '100%' }}>
                                                {productSelected.length != 0 ?
                                                    productSelected?.options[0]?.items.map((e, i) => {
                                                        return (
                                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 60, left: 15, borderBottomColor: 'silver', borderBottomWidth: 0.5 }} key={i}>
                                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                                    <TouchableOpacity onPress={() => setCheckedSize(e.product_id)}>
                                                                        <FontAwesome name={checkedSize == e.product_id ? 'dot-circle-o' : 'circle-thin'} color={checkedSize == e.product_id ? '#fe8f01' : 'grey'} size={23} key={i} />
                                                                    </TouchableOpacity>
                                                                    <Text style={{ marginLeft: 10 }}>{e.val}</Text>
                                                                </View>
                                                                <Text style={{ marginRight: '7%' }}>+{e.price}đ</Text>
                                                            </View>
                                                        )
                                                    }) : null
                                                }
                                            </View>
                                        </View>
                                    </View>
                                    : null
                                }
                                <View style={{ height: 10, backgroundColor: '#f2f2f2', width: '100%', alignSelf: 'flex-end' }} />
                                {productSelected != 0 && productSelected?.options.length == 2 ?
                                    <View style={{ height: 'auto' }}>
                                        <View style={{ height: 80, borderBottomWidth: 0.7, borderBottomColor: 'silver' }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15, marginTop: 20 }}>
                                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{productSelected?.options[1].name}</Text>
                                                <View style={{ borderRadius: 50, backgroundColor: 'silver', width: 80, alignItems: 'center', justifyContent: 'center', height: 30 }}>
                                                    <Text style={{ color: 'grey', fontSize: 12, fontWeight: 'bold' }}>TÙY CHỌN</Text>
                                                </View>
                                            </View>
                                            <Text style={{ marginLeft: 15, color: 'grey' }}>{productSelected?.options[1].desciption}</Text>
                                        </View>
                                        {productSelected.length != 0 ?
                                            productSelected?.options[1]?.items.map((e, i) => (
                                                <View key={i}>
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 60, left: 15, borderBottomColor: 'silver', borderBottomWidth: 0.5 }}>
                                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                            <TouchableOpacity style={{}} onPress={() => Select()}>
                                                                <Ionicons name={select ? 'checkmark-circle-outline' : 'ellipse-outline'} color={select ? '#fe8f01' : 'grey'} size={23} />
                                                            </TouchableOpacity>
                                                            <Text>{e.product_name}</Text>
                                                        </View>
                                                        <Text style={{ marginRight: '7%' }}>+ {e.price}đ</Text>
                                                    </View>
                                                </View>
                                            )) : null
                                        }
                                    </View>
                                    : null
                                }
                                <View style={{ width: '100%', height: 40, marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ marginLeft: 20 }}>
                                        <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'black', }}>Yêu cầu khác</Text>
                                    </View>
                                    <View style={{ backgroundColor: '#D8D8D8', width: '25%', height: 25, marginRight: 20, borderRadius: 10 }}>
                                        <Text style={{ fontWeight: 'bold', color: '#A4A4A4', alignSelf: 'center', marginTop: 5, fontSize: 12 }}>TÙY CHỌN</Text>
                                    </View>
                                </View>
                                <TextInput style={{ width: '90%', height: 40, marginLeft: 20, marginBottom: 10, borderWidth: 1, borderColor: '#D8D8D8', borderRadius: 9 }}
                                    onChangeText={onChangeText}
                                    value={number}
                                    placeholder="Ví dụ: Ít đá, nhiều đường,..."
                                />
                            </View>
                        </View>
                        <View style={{ width: '100%', height: 50, }}>
                            <TouchableOpacity onPress={onAddCart}>
                                <LinearGradient colors={['#8A2908', '#DF3A01', '#FE9A2E']}
                                    start={{ x: 0, y: 0.01 }} end={{ x: 2.5, y: 1.5 }}
                                    locations={[0, 0, 1]}
                                    style={{ width: '80%', height: 45, alignSelf: 'center', borderRadius: 9 }}>
                                    <Text style={{ fontWeight: 'bold', color: 'white', alignSelf: 'center', marginTop: 5, fontSize: 18 }}>Chọn món - {productSelected?.base_price}đ</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                // transparent={true}
                visible={modalCart}
                onRequestClose={() => {
                    setModalCart(!modalCart);
                }}>
                <View style={{ backgroundColor: '#FAFAFA' }}>
                    <View style={{ width: '100%', height: 50, alignItems: 'center', flexDirection: 'row', borderBottomWidth: 1, backgroundColor: 'white', borderBottomColor: '#F2F2F2' }}>
                        <Text style={{ fontSize: 20, marginLeft: 90, }}>Xác nhận đơn hàng</Text>
                        <TouchableOpacity onPress={() => setModalCart(!modalCart)} style={{ position: 'absolute', right: 30 }} >
                            <Ionicons name="close" size={30} style={{ color: 'black' }} />
                        </TouchableOpacity>
                    </View>
                    <SwipeListView
                        data={data}
                        renderHiddenItem={renderHiddenItem}
                        leftOpenValue={0}
                        rightOpenValue={-285}
                        keyExtractor={item => item._id?.toString()}
                        renderItem={({ item }) => {
                            return (
                                <View>
                                    <View style={{ width: '100%', alignItems: "center", backgroundColor: 'white' }}>
                                        <View style={{ width: '93%', marginTop: 15 }}>
                                            <View style={{ width: '100%', flexDirection: 'row' }}>
                                                <TouchableOpacity style={{ width: '8%', height: 25, }}>
                                                    <Image
                                                        source={require('../assets/Icon/pencil.png')}
                                                        style={{
                                                            marginTop: 9,
                                                        }}
                                                    />
                                                </TouchableOpacity>
                                                <TouchableOpacity style={{ width: '85%', height: 60, marginLeft: 20, borderBottomWidth: 1, borderBottomColor: '#F2F2F2' }}>
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                        <View style={{ flexDirection: 'row' }}>
                                                            <Text style={{ fontWeight: 'bold', fontSize: 18, marginRight: 5 }}>{item?.quantity}x</Text>
                                                            <Text style={{ fontWeight: 'bold', fontSize: 18, marginRight: 5 }}>{item.product_name}</Text>
                                                        </View>
                                                        <Text style={{ fontSize: 18, marginRight: 5 }}>{item.base_price * item?.quantity}đ</Text>
                                                    </View>
                                                    <Text style={{ fontSize: 15, color: '#A4A4A4', }}>Vừa</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            )
                        }}
                        ListHeaderComponent={({ Header }) => {
                            return (
                                <View>
                                    <View style={{ width: '100%', height: 60, marginTop: 15, alignItems: 'center', borderBottomWidth: 2, backgroundColor: 'white', borderBottomColor: '#F2F2F2' }}>
                                        <View style={{ width: '93%', marginTop: 15, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={{ fontSize: 23, fontWeight: 'bold' }}>Giao tận nơi</Text>
                                            <TouchableOpacity style={{ backgroundColor: '#F8ECE0', width: '23%', height: 30, marginRight: 20, borderRadius: 12 }}>
                                                <Text style={{ fontWeight: 'bold', color: '#B43104', alignSelf: 'center', marginTop: 5, fontSize: 12 }}>THAY ĐỔI</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={{ width: '100%', height: 230, alignItems: 'center', borderBottomWidth: 1, backgroundColor: 'white', borderBottomColor: '#F2F2F2' }}>
                                        <View style={{ width: '93%', marginTop: 15, justifyContent: 'space-between' }}>
                                            <TouchableOpacity style={{ flexDirection: 'row', marginBottom: 15 }}>
                                                <View>
                                                    <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 3 }}>463 Hoàng Quốc Việt</Text>
                                                    <Text style={{ fontSize: 16, color: '#6E6E6E' }}>463 Hoàng Quốc Việt, Cổ Nhuế 1, Từ Liêm, Hà...</Text>
                                                </View>
                                                <Ionicons name="chevron-forward-outline" size={25} style={styles.button_try_icon} />
                                            </TouchableOpacity>
                                            <TouchableOpacity>
                                                <Text style={{ fontSize: 16, color: '#A4A4A4' }}>Thêm hướng dẫn giao hàng</Text>
                                            </TouchableOpacity>
                                            <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <TouchableOpacity style={{ width: '50%', borderRightWidth: 1, borderRightColor: '#BDBDBD' }}>
                                                    <Text style={{ fontSize: 18, }}>Nam Tô</Text>
                                                    <Text style={{ fontSize: 16, }}>0947410918</Text>
                                                    <Image
                                                        source={require('../assets/Icon/Capturre.png')}
                                                        style={{
                                                            width: '90%',
                                                            height: 10,
                                                            marginTop: 9
                                                        }} />
                                                </TouchableOpacity>
                                                <TouchableOpacity style={{ width: '50%' }}>
                                                    <View style={{ marginLeft: 20 }}>
                                                        <Text style={{ fontSize: 18, color: '#A4A4A4', fontWeight: 'bold' }}>15-30 phút</Text>
                                                        <Text style={{ fontSize: 16, }}>Càng sớm càng tốt</Text>
                                                    </View>
                                                    <Image
                                                        source={require('../assets/Icon/Capturre.png')}
                                                        style={{
                                                            width: '90%',
                                                            height: 10,
                                                            marginTop: 9,
                                                            marginLeft: 15
                                                        }}
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                            <View style={{ marginTop: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <Text style={{ fontSize: 17, }}>Lưu thông tin giao hàng cho lần sau</Text>
                                                <Switch
                                                    trackColor={{ false: "#BDBDBD", true: "#BDBDBD" }}
                                                    thumbColor={isEnabled ? "#8A2908" : "#8A2908"}
                                                    ios_backgroundColor="#3e3e3e"
                                                    onValueChange={toggleSwitch}
                                                    value={isEnabled}
                                                />
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ width: '100%', height: 60, marginTop: 15, alignItems: 'center', borderBottomWidth: 1, backgroundColor: 'white', borderBottomColor: '#F2F2F2' }}>
                                        <View style={{ width: '93%', marginTop: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={{ fontSize: 23, fontWeight: 'bold' }}>Các món đã chọn</Text>
                                            <TouchableOpacity style={{ backgroundColor: '#F8ECE0', width: '23%', height: 30, marginRight: 20, borderRadius: 12 }}>
                                                <Text style={{ fontWeight: 'bold', color: '#B43104', alignSelf: 'center', marginTop: 5, fontSize: 12 }}>+THÊM MÓN</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={{ backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#F2F2F2' }}>
                                        <TextInput style={{ width: '90%', height: 50, marginLeft: 20, marginBottom: 5 }}
                                            onChangeText={onChangeText}
                                            value={number}
                                            placeholder="Thêm ghi chú đơn hàng..."
                                        />
                                    </View>
                                </View>
                            )
                        }}
                        ListFooterComponent={({ Footer }) => {
                            return (
                                <View >
                                    <View style={{ width: '100%', height: 60, marginTop: 15, alignItems: 'center', borderBottomWidth: 1, backgroundColor: 'white', borderBottomColor: '#F2F2F2' }}>
                                        <View style={{ width: '93%', marginTop: 15 }}>
                                            <Text style={{ fontSize: 23, fontWeight: 'bold' }}>Tổng cộng</Text>
                                        </View>
                                    </View>
                                    <View style={{ width: '100%', alignItems: 'center', backgroundColor: 'white' }}>
                                        <View style={{ width: '93%', height: 50, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#F2F2F2' }}>
                                            <Text style={{ fontSize: 20 }}>Tổng cộng</Text>
                                            <Text style={{ fontSize: 20 }}>209.000đ</Text>
                                        </View>
                                    </View>
                                    <View style={{ width: '100%', alignItems: 'center', backgroundColor: 'white' }}>
                                        <TouchableOpacity style={{ width: '93%', height: 50, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#F2F2F2' }}>
                                            <Text style={{ fontSize: 20, color: '#5858FA' }}>Chọn khuyến mãi</Text>
                                            <Ionicons name="chevron-forward-outline" size={20} style={styles.button_try_icon} />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ width: '100%', alignItems: 'center', backgroundColor: 'white' }}>
                                        <View style={{ width: '93%', height: 50, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#F2F2F2' }}>
                                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Số tiền thanh toán</Text>
                                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>209.000đ</Text>
                                        </View>
                                    </View>
                                    <View style={{ width: '100%', height: 60, marginTop: 15, alignItems: 'center', borderBottomWidth: 1, backgroundColor: 'white', borderBottomColor: '#F2F2F2' }}>
                                        <View style={{ width: '93%', marginTop: 15 }}>
                                            <Text style={{ fontSize: 23, fontWeight: 'bold' }}>Thanh toán</Text>
                                        </View>
                                    </View>
                                    <View style={{ width: '100%', alignItems: 'center', backgroundColor: 'white' }}>
                                        <TouchableOpacity style={{ width: '93%', height: 50, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#F2F2F2' }}>
                                            <Text style={{ fontSize: 18, color: '#5858FA' }}>Bấm để chọn phương thức thanh toán</Text>
                                            <Ionicons name="chevron-forward-outline" size={20} style={styles.button_try_icon} />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ width: '100%', alignItems: 'center', backgroundColor: 'white' }}>
                                        <TouchableOpacity style={{ width: '93%', height: 50, alignItems: 'center', flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#F2F2F2' }} onPress={onRemoveAll}>
                                            <Fontisto name="trash" size={20} style={{ color: '#FF0000' }} />
                                            <Text style={{ fontSize: 18, marginLeft: 15, color: '#FF0000' }}>Xóa đơn hàng</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        }}
                        style={{ height: 'auto' }}
                    />
                    <TouchableOpacity style={{ width: '100%', alignSelf: 'center' }}>
                        <LinearGradient colors={['#3B170B', '#FE9A2E', '#8A2908']}
                            start={{ x: 0, y: 0.01 }} end={{ x: 2.5, y: 1.5 }}
                            locations={[0, 0, 1]}
                            style={{ width: '100%', height: 70, alignSelf: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
                            <View>
                                <Text style={{ color: 'white', marginTop: 10, marginLeft: 20, fontSize: 20, fontWeight: 'bold' }}>Giao tận nơi * 5 món</Text>
                                <Text style={{ color: 'white', marginLeft: 20, fontSize: 15, fontWeight: 'bold' }}>50.000đ</Text>
                            </View>
                            <View style={{ width: '25%', height: 28, marginRight: 20, backgroundColor: 'white', alignSelf: 'center', borderRadius: 15 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 15, marginTop: 3, marginLeft: 7, color: '#FE9A2E' }}>ĐẶT HÀNG</Text>
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View >
    )
}
const styles = StyleSheet.create({
    main_content:
    {
        backgroundColor: '#F2F2F2'
    },
    header_content:
    {
        flexDirection: 'row',
        backgroundColor: 'white'
    },
    header_view_icon:
    {
        width: 40,
        height: 40,
        marginLeft: 15,
        marginTop: 15,
        backgroundColor: '#E0F2F7',
        borderRadius: 20,
        alignItems: 'center'
    },
    header_icon:
    {
        marginTop: 8,
        color: '#088A85'
    },
    header_view_text:
    {
        marginTop: 13,
        marginLeft: 15,
        flexDirection: 'row'
    },
    header_text:
    {
        fontSize: 15,
        fontWeight: 'bold'
    },
    group_button:
    {
        backgroundColor: '#F2F2F2',
        flexDirection: 'row',
        height: 60,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#D8D8D8'
    },
    button_try:
    {
        flexDirection: 'row',
        backgroundColor: '#D8D8D8',
        height: 35,
        width: '65%'
        , marginLeft: 15,
        borderRadius: 7,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    button_try_text:
    {
        marginLeft: 10,
        fontSize: 15
    },
    button_try_icon:
    {
        marginRight: 10,
        color: '#A4A4A4'
    },
    button_seach:
    {
        backgroundColor: '#D8D8D8',
        height: 35,
        width: '10%',
        marginLeft: 15,
        borderRadius: 7,
        alignItems: 'center'
    },
    button_icon:
    {
        marginTop: 5,
        color: '#848484'
    },
    button_heart:
    {
        backgroundColor: '#D8D8D8',
        height: 35,
        width: '10%',
        marginLeft: 15,
        borderRadius: 7,
        alignItems: 'center'
    },
    renderItem_view:
    {
        alignItems: 'center',
        marginTop: 10,
    },
    render_list:
    {
        width: '93%',
        height: 125,
        backgroundColor: 'white',
        borderRadius: 9,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        borderBottomWidth: 0.2,
        borderBottomColor: '#D8D8D8'
    },
    render_group_text:
    {
        marginLeft: 20,
        width: '65%'
    },
    text_name:
    {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 18
    },
    text_review:
    {
        marginTop: 5,
        color: '#848484',
        fontSize: 15,

    },
    text_price:
    {
        marginTop: 7,
        color: '#848484',
        fontSize: 17
    },
    render_img:
    {
        width: '27%',
        height: 100,
        marginRight: 10,
        borderRadius: 7
    },
    flat_header:
    {
        marginTop: 15,
        marginLeft: 25,
        marginBottom: 5
    },
})

export default Order
