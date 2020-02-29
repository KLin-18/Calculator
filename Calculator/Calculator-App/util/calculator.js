import { disableExpoCliLogging } from "expo/build/logs/Logs";

export const initialState = {
    currentValue: "0",
    operator: null,
    previousValue: null,
    graphRunning: false,
  };
  
  export const handleNumber = (value, state) => {
    if (state.currentValue === "0") {
      return { currentValue: `${value}` };
    }
    if(state.currentValue.length < 15)  {
      if (state.currentValue.includes("t") && state.operator === null) {
          return { currentValue: `${state.currentValue.replace('t',value)}t`}
        }
      return {
        currentValue: `${state.currentValue}${value}`
      };
    }
    return {
      currentValue: `${state.currentValue}`
    }
  };

  export const handleVariable = (value, state) => {
    if(state.currentValue === "0") {
      return { currentValue: `${value}`}
    }
    if(state.currentValue.includes(value)) {
      return;
    } else  {
      return { graphRunning: true, currentValue: `${state.currentValue}${value}`}
    }
  }
  
  export const handleEqual = state => {
    const { currentValue, previousValue, operator } = state;
  
    const current = parseInt(currentValue);
    const previous = parseFloat(previousValue);
    const resetState = {
      operator: null,
      previousValue: null
    };
      if (state.graphRunning) {
        return 
      }
      if (operator === "/") {
        return {
          currentValue: previous / current,
          ...resetState
        };
      }
    
      if (operator === "*") {
        return {
          currentValue: previous * current,
          ...resetState
        };
      }
    
      if (operator === "+") {
        return {
          currentValue: previous + current,
          ...resetState
        };
      }
    
      if (operator === "-") {
        return {
          currentValue: previous - current,
          ...resetState
        };
      }
      if (operator === "cos") {
        return {
          currentValue: Math.cos(previous).toFixed(14),
          ...resetState
        };
      }
      if (operator === "sin") {
        return {
          currentValue: Math.sin(previous).toFixed(14),
          ...resetState
        };
      }
      if (operator === "tan") {
        return {
          currentValue: Math.tan(previous).toFixed(14),
          ...resetState
        }
      }
    return state;
  };
  
  const calculator = (type, value, state) => {
    switch (type) {
      case "number":
        return handleNumber(value, state);
      case "variable":
        return handleVariable(value, state);
      case "operator":
        if(state.graphRunning) {
          return {
            operator: value,
            currentValue: `${state.currentValue}${value}`,
          }
        }
        return {
          operator: value,
          previousValue: state.currentValue,
          currentValue: "0"
        };
      case "equal":
        return handleEqual(state);
      case "clear":
        return initialState;
      case "posneg":
        return {
          currentValue: `${parseFloat(state.currentValue) * -1}`
        };
      case "percentage":
        return {
          currentValue: `${parseFloat(state.currentValue) * 0.01}`
        };
      case "graphMode":
        if(state.graphRunning)
          return {graphRunning: false,}
        else 
          return {graphRunning: true,}
      default:
        return state;
    }
  };
  export default calculator;