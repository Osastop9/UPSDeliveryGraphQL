import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Card, Divider, Icon } from "@rneui/themed";

type Props = {
  order: Order;
};

const DeliveryCard = ({ order }: Props) => {
  return (
    <Card containerStyle={styles.cardContainer}>
      <View>
        <Icon name="box" type="entypo" size={50} color={"white"} />
        <View>
          <Text style={styles.carrierText}>
            {order.carrier} - {order.trackingId}
          </Text>
          <Text style={styles.deliveryText}>
            Expected Delivery: {new Date(order.createdAt).toLocaleDateString()}
          </Text>
          <Divider color="white" />
        </View>
        <View>
          <Text style={styles.address}>Address</Text>
          <Text style={styles.addressText}>
            {order.Address}, {order.City}
          </Text>
          <Text style={styles.shippingCost}>
            Shipping Cost: ${order.shippingCost}
          </Text>
        </View>
      </View>
      <Divider color="white" />
      <View style={{ padding: 20 }}>
        {order.trackingItems.items.map((item) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemQuantity}>x {item.quantity}</Text>
          </View>
        ))}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  address: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
    marginTop: 20,
  },
  addressText: {
    fontSize: 15,
    textAlign: "center",
    color: "white",
  },
  cardContainer: {
    backgroundColor: "#59c1cc",
    borderRadius: 10,
    marginVertical: 15,
    padding: 0,
    paddingTop: 16,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },

  carrierText: {
    textAlign: "center",
    textTransform: "uppercase",
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  deliveryText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  shippingCost: {
    fontSize: 15,
    textAlign: "center",
    color: "white",
    fontStyle: "italic",
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemName: {
    fontSize: 15,
    color: "white",
    fontStyle: "italic",
  },
  itemQuantity: {
    fontSize: 15,
    color: "white",
    fontStyle: "italic",
  },
});

export default DeliveryCard;
