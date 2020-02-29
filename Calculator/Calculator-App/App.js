import React from "react";
import { StyleSheet, Text, View, StatusBar, SafeAreaView } from "react-native";
import Chart from './components/Graph.js';

import Row from "./components/Row";
import Button from "./components/Button";
import calculator, { initialState } from "./util/calculator.js";
import { disableExpoCliLogging } from "expo/build/logs/Logs";



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#202020",
    justifyContent: "flex-end"
  },
  value: {
    color: "#fff",
    fontSize: 40,
    textAlign: "right",
    marginRight: 20,
    marginBottom: 10
  }
});

getCoefficent = (state) => {
  if(state.operator) {
    return state.currentValue.slice(0,state.currentValue.indexOf(state.operator));
  }
  return state.currentValue;
}

getConstant = (state) => {
  if(state.operator)
    return state.currentValue.slice(state.currentValue.indexOf(state.operator) + 1, state.currentValue.length)
}

const xAxis = ["0", "10", "20", "30", "40"];

export default class App extends React.Component {
  state = initialState;

  handleTap = (type, value) => {
    this.setState(state => calculator(type, value, state));
  };
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <SafeAreaView>
          {this.state.graphRunning ? 
            <Chart 
             coefficent={getCoefficent(this.state)}
             operator={this.state.operator} 
             constant={getConstant(this.state)} 
             xAxis={xAxis} /> 
             :
          null }
          <Text style={styles.value}>
            {(this.state.currentValue).toLocaleString()}
          </Text>
            <Row>
              <Button
                text="G"
                onPress={() => this.handleTap("graphMode")}
                />
              <Button
                text="C"
                theme="secondary"
                onPress={() => this.handleTap("clear")}
              />
              <Button
                text="+/-"
                theme="secondary"
                onPress={() => this.handleTap("posneg")}
              />
              <Button
                text="%"
                theme="secondary"
                onPress={() => this.handleTap("percentage")}
              />
              <Button
                text="/"
                theme="accent"
                onPress={() => this.handleTap("operator", "/")}
              />
            </Row>
            <Row>
            <Button 
                text="Sin"
                onPress={() => this.handleTap("operator", "sin")} 
              />
              <Button text="7" onPress={() => this.handleTap("number", 7)} />
              <Button text="8" onPress={() => this.handleTap("number", 8)} />
              <Button text="9" onPress={() => this.handleTap("number", 9)} />
              <Button
                text="x"
                theme="accent"
                onPress={() => this.handleTap("operator", "*")}
              />
            </Row>
            <Row>
              <Button text="Cos" onPress={() => this.handleTap("operator", "cos")} />
              <Button text="4" onPress={() => this.handleTap("number", 4)} />
              <Button text="5" onPress={() => this.handleTap("number", 5)} />
              <Button text="6" onPress={() => this.handleTap("number", 6)} />
              <Button
                text="-"
                theme="accent"
                onPress={() => this.handleTap("operator", "-")}
              />
            </Row>
            <Row>
              <Button text="Tan" onPress={() => this.handleTap("operator", "tan")} />
              <Button text="1" onPress={() => this.handleTap("number", 1)} />
              <Button text="2" onPress={() => this.handleTap("number", 2)} />
              <Button text="3" onPress={() => this.handleTap("number", 3)} />
              <Button
                text="+"
                theme="accent"
                onPress={() => this.handleTap("operator", "+")}
              />
            </Row>
            <Row>
              <Button text="" onPress={() => this.handleTap("",)} />
              <Button
                text="0"
                onPress={() => this.handleTap("number", 0)}
              />
              <Button 
                text="t"
                onPress={() => this.handleTap("variable", "t")}
              />
              <Button text="." onPress={() => this.handleTap("number", ".")} />
              <Button
                text="="
                theme="accent"
                onPress={() => this.handleTap("equal")}
              />
            </Row>
        </SafeAreaView>
      </View>
    );
  }
}