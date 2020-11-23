
$(document).ready(function(){
	$("#myModal").modal('show');
	
});
//const modalbody = document.getElementById("modalbody");
var flag;
const result = document.getElementById("result");
const closebtn = document.getElementById("closebtn");
//const testbtn = document.getElementById("test");
// document.getElementById('test').click();
// console.log('Button clicked');
//modalbody.appendChild(result);
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let toggleBtn = null;
if (typeof SpeechRecognition === "undefined") {
	result.innerHTML = "<b>Browser does not support Speech API. Please download latest chrome.<b>";
}else {
	const recognition = new SpeechRecognition();
	recognition.continuous = true;
	recognition.interimResults = true;
	
	recognition.onresult = event => {
		console.log(event.results);
		const last = event.results.length - 1;
		const res = event.results[last];
		console.log(res);
		const text = res[0].transcript;

		if (res.isFinal) {
			const response = process(text);
			const p = document.createElement("p");
			p.innerHTML = `You : ${text} </br>Briefy : ${response}`;
			result.appendChild(p);

			// text to speech
			speechSynthesis.speak(new SpeechSynthesisUtterance(response));
		} 
	}
	//let listening = false;
	//testbtn.click();
	speechSynthesis.speak( new SpeechSynthesisUtterance("Hello my name is Briefy"));
	recognition.start();
	toggleBtn = () => {
		recognition.stop();
	};
	closebtn.addEventListener("click", toggleBtn);	
}

// processor
function process(rawText) {
	if(flag==='s'){
		$.ajax({
			type:'POST',
			url:'Summary',
			data:{
			  text:rawText,
			  csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val()
			},
			headers: {
			   'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			 },
			success:function(response){
				console.log(response);
			},
			error: function(data){}
		});
	}
	if(flag==='done'){
		text="done";
	}
	let text = rawText.replace(/\s/g, "");
	text = text.toLowerCase();
	var summary = text.match(/summar/i)
	if(summary != undefined){
		text="summary";
	}
	let response = null;
	switch(text) {
		case "hello":
			response = "hi, welcome to Briefer. We summarize,analyze or translate your text. How should I help you"; break;
		case "whatoptionsdoyouhave":
			response = "Do you want to summarize,analyze or translate your text?";  break;
		case "howareyou":
			response = "I'm good."; break;
		case "summary":
			response = "Ok. You can input your text through speech now.";
			flag = 's';
			break;
		case 'done':
			response = 'done';
			break;
		case "whattimeisit":
			response = new Date().toLocaleTimeString(); break;
		case "stop":
			response = "Bye!!";
			toggleBtn();
		case "bye":
			response = "Bye!!";
			toggleBtn();
	}
	if (!response) {
		window.open(`http://google.com/search?q=${rawText.replace("search", "")}`, "_blank");
		return `I found some information for ${rawText}`;
	}
	return response;
}

