import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#142444', 
      alignItems: 'center', 
      justifyContent: 'center'
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
    }
});
