import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Payment(props) {
  return (
    <Svg
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M24.542 18.083V7.75a2.59 2.59 0 00-2.584-2.583H3.875A2.59 2.59 0 001.292 7.75v10.333a2.59 2.59 0 002.583 2.584h18.083a2.59 2.59 0 002.584-2.584zm-11.625-1.291a3.87 3.87 0 01-3.875-3.876 3.87 3.87 0 013.875-3.875 3.87 3.87 0 013.875 3.875 3.87 3.87 0 01-3.875 3.875zm16.791-7.75V23.25a2.59 2.59 0 01-2.583 2.583H5.167V23.25h21.958V9.04h2.583z"
        fill="#fff"
      />
    </Svg>
  )
}

export default Payment
