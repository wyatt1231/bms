import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  background: {
    backgroundColor: 'black',
    flex: 1,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#f9f9f9",
    marginHorizontal:10
  },
  PickerContainer: {
    height: 50,
    width: "100%",
    color: "#333",
  },
  avatar: {
    width: '100%',
    height: 500,
    borderColor: 'white',
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  imageFile: {
    width: '100%',
    height: '100%',
    borderColor: 'white',
    alignSelf: 'center',
    resizeMode: 'contain',

  },
  container: {
    flex: 1,
    width: '100%',
    height: 500,
  },
  fab: {
    position: 'absolute',
    bottom: 8,
    right: 16,
    backgroundColor: '#623256',
  },
  text: {
    color: 'black',
    fontSize: 14,
    paddingHorizontal: 5,
    paddingBottom: 5
  },
  reportedAt: {
    color: 'black',
    fontSize: 11,
    paddingHorizontal: 5,
    textAlign: 'right',
  },
  HeaderText: {
    color: 'black',
    fontSize: 24,
    padding: 5,
    textAlign: 'justify',
  },
  Titletext: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 14,
    padding: 5,
    textAlign: 'justify',
  },
  flatlistcontainer: {
   flex:1,
  },
  containerTop :{
    flex:1,
    backgroundColor:"#623256",
  },
  containerContent: {
    flex:4,
    alignItems:'center'

  },
  cardContainer :{
    marginTop: -50,
    width: '95%', // Card width relative to the screen
    padding: 20, // Inner spacing
    backgroundColor: 'white', // Card background color
    borderRadius: 20, // Rounded corners
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow position
    shadowOpacity: 0.2, // Shadow transparency
    shadowRadius: 4, // Shadow blur
    elevation: 15, // Android shadow effect
    flex:1,
    },
  plate: {
    flex: 1,
    backgroundColor: 'rgba(255,255,355,0.5)',
    borderColor: 'rgba(255,255,355,0.5)',
    borderWidth: 0.1,
    borderRadius: 5,
  },
  flatlistitem: {
    marginStart: 30,
    fontSize: 14,
    fontFamily: 'Open-Sans',
    height: 10,
  },
  flatlistitemappointmentno: {
    marginStart: 30,
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Open-Sans',
    height: 20,
  },
  InputContainer: {
    width: '100%',
    height: 50,
    marginBottom: 20,
    padding: 15,
  }
});
export default styles;
