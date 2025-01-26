import React from "react";
import { StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";

const GradientContainer = ({children,gradientStyle}) => {
  return (
    <LinearGradient
    // colors={["#623256", "#875a78", "#3d1e40"]} // Define the gradient colors
    colors={["#623256", "#3d1e40"]} // Define the gradient colors
    start={{ x: 0, y: 0 }}
    end={{ x: 0, y: 1 }}
//     start={{ x: 0, y: 0 }} // Start at the left
// end={{ x: 1, y: 0 }}   // End at the right
    style={[styles.gradient,{...gradientStyle}]}
  >
    {children}
  </LinearGradient>
  );
};

const styles = StyleSheet.create({
gradient: {
    flex: 1,
},
});

export default GradientContainer;