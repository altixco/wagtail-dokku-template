from wagtail.models import Page
from django.utils.translation import gettext_lazy as _


class HomePage(Page):
    def get_context(self, request, *args, **kwargs):
        # Add extra variables and return the updated context
        context = super().get_context(request, *args, **kwargs)
        context['develop_text'] = _('Sitio Web en Desarrollo')
        return context
