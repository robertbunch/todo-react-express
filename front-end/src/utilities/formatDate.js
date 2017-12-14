export default (date)=>{
	// We get back a mysql date, need to convert it
	// to a JS date then format
	var dateObj = new Date(date);
	if(dateObj === 'Invalid Date'){
		return 'Invalid Date'
	}
	var formattedDate = `${dateObj.getMonth()+1}/${dateObj.getDate()}/${dateObj.getFullYear()}`
	return formattedDate
}

