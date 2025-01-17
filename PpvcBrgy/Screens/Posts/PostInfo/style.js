import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  plate: {
    flex: 1,
    backgroundColor: 'rgba(255,255,355,0.5)',
    borderColor: 'rgba(255,255,355,0.5)',
    borderWidth: 0.1,
    borderRadius: 5,
  },
  avatar: {
    flex: 1,
    width: '100%',
    height: 300,
    borderColor: 'white',
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
  container: {
    flex: 1,
    width: '100%',
  },
  containerNOTIFICATION: {
    paddingLeft: 19,
    paddingRight: 16,
    paddingVertical: 6,
    flexDirection: 'row',
    maxHeight: 1000,
    alignItems: 'flex-start',
  },
  containercomment: {
    paddingLeft: 19,
    paddingRight: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    height: 100,
    maxHeight: 1000,
    alignItems: 'flex-start',
  },
  text: {
    color: 'black',
    fontSize: 14,
    padding: 15,
    textAlign: 'justify',
  },
  noimagetext: {
    color: 'black',
    fontSize: 14,
    padding: 15,
    textAlign: 'justify',
  },
  fullnametext: {
    color: 'black',
    fontSize: 23,
    padding: 10,
    textAlign: 'justify',
  },
  flatlistcontainer: {
    backgroundColor: '#fafafa',
    flex: 1,
    paddingTop: 10,
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
  timestamp: {
    alignSelf: 'flex-end',
    fontSize: 8,
  },
});
export default styles;
