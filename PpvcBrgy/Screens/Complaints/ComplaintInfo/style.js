import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  avatar: {
    width: '100%',
    height: 500,
    borderColor: 'white',
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  safeareaviewcontainer: {
    flex: 1,
    padding: 10,
  },
  fab: {
    position: 'absolute',
    bottom: 8,
    right: 16,
    backgroundColor: '#623256',
  },
  plate: {
    flex: 1,
    backgroundColor: 'rgba(255,255,355,0.5)',
    borderColor: 'rgba(255,255,355,0.5)',
    borderWidth: 0.1,
    borderRadius: 5,
  },
  messagesCard: {
    borderRadius: 20,
  },
  HeadmessagesText: {
    padding: 5,
    marginStart: 20,
    marginTop: 20,
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
  container: {
    flex: 1,
    width: '100%',
  },

  text: {
    color: 'black',
    fontSize: 14,
    marginTop: 10,
    marginStart: 25,
  },
  bodyText: {
    padding:10,
    color: 'black',
    fontSize: 18,
    marginTop: 10,
    textAlign: 'justify',
  },
  texttime: {
    color: 'black',
    fontSize: 10,
    marginTop: 30,
  },
  statusText: {
    fontSize: 12,
    marginTop: 30,
  },
  HeaderText: {
    color: 'black',
    fontSize: 24,
    padding: 15,
    textAlign: 'justify',
  },
  Titletext: {
    padding:10,
    color: 'black',
    fontSize: 16,
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
