import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { wp } from "../../constants/Constants"

function Search(props) {
  return (
    <Svg
      width={wp('9%')}
      height={wp('9%')}
      fill="none"
      viewBox={`0 0 ${wp('10%')}  ${wp('10%')}`}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M14.5 0C6.492 0 0 6.492 0 14.5S6.492 29 14.5 29 29 22.508 29 14.5 22.508 0 14.5 0zm.995 6.284a7.024 7.024 0 11-3.253 13.252l.003.014-3.168 3.166-2.595-2.596 3.055-3.057.016-.005a7.026 7.026 0 015.942-10.774zm0 3.12a3.904 3.904 0 10-.002 7.808 3.904 3.904 0 00.002-7.808z"
        fill="#D28536"
      />
    </Svg>
  )
}

export default Search
