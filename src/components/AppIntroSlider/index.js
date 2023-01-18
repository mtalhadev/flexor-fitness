import React, { useRef, useState } from 'react'
import { FlatList, View, StyleSheet, } from 'react-native'
import merge_extradata_1 from './merge-extradata';

function AppIntroSlider (props) {
    const [dimensions, setDimensions] = useState({
        width: 0,
        height: 0,
    });
    const [activeIndex, setActiveIndex] = useState(0);
    const flatList = useRef();

    const goToSlide = (pageNum, triggerOnSlideChange) => {
        const prevNum = activeIndex;
        setActiveIndex(pageNum)
        flatList.current.scrollToOffset({
            offset: pageNum * dimensions.width,
        });
        if (triggerOnSlideChange && props.onSlideChange) {
            props.onSlideChange(pageNum, prevNum);
        }
    };
    const _renderItem = (flatListArgs) => {
            const props = { ...flatListArgs, dimensions };
            // eslint-disable-next-line react-native/no-inline-styles
            return <View style={{ width: dimensions.width, flex: 1 }}>{props.renderItem(props)}</View>;
    };
    const _onMomentumScrollEnd = (e) => {
        const offset = e.nativeEvent.contentOffset.x;
        // Touching very very quickly and continuous brings about
        // a variation close to - but not quite - the width.
        // That's why we round the number.
        // Also, Android phones and their weird numbers
        const newIndex = Math.round(offset / dimensions.width);
        if (newIndex === activeIndex) {
            // No page change, don't do anything
            return;
        }
        const lastIndex = activeIndex;
        setActiveIndex(newIndex)
        props.onSlideChange && props.onSlideChange(newIndex, lastIndex);
    };
    const _onLayout = ({ nativeEvent }) => {
        const { width, height } = nativeEvent.layout;
        if (width !== dimensions.width || height !== dimensions.height) {
            // Set new width to update rendering of pages
            setDimensions({ width, height });
            // Set new scroll position
            const func = () => {
                flatList.current.scrollToOffset({
                    offset: activeIndex * width,
                    animated: false,
                });
            };
            setTimeout(func, 0); 
        }
    };

        // Separate props used by the component to props passed to FlatList
        const { data, extraData, ...otherProps } = props;
        // Merge component width and user-defined extraData
        const extra = merge_extradata_1(extraData, dimensions.width);
        return (
        <View style={styles.flexOne}>
        <FlatList 
            ref={flatList} 
            data={props.data} 
            horizontal 
            pagingEnabled 
            showsHorizontalScrollIndicator={false} 
            bounces={false} 
            style={styles.flatList} 
            renderItem={_renderItem} 
            onMomentumScrollEnd={_onMomentumScrollEnd} 
            extraData={extra} 
            onLayout={_onLayout} 
            // make sure all slides are rendered so we can use dots to navigate to them
            initialNumToRender={data.length} 
            {...otherProps}
            />
      </View>
    );
}

export default  AppIntroSlider;


const styles = StyleSheet.create({
    flexOne: {
        flex: 1,
    },
    flatList: {
        flex: 1,
        flexDirection: 'row',
    },
 
});