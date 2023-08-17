import {StyleSheet} from 'react-native';

// import * as Font from 'expo-font';                                  //defined under asset bundle in app.json

// const loadFonts = async () => {
//     (console.log('hello3'))

//     await Font.loadAsync({
//         'Montserrat-SemiBold': require('../assets/fonts/Montserrat-SemiBold.ttf'),
//         'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf')
//     })
// }
// loadFonts();

export const landingStyles = StyleSheet.create({
    landingContainer: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
        backgroundColor: 'white',
        height: '100%',
        width: '100%',
    },
    title: {
        fontSize: 25,
        color: '#9acd32',
        paddingBottom: 10
    },
    imageBackground: {
        height: 150,
        width: 200,
        resizeMode:'contain'
    },
    subtitle: {
        color: "#008b8b",
        fontSize: 15,                       //(density-independent pixels)
        paddingTop: 10
    }
})

export const mainPageStyles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: '#f5f5f5',       
      justifyContent: 'center',         //along main axis //default flex direction is column in React Native
      alignItems: 'center',             //align the content as a whole - alignItems
      padding: 0
    },
    statusBar: {
      backgroundColor:"#5cb3ed",
    },
})

export const settingsStyle = StyleSheet.create({
    title:  {
                color: 'white',
                fontSize: 10
            }
})

export const linkToPreviousPageStyles = StyleSheet.create({

    link:       {
                    color: 'black',
                    textDecorationLine: 'underline',
                    marginBottom: 20,
                    marginTop: 5,
                    marginLeft: 5,
                    fontSize: 14
                },
    swapPage:   {
                    color: 'black',
                    textDecorationLine: 'underline',
                    fontSize: 13,
                }
})


export const mainButtonStyle = (mainSwitch) => {
    return( StyleSheet.create({

    title:              {
                            color: '#20b2aa',
                            // fontFamily: 'Montserrat-SemiBold',
                            textAlign: 'center',
                            marginBottom: 15,
                            fontSize: 18
                        },
    roundButton:        {
                            borderRadius: 100,
                            height: 200,
                            width: 200,
                            backgroundColor: mainSwitch ? '#32CD32' : '#7F00FF',
                            alignItems: 'center',
                            justifyContent: 'center'
                        },
    buttonText:         {
                            fontWeight: 'bold',
                            color: 'white',
                            // fontFamily: 'Montserrat-SemiBold',
                            textAlign: 'center',
                            fontSize: 16
                        },
    settingsButton:     {
                            width: 250,
                            height: 60,
                            backgroundColor: '#ffa07a',
                            flexWrap: 'Wrap',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: 5
                        },
    settingsButtonText: {
                            color: '#6082B6',
                            // fontFamily: 'Montserrat-SemiBold',
                            textAlign: 'center',
                            fontWeight: 'bold',
                            fontSize: 16
                        }
    })
)}

