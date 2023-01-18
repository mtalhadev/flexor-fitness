import * as React from "react"
import Svg, { Path } from "react-native-svg"

function AtmCard(props) {
  return (
    <Svg
      width={26}
      height={26}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M4.875 4.875a3.25 3.25 0 00-3.25 3.25V9.75h22.75V8.125a3.25 3.25 0 00-3.25-3.25H4.875zM1.625 17.875v-6.5h22.75v6.5a3.25 3.25 0 01-3.25 3.25H4.875a3.25 3.25 0 01-3.25-3.25zm15.438-1.625a.812.812 0 100 1.625h3.25a.812.812 0 100-1.625h-3.25z"
        fill="#fff"
      />
    </Svg>
  )
}

export default AtmCard

