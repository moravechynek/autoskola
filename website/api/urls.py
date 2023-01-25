from django.urls import path
from .views import main, test, TestView, OdpovediView

urlpatterns = [
    path('', main),
    path('test', TestView.as_view()),
    path('historie', OdpovediView.as_view())
    #/zkouska', /zakon, /statistiky
]