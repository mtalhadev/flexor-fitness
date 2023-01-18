import moment from "moment";

export function formatDate(date) {
    return moment(date.dateString, 'YYYY-MM-DD', true).format('MMMM DD, YYYY');
  }
  
export  const firstName = (name='') => {
    if(name.length > 0)
      return name.split(' ')[0].trim();
    
  }
export function titleCase(str) {
  return str.toLowerCase().split(' ').map(function(word) {
    return (word.charAt(0).toUpperCase() + word.slice(1));
  }).join(' ');
}

export function ordinal(n) {
  var s = ["th", "st", "nd", "rd"];
  var v = n%100;
  return n + (s[(v-20)%10] || s[v] || s[0]);
}

export const makeSectionsByWeek = (rawData = []) => {
  let data = rawData.reduce((r, e) => {
    // get first letter of name of current element
    let title = `Week ${e.week}`;
    // if there is no property in accumulator with this letter create it
    if(!r[title]) r[title] = {title, data: [e]}
    // if there is push current element to children array for that letter
    else r[title].data.push(e);   
    // return accumulator
    return r;
  }, {})
  
  // since data at this point is an object, to get array of values
  // we use Object.values method
  let sections = Object.values(data);
  sections.forEach(section => {
    section.data.sort((a,b) => a.day - b.day);
  })
  return sections
  
};

export function isAfterToday(date) {
  const today = new Date();
  today.setHours(23, 59, 59, 998);
  return date > today;
}

export function timeInWords(date) {
  return moment(date).calendar(null, {
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    nextWeek: 'MMM, D',
    lastDay: '[Yesterday]',
    lastWeek: '[Last] dddd',
    sameElse: 'MMM, D'
  })
}

export const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
