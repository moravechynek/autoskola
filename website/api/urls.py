from django.urls import path
from .views import TestView, TreninkView, OdpovediView, odpovedCreate, statistiky
from .views import testOtazek

urlpatterns = [
    path('test', TestView.as_view()),
    path('trenink', TreninkView.as_view()),
    path('historie', OdpovediView.as_view()),
    path('odpoved-create', odpovedCreate),
    path('vsechny-otazky', testOtazek),
    path('statistiky', statistiky)
]