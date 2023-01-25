from django.urls import path
from .views import main, test, TestView, OdpovediView, odpovedCreate
from .views import testOtazek

urlpatterns = [
    path('', main),
    path('test', TestView.as_view()),
    path('historie', OdpovediView.as_view()),
    path('odpoved-create', odpovedCreate),
    path('vsechny-otazky', testOtazek)
    #/zakon, /statistiky
]