import {StyleSheet} from 'react-native';

export const landingStyles = StyleSheet.create({
    landingContainer: {
        flex:1,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: 'white',
        padding: 0
    },
    title: {
        fontFamily: 'Montserrat-SemiBold',
        color: '#333333',
        paddingBottom: 2
    },
    imageBackground: {
        resizeMode:'center',                //I do not want the logo to scale to changing dimensions
    },
    subtitle: {
        fontFamily: 'Montserrat-Regular',
        color: '#333333',
        fontSize: 12,                       //(density-independent pixels)
        paddingTop: 2
    }
})

export const mainPageStyles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: '#246EE9',       //royal blue
      justifyContent: 'center',         //along main axis //default flex direction is column in React Native
      alignContent: 'center',           //align the content as a whole - alignItems
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

export const mainButtonStyle = StyleSheet.create({

    title:              {
                            color: 'black',
                            fontFamily: 'Montserrat-SemiBold',
                            textAlign: 'center'
                        },
    roundButton:        {
                            borderRadius: 50,
                            paddingHorizontal: 20,
                            paddingVertical: 20,
                            backgroundColor: mainSwitch ? '#32CD32' : '#7F00FF',
                            flexWrap: 'wrap',
                            alignItems: 'center',
                            justifyContent: 'center'
                        },
    buttonText:         {
                            fontWeight: 'bold',
                            color: 'white',
                            fontFamily: 'Montserrat-SemiBold',
                            textAlign: 'center'
                        },
    settingsButton:     {
                            width: 250,
                            height: 120,
                            backgroundColor: '#E5E4E2',
                            flexWrap: 'Wrap',
                            alignItems: 'center',
                            justifyContent: 'center'
                        },
    settingsButtonText: {
                            color: '#6082B6',
                            fontFamily: 'Montserrat-SemiBold',
                            textAlign: 'center'
                        }
})

