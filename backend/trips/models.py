from django.db import models

class Trip(models.Model):
    current_location = models.CharField(max_length=255)
    pickup_location = models.CharField(max_length=255)
    dropoff_location = models.CharField(max_length=255)
    current_cycle_used = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)
    current_location_lat = models.FloatField(null=True, blank=True)
    current_location_lng = models.FloatField(null=True, blank=True)
    pickup_location_lat = models.FloatField(null=True, blank=True)
    pickup_location_lng = models.FloatField(null=True, blank=True)
    dropoff_location_lat = models.FloatField(null=True, blank=True)
    dropoff_location_lng = models.FloatField(null=True, blank=True)
    distance_to_pickup = models.FloatField(null=True, blank=True)
    distance_to_dropoff = models.FloatField(null=True, blank=True)
    driving_time = models.FloatField(null=True, blank=True)
    total_trip_time = models.FloatField(null=True, blank=True)
    remaining_cycle_hours = models.FloatField(null=True, blank=True)

    def __str__(self):
        return f"Trip from {self.current_location} to {self.dropoff_location}"