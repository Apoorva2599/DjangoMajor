
function voiceasst(){
	$("#myModal").modal('show');
	assistant();
}
//const modalbody = document.getElementById("modalbody");
var flag,outlang;
var outputSummary;
var outputSentiment;
var outputTranslate;
var lang = {};
var userSpeech, asstResponse;
var tags = {'Abkhazian': 'ab', 'Afar': 'aa', 'Afrikaans': 'af', 'Akan': 'ak', 'Albanian': 'sq', 'Amharic': 'am', 'Arabic': 'ar', 'Aragonese': 'an', 'Armenian': 'hy', 'Assamese': 'as', 'Avaric': 'av', 'Avestan': 'ae', 'Aymara': 'ay', 'Azerbaijani': 'az', 'Bambara': 'bm', 'Bashkir': 'ba', 'Basque': 'eu', 'Belarusian': 'be', 'Bengali': 'bn','Bangla': 'bn', 'Bihari': 'bh', 'Bislama': 'bi', 'Bosnian': 'bs', 'Breton': 'br', 'Bulgarian': 'bg', 'Burmese': 'my', 'Catalan': 'ca', 'Chamorro': 'ch', 'Chechen': 'ce', 'Chichewa, Chewa, Nyanja': 'ny', 'Chinese': 'zh', 'Chinese (Simplified)': 'zh-Hans', 'Chinese (Traditional)': 'zh-Hant', 'Chuvash': 'cv', 'Cornish': 'kw', 'Corsican': 'co', 'Cree': 'cr', 'Croatian': 'hr', 'Czech': 'cs', 'Danish': 'da', 'Divehi, Dhivehi, Maldivian': 'dv', 'Dutch': 'nl', 'Dzongkha': 'dz', 'English': 'en', 'Esperanto': 'eo', 'Estonian': 'et', 'Ewe': 'ee', 'Faroese': 'fo', 'Fijian': 'fj', 'Finnish': 'fi', 'French': 'fr', 'Fula, Fulah, Pulaar, Pular': 'ff', 'Galician': 'gl', 'Gaelic (Scottish)': 'gd', 'Gaelic (Manx)': 'gv', 'Georgian': 'ka', 'German': 'de', 'Greek': 'el', 'Greenlandic': 'kl', 'Guarani': 'gn', 'Gujarati': 'gu', 'Haitian Creole': 'ht', 'Hausa': 'ha', 'Hebrew': 'he', 'Herero': 'hz', 'Hindi': 'hi', 'Hiri Motu': 'ho', 'Hungarian': 'hu', 'Icelandic': 'is', 'Ido': 'io', 'Igbo': 'ig', 'Indonesian': 'id, in', 'Interlingua': 'ia', 'Interlingue': 'ie', 'Inuktitut': 'iu', 'Inupiak': 'ik', 'Irish': 'ga', 'Italian': 'it', 'Japanese': 'ja', 'Javanese': 'jv', 'Kalaallisut, Greenlandic': 'kl', 'Kannada': 'kn', 'Kanuri': 'kr', 'Kashmiri': 'ks', 'Kazakh': 'kk', 'Khmer': 'km', 'Kikuyu': 'ki', 'Kinyarwanda (Rwanda)': 'rw', 'Kirundi': 'rn', 'Kyrgyz': 'ky', 'Komi': 'kv', 'Kongo': 'kg', 'Korean': 'ko', 'Kurdish': 'ku', 'Kwanyama': 'kj', 'Lao': 'lo', 'Latin': 'la', 'Latvian (Lettish)': 'lv', 'Limburgish ( Limburger)': 'li', 'Lingala': 'ln', 'Lithuanian': 'lt', 'Luga-Katanga': 'lu', 'Luganda, Ganda': 'lg', 'Luxembourgish': 'lb', 'Manx': 'gv', 'Macedonian': 'mk', 'Malagasy': 'mg', 'Malay': 'ms', 'Malayalam': 'ml', 'Maltese': 'mt', 'Maori': 'mi', 'Marathi': 'mr', 'Marshallese': 'mh', 'Moldavian': 'mo', 'Mongolian': 'mn', 'Nauru': 'na', 'Navajo': 'nv', 'Ndonga': 'ng', 'Northern Ndebele': 'nd', 'Nepali': 'ne', 'Norwegian': 'no', 'Norwegian bokmål': 'nb', 'Norwegian nynorsk': 'nn', 'Nuosu': 'ii', 'Occitan': 'oc', 'Ojibwe': 'oj', 'Old Church Slavonic, Old Bulgarian': 'cu', 'Oriya': 'or', 'Oromo (Afaan Oromo)': 'om', 'Ossetian': 'os', 'Pāli': 'pi', 'Pashto, Pushto': 'ps', 'Persian (Farsi)': 'fa', 'Polish': 'pl', 'Portuguese': 'pt', 'Punjabi': 'pa', 'Quechua': 'qu', 'Romansh': 'rm', 'Romanian': 'ro', 'Russian': 'ru', 'Sami': 'se', 'Samoan': 'sm', 'Sango': 'sg', 'Sanskrit': 'sa', 'Serbian': 'sr', 'Serbo-Croatian': 'sh', 'Sesotho': 'st', 'Setswana': 'tn', 'Shona': 'sn', 'Sichuan Yi': 'ii', 'Sindhi': 'sd', 'Sinhalese': 'si', 'Siswati': 'ss', 'Slovak': 'sk', 'Slovenian': 'sl', 'Somali': 'so', 'Southern Ndebele': 'nr', 'Spanish': 'es', 'Sundanese': 'su', 'Swahili (Kiswahili)': 'sw', 'Swati': 'ss', 'Swedish': 'sv', 'Tagalog': 'tl', 'Tahitian': 'ty', 'Tajik': 'tg', 'Tamil': 'ta', 'Tatar': 'tt', 'Telugu': 'te', 'Thai': 'th', 'Tibetan': 'bo', 'Tigrinya': 'ti', 'Tonga': 'to', 'Tsonga': 'ts', 'Turkish': 'tr', 'Turkmen': 'tk', 'Twi': 'tw', 'Uyghur': 'ug', 'Ukrainian': 'uk', 'Urdu': 'ur', 'Uzbek': 'uz', 'Venda': 've', 'Vietnamese': 'vi', 'Volapük': 'vo', 'Wallon': 'wa', 'Welsh': 'cy', 'Wolof': 'wo', 'Western Frisian': 'fy', 'Xhosa': 'xh', 'Yiddish': 'yi, ji', 'Yoruba': 'yo', 'Zhuang, Chuang': 'za', 'Zulu': 'zu'};
const result = document.getElementById("result");
const closebtn = document.getElementById("closebtn");
const chtcontent = document.getElementsByClassName("modal-content");
//const testbtn = document.getElementById("test");
// document.getElementById('test').click();
// console.log('Button clicked');
//modalbody.appendChild(result);
function assistant(){
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let toggleBtn = null;
console.log(1);
if (typeof SpeechRecognition === "undefined") {
	result.innerHTML = "<b>Browser does not support Speech API. Please download latest chrome.<b>";
}else {
	const recognition = new SpeechRecognition();
	recognition.continuous = true;
	recognition.interimResults = true;
	console.log(2);
	recognition.onresult = event => {
		console.log(3);
		console.log(event.results);
		const last = event.results.length - 1;
		const res = event.results[last];
		console.log(res);
		const text = res[0].transcript;
		console.log(asstResponse+" first");
		if (res.isFinal) {
			console.log(4);
			userSpeech = text;
			//const response = process(text);
			process(text);
			console.log(7);
			console.log(asstResponse);
			const p1 = document.createElement("p");
			p1.id = 'userchat';
			const p2 = document.createElement("p");
			p2.id = 'asstchat';
			p1.innerHTML = `You : ${text}`;
			result.appendChild(p1);
			p2.innerHTML = `Briefy : ${asstResponse}`;
			result.appendChild(p2);
			result.lastChild.scrollIntoView();
			// text to speech
			var speech = new SpeechSynthesisUtterance();
			speech.text = asstResponse;
			console.log(outlang);
			console.log(flag);
			if(flag == 'transdone'){
				speech.lang = tags[outlang];
				flag = null;
				console.log('inside ' +speech.lang);
			}
			else{
				speech.lang = 'en-US'
			}
			console.log(speech.lang);
			speechSynthesis.speak(speech);
		} 
	}
	//let listening = false;
	//testbtn.click();
	console.log(8);
	speechSynthesis.speak( new SpeechSynthesisUtterance("Hello my name is Briefy"));
	recognition.start();
	console.log(9);
	toggleBtn = () => {
		console.log(11);
		recognition.stop();
	};
	closebtn.addEventListener("click", toggleBtn);	
	console.log(10);
}
}

// processor
function process(rawText) {
	console.log(5);
	var smry;
	let response = null;
	let result;
	if(flag==='s'){
		console.log("summary text");
		result = doSummary(rawText);
		response = voiceResponse(flag);
		asstResponse = response;
		console.log(asstResponse);
	}
	else if(flag=='se'){
		console.log('senti text');
		result = doSentiment(rawText);
		response = voiceResponse(flag);
		asstResponse = response;
		console.log(asstResponse);
	}
	else if(flag == 'inlang'){
		lang['in_lang'] = rawText.replace(/\s/g, "");
		flag = 'inlangdone';
		response = voiceResponse(flag);
		asstResponse = response;
	}
	else if(flag == 'outlang'){
		lang['out_lang'] = rawText.replace(/\s/g, "");
		flag = 'outlangdone';
		response = voiceResponse(flag);
		asstResponse = response;
	}
	else if(flag == 't'){
		lang['text'] = rawText;
		console.log('lang text');
		result = doTranslate(lang);
		response = voiceResponse(flag);
		asstResponse = response;
		console.log(asstResponse);
	}
	else{
		response = voiceResponse(flag);
		asstResponse = response;
	}
	
}

function voiceResponse(flg){
	let text = null;
	let output;
	if(flg=='sumdone'){
		text="sumdone";
		output=outputSummary;
		console.log(text+"Hello");
	}
	else if(flg=='sentdone'){
		text="sentdone";
		output=outputSentiment;
		console.log(text+"Hello");
	}
	else if(flg == 'inlangdone'){
		text = "outputlang";
	}
	else if(flg == 'outlangdone'){
		text = "langdata";
	}
	else if(flg == 'transdone'){
		text = "transdone";
		output = outputTranslate;
		console.log(text+"Hello");
	}
	else{
		text = userSpeech.replace(/\s/g, "");
		text = text.toLowerCase();
		var summary = text.match(/summar/i);
		var sentiment = text.match(/analys/i);
		var translate = text.match(/translat/i);
		if(summary != undefined){
			text="summary";
		}
		if(sentiment != undefined){
			text="sentiment"; 
		}
		if(translate != undefined){
			text="translate";
		}
	}
	let response = null;
	console.log(6);
	switch(text) {
		case "hello":
			response = "Hi, welcome to Briefer. We summarize, analyze or translate your text. How can I help you?"; break;
		case "whatoptionsdoyouhave":
			response = "Do you want to summarize,analyze or translate your text?";  break;
		case "howareyou":
			response = "I'm good."; break;
		case "summary":
			response = "Ok. You can input your text through speech now.";
			flag = 's';
			break;
		case "sentiment":
			response = "Ok. You can input your text through speech now.";
			flag = 'se';
			break;
		case "translate":
			response = "Ok. Please tell the language of your text.";
			flag = 'inlang';
			break;
		case "outputlang":
			response = "Ok. Which language do you want to translate your text to?";
			flag = 'outlang';
			break;
		case "langdata":
			response = "Ok. You can input your text through speech now.";
			flag = 't';
			break;
		case 'sumdone':
			response = 'Your summary is: '+output+'.';
			flag = null;
			break;
		case 'sentdone':
			response = 'Analysis of your text is: '+output+'.';
			flag = null;
			break;
		case 'transdone':
			response = output;
			outlang = lang['out_lang']
			//flag = null;
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
		window.open(`http://google.com/search?q=${userSpeech.replace("search", "")}`, "_blank");
		return `I found some information for ${userSpeech}`;
	}
	console.log(flag);
	return response;
}
async function doSummary(rawText) {
    const result = await $.ajax({
        		type:'POST',
				url:'Summary',
				async:false,
				data:{
				  text:rawText,
				  csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val()
				},
				headers: {
				   'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
				 },
				success:function(response){
					console.log(response);
					outputSummary = response['output'];
					flag = 'sumdone';
					console.log(flag);
				},
				error: function(data){
					
				}
    });

    return result;
}
async function doSentiment(rawText) {
    const result = await $.ajax({
        		type:'POST',
				url:'Sentiment',
				async:false,
				data:{
				  text:rawText,
				  csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val()
				},
				headers: {
				   'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
				 },
				success:function(response){
					console.log(response);
					outputSentiment = 'Positive: '+response['pos']+'%, Negative: '+response['neg']+'%, Neutral: '+response['neu']+'%, Compound: '+response['compound']+'%';
					flag = 'sentdone';
					console.log(flag);
				},
				error: function(data){
					
				}
    });

    return result;
}
async function doTranslate(langdata) {
    const result = await $.ajax({
        		type:'POST',
				url:'LangTranslate',
				async:false,
				data:{
				  text:langdata['text'],
				  in_lang: langdata['in_lang'],
				  out_lang: langdata['out_lang'],
				  csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val()
				},
				headers: {
				   'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
				 },
				success:function(response){
					console.log(response);
					outputTranslate = response['translation'];
					flag = 'transdone';
					console.log(flag);
				},
				error: function(data){
					
				}
    });

    return result;
}