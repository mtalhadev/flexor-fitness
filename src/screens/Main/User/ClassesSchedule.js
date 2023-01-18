import moment from "moment";
import React, { useMemo, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import { ListItem } from "react-native-elements";
import MulishText from "../../../components/MulishText";
import NavigationHeader from "../../../components/NavigationHeader";
import RNCalendar from "../../../components/RNCalendar";
import Colors from "../../../constants/Colors";
import { wp } from "../../../constants/Constants";
import { fetchMyPrograms } from "../../../redux/actions/ProfileActions";
import {
  useIsLoading,
  useMyClasses,
  useProfile,
} from "../../../redux/reducers/ProfileReducer";
import { useDispatchEffect } from "../../../utilities/hooks";
import { _translate } from "../../../localization";
import { navigate } from "../../../navigations/NavigationService";
import { useDispatch } from "react-redux";
import { setVideoDetails } from "../../../redux/reducers/ClientReducer";

export default function ClassesSchedule() {
  const dispatch = useDispatch();
  const user = useProfile();
  const classes = useMyClasses();
  const isLoading = useIsLoading();

  const onRefresh = useDispatchEffect(fetchMyPrograms, null, true);

  const videos = useMemo(() => {
    let vids = [];
    if (classes.length)
      for (const cls of classes) {
        const createdDate = moment(new Date(cls.createdAt));
        const day = createdDate.day() - 1;
        const startDate = moment(createdDate).add(7 - day, "days");
        const videos = cls.videos.map((vid) => ({
          ...vid,
          classId: cls._id,
          classTitle: cls.title,
          date: videoDate(startDate, vid.week, vid.day),
        }));
        vids = vids.concat(videos);
      }
    return vids;
  }, [classes]);

  const classDates = useMemo(() => {
    let dates = {};
    for (const video of videos) {
      const date = video.date;
      dates[date] = {
        marked: true,
        dotColor: video.viewed.includes(user?._id)
          ? Colors.primaryColor
          : "red",
      };
    }
    return dates;
  }, [videos]);

  const [selectedDate, setSelectedDate] = useState(moment());

  const dateVids = videos.filter((video) => {
    const date = moment(new Date(video.date));
    return selectedDate.isSame(date, "day");
  });

  const onPressVideo = (video) => {
    dispatch(setVideoDetails(video));
    navigate('VideoPlayerScreen', { programId: video.classId });
  }


  // console.log('videos: ', videos);
  // console.log('classDates: ', classDates);
  // console.log('dateVids: ', dateVids)
  return (
    <View style={styles.container}>
      <NavigationHeader
        title={_translate("Past-Upcoming-Classes")}
        showRightMenu={false}
      />

      <ScrollView
        contentContainerStyle={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }
      >
        <MulishText
          color="rgba(0,0,0,.53)"
          fontSize={14}
          style={{ width: wp("90%"), paddingLeft: wp("5%") }}
        >
          {_translate("clickOnAnyDateToSeeThePastAndUpcomingClasses")}
        </MulishText>

        <RNCalendar
          onSelectDate={(date) =>
            setSelectedDate(moment(date.dateString, "YYYY-MM-DD", true))
          }
          markedDates={classDates}
        />

        <View style={{ width: wp("90%"), paddingLeft: wp("5%") }}>
          <MulishText bold color="#000" fontSize={17} style={styles.heading}>
            {_translate("selectedDate")}
          </MulishText>
          <MulishText color="#000" fontSize={14}>
            {selectedDate.format("MMMM DD, YYYY")}
          </MulishText>

          <MulishText bold color="#000" fontSize={17} style={styles.heading}>
            {_translate("details")}
          </MulishText>

          {dateVids.map((vid) => (
            <VideoItem
              name={`${vid.classTitle} | ${vid.title}`}
              viewed={vid.viewed.includes(user?._id)}
              key={vid._id}
              onPress={() => onPressVideo(vid)}
            />
          ))}
        </View>
        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}

const VideoItem = ({ name, viewed, onPress }) => {
  return (
    <ListItem
      containerStyle={{
        width: "100%",
        backgroundColor: "transparent",
        padding: 0,
        marginVertical: 3,
      }}
      onPress={onPress}
    >
      <ListItem.Content>
        <ListItem.Title>
          <MulishText color="#000" fontSize={14}>
            {name}
          </MulishText>
        </ListItem.Title>
      </ListItem.Content>
      <MulishText color={viewed ? Colors.primaryColor : "grey"} fontSize={13}>
        {viewed ? `${_translate("completed")}` : `${_translate("notViewed")}`}
      </MulishText>
    </ListItem>
  );
};

const videoDate = (startDate = moment(), week, day) => {
  const date = moment(startDate).add((week - 1) * 7 + day, "days");
  return date.format("YYYY-MM-DD");
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: Colors.background2,
  },
  scrollView: {
    height: 60,
    paddingLeft: 20,
    marginTop: 15,
    marginBottom: 10,
  },
  heading: {
    marginVertical: 15,
  },
  avatar: {
    width: 47,
    height: 47,
    borderRadius: 47,
    borderWidth: 2,
    borderColor: Colors.primaryColor,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 3,
  },
});
