import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { TabStackParamsList } from "../navigator/TabNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigator/RootNavigator";
import { Image, Input } from "@rneui/themed";
import { useQuery } from "@apollo/client";
import { GET_CUSTOMERS } from "../graphql/queries";
import CustomerCard from "../components/CustomerCard";

export type CustomersScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamsList, "Customers">,
  NativeStackNavigationProp<RootStackParamList>
>;

const CustomersScreen = () => {
  const navigation = useNavigation<CustomersScreenNavigationProp>();
  const [input, setInput] = useState<string>("");
  const { loading, error, data } = useQuery(GET_CUSTOMERS);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: "https://links.papareact.com/3jc" }}
        containerStyle={styles.imageContainer}
        PlaceholderContent={<ActivityIndicator />}
      />
      <Input
        placeholder="Search by Customer"
        value={input}
        onChangeText={setInput}
        containerStyle={styles.input}
      />
      {data?.getCustomers
        ?.filter((customer: CustomerList) =>
          customer.value.name.includes(input)
        )
        .map(({ name: ID, value: { email, name } }: CustomerResponse) => (
          <CustomerCard key={ID} email={email} name={name} userId={ID} />
        ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#59c1cc",
  },
  imageContainer: {
    width: "100%",
    height: 250,
  },
  input: {
    backgroundColor: "#fff",
    paddingTop: 5,
    paddingHorizontal: 30,
  },
});

export default CustomersScreen;
