/**
 * This utility method converts a date to a string according to the format
 * @param {type} date
 * @param {type} format, e.g., "yyyy:MM:dd:HH:mm" converts the date "2017-01-26 5:15pm" to "2017:01:26:17:15"
 * @param {type} utc
 * @returns {unresolved}
 */
function formatDate(date, format, utc) {
  var MMMM = [
    "\x00",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  var MMM = [
    "\x01",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  var dddd = [
    "\x02",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  var ddd = ["\x03", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  function ii(i, len) {
    var s = i + "";
    len = len || 2;
    while (s.length < len) s = "0" + s;
    return s;
  }

  var y = utc ? date.getUTCFullYear() : date.getFullYear();
  format = format.replace(/(^|[^\\])yyyy+/g, "$1" + y);
  format = format.replace(/(^|[^\\])yy/g, "$1" + y.toString().substr(2, 2));
  format = format.replace(/(^|[^\\])y/g, "$1" + y);

  var M = (utc ? date.getUTCMonth() : date.getMonth()) + 1;
  format = format.replace(/(^|[^\\])MMMM+/g, "$1" + MMMM[0]);
  format = format.replace(/(^|[^\\])MMM/g, "$1" + MMM[0]);
  format = format.replace(/(^|[^\\])MM/g, "$1" + ii(M));
  format = format.replace(/(^|[^\\])M/g, "$1" + M);

  var d = utc ? date.getUTCDate() : date.getDate();
  format = format.replace(/(^|[^\\])dddd+/g, "$1" + dddd[0]);
  format = format.replace(/(^|[^\\])ddd/g, "$1" + ddd[0]);
  format = format.replace(/(^|[^\\])dd/g, "$1" + ii(d));
  format = format.replace(/(^|[^\\])d/g, "$1" + d);

  var H = utc ? date.getUTCHours() : date.getHours();
  format = format.replace(/(^|[^\\])HH+/g, "$1" + ii(H));
  format = format.replace(/(^|[^\\])H/g, "$1" + H);

  var h = H > 12 ? H - 12 : H == 0 ? 12 : H;
  format = format.replace(/(^|[^\\])hh+/g, "$1" + ii(h));
  format = format.replace(/(^|[^\\])h/g, "$1" + h);

  var m = utc ? date.getUTCMinutes() : date.getMinutes();
  format = format.replace(/(^|[^\\])mm+/g, "$1" + ii(m));
  format = format.replace(/(^|[^\\])m/g, "$1" + m);

  var s = utc ? date.getUTCSeconds() : date.getSeconds();
  format = format.replace(/(^|[^\\])ss+/g, "$1" + ii(s));
  format = format.replace(/(^|[^\\])s/g, "$1" + s);

  var f = utc ? date.getUTCMilliseconds() : date.getMilliseconds();
  format = format.replace(/(^|[^\\])fff+/g, "$1" + ii(f, 3));
  f = Math.round(f / 10);
  format = format.replace(/(^|[^\\])ff/g, "$1" + ii(f));
  f = Math.round(f / 10);
  format = format.replace(/(^|[^\\])f/g, "$1" + f);

  var T = H < 12 ? "AM" : "PM";
  format = format.replace(/(^|[^\\])TT+/g, "$1" + T);
  format = format.replace(/(^|[^\\])T/g, "$1" + T.charAt(0));

  var t = T.toLowerCase();
  format = format.replace(/(^|[^\\])tt+/g, "$1" + t);
  format = format.replace(/(^|[^\\])t/g, "$1" + t.charAt(0));

  var tz = -date.getTimezoneOffset();
  var K = utc || !tz ? "Z" : tz > 0 ? "+" : "-";
  if (!utc) {
    tz = Math.abs(tz);
    var tzHrs = Math.floor(tz / 60);
    var tzMin = tz % 60;
    K += ii(tzHrs) + ":" + ii(tzMin);
  }
  format = format.replace(/(^|[^\\])K/g, "$1" + K);

  var day = (utc ? date.getUTCDay() : date.getDay()) + 1;
  format = format.replace(new RegExp(dddd[0], "g"), dddd[day]);
  format = format.replace(new RegExp(ddd[0], "g"), ddd[day]);

  format = format.replace(new RegExp(MMMM[0], "g"), MMMM[M]);
  format = format.replace(new RegExp(MMM[0], "g"), MMM[M]);

  format = format.replace(/\\(.)/g, "$1");

  return format;
}

/**
 * Formatting the date string
 * @param {type} d, the date argument
 * @returns formatted Date string
 */
function format(d) {
  return formatDate(d, "yyyy-MM-dd HH:mm");
}

/**
 * Check if provided string is a letter
 * @param {type} str, a string
 * @returns returns true if the string is of length 1 and contains a letter
 */
function isLetter(str) {
  return str.length === 1 && (/[a-z]/i).test(str);
}

/**
 * Check if provided string is a number
 * @param {type} str, a string
 * @returns returns true if the string is of length 1 and contains a numeral
 */
function isNumber(str) {
  return str.length === 1 && (/[0-9]/i).test(str);
}

/**
 * Utility to get default value from the field name if it was undefined or empty
 * @param {type} fieldName
 * @param {type} defaultValue
 * @returns {jQuery}
 */
function get_name_value(fieldName, defaultValue) {
  var value = $("#" + fieldName).val();
  if (value == "") {
    value = defaultValue;
    $("#" + fieldName).val(value);
  }
  if (fieldName == "name") {
    if (
      !(isLetter(value.charAt(0)) && isNumber(value.charAt(value.length - 1)))
    ) {
      alert("Please enter the correct value");
      return "";
    }
  }
  return value;
}

/**
 * This is the main class
 */
var app = {
	initialize: function() {
		document.addEventListener(
			"deviceready",
			this.onDeviceReady.bind(this),
			false
		);
	},
	
	// deviceready Event Handler
	onDeviceReady: function() {
		this.receivedEvent("deviceready");
	},
	
	// Update DOM on a Received Event
	receivedEvent: function(id) {
		
		/* The following are private varibles only visible in this scope */

		var markers = []; //used to store markers on the map
		var map; // used to reference the HERE map
		
		/* The following are private functions only visible in this scope */
		
		function addMarkerToMap(address){
			if (address != undefined) {
				var listSuccess = function(data){
					var lat = data[0].lat;
					var lon = data[0].lon;
					marker = new H.map.Marker({ lng: lon, lat: lat });
					markers.push(marker);
					map.addObjects(markers);
				}
				
				var uri = "http://nominatim.openstreetmap.org/search/" + encodeURI(address) + "?format=json&countrycodes=gb";
				$.get(uri,listSuccess);	
			}
		}
		
		// Call to clear any markers you have added to the markers array.
		function clearMarkersFromMap(){
			$.each(markers, function(index,value){
				if (value != null) map.removeObject(value);
			});
			markers = [];
		}
		
		function intialiseMap(){
			// initialize the platform object:
			var platform = new H.service.Platform({
				app_id: "uCjOgj0wiZkWGoIEYnqV", 	  
				app_code: "WZKj4-QcCVsJ9IThEeX_Ew" 
			});
			// obtain the default map types from the platform object
			var defaultLayers = platform.createDefaultLayers();
			// instantiate (and display) a map object:
			var div = document.getElementById("mapContainer");
			
			map = new H.Map(
				div, 
				defaultLayers.normal.map
			);			
			
			// change the zoomin level
			map.setZoom(15);
			
			// optional: create the default UI:
			var ui = H.ui.UI.createDefault(map, defaultLayers);
			// optional: change the default settings of UI
			var mapSettings = ui.getControl("mapsettings");
			var zoom = ui.getControl("zoom");
			var scalebar = ui.getControl("scalebar");
			var panorama = ui.getControl("panorama");
			panorama.setAlignment("top-left");
			mapSettings.setAlignment("top-left");
			zoom.setAlignment("top-left");
			scalebar.setAlignment("top-left");
						
			//Find the device location and centre the map
			var onSuccess = function(position) {
				//Once we have found the user's location we centre the map
				map.setCenter({
					lng: position.coords.longitude,
					lat: position.coords.latitude
				});
			}
			
			// Errors here normally indicate the app/web page has not been granted privilages to 
			// share the device location.
			var onError = function(error) {
				alert(
					"code: " + error.code + "\n" + "message: " + error.message + "\n"
				);
			};
			
			//Note: Sometimes this takes some time to callback, and sometimes never callsback if the 
			//      permissions are not correctly set on the phone/emulator/browser.
			navigator.geolocation.getCurrentPosition(onSuccess, onError, {enableHighAccuracy: true});
		}
		  
		/**
		 * Update the map with addresses that match from the API
		 * @param {type} address
		 * @returns {undefined}
		 */
		function updateMatchingStatus(address) {
			var oucu = get_name_value("name", "user1");
			
			var listSuccess = function(data){
				var obj = $.parseJSON(data);
				if (obj.status == "success") {
					$.each(obj.data, function(index, value) {
						addMarkerToMap(value.hire_address);
					});
				}
				else {
					alert(obj.status + " " + obj.data[0].reason);
				}
			}
			
			var uri = "http://137.108.92.9/openstack/taxi/matches?OUCU="+ oucu;
			clearMarkersFromMap();
			$.get(uri,listSuccess);
		}

		/**
		 * function for registering the taxi sharing service
		 */
		function register(oucu) {
			var onSuccess = function(data){
				var obj = $.parseJSON(data);
				if (obj.status == "success") {
					alert("User " + oucu + " has been successfully registered.");
				} else {
					alert("User " + oucu + " is already registered.");
				}
			}
			
			// Post the user ID using the "users" API
			var uri = "http://137.108.92.9/openstack/taxi/users";
			var params = { OUCU: oucu };
			if (oucu != "")
				$.post(uri,params,onSuccess);
		};

		/**
		 * Function for volunteering a taxi
		 */
		function volunteer(oucu, address, start_time, end_time) {
				var onSuccess = function(data){
				var obj = $.parseJSON(data);				
				if (obj.status == "success") {
					alert("Offer successful.\n\nOUCU: " + oucu + "\nAddress: " + address + "\nOffered: " + start_time + "\nDeparts: " + end_time);
				} else {
					alert("Offer unsuccessful");
				}
			}
			
			var uri = "http://137.108.92.9/openstack/taxi/orders";
			var params = { oucu: oucu, type: "0" , address: address, start: start_time, end: end_time};
			if (oucu != "" && address != "" && start_time != "" && end_time != "")
				$.post(uri,params,onSuccess);
		};
		
		/**
		 * function for requesting a taxi
		 */
		function request(oucu,address,start_time) {
				var onSuccess = function(data){
				var obj = $.parseJSON(data);				
				if (obj.status == "success") {
					alert("Request successful.\n\nOUCU: " + oucu + "\nAddress: " + address + "\nRequested: " + start_time);
				} else {
					alert("Request unsuccessful");
				}
			}
			
			var uri = "http://137.108.92.9/openstack/taxi/orders";
			var params = { oucu: oucu, type: "1" , address: address, start: start_time};
			if (oucu != ""&& address != ""&& start_time != "")
				$.post(uri,params,onSuccess);
		};

		/**
		 * function for cancelling the bookings
		 */
		function cancel(oucu) {
			
			var removeSuccess = function(result){
				alert("Deleted: " + result);
			}

			var listSuccess = function(data){
				var obj = $.parseJSON(data);
				if (obj.status == "success") {
					// for each order found
					$.each(obj.data, function(index, value) {
						//Use the uri below for the browser
						var uri = "https://cors-anywhere.herokuapp.com/http://137.108.92.9/openstack/taxi/orders/" + value.id + "?OUCU=" + oucu;
						
						//The following may work on a phone
						//var uri = "http://137.108.92.9/openstack/taxi/orders/" + value.id + "?OUCU=" + oucu;
						
						// delete the record using an ajax call
						$.ajax({url: uri, type: "DELETE",data: {},success: removeSuccess});
					});
					alert("Deleted " + obj.data.length + " records");
				}
				else {
					alert(obj.status + " " + obj.data[0].reason);
				}
			}
			
			// fetch all the orders (requests and volunteers) for this OUCU
			var uri = "http://137.108.92.9/openstack/taxi/orders?OUCU="+ oucu;
			$.get(uri,listSuccess);
		};

		/**
		 * function for sending SMS
		 */
		function sendSms() {
			var number = ("07738001703");
 			var message = document.getElementById("messageText").value;

			//CONFIGURATION
			var options = {
				replaceLineBreaks: false, // true to replace \n by a new line, false by default
				android: {
					intent: 'INTENT'  // send SMS with the native android SMS messaging
					//intent: '' // send SMS without opening any other app
				}
			};
		sms.send(number, message, options);
		};


		//This function creates the public interface to TaxiShare, these fuctions may be called 
		// by the JavaScript in the HTML file.
		function TaxiShare(){
		
			var taxiShareObject = {};
			var timerId = null;
			
			//Start updating the map with matches to the request or volunteer
			taxiShareObject.beginUpdatingMap = function(){
				
				if (timerId) clearInterval(timerId);
				// every 10 seconds update the map with the current matches.
				timerId = setInterval(updateMatchingStatus, 10000); 
				// update the map now too
				updateMatchingStatus();
			}
			
			//Stop updating the map with matches
			taxiShareObject.stopUpdatingMap = function(){
				clearInterval(timerId);
				clearMarkersFromMap();
			}
			
			//Register a user with the web service
			taxiShareObject.registerUser = function (){
				var oucu = get_name_value("name", "user1");
				register(oucu);
			}
			
			//Indicate that the user wants to volunteer to share their taxi.
			taxiShareObject.volunteerTaxi = function (){
				var oucu = get_name_value("name", "user1");
				var address = get_name_value("addr", "Open University"); 
				var start_time = get_name_value("time", format(new Date()));
				var hours = get_name_value("hours", 1); //duration in hours
				
				// The API requires an end time, but the interface allows for duration.
				// This code turns the duration into an end time.			
				var pattern = /(\d{4}):(\d{2}):(\d{2}):(\d{2}):(\d{2})/;
				var d;
				if(start_time.match(pattern))
					d = new Date(start_time.replace(pattern,'$1-$2-$3:$4:$5'));
				else
					d = new Date(start_time);
				d.setHours(d.getHours() + parseInt(hours));
				var end_time = format(d);
				
				volunteer(oucu,address,start_time,end_time);
			}
			
			//Indicate that the user wants to share a taxi somebody else has booked.
			taxiShareObject.requestTaxi = function (){
				var oucu = get_name_value("name", "user1");
				var address = get_name_value("addr", "Open University");
				var start_time = get_name_value("time", format(new Date()));
				request(oucu, address, start_time);
			}
			
			//Cancel all current volunteers and requests for this user.
			taxiShareObject.cancel = function (){
				var oucu = get_name_value("name", "user1");
				cancel(oucu);
			}

			//Creates text box and button for composing SMS.
			taxiShareObject.messageMatched = function (){
				//Check if text box already exists.
				var element = document.getElementById("messageText");
				if (element != null){
					alert("Please type your message.");
				}
				else{
					var messageText = document.createElement("textarea");
					messageText.id = "messageText";
					messageText.rows = "10";
					messageText.col = "70";
					messageText.placeholder = "Message your matched employee here...";
					
					var sendButton = document.createElement("button");
					sendButton.innerHTML = "Send";
					sendButton.onclick = function(){
						sendSms();
					}
					
					var messageParent = document.getElementById("messagediv");
					messageParent.appendChild(messageText);
					var sendParent = document.getElementById("sendbuttondiv");
					sendParent.appendChild(sendButton);
				}
			}
				
			//return the intialised object
			return taxiShareObject;
		}
		
		// update the HERE  map initially
		intialiseMap();
		 
		//Create the TaxiShare object, visible in the HTML file as app.taxiShare
		app.taxiShare = new TaxiShare();
	}
};
app.initialize();
