import Snackbar from 'react-native-snackbar';
import Colors from '../constants/Colors';

const UndoSnackbar = {
    show: ({ message, onUndoPress }) => {
        Snackbar.show({
          text: message,
          duration: Snackbar.LENGTH_SHORT,
          action: {
            text: 'UNDO',
            textColor: Colors.primaryColor,
            onPress: onUndoPress,
          },
        });
    },
    dismiss: () => { Snackbar.dismiss() }
}

export default UndoSnackbar;