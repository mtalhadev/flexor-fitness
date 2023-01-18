import { useRoute } from '@react-navigation/native';
import { unwrapResult } from '@reduxjs/toolkit';
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import RNToast from '../../../components/RNToast';
import RNVideoPlayer from '../../../components/RNVideoPlayer';
import { wp } from '../../../constants/Constants';
import { updateVideoViewed } from '../../../redux/actions/ClientActions';
import { useVideoDetails } from '../../../redux/reducers/ClientReducer';
import { _translate } from '../../../localization';

export default function VideoPlayerScreen() {
    const route = useRoute()
    const dispatch = useDispatch()
    const video = useVideoDetails(); 

    const programId = route.params.programId; 

    const handleProgress = (data) => { 
      console.log('video data: ', data)
      const progress = (data.currentTime || 0) / (data.seekableDuration || 1); 
      if(progress > 0.1)
        dispatch(updateVideoViewed({programId, videoId: video._id }))
        .then(unwrapResult)
        .then((originalPromiseResult) => {
          if(originalPromiseResult === true)
            RNToast.showShort(`Video marked as viewed`);
        })
        .catch((rejectedValue) => {
          console.log("rejectedValue: ", rejectedValue);
        });

     }

    return (
          <SafeAreaView style={styles.container}>
            <RNVideoPlayer
              source={{ uri: video.url }}
              style={styles.videoPlayer}
              title={video.title}
              onProgress={handleProgress}
              
            />

          </SafeAreaView>
    )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000'
  },
  videoPlayer: {
    backgroundColor: '#000',
    flex: 1,
    paddingVertical: 10
  },

})