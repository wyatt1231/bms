import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  avatar: {
    display: 'flex',
    flexDirection: 'column',
    height: 500,
    marginBottom: 10,
    width: 350,
    borderColor: 'white',
    alignItems: 'center',
    resizeMode: 'cover',
  },
  plate: {
    flex: 1,
    backgroundColor: 'rgba(255,255,355,0.5)',
    borderColor: 'rgba(255,255,355,0.5)',
    borderWidth: 0.1,
    borderRadius: 5,
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
    paddingVertical: 5,
    flexDirection: 'row',
    maxHeight: 1000,
    alignItems: 'flex-start',
  },
  timestamp: {
    alignSelf: 'flex-end',
    marginEnd: 10,
    marginBottom: 10,
    fontSize: 8,
  },
  containerclose: {
    paddingRight: 16,
    marginTop: 20,
    marginBottom: 50,
    maxHeight: 1000,
    alignItems: 'flex-end',
    color: '#464746',
  },
  containercomment: {
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
  createPost: {
    color: 'black',
    fontSize: 24,
    padding: 10,
    textAlign: 'justify',
  },
  fullnametext: {
    color: 'black',
    fontSize: 20,
    padding: 10,
    textAlign: 'justify',
  },
  flatlistcontainer: {
    backgroundColor: 'rgba(255,255,355,0.5)',
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
