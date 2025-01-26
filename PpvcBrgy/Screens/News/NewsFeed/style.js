import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF',
  },
  container: {
    flex: 1,
    width: '100%',
  },
  title: {
    color: 'black',
    fontSize: 16,
    textAlign: 'left',
    fontWeight: 'bold'
  },
  body: {
    color: 'black',
    fontSize: 14,
    textAlign: 'justify',
    lineHeight:18
  },
  flatlistcontainer: {
    backgroundColor: 'rgba(255,255,355,0.5)',
    borderColor: 'rgba(255,255,355,0.5)',
    flex: 1,
    paddingTop: 10,
  },
  flatlistitem: {
    marginStart: 30,
    fontSize: 14,
    fontFamily: 'Open-Sans',
    height: 10,
  },
  plate: {
    flex: 1,
    backgroundColor: 'rgba(255,255,355,0.5)',
    borderColor: 'rgba(255,255,355,0.5)',
    borderWidth: 0.1,
    borderRadius: 5,
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
