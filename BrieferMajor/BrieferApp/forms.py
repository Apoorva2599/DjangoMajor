from django import forms

class Text(forms.Form):
       text = forms.CharField(max_length=500)
       in_lang = forms.CharField(max_length=500)
       out_lang = forms.CharField(max_length=500)
       n = forms.CharField(max_length=500)
class UploadFileForm(forms.Form):
    title = forms.CharField(max_length=50)
    file = forms.FileField()  
    upld = forms.CharField(max_length=10)
    url_up = forms.CharField(max_length=10)
    text_up = forms.CharField(max_length=10)
              