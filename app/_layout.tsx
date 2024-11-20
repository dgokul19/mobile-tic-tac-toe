import { View, Text, StyleSheet } from "react-native";
import GameBoard from "./components/GameBoard";

export default function RootLayout() {

  const style = StyleSheet.create({
    root : {
      flex : 1,
      backgroundColor : "darkcyan",
      alignItems : "center",
      marginVertical : 10,
      padding: 10
    },
    title : {
      fontSize : 26,
      fontWeight: "bold",
      color : "#f6f6f6"
    }
  })
  return (
    <View style={style.root}>
      <Text style={style.title}>Tic Tac Toe</Text>
      <GameBoard />
    </View>
  );
}
