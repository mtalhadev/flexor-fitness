import React from 'react';
import { TouchableOpacity } from 'react-native';
import Row from './Row';

const IconText = ({ icon, text, onPress, style }) => (
  <TouchableOpacity onPress={onPress}>
    <Row style={{ alignItems: 'center', justifyContent: 'center', paddingHorizontal: 5,}}>
      {icon}
      {text}
      </Row>
  </TouchableOpacity>
  )

export default IconText
