import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import tw from 'tailwind-react-native-classnames'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectTravelTimeInformation } from '../slices/navSlice'

const data = [
    {
        id: "Uber-X-123",
        title: "UberX",
        multiplier: 1,
        image: "https://links.papareact.com/3pn",
    },
    {
        id:"Uber-XL-456",
        title: "Uber XL",
        multiplier: 1.2,
        image: "https://links.papareact.com/5w8",
    },
    {
        id: "Uber-LUX-789",
        title: "Uber LUX",
        multiplier: 1.75,
        image: "https://links.papareact.com/7pf",
    },
];

const SURGE_CHARGE_RATE = 1.5;


const RideOptions = () => {
    const navigation = useNavigation();
    const [selected,setSelected] = useState(null);
    const travelTimeInformation = useSelector(selectTravelTimeInformation);
  return (
    <SafeAreaView forceInset={{ top: 'always', bottom:'always'}} style ={tw`bg-white flex-1`}>
        <View>
            <TouchableOpacity 
            style = {tw`absolute top-3 left-5 z-50 p-3 rounded-full`} 
            onPress= {() => navigation.navigate("NavigateCard")
            }>
                <Icon name = "chevron-left" type = "fontawesome"/>
            </TouchableOpacity>
        <Text style = {tw`text-center text-xl py-5`}>Select a Ride - {travelTimeInformation?.distance?.text}</Text>
        </View>

        <FlatList 
            data = {data}
            keyExtractor = {(item) => item.id}
            renderItem = {({ item: {id,title,multiplier,image}, item}) => (
                <TouchableOpacity style = {tw`flex-row justify-between items-center px-5  ${id === selected?.id && "bg-gray-200"}`} 
                onPress = {() => setSelected(item)}
                >
                    <Image style = {{width: 100, height: 100, resizeMode: "contain",}}
                        source = {{uri: image}}
                    />
                    <View style = {tw`-ml-6`}>
                        <Text style = {tw`text-xl font-semibold`}>
                            {title}
                        </Text>
                        <Text>
                            {travelTimeInformation?.duration?.text} 
                        </Text>
                        
                    </View>
                    <Text style = {tw`text-xl`}>
                            {new Intl.NumberFormat('en-gb', {
                                style: 'currency',
                                currency: 'RON'
                            }).format(
                                (travelTimeInformation?.duration?.value * 
                                    SURGE_CHARGE_RATE * 
                                    multiplier / 50)
                            )}
                    </Text>
                </TouchableOpacity>
            )}
        />
        <View style = {tw`mt-auto border-t border-gray-200`} >
            <TouchableOpacity disabled = {!selected} style = {tw`bg-black py-3 m-3 ${!selected && "bg-gray-300"}`}>
                <Text style = {tw`text-center text-white text-xl`}>
                    Choose {selected?.title}
                </Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
};

export default RideOptions

const styles = StyleSheet.create({})