from django.urls import path
from .views import main, test, TestView, OdpovediView, odpovedCreate

urlpatterns = [
    path('', main),
    path('test', TestView.as_view()),
    path('historie', OdpovediView.as_view()),
    path('odpoved-create', odpovedCreate),
    #/zakon, /statistiky
]