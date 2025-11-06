from django.apps import AppConfig


class PlacementcoordinatorConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'PlacementCoordinator'

    def ready(self):
        import PlacementCoordinator.signals
