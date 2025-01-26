import React from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import Icons from 'react-native-vector-icons/Ionicons';

const ModernInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  icon,
  keyboardType = "default",
  secureTextEntry = false,
  errorMessage = "",
  style,
  multiline = false,
  numberOfLines = 1
}) => {
  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputContainer}>
        {icon && (
          <Icons
            name={icon}
            size={20}
            color="#623256"
            style={styles.icon}
          />
        )}
        <TextInput
          multiline={multiline}
          numberOfLines={numberOfLines}
          style={styles.input}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          placeholderTextColor="#aaa"
        />
      </View>
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft:15,
    paddingRight:15,
    marginBottom:15
  },
  label: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#623256",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  errorText: {
    color: "#ff4d4f",
    fontSize: 12,
    marginTop: 5,
  },
});

export default ModernInput;