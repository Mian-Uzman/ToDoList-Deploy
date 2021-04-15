from django.urls import path, include
from .views import CreateList, CreateItem, GetList, GetItems, UpdateItem, DeleteList, DeleteItem, UserList, CurrentUser


urlpatterns = [
    path('add-list/', CreateList.as_view(), name="createlist"),
    path('get-list/', GetList.as_view(), name="getlist"),
    path('get-items/<int:listID>', GetItems.as_view(), name="getitems"),
    path('add-item/', CreateItem.as_view(), name="item"),
    path('update-item/<int:itemID>', UpdateItem.as_view(), name="update-item"),
    path('delete-list/<int:listID>', DeleteList.as_view(), name="delete-list"),
    path('delete-item/<int:itemID>', DeleteItem.as_view(), name="delete-item"),
    path('current-user/', CurrentUser.as_view(), name="current-user"),
    path('users/', UserList.as_view(), name="users")
]
