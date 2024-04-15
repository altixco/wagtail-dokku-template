from django.db import models
from wagtail.admin.panels import MultiFieldPanel, FieldPanel
from wagtail.fields import StreamField
from wagtail.models import Page
from wagtail.contrib.settings.models import register_setting, BaseGenericSetting
from wagtail.search import index
from main.blocks import BaseStreamBlock


@register_setting
class SiteSettings(BaseGenericSetting):
    # Site Branding
    site_name = models.CharField(max_length=255, default='')
    logo = models.URLField(
        help_text='Logo image from current website',
        null=True,
        blank=True
    )
    logo_mono = models.URLField(
        help_text='Monochrome logo image from current website',
        null=True,
        blank=True
    )
    favicon = models.URLField(
        help_text='Favicon image from current website',
        null=True,
        blank=True
    )
    primary_color = models.CharField(
        max_length=7,
        default='#000000',
        help_text='Primary color in hexadecimal format (#RRGGBB)'
    )
    # Social media
    facebook = models.URLField(help_text='Facebook page URL', null=True, blank=True)
    twitter = models.URLField(help_text='Twitter page URL', null=True, blank=True)
    instagram = models.URLField(help_text='Instagram page URL', null=True, blank=True)
    youtube = models.URLField(help_text='YouTube page URL', null=True, blank=True)

    # Contact data
    phone = models.CharField(max_length=255, null=True, blank=True)
    address = models.CharField(max_length=255, null=True, blank=True)
    email = models.CharField(max_length=255, null=True, blank=True)
    site_map = models.CharField(max_length=255, null=True, blank=True)

    panels = [
        MultiFieldPanel([
            FieldPanel('site_name'),
            FieldPanel('logo'),
            FieldPanel('logo_mono'),
            FieldPanel('favicon'),
            FieldPanel('primary_color'),
        ], heading="Site Branding"),
        MultiFieldPanel([
            FieldPanel('facebook'),
            FieldPanel('twitter'),
            FieldPanel('instagram'),
            FieldPanel('youtube'),
        ], heading="Social Media Settings"),
        MultiFieldPanel([
            FieldPanel('phone'),
            FieldPanel('address'),
            FieldPanel('email'),
        ], heading="Contact Settings"),
    ]


class GeneralPage(Page):
    subtitle = models.CharField(
        max_length=255,
        help_text='Subtitle',
        null=True,
        blank=True
    )

    # Body section of the HomePage
    body = StreamField(
        BaseStreamBlock(), verbose_name="Page content block", blank=True, use_json_field=True
    )

    content_panels = Page.content_panels + [
        MultiFieldPanel([
            FieldPanel('subtitle'),
        ], heading="Hero section"),
        FieldPanel('body'),
    ]

    search_fields = Page.search_fields + [
        index.SearchField('title', partial_match=True, ),
        index.SearchField('subtitle', partial_match=True, ),
        index.SearchField('body', partial_match=True, ),
    ]

    def has_script_or_style(self):
        return '<script' in str(self.body) or '<style' in str(self.body)
