from django import forms

class Text(forms.form):
       text = forms.CharField(max_length=500)
       in_lang = forms.CharField(max_length=500)
       out_lang = forms.CharField(max_length=500)
       n = forms.CharField(max_length=500)
       