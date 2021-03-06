import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#142444', 
      alignItems: 'center', 
      justifyContent: 'center',
      width: '100%',
    },
    logoContainer: {
      flex: 2, 
      alignSelf: 'stretch', 
      alignItems: 'center', 
      justifyContent: 'center'
    },
    textInputContainer: {
      flex: 4, 
      alignSelf: 'stretch', 
      alignItems: 'center', 
      justifyContent: 'flex-end'
    },
    buttonLoginContainer: {
      flex: 4, 
      alignSelf: 'stretch', 
      alignItems: 'center', 
      justifyContent: 'flex-end', 
      paddingBottom: 20
    },
    centeredView: {
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "flex-end",
      marginTop: 26
    },
    modalView: {
      margin: 30,
      backgroundColor: "#fff",
      width: 150,
      borderRadius: 10,
      padding: 10,
      alignItems: "center",
      justifyContent: 'center',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      // elevation: 5
    },
    openButton: {
      backgroundColor: "#F194FF",
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center",
      fontSize: 24
    }
});
