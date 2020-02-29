import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { disableExpoCliLogging } from "expo/build/logs/Logs";

const getData = (coefficent, operator, constant, xAxis) => {
    let array = [];
    if(coefficent && operator && constant) {
        xAxis.forEach(value => {
            array.push(math(parseInt(parseInt(coefficent.replace('t','')) * value),parseInt(constant),operator));
        });
    } else if (coefficent) {
        xAxis.forEach(value => {
            if(coefficent.includes('t')) {
                array.push((parseInt(parseInt(coefficent.replace('t','')) * value)));
            } else {
                array.push(parseInt(coefficent));
            }
        });
    }
    return array;
}

const math = (x, y, operator) => {
    switch(operator) 
    {
        case '+':
            return x + y;
        case '-':
            return x - y;
        case '*':
            return x * y;
        case '/':
            return x / y;
        case 'cos':
            return Math.cos(x);
        case 'sin':
            return Math.sin(x);
        case 'tan':
            return Math.tan(x);
    }
}


export default ({ coefficent, operator, constant, xAxis}) => {
    return ( 
        <LineChart
            data={{
            labels: [...xAxis],
            datasets: [{
                data: [
                    ...getData(coefficent,operator,constant,xAxis)
                ]
            }]
            }}
            width={Dimensions.get('window').width} // from react-native
            height={320}
            withDots={true}
            fromZero={true}
            chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            strokeWidth: 4,
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            }}
            style={{
            marginVertical: 8,
            borderRadius: 16
            }}

        />
    )
}