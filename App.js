import { FlatList, StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";

export default function App() {
  const [allSeriesData, setAllSeriesData] = useState([]);

  function getAllSeries() {
    const SHEET_ID = "144JHU_G4XnN7PEGdjZ9WqPhZebbL-zwCxcQXjgVbAuM";
    const SHEET_NAME = "dados";
    const API_KEY = "put_api_key_here";
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?valueRenderOption=FORMATTED_VALUE&key=${API_KEY}`;

    fetch(url)
      .then((response) => {
        console.log("json stringfy => ", JSON.stringify(response.json()));
        return response.json()
      })  
      .then((json) => formatResponse(json))
      .catch((error) => console.error(error))
      .finally(() => console.log("ALL DONE LOADING DATA"));
  }

  function formatResponse(response) {
    const keys = response.values[0];
    const data = response.values.slice(1);
    const obj = data.map((arr) => Object.assign({}, ...keys.map((k, i) => ({ [k]: arr[i] }))));
    console.log(1, obj);
    setAllSeriesData(obj);
  }

  useEffect(() => {
    getAllSeries();
  }, []);

  useEffect(() => {
    console.log(allSeriesData)
  }, [allSeriesData])

  return (
    <View style={styles.container}>
      {allSeriesData.length === 0 ? (
        <Text>Carregando ...</Text>
      ) : (
        <View style={styles.container}>
          <FlatList
            data={allSeriesData}
            renderItem={({ item }) => {
              return (
                <View style={styles.containerFlatlist}>
                  <Text style={styles.flatListText}>{item.Descricao}</Text>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 12 }}>
                    <Text style={styles.flatListDate}>{item.Data}</Text>
                    <Text style={styles.flatListDate}>{item.Categoria}</Text>
                    <Text style={styles.flatListDate}>{item.Valor}</Text>
                  </View>
                </View>
              );
            }}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 20,
  },
  containerFlatlist: {
    backgroundColor: "#559",
    marginHorizontal: 12,
    marginVertical: 8,
    padding: 12,
    borderRadius: 12,
    height: 120,
  },
  flatListText: {
    color: "white",
    fontSize: 15,
    fontWeight: "700",
  },
  flatListDate: {
    color: "#46ED44",
    fontSize: 16,
  },
  flatListTime: {
    color: "#702014",
    fontSize: 16,
    fontWeight: "900",
  },
  flatListLocal: {
    color: "#0ff",
    fontSize: 16,
    fontWeight: "700",
  },
});
