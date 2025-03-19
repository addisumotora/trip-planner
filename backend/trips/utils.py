from geopy.distance import geodesic
from datetime import timedelta
from opencage.geocoder import OpenCageGeocode

from dotenv import load_dotenv
import os

load_dotenv()
OPENCAGE_API_KEY = os.getenv('OPENCAGE_API_KEY')

geocoder = OpenCageGeocode(OPENCAGE_API_KEY)

def calculate_route(current_location, pickup_location, dropoff_location, current_cycle_used):
    def get_coordinates(location_name):
        try:
            results = geocoder.geocode(location_name)
            if results and results[0]['geometry']:
                return (float(results[0]['geometry']['lat']), float(results[0]['geometry']['lng']))
            else:
                raise ValueError(f"Could not find coordinates for location: {location_name}")
        except Exception as e:
            raise ValueError(f"Error geocoding location '{location_name}': {str(e)}")

    current_coords = get_coordinates(current_location)
    pickup_coords = get_coordinates(pickup_location)
    dropoff_coords = get_coordinates(dropoff_location)

    distance_to_pickup = geodesic(current_coords, pickup_coords).miles
    distance_to_dropoff = geodesic(pickup_coords, dropoff_coords).miles

    driving_time = (distance_to_pickup + distance_to_dropoff) / 60

    total_trip_time = driving_time + 2

    remaining_cycle_hours = 70 - current_cycle_used - total_trip_time

    return {
        "current_location": current_location,
        "pickup_location": pickup_location,
        "dropoff_location": dropoff_location,
        "current_cycle_used": current_cycle_used,
        "current_location_lat": current_coords[0],
        "current_location_lng": current_coords[1],
        "pickup_location_lat": pickup_coords[0],
        "pickup_location_lng": pickup_coords[1],
        "dropoff_location_lat": dropoff_coords[0],
        "dropoff_location_lng": dropoff_coords[1],
        "distance_to_pickup": distance_to_pickup,
        "distance_to_dropoff": distance_to_dropoff,
        "driving_time": driving_time,
        "total_trip_time": total_trip_time,
        "remaining_cycle_hours": remaining_cycle_hours,
    }
