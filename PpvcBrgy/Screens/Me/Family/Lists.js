import React, {useState} from 'react';
import {List} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {Dimensions} from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome';
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
const Lists = () => {
  const [expanded, setExpanded] = useState(true);

  const handlePress = () => setExpanded(!expanded);
  const members = useSelector((state) => state.ResidentReducers.members);

  return (
    <List.Section title="Family Members">
      {members.data?.map((item, index) => {
        {
          return item ? (
            <List.Accordion
              key={index}
              titleStyle={{color: '#0099ff'}}
              color="#0099ff"
              title={item?.first_name + ' ' + item?.last_name}
              left={(props) => (
                <Icons {...props} name="user" size={25} color="#0099ff" />
              )}
              expanded={expanded}
              onPress={handlePress}>
              {item?.members?.map((item2, index2) => (
                <List.Item
                  style={{maxHeight: screenHeight}}
                  key={index2}
                  //   left={(props) => (
                  //     <Icons {...props} name="users" size={25} color="#0099ff" />
                  //   )}
                  title={item2.fullname + ' - ' + item2.rel}
                />
              ))}
            </List.Accordion>
          ) : (
            <Text>No family members to show</Text>
          );
        }
      })}
    </List.Section>
  );
};

Lists.propTypes = {};

export default Lists;
