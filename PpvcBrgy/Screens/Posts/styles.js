import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  avatar: {
    width: '100%',
    height: 500,
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
    paddingVertical: 12,
    flexDirection: 'row',
    maxHeight: 1000,
    alignItems: 'flex-start',
  },
  containerclose: {
    paddingRight: 16,
    marginBottom: 10,
    maxHeight: 1000,
    alignItems: 'flex-end',
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
});
export default styles;
