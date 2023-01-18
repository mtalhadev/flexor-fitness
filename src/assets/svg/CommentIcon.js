import * as React from "react"
import Svg, { Path, Circle } from "react-native-svg"

function CommentIcon(props) {
  return (
    <Svg
      width={16}
      height={14}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.197 1.16c1.132 0 2.049.918 2.049 2.05v5.463a2.049 2.049 0 01-2.049 2.049H5.965L3.66 12.77v-2.05H3.32A2.049 2.049 0 011.27 8.674V3.21c0-1.132.918-2.05 2.049-2.05h8.878zm0-1.024H3.32A3.073 3.073 0 00.246 3.21v5.463c-.001 1.435.991 2.68 2.39 2.998v1.1a1.024 1.024 0 001.707.764l2.015-1.789h5.84a3.073 3.073 0 003.072-3.073V3.21A3.073 3.073 0 0012.197.136z"
        fill="#D28536"
      />
      <Circle cx={7.758} cy={5.941} r={0.512} fill="#D28536" />
      <Circle cx={11.173} cy={5.941} r={0.512} fill="#D28536" />
      <Circle cx={4.384} cy={5.941} r={0.512} fill="#D28536" />
    </Svg>
  )
}

export default CommentIcon
