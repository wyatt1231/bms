import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  background: {
    backgroundColor: 'black',
    flex: 1,
  },
  avatar: {
    width: '100%',
    height: 500,
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
    padding: 5,
  },
  reportedAt: {
    color: 'black',
    fontSize: 8,
    padding: 5,
    marginRight: 10,
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
    flex: 1,
    height: 500,
    paddingTop: 10,
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
});
export default styles;
