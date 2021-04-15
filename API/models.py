from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class ToDoList(models.Model):
    name = models.CharField(max_length=200)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="todolist")

    def __str__(self):
        return self.name


class Items(models.Model):
    text = models.CharField(max_length=250)
    complete = models.BooleanField(default=False)
    name = models.ForeignKey(
        ToDoList, related_name="items", on_delete=models.CASCADE)

    def __str__(self):
        return self.text
