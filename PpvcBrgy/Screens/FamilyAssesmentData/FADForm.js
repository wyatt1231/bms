import React, {useState, useEffect, useCallback} from 'react';
import PropTypes from 'prop-types';
import {ScrollView} from 'react-native-gesture-handler';
import {ProgressStep, ProgressSteps} from 'react-native-progress-steps';
import {
  View,
  Alert,
  TouchableHighlight,
  StyleSheet,
  Button,
  Dimensions,
  TouchableNativeFeedback,
  Text,
  SafeAreaView,
  RefreshControl,
  ImageBackground,
} from 'react-native';
import SelectMultiple from 'react-native-select-multiple';
import Spinner from 'react-native-loading-spinner-overlay';
import {CheckBox} from 'react-native-elements';
import {HelperText} from 'react-native-paper';
import SearchableDropdown from 'react-native-searchable-dropdown';
import DropDownPicker from 'react-native-dropdown-picker';
import {TextInput, Searchbar} from 'react-native-paper';
import {Card} from 'react-native-elements';
import {Picker} from '@react-native-picker/picker';
import {Icon, Input} from 'react-native-elements';
import Icons from 'react-native-vector-icons/FontAwesome';
//import Card from 'react-native-rn-Card';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import CustomBottomSheet from '../../Plugins/CustomBottomSheet';
import {useDispatch, useSelector} from 'react-redux';
import wait from '../../Plugins/waitinterval';
import {
  action_get_residents_list,
  action_addfamily,
  action_get_FAD_exist,
  action_updatefamily,
  action_get_FAD_form,
  action_set_reset,
} from '../../Services/Actions/ResidentsActions';
import CustomAlert from '../../Plugins/CustomAlert';
import CustomSnackBar from '../../Plugins/CustomSnackBar';
import {useNavigation} from '@react-navigation/native';
//import {Actions} from 'react-native-router-flux';
import styles from './style';
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
const FADForm = () => {
  const users_reducers = useSelector(state => state.UserInfoReducers.data);
  const residents_list = useSelector(
    state => state.ResidentReducers.residents_list,
  );
  const residents_issuccess = useSelector(
    state => state.ResidentReducers.issuccess,
  );
  const residents_data_exist = useSelector(
    state => state.ResidentReducers.residents_exist_data,
  );
  const resident_form = useSelector(
    state => state.ResidentReducers.resident_form,
  );
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [qualityness, setQualityness] = useState('');
  const [Occationfortheland, setOccationfortheland] = useState('');
  const [Occationofthehouse, setOccationofthehouse] = useState('');
  const [submitmessage, setsubmitmessage] = useState('');
  const [isDisabled, setisDisabled] = useState(true);
  const [spinner, setspinner] = useState(false);

  const [relationship, setrelationship] = useState('');
  const [PeopleName, setpeoplename] = useState('');
  const [residentname, setresidentname] = useState('');
  const [peopleid, setpeopleid] = useState('');
  const [showsnackbar, setshowsnackbar] = useState(false);
  const [tickrefresh, settickrefresh] = useState(0);

  const [PeopleInsidetheHouse, setPeopleInsidetheHouse] = useState([]);
  const [ADDPeopleInsidetheHouse, setADDPeopleInsidetheHouse] = useState([]);
  const [fam_member, setfam_member] = useState([]);
  const [fam_member_add, setfam_member_add] = useState([]);
  const [structure, setStructure] = useState('');
  const [yearsstayed, setyearsstayed] = useState('');
  const [Alerttitle, setAlerttitle] = useState('');
  const [Alertmessage, setAlertmessage] = useState('');
  const [Alertshow, setAlertshow] = useState(false);
  const [searchvalue, setsearchvalue] = useState(' ');
  const [InfoError, setInfoError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [waterconnection, setwaterconnection] = useState([]);
  const [waterconnectionsaver, setwaterconnectionsaver] = useState([]);

  const [hasComfortRoom, sethasComfortRoom] = useState([]);
  const [hasComfortRoomsaver, sethasComfortRoomsaver] = useState([]);

  const [hasLightConnection, sethasLightConnection] = useState([]);
  const [hasLightConnectionsaver, sethasLightConnectionsaver] = useState([]);

  const [wastemanagement, setwastemanagement] = useState([]);
  const [wastemanagementsaver, setwastemanagementsaver] = useState([]);

  const [victimofabuse, setvictimofabuse] = useState([]);
  const [victimofabusesaver, setvictimofabusesaver] = useState([]);

  const [serbisyo, setserbisyo] = useState([]);
  const [serbisyosaver, setserbisyosaver] = useState([]);

  const [skilltraining, setskilltraining] = useState('');
  const [daycareservice, setdaycareservice] = useState('');
  const [Employment, setEmployment] = useState('');
  const [medicalngatabang, setmedicalngatabang] = useState('');
  const [lingap, setlingap] = useState('');
  const [houseing, sethouseing] = useState('');
  const [fourps, setfourps] = useState('');
  const [livelihood, setlivelihood] = useState('');
  const [financial, setfinancial] = useState('');
  const [scholarship, setscholarship] = useState('');

  const [kahimtangsakomunidad, setkahimtangsakomunidad] = useState([]);
  const [kahimtangsakomunidadsaver, setkahimtangsakomunidadsaver] = useState(
    [],
  );

  const [checked, setChecked] = useState({});

  const [checkedwaterconnection, setCheckedWaterConnection] = useState({});
  const [checkedkasilyas, setCheckedKasilyas] = useState({});
  const [checkedkuryente, setCheckedKuryente] = useState({});
  const [checkedbasura, setCheckedBasura] = useState({});
  const [checkedpangabuso, setCheckedPangabuso] = useState({});
  const [checkedserbisyo, setCheckSerbisyo] = useState({});
  const kahimtangsakomunidadcheck = [
    {
      label: 'kawad-on/kulang sa panginabuhian',
      value: 'kawad-on/kulang sa panginabuhian',
    },
    {
      label: 'Walay Igong o layo sa eskewlahan',
      value: 'Walay Igong o layo sa eskewlahan',
    },
    {
      label: 'Presensya sa mga nagkalin-laing krimen/bisyo o pang-abuso',
      value: 'Presensya sa mga nagkalin-laing krimen/bisyo o pang-abuso',
    },
    {
      label: 'Walay maayong agianan/kanal sa tubig',
      value: 'Walay maayong agianan/kanal sa tubig',
    },
    {label: 'Demolisyon', value: 'Demolisyon'},
    {
      label: 'Kulang sa Pasilidad sa Kuryente',
      value: 'Kulang sa Pasilidad sa Kuryente',
    },
    {
      label: 'Kulang sa Pasilidad sa Tubig',
      value: 'Kulang sa Pasilidad sa Tubig',
    },
    {
      label: 'Kulang sa Pasilidad sa Balay Tamabalanan',
      value: 'Kulang sa Pasilidad sa Balay Tamabalanan',
    },
    {label: 'Dulaana sa mga bata', value: 'Dulaana sa mga bata'},
  ];

  const waterconnectionchecked = [
    {label: 'Walay connection sa tubig', value: 'Walay connection sa tubig'},
    {label: 'bomba', value: 'bomba'},
    {label: 'Ulan', value: 'Ulan'},
    {label: 'Barangay Water Work', value: 'Barangay Water Work'},
    {label: 'Tubod', value: 'Tubod'},
    {label: 'balon', value: 'balon'},
    {label: 'DCWD', value: 'DCWD'},
  ];

  const Kasilyaschecked = [
    {label: 'Walay Kasilyas', value: 'Walay Kasilyas'},
    {label: 'Antipolo', value: 'Antipolo'},
    {label: 'Buhos', value: 'Buhos'},
    {label: 'Water-Seated', value: 'Water-Seated'},
  ];

  const kuryentechecked = [
    {label: 'Walay Koneksyon', value: 'Walay Koneksyon'},
    {label: 'Lamapara (gas)', value: 'Lamapara (gas)'},
    {label: 'Kandila', value: 'Kandila'},
    {label: 'Petromaks', value: 'Petromaks'},
    {label: 'Davao Light', value: 'Davao Light'},
  ];

  const basuracheckedf = [
    {
      label: 'Ginalain ang Mabulok ug dili mabulok',
      value: 'Ginalain ang Mabulok ug dili mabulok',
    },
    {
      label: 'Gikolekta sa CENRO or Barangay',
      value: 'Gikolekta sa CENRO or Barangay',
    },
    {label: 'Ginalubong', value: 'Ginalubong'},
    {label: 'Ginalabay', value: 'Ginalabay'},
  ];

  const pangabusocheked = [
    {label: 'Gibeya-an', value: 'Gibeya-an'},
    {label: 'Pangulata', value: 'Pangulata'},
    {
      label: 'Ginabaligya/Illegal Rekroter',
      value: 'Ginabaligya/Illegal Rekroter',
    },
    {label: 'Krime', value: 'Krime'},
    {label: 'Droga', value: 'Droga'},
  ];

  const serbisyochecked = [
    {label: 'Scholarship', value: 'Scholarship'},
    {label: 'Livelihood', value: 'Livelihood'},
    {label: 'Housing', value: 'Housing'},
    {label: 'Financial', value: 'Financial'},
    {label: 'Lingap', value: 'Lingap'},
    {label: 'Medical nga tabang', value: 'Medical nga tabang'},
    {label: 'Day Care Service', value: 'Day Care Service'},
    {label: 'Skill Training', value: 'Skill Training'},
    {label: 'Employment', value: 'Employment'},
  ];
  const handleSubmit = useCallback(async () => {
    setspinner(true);

    if (residents_data_exist?.data.length > 0) {
      dispatch(
        action_updatefamily(
          residents_data_exist?.data[0]?.fam_pk,
          users_reducers.resident_pk,
          Occationofthehouse,
          structure,
          yearsstayed,
          Occationfortheland,
          qualityness,
          waterconnectionsaver.length > 0
            ? waterconnectionsaver
            : [waterconnection[0]?.value],
          hasComfortRoomsaver.length > 0
            ? hasComfortRoomsaver
            : [hasComfortRoom[0]?.value],
          hasLightConnectionsaver.length > 0
            ? hasLightConnectionsaver
            : [hasLightConnection[0]?.value],
          wastemanagementsaver.length > 0
            ? wastemanagementsaver
            : [wastemanagement[0]?.value],
          kahimtangsakomunidadsaver.length > 0
            ? kahimtangsakomunidadsaver
            : [kahimtangsakomunidad[0]?.value],
          victimofabusesaver.length > 0
            ? victimofabusesaver
            : [victimofabuse[0]?.value],
          serbisyosaver.length > 0 ? serbisyosaver : [serbisyo[0]?.value],
          fam_member,
        ),
      );
      // setspinner(false);
      // if (await residents_issuccess) {
      //   alert(
      //     'Your Application for Family Assesment Data has been submitted successfully',
      //   );

      //   setspinner(false);
      //   wait(1000).then(() => {
      //     //Actions.index();
      //     setAlertshow(false);
      //   });
      // }
    } else if (!residents_data_exist?.data.length > 0) {
      dispatch(
        action_addfamily(
          users_reducers.resident_pk,
          Occationofthehouse,
          structure,
          yearsstayed,
          Occationfortheland,
          qualityness,
          waterconnectionsaver,
          hasComfortRoomsaver,
          hasLightConnectionsaver,
          wastemanagementsaver,
          kahimtangsakomunidadsaver,
          victimofabusesaver,
          serbisyosaver,
          fam_member,
        ),
      );
      // if (residents_issuccess) {
      //   alert(
      //     'Your Application for Family Assesment Data has been submitted successfully',
      //   );

      //   setspinner(false);
      //   wait(1000).then(() => {
      //     //Actions.index();
      //     setAlertshow(false);
      //   });
      // }
    }
  }, [
    dispatch,
    fam_member,
    serbisyosaver,
    victimofabusesaver,
    kahimtangsakomunidadsaver,
    wastemanagementsaver,
    hasLightConnectionsaver,
    hasComfortRoomsaver,
    waterconnectionsaver,
    users_reducers,
    residents_data_exist,
  ]);
  useEffect(() => {
    let mounted = true;
    const getifsuccesssubmit = () => {
      if (mounted) {
        if (residents_issuccess) {
          alert(
            'Your Application for Family Assessment Data has been submitted successfully',
          );

          setspinner(false);
          wait(1000).then(() => {
            navigation.navigate('Dashboard');
            //Actions.index();
            setAlertshow(false);
          });
          dispatch(action_set_reset(false));
        }
      }
    };
    mounted && getifsuccesssubmit();
    return () => {
      mounted = false;
    };
  }, [dispatch, residents_issuccess]);
  const handleSecondInfo = useCallback(async () => {
    setInfoError(false);
  }, []);
  const handleThirdInfo = useCallback(async () => {
    setInfoError(false);
  }, []);
  const handleFourthInfo = useCallback(async () => {
    setInfoError(false);
  }, []);
  const handleNextInfo = useCallback(async () => {
    setPeopleInsidetheHouse([]);
    setfam_member([]);

    residents_data_exist[0]?.fam_members?.map(item => {
      const fullName = `${item.first_name} ${item.last_name}`;
      const resident_pk = parseInt(item.resident_pk);

      setPeopleInsidetheHouse(prev => [
        ...prev,
        {PeopleName: fullName, realationship: item.rel},
      ]);
      setfam_member(prev => [
        ...prev,
        {PeopleName: fullName, resident_pk, rel: item.rel},
      ]);
    });

    const requiredFields = [
      qualityness,
      Occationfortheland,
      Occationofthehouse,
      yearsstayed,
      structure,
    ];

    if (requiredFields.some(field => field === undefined)) {
      setInfoError(true);
      alert('Please Fill All Fields');
    } else {
      setInfoError(false);
    }
  }, [
    residents_data_exist,
    qualityness,
    Occationfortheland,
    Occationofthehouse,
    yearsstayed,
    structure,
  ]);

  const onChangeSearch = useCallback(
    async value => {
      setsearchvalue(value);
    },
    [dispatch],
  );
  useEffect(() => {
    const getSearchResident = () => {
      dispatch(action_get_residents_list(searchvalue));
    };
    getSearchResident();
  }, [searchvalue]);
  const handleCheckBoxKahitang = useCallback(
    async (selection, item) => {
      if (
        kahimtangsakomunidad.some(
          existingItem => existingItem.label === item.label,
        )
      ) {
        setkahimtangsakomunidad(prev =>
          prev.filter(existingItem => existingItem.label !== item.label),
        );
        setkahimtangsakomunidadsaver(prev =>
          prev.filter(existingItem => existingItem !== item.label),
        );
      } else {
        setkahimtangsakomunidad(prev => [
          ...prev,
          {label: item.label, value: item.label},
        ]);
        setkahimtangsakomunidadsaver(prev => [...prev, item.label]);
      }
    },
    [kahimtangsakomunidad, kahimtangsakomunidadsaver],
  );

  const handleCheckBoxwaterConntection = useCallback(
    async (selections, item) => {
      if (
        waterconnection.some(existingItem => existingItem.label === item.label)
      ) {
        setwaterconnection(prev =>
          prev.filter(existingItem => existingItem.label !== item.label),
        );
        setwaterconnectionsaver(prev =>
          prev.filter(existingItem => existingItem !== item.label),
        );
      } else {
        setwaterconnection(prev => [
          ...prev,
          {label: item.label, value: item.label},
        ]);
        setwaterconnectionsaver(prev => [...prev, item.label]);
      }
    },
    [waterconnection, waterconnectionsaver],
  );
  console.log('waterconnectionsaver', waterconnectionsaver);
  const handleCheckBoxKasilyas = useCallback(
    async (selection, item) => {
      if (
        hasComfortRoom.some(existingItem => existingItem.label === item.label)
      ) {
        sethasComfortRoom(prev =>
          prev.filter(existingItem => existingItem.label !== item.label),
        );
        sethasComfortRoomsaver(prev =>
          prev.filter(existingItem => existingItem !== item.label),
        );
      } else {
        sethasComfortRoom(prev => [
          ...prev,
          {label: item.label, value: item.label},
        ]);
        sethasComfortRoomsaver(prev => [...prev, item.label]);
      }
    },
    [hasComfortRoom, hasComfortRoomsaver],
  );
  const handleCheckBoxKuryente = useCallback(
    async (selection, item) => {
      if (
        hasLightConnection.some(
          existingItem => existingItem.label === item.label,
        )
      ) {
        sethasLightConnection(prev =>
          prev.filter(existingItem => existingItem.label !== item.label),
        );
        sethasLightConnectionsaver(prev =>
          prev.filter(existingItem => existingItem !== item.label),
        );
      } else {
        sethasLightConnection(prev => [
          ...prev,
          {label: item.label, value: item.label},
        ]);
        sethasLightConnectionsaver(prev => [...prev, item.label]);
      }
    },
    [hasLightConnection, hasLightConnectionsaver],
  );

  const handleCheckBoxBasura = useCallback(
    async (selection, item) => {
      if (
        wastemanagement.some(existingItem => existingItem.label === item.label)
      ) {
        setwastemanagement(prev =>
          prev.filter(existingItem => existingItem.label !== item.label),
        );
        setwastemanagementsaver(prev =>
          prev.filter(existingItem => existingItem !== item.label),
        );
      } else {
        setwastemanagement(prev => [
          ...prev,
          {label: item.label, value: item.label},
        ]);
        setwastemanagementsaver(prev => [...prev, item.label]);
      }
    },
    [wastemanagement, wastemanagementsaver],
  );
  const handleCheckBoxPangabuso = useCallback(
    async (selection, item) => {
      if (
        victimofabuse.some(existingItem => existingItem.label === item.label)
      ) {
        setvictimofabuse(prev =>
          prev.filter(existingItem => existingItem.label !== item.label),
        );
        setvictimofabusesaver(prev =>
          prev.filter(existingItem => existingItem !== item.label),
        );
      } else {
        setvictimofabuse(prev => [
          ...prev,
          {label: item.label, value: item.label},
        ]);
        setvictimofabusesaver(prev => [...prev, item.label]);
      }
    },
    [victimofabuse, victimofabusesaver],
  );

  const handleCheckBoxSerbisyo = useCallback(
    async (selection, item) => {
      let found = serbisyo.some(
        existingItem => existingItem.label === item.label,
      );

      if (found) {
        setserbisyo(prev =>
          prev.filter(existingItem => existingItem.label !== item.label),
        );
        setserbisyosaver(prev =>
          prev.filter(existingItem => existingItem.programa !== item.label),
        );
      } else {
        let agency = 'TBD';

        switch (item.label) {
          case 'Scholarship':
            agency = scholarship;
            break;
          case 'Livelihood':
            agency = livelihood;
            break;
          case 'Housing':
            agency = houseing;
            break;
          case 'Financial':
            agency = financial;
            break;
          case 'Lingap':
            agency = lingap;
            break;
          case 'Medical nga Tabang':
            agency = medicalngatabang;
            break;
          case 'Day Care Service':
            agency = daycareservice;
            break;
          case 'Skill Training':
            agency = skilltraining;
            break;
          case 'Employment':
            agency = Employment;
            break;
          default:
            agency = 'TBD';
            break;
        }

        setserbisyo(prev => [...prev, {label: item.label, value: item.label}]);
        setserbisyosaver(prev => [
          ...prev,
          {programa: item.label, ahensya: agency},
        ]);
      }
    },
    [
      serbisyo,
      serbisyosaver,
      scholarship,
      livelihood,
      houseing,
      financial,
      lingap,
      medicalngatabang,
      daycareservice,
      skilltraining,
      Employment,
    ],
  );

  const handleOccationfortheland = useCallback(value => {
    setOccationfortheland(value);
  });

  // const handlehasComfortRoom = useCallback((value) => {
  //   sethasComfortRoom(value);
  // }, []);

  // const handlekahimtangsakomunidad = useCallback((value) => {
  //   setkahimtangsakomunidad(value);
  // }, []);

  // const handlewastemanagement = useCallback((value) => {
  //   setwastemanagement(value);
  // }, []);

  // const handlevictimofabuse = useCallback((value) => {
  //   setvictimofabuse(value);
  // }, []);

  const handleOccationofthehouse = useCallback(value => {
    setOccationofthehouse(value);
  });
  const handleQualityness = useCallback(value => {
    setQualityness(value);
  });
  const handleStructure = useCallback(value => {
    setStructure(value);
  });

  const handleYearsStayedChange = useCallback(
    text => {
      setyearsstayed(text);
    },
    [yearsstayed],
  );
  const hadnlePeopleName = useCallback(
    value => {
      // const getid = value.split('-')[0].trim();
      // const getname = value.split('-')[1].trim();

      setpeopleid(value.resident_pk);
      setpeoplename(value.first_name + ' ' + value.last_name);
      setresidentname(value.first_name + ' ' + value.last_name);
    },
    [PeopleName],
  );

  const handleRelationShip = useCallback(
    text => {
      setrelationship(text);
    },
    [relationship],
  );
  const handlePeopleLivingInsideTheHouse = useCallback(item => {
    // console.log(item);
  });
  const handlePeopleAdd = useCallback(async () => {
    setIsVisible(false);

    if (relationship === '') {
      setAlertshow(true);
      setAlertmessage('Please select the relationship of the person');
      setAlerttitle('Try Again');
      wait(1000).then(() => {
        setAlertshow(false);
      });
      return; // Exit the function if the relationship is not selected
    }

    const personExists = PeopleInsidetheHouse.some(
      item => item.PeopleName === residentname,
    );

    if (!personExists) {
      const newPerson = {
        resident_pk: parseInt(peopleid),
        PeopleName: residentname,
        realationship: relationship,
      };

      setPeopleInsidetheHouse(prev => [...prev, newPerson]);
      setfam_member(prev => [
        ...prev,
        {
          resident_pk: parseInt(peopleid),
          rel: relationship,
          PeopleName: residentname,
        },
      ]);
    } else {
      alert('Resident already exists in the list');
    }
  }, [
    PeopleInsidetheHouse,
    fam_member_add,
    fam_member,
    peopleid,
    relationship,
    residentname,
  ]);

  const handleAddPeople = useCallback(async () => {
    await setIsVisible(true);
  });

  const [gestureName, setgestureName] = useState('');
  const [list, updateList] = useState(PeopleInsidetheHouse);
  const handleRemoveItem = useCallback(
    e => {
      setPeopleInsidetheHouse(
        PeopleInsidetheHouse.filter(item => item.PeopleName !== e.PeopleName),
      );
      setfam_member(
        fam_member.filter(item => item.PeopleName !== e.PeopleName),
      );
    },
    [(fam_member, PeopleInsidetheHouse)],
  );
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setPeopleInsidetheHouse([]);
    setfam_member([]);

    try {
      await dispatch(action_get_FAD_exist(users_reducers?.resident_pk));

      const famMembers = residents_data_exist?.data[0]?.fam_members || [];
      const updatedPeopleInsideHouse = famMembers.map(item => ({
        PeopleName: item?.first_name + ' ' + item?.last_name,
        realationship: item?.rel,
      }));

      const updatedFamMembers = famMembers.map(item => ({
        PeopleName: item?.first_name + ' ' + item?.last_name,
        resident_pk: parseInt(item?.resident_pk),
        rel: item?.rel,
      }));

      setPeopleInsidetheHouse(updatedPeopleInsideHouse);
      setfam_member(updatedFamMembers);
    } catch (error) {
      // Handle any errors that occur during the dispatch or data processing.
      console.error(error);
    } finally {
      setRefreshing(false);
    }
  }, [
    dispatch,
    residents_data_exist,
    users_reducers?.resident_pk,
    setPeopleInsidetheHouse,
    setfam_member,
  ]);

  useEffect(() => {
    let mounted = true;

    const listofresident = async () => {
      dispatch(action_get_residents_list(searchvalue));
      if (mounted) {
        setspinner(true);
        // setwaterconnection([]);
        // setwaterconnectionsaver([]);
        // sethasLightConnection([]);
        // sethasLightConnectionsaver([]);
        // sethasComfortRoom([]);
        // sethasComfortRoomsaver([]);
        // setwastemanagement([]);
        // setwastemanagementsaver([]);
        // setvictimofabuse([]);
        // setvictimofabusesaver([]);
        // setkahimtangsakomunidad([]);
        // setkahimtangsakomunidadsaver([]);
        // setserbisyo([]);
        // setserbisyosaver([]);
        // setCheckedWaterConnection({});

        if (searchvalue === '') {
          setsearchvalue(null);
        }

        setPeopleInsidetheHouse([]);

        if (residents_data_exist?.data[0]?.kadugayon_pagpuyo === undefined) {
          setspinner(false);
          setisDisabled(false);
        } else {
          setisDisabled(false);
          setspinner(true);

          // const residentFormData = resident_form?.data;

          // const {
          //   tinubdan_tubig,
          //   pasilidad_kuryente,
          //   matang_kasilyas,
          //   matang_basura,
          //   biktima_pangabuso,
          //   kahimtanang_komunidad,
          //   serbisyo_nadawat,
          // } = residentFormData;

          // if (residentFormData) {
          //   // Function to update state and saver
          //   const updateFieldData = (field, setFunc, setSaverFunc) => {
          //     if (field) {
          //       field.map(item => {
          //         setFunc(prev => [
          //           ...prev,
          //           {label: item, value: item},
          //           item, // Append the item directly to the saver array
          //         ]);
          //       });
          //     }
          //   };

          //   setOccationofthehouse(residents_data_exist.data[0].okasyon_balay);
          //   setOccationfortheland(residents_data_exist.data[0].okasyon_yuta);
          //   setStructure(residents_data_exist.data[0].straktura);
          //   setQualityness(residents_data_exist.data[0].kaligon_balay);
          //   setyearsstayed('' + residents_data_exist.data[0].kadugayon_pagpuyo);

          //   updateFieldData(
          //     tinubdan_tubig,
          //     setwaterconnection,
          //     setwaterconnectionsaver,
          //   );
          //   updateFieldData(
          //     pasilidad_kuryente,
          //     sethasLightConnection,
          //     sethasLightConnectionsaver,
          //   );
          //   updateFieldData(
          //     matang_kasilyas,
          //     sethasComfortRoom,
          //     sethasComfortRoomsaver,
          //   );
          //   updateFieldData(
          //     matang_basura,
          //     setwastemanagement,
          //     setwastemanagementsaver,
          //   );
          //   updateFieldData(
          //     biktima_pangabuso,
          //     setvictimofabuse,
          //     setvictimofabusesaver,
          //   );
          //   updateFieldData(
          //     kahimtanang_komunidad,
          //     setkahimtangsakomunidad,
          //     setkahimtangsakomunidadsaver,
          //   );
          //   serbisyo_nadawat.map(item => {
          //     let agency = '';
          //     if (item.programa === 'Scholarship') {
          //       setscholarship(item.ahensya);
          //     } else if (item.programa === 'Livelihood') {
          //       setlivelihood(item.ahensya);
          //     } else if (item.programa === 'Housing') {
          //       sethouseing(item.ahensya);
          //     } else if (item.programa === 'Financial') {
          //       setfinancial(item.ahensya);
          //     } else if (item.programa === 'Lingap') {
          //       setlingap(item.ahensya);
          //     } else if (item.programa === 'Medical nga Tabang') {
          //       setmedicalngatabang(item.ahensya);
          //     } else if (item.programa === 'Day Care Service') {
          //       setdaycareservice(item.ahensya);
          //     } else if (item.programa === 'Skill Training') {
          //       setskilltraining(item.ahensya);
          //     } else if (item.programa === 'Employment') {
          //       setEmployment(item.ahensya);
          //     }
          //     setserbisyo(prev => [
          //       ...prev,
          //       {label: item.programa, value: item.programa},
          //     ]);
          //     setserbisyosaver(prev => [
          //       ...prev,
          //       {programa: item.programa, ahensya: item.ahensya},
          //     ]);
          //   });
          // }

          setspinner(false);

          if (residents_data_exist.data[0]?.fam_members) {
            const updatedPeopleInsideTheHouse =
              residents_data_exist.data[0]?.fam_members.map(item => ({
                PeopleName: `${item?.first_name} ${item?.last_name}`,
                realationship: item?.rel,
              }));

            const updatedFamMember =
              residents_data_exist.data[0]?.fam_members.map(item => ({
                PeopleName: `${item?.first_name} ${item?.last_name}`,
                resident_pk: parseInt(item?.resident_pk),
                rel: item?.rel,
              }));

            setPeopleInsidetheHouse(updatedPeopleInsideTheHouse);
            setfam_member(updatedFamMember);
          }
          setspinner(false);
        }
      }
    };

    mounted && listofresident();

    return () => {
      mounted = false;
    };
  }, [
    dispatch,
    searchvalue,
    residents_data_exist,
    resident_form,
    users_reducers,
  ]);

  const onSwipe = useCallback((gestureName, gestureState) => {
    const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    setgestureName({gestureName: gestureName});
    switch (gestureName) {
      case SWIPE_UP:
        // setopen(true);
        break;
      case SWIPE_DOWN:
        setIsVisible(false);

        break;
      case SWIPE_LEFT:
        // setgestureName({backgroundColor: 'blue'});
        break;
      case SWIPE_RIGHT:
        // setgestureName({backgroundColor: 'yellow'});
        break;
    }
  });
  const config = {
    velocityThreshold: 0.5,
    directionalOffsetThreshold: 80,
  };
  return (
    // <ImageBackground
    // style={{flex: 1}}
    // source={require('../../assets/background/bgImage.jpg')}
    // resizeMode="cover"
    // blurRadius={20}>
    // <Card containerStyle={styles.plate}>
      <ScrollView style={{height: screenHeight}} nestedScrollEnabled={true}>
        <Spinner
          visible={spinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />

        <View style={styles.container}>
          <CustomAlert
            title={Alerttitle}
            message={Alertmessage}
            show={Alertshow}
          />
          <View style={{flex: 1, height: screenHeight - 90}}>
            <ProgressSteps
              labelFontSize={8}
              activeLabelColor="#623256"
              activeStepNumColor="#623256"
              activeStepIconBorderColor="#623256"
              completedProgressBarColor="#623256"
              completedLabelColor="#623256"
              completedStepNumColor="#623256"
              completedStepIconColor="#623256">
              <ProgressStep
                nextBtnTextStyle={styles.buttonStyle}
                previousBtnTextStyle={styles.buttonStyle}
                label="Information"
                onNext={handleNextInfo}
                errors={InfoError}>
                <View style={styles.Inputcontainer}>
                  <TextInput
                    style={{margin:5}}
                    disabled={true}
                    theme={{
                      colors: {
                        primary: '#3eb2fa',
                        background: 'white',
                        underlineColor: 'transparent',
                      },
                    }}
                    mode="flat"
                    label="First Name"
                    value={users_reducers.first_name}
                  />
                  <TextInput
                   style={{margin:5}}
                    disabled={true}
                    theme={{
                      colors: {
                        primary: '#3eb2fa',
                        background: 'white',
                        underlineColor: 'transparent',
                      },
                    }}
                    mode="flat"
                    label="Middle Name"
                    value={users_reducers.middle_name}
                  />
                  <TextInput
                   style={{margin:5}}
                    disabled={true}
                    theme={{
                      colors: {
                        primary: '#3eb2fa',
                        background: 'white',
                        underlineColor: 'transparent',
                      },
                    }}
                    mode="flat"
                    label="Last Name"
                    value={users_reducers.last_name}
                  />

                  <View style={styles.container}>
                    {/* <Card
                    style={{
                      marginTop: 20,
                      marginBottom: 20,
                      textAlign: 'center',
                      height: 40,
                    }}>
                    <Text style={{textAlign: 'center'}}>
                      Family Assesment Data
                    </Text>
                  </Card> */}
                    <Picker
                      selectedValue={Occationofthehouse}
                      // value={Occationofthehouse}
                      style={styles.PickerContainer}
                      onValueChange={(itemValue, itemIndex) =>
                        handleOccationofthehouse(itemValue)
                      }>
                      <Picker.Item key={0} label="Okasyon sa balay" />
                      <Picker.Item key={1} label="Tag-iya" value="Tag-iya" />
                      <Picker.Item key={2} label="Renta" value="Renta" />
                      <Picker.Item key={3} label="Boarder" value="Boarder" />
                      <Picker.Item
                        key={4}
                        label="Nangipon ug puyo"
                        value="Nangipon ug puyo"
                      />
                      <Picker.Item
                        key={5}
                        label="Nisumpay ug balay"
                        value="Nisumpay ug balay"
                      />
                    </Picker>
                    <Picker
                      selectedValue={Occationfortheland}
                      style={styles.PickerContainer}
                      onValueChange={(itemValue, itemIndex) =>
                        handleOccationfortheland(itemValue)
                      }>
                      <Picker.Item label="Okasyon sa Yuta" />
                      <Picker.Item
                        key={0}
                        label="Nanag-iya sa yuta"
                        value="Nanag-iya sa yuta"
                      />
                      <Picker.Item
                        key={1}
                        label="Nang arkila sa yuta"
                        value="Nang arkila sa yuta"
                      />
                      <Picker.Item
                        key={2}
                        label="Informal settler"
                        value="Informal settler"
                      />
                      <Picker.Item
                        key={3}
                        label="Tigbantay sa yuta"
                        value="Tigbantay sa yuta"
                      />
                    </Picker>
                    <TextInput
                     style={{margin:5}}
                      disabled={isDisabled}
                      theme={{
                        colors: {
                          primary: '#3eb2fa',
                          background: 'white',
                          underlineColor: 'transparent',
                        },
                      }}
                      keyboardType={'number-pad'}
                      onChangeText={text => handleYearsStayedChange(text)}
                      mode="flat"
                      label="Kadugayon sa pagpuyo diha sa Barangay"
                      value={yearsstayed}
                    />

                    <Picker
                      selectedValue={structure}
                      style={styles.PickerContainer}
                      onValueChange={(itemValue, itemIndex) =>
                        handleStructure(itemValue)
                      }>
                      <Picker.Item label="Straktura sa Balay" />
                      <Picker.Item
                        key={0}
                        label="Binuhat sa kahoy"
                        value="Binuhat sa kahoy"
                      />
                      <Picker.Item
                        key={1}
                        label="Binuhat sa Semento"
                        value="Binuhat sa Semento"
                      />
                      <Picker.Item
                        key={2}
                        label="Kombinasyon sa kahoy ug semento"
                        value="Kombinasyon sa kahoy ug semento"
                      />
                      <Picker.Item
                        key={3}
                        label="Binuhat sa mga nilabay na materyales sama sa (karton,plastic,etc.)"
                        value="Binuhat sa mga nilabay na materyales sama sa (karton,plastic,etc.)"
                      />
                    </Picker>

                    <Picker
                      selectedValue={qualityness}
                      style={styles.PickerContainer}
                      onValueChange={(itemValue, itemIndex) =>
                        handleQualityness(itemValue)
                      }>
                      <Picker.Item key={0} label="Kalig-on sa balay" />
                      <Picker.Item key={1} label="Huyang" value="Huyang" />
                      <Picker.Item key={2} label="Lig-on" value="Lig-on" />
                    </Picker>
                  </View>
                </View>
              </ProgressStep>
              <ProgressStep
                label="Ikaduhang bahin"
                nextBtnTextStyle={styles.buttonStyle}
                previousBtnTextStyle={styles.buttonStyle}
                onNext={handleSecondInfo}
                errors={InfoError}>
                <ScrollView style={styles.Inputcontainer}>
                  <Text
                    style={{
                      color: '#623256',
                      fontWeight: '700',
                      fontSize: 16,
                      textAlign: 'center',
                    }}>
                    Tinubdan sa Tubig
                  </Text>
                  <SelectMultiple
                    items={waterconnectionchecked}
                    selectedItems={waterconnection}
                    onSelectionsChange={(selections, item) =>
                      handleCheckBoxwaterConntection(selections, item)
                    }
                  />

                  <Text
                    style={{
                      color: '#623256',
                      fontWeight: '700',
                      fontSize: 16,
                      textAlign: 'center',
                    }}>
                    Matang sa Kasilyas
                  </Text>
                  <SelectMultiple
                    items={Kasilyaschecked}
                    selectedItems={hasComfortRoom}
                    onSelectionsChange={(selections, item) =>
                      handleCheckBoxKasilyas(selections, item)
                    }
                  />

                  <Text
                    style={{
                      color: '#623256',
                      fontWeight: '700',
                      fontSize: 16,
                      textAlign: 'center',
                    }}>
                    Pasilidad sa Kuryente
                  </Text>
                  <SelectMultiple
                    items={kuryentechecked}
                    selectedItems={hasLightConnection}
                    onSelectionsChange={(selections, item) =>
                      handleCheckBoxKuryente(selections, item)
                    }
                  />

                  <Text
                    style={{
                      color: '#623256',
                      fontWeight: '700',
                      fontSize: 16,
                      textAlign: 'center',
                    }}>
                    Matang sa Panghipos sa Basura
                  </Text>
                  <SelectMultiple
                    items={basuracheckedf}
                    selectedItems={wastemanagement}
                    onSelectionsChange={(selections, item) =>
                      handleCheckBoxBasura(selections, item)
                    }
                  />

                  <Text
                    style={{
                      color: '#623256',
                      fontWeight: '700',
                      fontSize: 16,
                      textAlign: 'center',
                    }}>
                    Biktima sa Pang Abuso
                  </Text>
                  <SelectMultiple
                    items={pangabusocheked}
                    selectedItems={victimofabuse}
                    onSelectionsChange={(selections, item) =>
                      handleCheckBoxPangabuso(selections, item)
                    }
                  />
                </ScrollView>
              </ProgressStep>
              <ProgressStep
                label="Ikatulong bahin"
                nextBtnTextStyle={styles.buttonStyle}
                previousBtnTextStyle={styles.buttonStyle}
                onNext={handleThirdInfo}
                errors={InfoError}>
                <SelectMultiple
                  items={kahimtangsakomunidadcheck}
                  selectedItems={kahimtangsakomunidad}
                  onSelectionsChange={(selections, item) =>
                    handleCheckBoxKahitang(selections, item)
                  }
                />
              </ProgressStep>
              <ProgressStep
                label="Ikaupat bahin"
                nextBtnTextStyle={styles.buttonStyle}
                previousBtnTextStyle={styles.buttonStyle}
                onNext={handleFourthInfo}
                errors={InfoError}>
                <Text
                  style={{
                    color: '#623256',
                    fontWeight: '700',
                    fontSize: 14,
                    textAlign: 'left',
                    padding:10
                  }}>
                  Note: Palihug ug sulat daan sa ahensya bag.o i tuplok ang
                  serbisyo
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <View style={{width: '50%'}}>
                    <Text
                      style={{
                        color: '#623256',
                        fontWeight: '700',
                        fontSize: 14,
                        textAlign: 'center',
                      }}>
                      Serbisyo
                    </Text>
                    <SelectMultiple
                      style={{padding:5}}
                      items={serbisyochecked}
                      selectedItems={serbisyo}
                      onSelectionsChange={(selections, item) =>
                        handleCheckBoxSerbisyo(selections, item)
                      }
                    />
                  </View>
                  <View style={{width: '50%'}}>
                    <Text
                      style={{
                        color: '#623256',
                        fontWeight: '700',
                        fontSize: 14,
                        textAlign: 'center',
                      }}>
                      Ahensya
                    </Text>
                    <TextInput
                      style={{height: 50}}
                      theme={{
                        colors: {
                          primary: '#3eb2fa',
                          background: 'white',
                          underlineColor: 'transparent',
                        },
                      }}
                      mode="flat"
                      onChangeText={text => setscholarship(text)}
                      label="Scholarship"
                      value={scholarship}
                    />
                    <TextInput
                       style={{height: 50}}
                      theme={{
                        colors: {
                          primary: '#3eb2fa',
                          background: 'white',
                          underlineColor: 'transparent',
                        },
                      }}
                      mode="flat"
                      onChangeText={text => setlivelihood(text)}
                      label="Livelihood"
                      value={livelihood}
                    />
                    <TextInput
                       style={{height: 50}}
                      theme={{
                        colors: {
                          primary: '#3eb2fa',
                          background: 'white',
                          underlineColor: 'transparent',
                        },
                      }}
                      mode="flat"
                      onChangeText={text => sethouseing(text)}
                      label="Housing"
                      value={houseing}
                    />
                    <TextInput
                       style={{height: 50}}
                      theme={{
                        colors: {
                          primary: '#3eb2fa',
                          background: 'white',
                          underlineColor: 'transparent',
                        },
                      }}
                      mode="flat"
                      onChangeText={text => setfinancial(text)}
                      label="Financial"
                      value={financial}
                    />
                    <TextInput
                       style={{height: 50}}
                      theme={{
                        colors: {
                          primary: '#3eb2fa',
                          background: 'white',
                          underlineColor: 'transparent',
                        },
                      }}
                      mode="flat"
                      onChangeText={text => setlingap(text)}
                      label="Lingap"
                      value={lingap}
                    />
                    <TextInput
                       style={{height: 50}}
                      theme={{
                        colors: {
                          primary: '#3eb2fa',
                          background: 'white',
                          underlineColor: 'transparent',
                        },
                      }}
                      mode="flat"
                      onChangeText={text => setmedicalngatabang(text)}
                      label="Medical nga Tabang"
                      value={medicalngatabang}
                    />
                    <TextInput
                       style={{height: 50}}
                      theme={{
                        colors: {
                          primary: '#3eb2fa',
                          background: 'white',
                          underlineColor: 'transparent',
                        },
                      }}
                      mode="flat"
                      onChangeText={text => setdaycareservice(text)}
                      label="Day Care Service"
                      value={daycareservice}
                    />
                    <TextInput
                       style={{height: 50}}
                      theme={{
                        colors: {
                          primary: '#3eb2fa',
                          background: 'white',
                          underlineColor: 'transparent',
                        },
                      }}
                      mode="flat"
                      onChangeText={text => setskilltraining(text)}
                      label="Skill Training"
                      value={skilltraining}
                    />
                    <TextInput
                      style={{height: 50}}
                      theme={{
                        colors: {
                          primary: '#3eb2fa',
                          background: 'white',
                          underlineColor: 'transparent',
                        },
                      }}
                      mode="flat"
                      onChangeText={text => setEmployment(text)}
                      label="Employment"
                      value={Employment}
                    />
                  </View>
                </View>
              </ProgressStep>
              <ProgressStep
                nextBtnTextStyle={styles.buttonStyle}
                previousBtnTextStyle={styles.buttonStyle}
                label="Sakop sa Panimalay"
                onSubmit={() => handleSubmit()}>
                <View style={styles.Inputcontainer}>
                  <ScrollView
                    nestedScrollEnabled={true}
                    refreshControl={
                      <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                      />
                    }
                    style={{
                      height: screenHeight - 500,
                      padding: 10,
                      width: '100%',
                    }}
                    showsHorizontalScrollIndicator={false}>
                    {PeopleInsidetheHouse.map((item, index) => {
                      return (
                        <TouchableNativeFeedback
                          key={index}
                          name={item?.PeopleName}
                          onLongPress={() => handleRemoveItem(item)}
                          onPress={() => {
                            handlePeopleLivingInsideTheHouse(item);
                          }}>
                          <View style={styles.touchablecontainer}>
                            <Card>
                              <View
                                style={{
                                  flex: 1,
                                  flexDirection: 'column',
                                  justifyContent: 'space-between',
                                }}>
                                <View
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    width: '100%',
                                  }}>
                                  <Text
                                    numberOfLines={1}
                                    style={styles.peopletext}>
                                    Name: {item?.PeopleName}
                                  </Text>
                                  <Text
                                    numberOfLines={1}
                                    style={styles.peopletext}>
                                    Relasyon: {item?.realationship}
                                  </Text>
                                </View>
                              </View>
                            </Card>
                          </View>
                        </TouchableNativeFeedback>
                      );
                    })}
                  </ScrollView>
                  <GestureRecognizer
                    onSwipe={(direction, state) => onSwipe(direction, state)}
                    config={config}
                    style={{
                      flex: 1,
                    }}>
                    <CustomBottomSheet
                      isVisible={isVisible}
                      color="white"
                      UI={
                        <View style={{padding: 10, height: screenHeight}}>
                          <View
                            style={{marginBottom: 50, padding: 10, gap: 15}}>
                            {/* // items={residents_list?.map((item, index) => [
                            //   {
                            //     label: item?.first_name,
                            //     value: item?.resident_pk,
                            //   },
                            // ])} */}
                            <Searchbar
                              icon
                              clearIcon={true}
                              placeholder="Search Person"
                              onChangeText={e => onChangeSearch(e)}
                              defaultValue={null}
                              value={searchvalue}
                            />
                            <ScrollView
                              nestedScrollEnabled={true}
                              style={{
                                marginBottom: 10,
                                padding: 5,
                                height: screenHeight - 600,
                              }}>
                              <SafeAreaView>
                                {residents_list.map((item, index) => (
                                  <TouchableHighlight
                                    key={index}
                                    onPress={() => hadnlePeopleName(item)}
                                    ker={item.first_name}
                                    underlayColor="#623256">
                                    <Card
                                      style={{
                                        textAlign: 'center',
                                        height: 40,

                                        padding: 5,
                                      }}>
                                      <Text
                                        styles={{
                                          height: screenHeight,

                                          padding: 5,
                                        }}>
                                        {item.first_name + ' ' + item.last_name}
                                      </Text>
                                    </Card>
                                  </TouchableHighlight>
                                ))}
                              </SafeAreaView>
                            </ScrollView>

                            <Text
                              style={{
                                textAlign: 'center',
                                fontWeight: 'bold',
                                fontSize: 16,
                                padding: 5,
                              }}>
                              Selected Person: {residentname}
                            </Text>

                            {/* <Picker
                            selectedValue={PeopleName}
                            style={styles.PickerContainer}
                            onValueChange={(itemValue, itemIndex) =>
                              hadnlePeopleName(itemValue)
                            }>
                            <Picker.Item label="Pangalan" />
                            {residents_list.map((item, index) => (
                              <Picker.Item
                                key={index}
                                label={item.first_name + ' ' + item.last_name}
                                value={
                                  item.resident_pk +
                                  ' - ' +
                                  item.first_name +
                                  ' ' +
                                  item.last_name
                                }
                              />
                            ))}
                          </Picker> */}

                            {/* <DropDownPicker
                            items={residents_list.map((item, index) => [
                              {
                                value:
                                  item?.resident_pk +
                                  ' - ' +
                                  item?.first_name +
                                  ' ' +
                                  item?.last_name,
                                label: item?.first_name + ' ' + item?.last_name,
                              },
                            ])}
                            defaultValue={PeopleName}
                            containerStyle={{height: 40}}
                            style={{backgroundColor: '#fafafa'}}
                            itemStyle={{
                              justifyContent: 'flex-start',
                            }}
                            searchable={true}
                            searchableError={() => <Text>Not Found</Text>}
                            searchablePlaceholder="Search Name"
                            dropDownStyle={{backgroundColor: '#fafafa'}}
                            onChangeItem={(item) => console.log(item)}
                            onSearch={(text) => {
                              // Example
                              console.log(text);
                            }}
                          /> */}
                            <Text
                              style={{
                                textAlign: 'justify',
                                fontWeight: 'bold',
                                fontSize: 14,
                                paddingTop: 15,
                              }}>
                              Relasyon
                            </Text>
                            <Picker
                              selectedValue={relationship}
                              style={styles.PickerContainer}
                              onValueChange={(itemValue, itemIndex) =>
                                handleRelationShip(itemValue)
                              }>
                              <Picker.Item label="Relasyon" />
                              <Picker.Item label="asawa" value="asawa" />
                              <Picker.Item label="bana" value="bana" />
                              <Picker.Item label="anak" value="anak" />
                              <Picker.Item label="igsuon" value="igsuon" />
                              <Picker.Item label="asawa" value="asawa" />
                              <Picker.Item label="inahan" value="inahan" />
                            </Picker>

                            <Button
                              icon={
                                <Icons
                                  name="arrow-right"
                                  size={20}
                                  color="#623256"
                                />
                              }
                              title="Add to family"
                              onPress={() => handlePeopleAdd()}
                            />
                          </View>
                        </View>
                      }
                    />
                  </GestureRecognizer>
                  <View style={{margin:20}}>
                    <Button
                      icon={
                        <Icons name="arrow-right" size={10} color="#623256" />
                      }
                      title="Add family members"
                      onPress={() => handleAddPeople()}>
                      Add People
                    </Button>
                  </View>
                </View>
              </ProgressStep>
            </ProgressSteps>
          </View>
        </View>

        <>
          <CustomSnackBar show={showsnackbar} message={submitmessage} />
        </>
      </ScrollView>
    // </ImageBackground>
  );
};

export default FADForm;
