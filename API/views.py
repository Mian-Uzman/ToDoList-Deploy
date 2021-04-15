from rest_framework import generics, status, permissions
from .models import ToDoList, Items
from .serializers import ListSerializer, ItemSerializer, UserSerializer, UserSerializerWithToken
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from django.http import HttpResponse, HttpResponseNotFound
import os
from django.views import View
# Create your views here.
class Assets(View):

    def get(self, _request, filename):
        path = os.path.join(os.path.dirname(__file__), 'static', filename)

        if os.path.isfile(path):
            with open(path, 'rb') as file:
                return HttpResponse(file.read(), content_type='application/javascript')
        else:
            return HttpResponseNotFound()

class CreateList(APIView):
    authentication_classes = (JSONWebTokenAuthentication,)
    serializer_class = ListSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(
            data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data)
        return Response({'msg': 'Invalid data...'})


class GetList(generics.ListAPIView):
    authentication_classes = (JSONWebTokenAuthentication,)
    queryset = ToDoList.objects.all()
    serializer_class = ListSerializer

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)


class GetItems(generics.ListAPIView):
    authentication_classes = (JSONWebTokenAuthentication,)
    serializer_class = ItemSerializer

    def get_queryset(self):
        linkID = self.kwargs['listID']
        return Items.objects.filter(name=linkID)


class CreateItem(APIView):
    authentication_classes = (JSONWebTokenAuthentication,)
    queryset = Items.objects.all()
    serializer_class = ItemSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response({'msg': 'Invalid data...'})


class UpdateItem(APIView):
    authentication_classes = (JSONWebTokenAuthentication,)
    serializer_class = ItemSerializer

    def put(self, request, itemID, format=None):

        serializer = self.serializer_class(data=request.data, partial=True)
        if serializer.is_valid():
            text = serializer.data.get('text')
            complete = serializer.data.get('complete')
            queryset = Items.objects.filter(id=itemID)
            if not queryset.exists():
                return Response({'msg': 'List item not found!'})

            item = queryset[0]
            item.text = text
            item.complete = complete
            item.save(update_fields=['text', 'complete'])
            return Response(ItemSerializer(item).data)
        return Response({'msg': 'Invalid data...'})


class DeleteList(APIView):
    authentication_classes = (JSONWebTokenAuthentication,)

    def delete(self, request, listID, format=None):
        delete_list = ToDoList.objects.filter(id=listID)
        delete_list.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class DeleteItem(APIView):
    authentication_classes = (JSONWebTokenAuthentication,)

    def delete(self, request, itemID, format=None):
        delete_item = Items.objects.filter(id=itemID)
        delete_item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class CurrentUser(APIView):
    authentication_classes = (JSONWebTokenAuthentication,)

    def get(self, request, format=None):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)


class UserList(APIView):

    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
