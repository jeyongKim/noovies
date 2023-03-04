import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, TouchableOpacity } from "react-native";
import { YELLOW_COLOR } from '../color';

const screenOne = ({ navigation : {navigate} }) => (
    <TouchableOpacity onPress={() => navigate("Two")}>
        <Text>One</Text>
    </TouchableOpacity>
);
const screenTwo = ({ navigation : {navigate}}) => (
    <TouchableOpacity onPress={() => navigate("Three")}>
        <Text>Two</Text>
    </TouchableOpacity>
);
const screenThree = ({ navigation : {navigate}}) => (
    <TouchableOpacity onPress={() => navigate("Tabs", { screen : "Search" })}>
        <Text>
            Go to search
        </Text>
    </TouchableOpacity>
);

const NativeStack = createNativeStackNavigator();

const Stack = () => (
    <NativeStack.Navigator 
        screenOptions={{
            presentation : "modal",
            animation : "fade",
            headerTintColor : YELLOW_COLOR, 
            headerBackTitleVisible : false,
        }}
    >
        <NativeStack.Screen name="One" component={screenOne} />
        <NativeStack.Screen name="Two" component={screenTwo} />
        <NativeStack.Screen name="Three" component={screenThree} />
    </NativeStack.Navigator>
);


export default Stack;
