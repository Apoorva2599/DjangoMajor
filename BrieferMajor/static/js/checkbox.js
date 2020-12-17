const text_up = document.getElementById('text_up');
const url_up = document.getElementById('url_up');
const upld = document.getElementById('upld');
const txtarea = document.getElementById('text');
const upld_file = document.getElementById('file');
const submitbtn = document.getElementById('bi');

upld.addEventListener('click', function(){
    upld_file.disabled = false;
});
text_up.addEventListener('click', function(){
    upld_file.disabled = true;
});
url_up.addEventListener('click', function(){
    upld_file.disabled = true;
});
submitbtn.addEventListener("click", function(){
if(text_up.checked || url_up.checked){
    txtarea.required = true;
    upld_file.required = false;
}
else if(upld.checked){
    txtarea.required = false;
    console.log(txtarea.required);
    upld_file.required = true;   
}
});