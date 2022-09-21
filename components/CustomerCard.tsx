import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import useCustomerOrders from "../hooks/useCustomerOrders";
import { useNavigation } from "@react-navigation/native";
import { CustomersScreenNavigationProp } from "../screens/CustomersScreen";
import { Card, Icon } from "@rneui/themed";

type Props = {
  email: string;
  name: string;
  userId: string;
};

const CustomerCard = ({ email, name, userId }: Props) => {
  const { loading, error, orders } = useCustomerOrders(userId);
  const navigation = useNavigation<CustomersScreenNavigationProp>();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("MyModal", {
          name: name,
          userId: userId,
        });
      }}
    >
      <Card containerStyle={styles.card}>
        <View>
          <View style={styles.rowItems}>
            <View>
              <Text style={styles.nameText}>{name}</Text>
              <Text style={styles.idText}>ID: {userId}</Text>
            </View>
            <View style={styles.loading}>
              <Text style={{ color: "#59c1cc" }}>
                {loading ? "loading..." : `${orders.length}`} x
              </Text>
              <Icon
                style={styles.icon}
                name="box"
                type="entypo"
                color={"#59c1cc"}
                size={50}
              />
            </View>
          </View>
        </View>
        <Card.Divider />
        <Text>{email}</Text>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: 10,
  },
  icon: {
    marginBottom: 5,
    marginLeft: "auto",
  },
  nameText: {
    fontSize: 23,
    fontWeight: "bold",
  },
  idText: {
    color: "#59c1cc",
    fontSize: 15,
  },
  rowItems: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  loading: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default CustomerCard;
