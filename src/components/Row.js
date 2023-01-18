import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';


const Row = ({children, style}) => (
    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: 'center', ...style }}>
       {children}
    </View>
  )

export default Row