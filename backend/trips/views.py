from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Trip
from .serializers import TripSerializer
from .utils import calculate_route

class TripViewSet(viewsets.ModelViewSet):
    queryset = Trip.objects.all()
    serializer_class = TripSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        trip_data = serializer.validated_data

        route_details = calculate_route(
            trip_data["current_location"],
            trip_data["pickup_location"],
            trip_data["dropoff_location"],
            trip_data["current_cycle_used"],
        )

        trip = serializer.save(
            current_location_lat=route_details["current_location_lat"],
            current_location_lng=route_details["current_location_lng"],
            pickup_location_lat=route_details["pickup_location_lat"],
            pickup_location_lng=route_details["pickup_location_lng"],
            dropoff_location_lat=route_details["dropoff_location_lat"],
            dropoff_location_lng=route_details["dropoff_location_lng"],
            distance_to_pickup=route_details["distance_to_pickup"],
            distance_to_dropoff=route_details["distance_to_dropoff"],
            driving_time=route_details["driving_time"],
            total_trip_time=route_details["total_trip_time"],
            remaining_cycle_hours=route_details["remaining_cycle_hours"],
        )
        return Response({**serializer.data, **route_details}, status=status.HTTP_201_CREATED)