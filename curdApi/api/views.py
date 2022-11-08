from django.shortcuts import render
import json
from rest_framework import generics
from .models import Product
from .serializers import ProductSerializer
from rest_framework.renderers import JSONRenderer
from django.http import HttpResponse , JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views import View
from rest_framework import filters

# Create your views here.
@method_decorator(csrf_exempt, name='dispatch')
class ProductAPI(View):
    def get(self, request,id=None, *args, **kwargs):
        if request.body:
            data = json.loads(request.body)
            id = data[id]

        if id is not None:
            pro = Product.objects.get(id=id)
            serializer = ProductSerializer(pro)
            json_data = JSONRenderer().render(serializer.data)
            return HttpResponse(json_data, content_type='application/json')

        pro = Product.objects.all()
        serializer = ProductSerializer(pro, many=True)
        json_data = JSONRenderer().render(serializer.data)
        return HttpResponse(json_data, content_type='application/json')

    def post(self, request, *args, **kwargs):
        if request.body:
            data = json.loads(request.body)
            serializer = ProductSerializer(data = data)
        
        if serializer.is_valid():
            serializer.save()
            res = {'msg': 'Data Created'}
            json_data = JSONRenderer().render(res)
            return HttpResponse(json_data, content_type='application/json')

        json_data = JSONRenderer().render(serializer.errors)
        return HttpResponse(json_data, content_type='application/json')

    def put(self, request, *args, **kwargs):
        if request.body:
            data = json.loads(request.body)
            id = data['id']
            pro = Product.objects.get(id=id)
            serializer = ProductSerializer(pro, data=data,partial=True)
        if serializer.is_valid():
            serializer.save()
            res = { 'msg':'Data Updated !!'}
            json_data = JSONRenderer().render(res)
            return HttpResponse(json_data, content_type='application/json')

        json_data = JSONRenderer().render(serializer.errors)
        return HttpResponse(json_data, content_type='application/json')

    def delete(self, request,id=None, *args, **kwargs):
        if request.body:
            data = json.loads(request.body)
            id = data['id']
        pro = Product.objects.get(id=id)
        pro.delete()
        
        res = { 'msg':'Data deleted !!'}
        # json_data = JSONRenderer().render(res)
        # return HttpResponse(json_data, content_type='application/json')
        return JsonResponse(res, safe=True)


class ProductListView(generics.ListAPIView):
    search_fields = ['name']
    filter_backends = [filters.SearchFilter]
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    print("search: ", search_fields)