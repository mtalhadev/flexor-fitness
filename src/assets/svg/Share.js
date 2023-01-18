import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Share(props) {
  return (
    <Svg
      width={23}
      height={23}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M.008 11.494L10.49 0v6.885h1.217a11.22 11.22 0 017.985 3.308A11.219 11.219 0 0123 18.178V23l-2.012-2.204a14.435 14.435 0 00-10.498-4.693v6.885L.008 11.494zm21.644 8.041v-1.357a9.88 9.88 0 00-2.913-7.033 9.88 9.88 0 00-7.032-2.912H9.142V3.478l-7.31 8.016 7.31 8.016v-4.755h1.21c4.254 0 8.345 1.736 11.3 4.78z"
        fill="#fff"
      />
    </Svg>
  )
}

export default Share
