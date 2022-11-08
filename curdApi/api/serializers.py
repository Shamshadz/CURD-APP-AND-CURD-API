from rest_framework import serializers
from api.models import Product

class ProductSerializer(serializers.Serializer):
    id = serializers.IntegerField(required=False)
    name = serializers.CharField(max_length=100,required=False)
    price = serializers.FloatField(required=False)
    quantity = serializers.IntegerField(required=False)
    
    def create(self, validated_data):
        # return super().create(validated_data)
        return Product.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name',instance.name)
        instance.price = validated_data.get('price',instance.price)
        instance.quantity = validated_data.get('quantity',instance.quantity)
        instance.save()
        # return super().update(instance, validated_data)
        return instance